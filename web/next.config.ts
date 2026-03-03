import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
    ],
    // Evita problemas de resolução para IP privado em ambiente local
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
