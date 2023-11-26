/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

module.exports = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['candidly-storage.s3.af-south-1.amazonaws.com'],
  },
};
