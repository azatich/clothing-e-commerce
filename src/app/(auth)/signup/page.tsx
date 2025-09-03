"use client";

import { useState } from "react";
import { signup } from "../actions";
import { CiUser } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { CiPhone } from "react-icons/ci";
import { CiCircleCheck } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    const fd = new FormData();

    fd.append("email", formData.email);
    fd.append("password", formData.password);
    fd.append("phone", formData.phone);
    fd.append("username", formData.username);

    const data = await signup(fd);
    if (data.error) {
      setError(data.error);
    } else {
      toast.success("Please, confirm your email before signing in", {
            position: "top-center",
            autoClose: 2300,
          });
      router.push("/login");
    }
    setLoading(false);
  };

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
            <CiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full py-2 pl-10 pr-3 border-b outline-none"
              required
            />
          </div>
          <div className="relative w-full">
            <CiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full py-2 pl-10 pr-3 border-b outline-none"
              required
            />
          </div>
          <div className="relative w-full">
            <CiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full py-2 pl-10 pr-3 border-b outline-none"
              required
            />
          </div>
          <div className="relative flex items-center w-full border-b">
            <CiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
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
          <div className="relative w-full">
            <CiCircleCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
            <input
              type='text'
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full py-2 pl-10 pr-3 border-b outline-none"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black border text-white p-3 rounded hover:bg-white transition duration-300 hover:text-black"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
          <div>
              <p className="text-gray-500">
                Already have an account?{" "}
                <span
                  onClick={() => router.push("/login")}
                  className="text-black font-semibold cursor-pointer hover:text-gray-500 transition duration-300"
                >
                  Sign in
                </span>
              </p>
            </div>
        </div>
      </form>
    </div>
  );
}
