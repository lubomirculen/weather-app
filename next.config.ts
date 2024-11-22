import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'http', // or 'https'
                hostname: 'openweathermap.org',
                pathname: '/img/wn/**', // Allow any image path under '/img/wn/'
            },
        ],
    },
};

export default nextConfig;
