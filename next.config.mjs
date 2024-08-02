/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://fact-check-central.vercel.app",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.bing.com",
      },
    ],
  },
};

export default nextConfig;
