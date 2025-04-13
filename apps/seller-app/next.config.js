/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  // Disable static optimization
  experimental: {
    // For Next.js 15, use this instead of the deprecated appDir
    staticPageGenerationTimeout: 0
  }
};

export default nextConfig;
