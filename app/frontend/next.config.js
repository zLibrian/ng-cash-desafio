/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  serverRuntimeConfig: {
    apiUrl: 'http://backend:3001'
  },
  publicRuntimeConfig: {
    apiUrl: 'http://localhost:3001'
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true
      }
    ]
  }
}

module.exports = nextConfig
