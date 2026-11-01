import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets phones on the same Wi-Fi use the dev server (npm run dev only).
  allowedDevOrigins: ["192.168.1.8", "192.168.1.9"],
  async redirects() {
    return [{ source: "/retail", destination: "/store", permanent: true }];
  },
};

export default nextConfig;
