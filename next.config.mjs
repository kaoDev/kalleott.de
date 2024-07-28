import createMDX from "@next/mdx";
import rehypeImageSize from "./plugins/rehype-image-size.mjs";

const withMDX = createMDX({
  options: {
    extension: /\.mdx?$/,
    rehypePlugins: [[rehypeImageSize, { root: process.cwd() }]],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  reactStrictMode: true,
  transpilePackages: ["geist"],
  experimental: {
    serverActions: {
      allowedOrigins: [
        "*.kalleott.de",
        "localhost:3000",
        "https://qwxglf7h-3000.euw.devtunnels.ms",
      ],
    },
  },
};

const configWithMdx = withMDX(nextConfig);

export default configWithMdx;
