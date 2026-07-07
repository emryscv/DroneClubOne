import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.blob.vercel-storage.com",
      },
    ],
  },
  experimental: {
    globalNotFound: true,
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
};

export default nextConfig;
