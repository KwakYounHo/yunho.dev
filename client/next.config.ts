import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  async rewrites() {
    const apiServerUrl =
      process.env.NODE_ENV === "production"
        ? `http://api.${process.env.DOMAIN_NAME}`
        : "https://localhost:8000";
    return [
      {
        source: "/external_api/:path*",
        destination: `${apiServerUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
