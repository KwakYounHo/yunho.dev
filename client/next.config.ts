import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Output
  output: "standalone",
  // API Proxy
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
  // for Security
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  compress: true,
  // server config
  serverRuntimeConfig: {
    port: 3000,
    hostname: "0.0.0.0",
  },
};

export default nextConfig;
