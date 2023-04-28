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
      {
        hostname: "lh3.googleusercontent.com",
        pathname: "/**/**",
      },
    ],
  },
};

module.exports = nextConfig;
