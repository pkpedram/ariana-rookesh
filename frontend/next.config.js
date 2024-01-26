/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
});

const nextConfig = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "arianaback.noavdev.ir",
        port: "",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "img.taaghche.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
});

// withPWA()

module.exports = nextConfig;
