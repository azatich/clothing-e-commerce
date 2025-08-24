import "../styles/globals.css";
import "../styles/nprogress.css";
import { Poppins } from "next/font/google"; // ✅ new file for client providers
import Providers from "./providers";

export const metadata = {
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
