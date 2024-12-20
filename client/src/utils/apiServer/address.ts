export const API_SERVER_URL =
  process.env.NODE_ENV === "production"
    ? `https://api.${process.env.DOMAIN_NAME}`
    : "http://proxy-dev/api";
