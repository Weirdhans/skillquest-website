/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // i18n is not supported in App Router
  // For multi-language support, use next-intl or App Router i18n patterns
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'skill-quest.app',
      },
    ],
  },
}

module.exports = nextConfig
