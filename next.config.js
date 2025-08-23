import { withNextVideo } from "next-video/process";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["qocbdfdtvabshnghfbed.supabase.co"],
  },
};

export default withNextVideo(nextConfig);
