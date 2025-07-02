import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "growvatika.live"],
  },
  reactStrictMode: true,
  typescript: {
    // This will ignore TypeScript errors during build
    ignoreBuildErrors: true,
  },
  eslint: {
    // This will ignore ESLint errors during build
    ignoreDuringBuilds: true,
  },
  experimental: {
    // Remove the deprecated option
    // staticPageGenerationTimeout: 180,

    // Add optimizations for build process
    optimizeCss: true,
    scrollRestoration: true,
  },
  // For Vercel deployment
  output: process.env.NODE_ENV === "production" ? "standalone" : undefined,

  // Add Prisma plugin for monorepo support
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }
    return config;
  },
};

export default nextConfig;
