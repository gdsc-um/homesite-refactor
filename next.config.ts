import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "via.placeholder.com",
      "res.cloudinary.com",
      "example.com", // Add example.com to the allowed domains
    ],
  },
};

export default nextConfig;
