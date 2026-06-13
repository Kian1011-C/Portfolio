import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next.js 16: qualities config is required
    qualities: [75, 90, 100],
    // Allow remote images for GitHub stats widgets
    remotePatterns: [
      new URL("https://github-readme-stats.vercel.app/**"),
      new URL("https://streak-stats.demolab.com/**"),
    ],
  },
};

export default nextConfig;
