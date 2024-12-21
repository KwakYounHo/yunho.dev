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
  hostname: "0.0.0.0",
  port: 3000,
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
      {
        protocol: "https",
        hostname: "yunhodev.s3.ap-northeast-2.amazonaws.com",
        pathname: "/public/**",
      },
    ],
  },
};

export default nextConfig;
