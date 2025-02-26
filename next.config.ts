import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["placehold.co"],
  },

  env: {
    SERVER_URL: process.env.SERVER_URL,
  },
};

export default nextConfig;
