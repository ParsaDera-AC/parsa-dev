/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static exports
  images: {
    unoptimized: true, // Required for static export
  },
  basePath: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '', // Replace with your repository name
  assetPrefix: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '',
}

module.exports = nextConfig 