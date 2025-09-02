import { withNextVideo } from "next-video/process";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["qocbdfdtvabshnghfbed.supabase.co", "via.placeholder.com"],
  },
};

export default withNextVideo(nextConfig);
