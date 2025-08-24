"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../actions";
import { CiMail } from "react-icons/ci";
import { CiLock } from "react-icons/ci";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = await login(formData);

    if (data.success) {
      router.push("/");
    } else {
      setError(data.error || 'Login failed');
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
            <div className="relative w-full">
              <CiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full py-2 pl-10 pr-3  outline-none border-b"
              required
            />
            </div>
            <div className="relative w-full">
              <CiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl font-light" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full py-2 pl-10 pr-3 outline-none border-b"
              required
            />
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
