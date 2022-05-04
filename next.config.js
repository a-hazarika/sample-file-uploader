/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "firebasestorage.googleapis.com"
    ]
  },
  headers: [
    {
      key: 'Access-Control-Allow-Origin',
      value: '*',
    },
    {
      key: "Access-Control-Allow-Methods",
      value: "GET,OPTIONS,PATCH,DELETE,POST,PUT"
    },
  ]
}

module.exports = nextConfig
