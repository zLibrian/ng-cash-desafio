/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  serverRuntimeConfig: {
    apiUrl: 'http://backend:3001'
  },
  publicRuntimeConfig: {
    apiUrl: 'http://localhost:3001'
  }
}

module.exports = nextConfig
