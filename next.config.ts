import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.neuriax.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'neuriax.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
