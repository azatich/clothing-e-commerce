"use client";

import { UserProvider } from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import ProgressBar from "@/app/components/ProgressBar";
import { Session } from "@supabase/supabase-js";
export default function Providers({ children, initialSession }: { children: React.ReactNode, initialSession: Session | null }) {
  return (
    <>
      <ProgressBar />
      <ToastContainer />
      <UserProvider initialSession={initialSession}>
        {children}
      </UserProvider>
    </>
  );
}
