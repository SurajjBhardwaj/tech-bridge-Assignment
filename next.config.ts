import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // image config :
  images: {
    domains: ["image.tmdb.org", "m.media-amazon.com"],
  },
  // typescript ignore
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
