/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REVALIDATE_TOKEN: process.env.REVALIDATE_TOKEN,
  },
};

module.exports = nextConfig;
