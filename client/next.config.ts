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
};

export default nextConfig;
