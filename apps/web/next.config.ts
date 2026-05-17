import type { NextConfig } from "next";

const config: NextConfig = {
  transpilePackages: ["@planote/types"],

  images: {
    remotePatterns: [
      // Clerk profile images
      { hostname: "img.clerk.com" },
      // Cloudflare R2 — note images and attachments
      { hostname: "*.r2.dev" },
    ],
  },

  experimental: {
    // Enables the React compiler for better performance
    reactCompiler: false,
  },
};

export default config;
