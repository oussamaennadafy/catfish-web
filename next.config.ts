import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    BASE_URI: "https://www.catfishlive.api.com",
    SOCKET_URI: "http://localhost:3000",
    PEERJS_HOST: "localhost",
    PEERJS_PORT: "3001",
  }
};

export default nextConfig;
