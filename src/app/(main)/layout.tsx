import { MobileTabBar } from "../components/DesktopSidebar";
import Navbar from "../components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex-1">
        <Navbar />  
        <div className="md:pb-0">{children}</div>
        <MobileTabBar />
      </div>
    </>
  );
}
