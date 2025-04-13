/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // If using the app directory
  experimental: {
    appDir: true,
  },
  // Set this to false if you're having issues with context
  output: 'standalone',
};

export default nextConfig;
