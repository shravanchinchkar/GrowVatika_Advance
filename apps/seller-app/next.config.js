/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable static generation for error pages that are causing context issues
  experimental: {
    // Set timeout to 0 to effectively disable static generation for problematic pages
    staticPageGenerationTimeout: 0,
  },

  // You can also try disabling static 404 generation specifically
  output: "standalone",
};

export default nextConfig;
