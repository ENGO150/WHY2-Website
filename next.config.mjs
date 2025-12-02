/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  //basePath: '/WHY2-Website',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
