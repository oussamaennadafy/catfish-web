import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    BASE_URI: "https://demo1.catfishmeet.live/",
    SOCKET_URI: "https://demo1.catfishmeet.live/",
    PEERJS_HOST: "0.peerjs.com",
    PEERJS_PORT: "443",
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
    ]
  }
};

export default nextConfig;
