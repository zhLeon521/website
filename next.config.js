const { withContentlayer } = require('next-contentlayer');
/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  // swcMinify: true,
  images: {
    domains: ['localhost',
      'cdn.nlark.com',
      's3.us-west-2.amazonaws.com', // Images coming from Notion
      'via.placeholder.com', // for articles that do not have a cover image
      'images.unsplash.com', // For blog posts that use an external cover ima ge
      'pbs.twimg.com', // Twitter Profile Picture
    ],
  },
  // 加入以下 custom webpack 设定
  // Support svg import
  // ref: https://dev.to/dolearning/importing-svgs-to-next-js-nna
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = withContentlayer(nextConfig);
