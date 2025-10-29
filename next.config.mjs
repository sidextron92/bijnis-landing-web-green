/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [],
  },
  experimental: {
    optimizePackageImports: ['gsap'],
  },
};

export default nextConfig;
