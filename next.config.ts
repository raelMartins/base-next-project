import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@veerge/realtors-portal'],
  /* config options here */
  reactStrictMode: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*'
      }
    ]
  }
};

export default nextConfig;
