/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/esimmyanmar.github.io' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/esimmyanmar.github.io' : '',
  generateBuildId: () => 'esim-myanmar-300-pages',
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  distDir: 'out'
}

module.exports = nextConfig