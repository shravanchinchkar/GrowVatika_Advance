/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable static export for problematic pages
  output: "standalone",

  // Disable React strict mode which can help with context issues
  reactStrictMode: false,

  // Increase the timeout for generating static pages
  staticPageGenerationTimeout: 120, // in seconds

  // Disable static generation for error pages
  experimental: {
    // Skip static generation for /404 page
    skipTrailingSlashRedirect: true,
    skipMiddlewareUrlNormalize: true,
  },
};

export default nextConfig;
