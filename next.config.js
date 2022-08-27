const dotenv = require('dotenv')
dotenv.config({ path: './.env.local' })

console.log(process.env.BACKEND_HOST)

/** @type {import('next').NextConfig} */
module.exports = {
  // reactStrictMode: true,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { ...config.resolve.fallback, fs: false };
    return config;
  },
  env: {
    BACKEND_HOST: process.env.BACKEND_HOST
  }
}
