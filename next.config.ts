import type { NextConfig } from "next";

const BASE_URLS = {
  PROD_BASE_URL: "https://api.catfishmeet.live/api/v1",
  DEV_BASE_URL: "http://localhost:3000/api/v1",
}

const SOCKET_URLS = {
  PROD_SOCKET_URL: "https://api.catfishmeet.live",
  DEV_SOCKET_URL: "http://localhost:3000",
}

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    // connect to dev
    // BASE_URL: process.env.NODE_ENV === "production" ? BASE_URLS.PROD_BASE_URL :  BASE_URLS.DEV_BASE_URL,
    // SOCKET_URL: process.env.NODE_ENV === "production" ? SOCKET_URLS.PROD_SOCKET_URL :  SOCKET_URLS.DEV_SOCKET_URL,

    // connect to prod
    BASE_URL: process.env.NODE_ENV === "development" ? BASE_URLS.PROD_BASE_URL :  BASE_URLS.DEV_BASE_URL,
    SOCKET_URL: process.env.NODE_ENV === "development" ? SOCKET_URLS.PROD_SOCKET_URL :  SOCKET_URLS.DEV_SOCKET_URL,
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
