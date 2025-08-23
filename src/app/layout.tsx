import { Metadata } from "next";
import "../styles/globals.css";
import "../styles/nprogress.css";
import { UserProvider } from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import ProgressBar from "@/components/ProgressBar";
import { Poppins } from "next/font/google";

export const metadata: Metadata = {
  title: "Hoodie",
  icons: {
    icon: "/images/favicon.webp",
  },
};

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ProgressBar />
        <ToastContainer />
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
