export const API_SERVER_URL =
  process.env.NODE_ENV === "production"
    ? `https://${process.env.DOMAIN_NAME}`
    : "http://localhost:8000";
