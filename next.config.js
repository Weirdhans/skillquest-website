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
    // Keep the default widths and bridge the 384 -> 640 gap for compact
    // screenshots: 224px at ~1.75x/2x and 288px at 2x display density.
    imageSizes: [32, 48, 64, 96, 128, 256, 384, 400, 448, 576],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'skill-quest.app',
      },
    ],
  },
}

module.exports = withNextIntl(nextConfig);
