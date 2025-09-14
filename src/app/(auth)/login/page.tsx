"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/clients";
import { CiMail } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      if (authData.user) {
        // Ensure user exists in users table
        const userId = authData.user.id;
        const { data: existing } = await supabase
          .from("users")
          .select("id")
          .eq("id", userId)
          .maybeSingle();

        if (!existing) {
          await supabase.from("users").insert({
            id: userId,
            username: authData.user.user_metadata?.username || "",
            phone: authData.user.user_metadata?.phone || "",
            avatar: authData.user.user_metadata?.avatar || "",
          });
        }

        // Navigate to home page - the UserContext will automatically update
        router.push("/");
      }
    } catch (error) {
      setError('An unexpected error occurred');
    }

    setLoading(false);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center bg-white p-8 rounded-xl shadow-md w-full max-w-2xl space-y-4">
        <h2 className="text-4xl py-4 font-semibold text-black text-center">
          HOODIE
        </h2>

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex flex-col justify-center items-center gap-8 lg:max-w-md">
          <div className="relative w-full border-b">
            <CiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full py-2 pl-10 pr-3 outline-none"
              required
            />
          </div>

          <div className="relative flex items-center border-b w-full">
            <CiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl font-light" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full py-2 pl-10 pr-3 outline-none"
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <MdVisibilityOff /> : <MdVisibility />}</button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black border text-white p-3 rounded hover:bg-white transition duration-300 hover:text-black"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
          <div>
            <p className="text-gray-500">
              Don&apos;t have an account?{" "}
              <span
                onClick={() => router.push("/signup")}
                className="text-black font-semibold cursor-pointer hover:text-gray-500 transition duration-300"
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
