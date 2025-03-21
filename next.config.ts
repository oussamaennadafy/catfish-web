import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    // prod
    PROD_BASE_URL: "https://api.catfishmeet.live/api/v1",
    PROD_SOCKET_URL: "https://api.catfishmeet.live",
    // dev
    DEV_BASE_URL: "http://localhost:3001/api/v1",
    DEV_SOCKET_URL: "http://localhost:3001"
    // DEV_SOCKET_URL: "https://api.catfishmeet.live"
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
    ]
  },
  reactStrictMode: false,
};

export default nextConfig;
