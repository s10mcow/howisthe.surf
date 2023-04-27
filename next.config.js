/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        hostname: "s.gravatar.com",
        pathname: "/avatar/**",
      },
      {
        hostname: "res.cloudinary.com",
        pathname: "/howisthesurf/image/upload/**/**",
      },
    ],
  },
};

module.exports = nextConfig;
