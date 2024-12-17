import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Output
  output: "standalone",
  // for Security
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  compress: true,
  // server config
  serverRuntimeConfig: {
    port: 3000,
    hostname: "0.0.0.0",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.gravatar.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.genius.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.rapgenius.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
