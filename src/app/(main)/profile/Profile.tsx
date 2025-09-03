"use client";

import { updateProfile } from "@/app/lib/update-user-profile";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { toast } from "react-toastify";
import { supabase } from "@/utils/supabase/clients";

export default function ProfilePage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [userID, setUserID] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarUrl(URL.createObjectURL(file));
    }
  }
  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (data.user) {
        setFormData((prev) => ({
          ...prev,
          username: data.user.user_metadata.username || "",
          email: data.user.email || "",
          phone: data.user.user_metadata.phone || "",
        }));
        setUserID(data.user.id);

        const { data: userData, error } = await supabase
          .from("users")
          .select("avatar")
          .eq("id", data.user.id)
          .single();

        if (!error && userData?.avatar) {
          setAvatarUrl(userData.avatar);
        }
      }
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const result = await updateProfile(userID, formData, avatarFile);

    if (result.success) {
      toast.success("Profile updated successfully!");
    } else {
      toast.error(`Failed to update profile: ${result.error}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      {/* Profile Image */}
      <div className="flex flex-col items-center">
        <div className="relative w-48 h-32">
          {/* Profile Image */}
          <Image
            src={avatarUrl || "https://via.placeholder.com/150?text=Profile"}
            alt="Profile"
            width={128}
            height={128}
            className="w-32 h-32 rounded-full object-cover border border-gray-300 shadow-sm"
          />

          {/* File Input */}
          <div className="mt-2 relative inline-block w-full">
            <input
              type="file"
              id="fileInput"
              className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
              onChange={handleFileChange}
            />
            <label
              htmlFor="fileInput"
              className="bg-black text-white px-4 py-2 rounded-md cursor-pointer hover:bg-gray-800 hover:scale-105 transition transform duration-200 shadow"
            >
              Выберите файл
            </label>
            {avatarFile && (
              <span className="ml-2 text-gray-700 italic">
                {avatarFile.name}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="mt-6 space-y-4">
        {/* Username */}
        <div className="flex items-center border rounded-lg px-3 py-2">
          <FaUser className="text-gray-500 mr-2" />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full outline-none"
          />
        </div>

        {/* Email (disabled) */}
        <div className="flex items-center border bg-gray-100 rounded-lg px-3 py-2">
          <FaEnvelope className="text-gray-500 mr-2" />
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            className="w-full outline-none"
            disabled
          />
        </div>

        {/* Phone */}
        <div className="flex items-center border rounded-lg px-3 py-2">
          <FaPhone className="text-gray-500 mr-2" />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder={"Phone Number"}
            className="w-full outline-none"
          />
        </div>

        {/* Password */}
        <div className="flex items-center border rounded-lg px-3 py-2">
          <FaLock className="text-gray-500 mr-2" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-600"
          >
            {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
          </button>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="mt-6 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
      >
        Save Changes
      </button>
    </div>
  );
}
