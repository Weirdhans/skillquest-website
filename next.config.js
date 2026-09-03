const withNextIntl = require('next-intl/plugin')(
  './src/i18n/request.ts'
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    // Historical URLs reported by Search Console. Keep this list explicit so
    // unrelated missing pages and app callback routes retain their behavior.
    return [
      {
        source: '/en/app',
        destination: '/en/download',
        permanent: true,
      },
      {
        source: '/nl/handleiding',
        destination: '/nl/guides',
        permanent: true,
      },
      {
        source: '/es/faq',
        destination: '/es/support#faq',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'skill-quest.app',
      },
    ],
  },
}

module.exports = withNextIntl(nextConfig);
