import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      /* for country section, allows next to render images from flagcdn
       * using custom domain crafted with ISO code.
       * allows us to not need to store every flag ever
       */
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
      // same thing but for our public facing firebase images
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
};

export default nextConfig;
