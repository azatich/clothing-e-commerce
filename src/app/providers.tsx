"use client";

import { UserProvider } from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import ProgressBar from "@/app/components/ProgressBar";
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProgressBar />
      <ToastContainer />
      <UserProvider>
        {children}
      </UserProvider>
    </>
  );
}
