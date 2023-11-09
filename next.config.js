/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
  // experimental: {
  //   appDir: true,
  // },
  reactStrictMode: false,
  images: {
    domains: ['res.cloudinary.com'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, '/styles')],
    prependData:
      '@import "my-react-component/src/styles/typeface.module.scss"; @import "my-react-component/src/styles/colors.module.scss"; @import "../styles/common/_mixins.scss";',
  },
}

module.exports = nextConfig
