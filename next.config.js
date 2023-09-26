/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["app.requestly.io", "images.unsplash.com", "utfs.io"],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
