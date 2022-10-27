/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

const nextConfig = withPWA({
  pwa: {
    dest: 'public',
    runtimeCaching
  },
  webpack: (config) => {
    config.resolve.fallback = { ...config.resolve.fallback, fs: false }
    return config
  },
  env: {
    BACKEND_HOST: process.env.BACKEND_HOST,
    BACKEND_PORT: process.env.BACKEND_PORT
  },
  images: {
    domains: ['camo.githubusercontent.com', 'github.com']
  }
})

module.exports = nextConfig
