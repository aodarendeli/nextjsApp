/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin({
  // experimental: {
  //   createMessagesDeclaration: './src/locales/tr/header.json',
  // },
});

const nextConfig = {
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  // rewrites() {
  //   return [
  //     {
  //       source: '/gatewayoauth/:path*',
  //       destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/oauth/:path*`,
  //     },
  //     {
  //       source: '/collectapplication/:path*',
  //       destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/collect.application/v1/api/:path*`,
  //     },
  //   ];
  // },
};

export default withNextIntl(nextConfig);
