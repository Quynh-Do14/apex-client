/** @type {import('next').NextConfig} */
const nextConfig = {
  source: '/robots.txt',
  headers: [
    {
      key: 'Content-Signal',
      value: ''
    },
    {
      key: 'X-Robots-Tag',
      value: 'all'
    }
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rimo.vn',
        pathname: '/api/uploads/**'
      },
      {
        protocol: 'http',
        hostname: 'rimo.vn',
        pathname: '/api/uploads/**'
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/api/uploads/**'
      },
      {
        protocol: 'http',
        hostname: '103.130.213.26',
        port: '8000',
        pathname: '/api/uploads/**'
      },
      {
        protocol: 'https',
        hostname: 'api.rimo.vn',
        pathname: '/api/uploads/**'
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/**'
      }
    ]
  },

  reactStrictMode: false,
  swcMinify: true
}

export default nextConfig
