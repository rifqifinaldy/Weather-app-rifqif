/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["openweathermap.org"],
  },
  env: {
    WEATHER_APP_BASE_URL: process.env.WEATHER_APP_BASE_URL,
    WEATHER_APP_ID: process.env.WEATHER_APP_ID,
  },
};

module.exports = nextConfig;
