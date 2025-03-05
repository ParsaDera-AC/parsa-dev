/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Changed to 'export' for static site generation
  images: {
    unoptimized: true, // Already correct, as GitHub Pages doesn't support Next.js image optimization
  },
  trailingSlash: true, // Add this for better compatibility
};

module.exports = nextConfig;