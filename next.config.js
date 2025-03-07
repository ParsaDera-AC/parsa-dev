/** @type {import('next').NextConfig} */
const withBundleAnalyzer = process.env.ANALYZE === 'true' 
  ? require('@next/bundle-analyzer')({ enabled: true })
  : (config) => config;

const nextConfig = {
  output: 'export', // Changed to 'export' for static site generation
  images: {
    unoptimized: true, // Already correct, as GitHub Pages doesn't support Next.js image optimization
  },
  trailingSlash: true, // Add this for better compatibility
  // Add performance optimizations
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['framer-motion', 'react-icons'],
  },
};

module.exports = withBundleAnalyzer(nextConfig);