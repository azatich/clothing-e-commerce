import "../styles/globals.css";
import "../styles/nprogress.css";
import { Poppins } from "next/font/google";
import Providers from "./providers";
import { createClient } from "@/utils/supabase/server";

export const metadata = {
  title: "Hoodie",
  icons: {
    icon: "/images/favicon.webp",
  },
};

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers initialSession={session}>{children}</Providers>
      </body>
    </html>
  );
}
