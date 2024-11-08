import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.vox-cdn.com'], // Add pin.it to the domains array
  },
};

export default nextConfig;
