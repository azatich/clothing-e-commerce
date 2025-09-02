import Navbar from "@/app/components/Navbar";
import { MobileTabBar } from "../components/DesktopSidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex-1">
        <Navbar />
        <div className="md:pb-0">
          {children}
        </div>
        <MobileTabBar />
      </div>
    </>
  );
}