/** @type {import("next").NextConfig} */
const config = {
  transpilePackages: ["@planote/types"],

  images: {
    remotePatterns: [
      // Clerk profile images
      { hostname: "img.clerk.com" },
      // Cloudflare R2 — note images and attachments
      { hostname: "*.r2.dev" },
    ],
  },

  // `experimental.reactCompiler` isn't recognized by the installed Next.js
  // 14.2.x — that option only exists on later versions. Re-add it (set to
  // true, once actually enabling it) if/when this project upgrades Next.js.
};

export default config;
