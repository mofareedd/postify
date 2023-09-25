/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["app.requestly.io", "images.unsplash.com"],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
