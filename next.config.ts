import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    env: {
        OPENWEATHER_IMAGE_BASE_URL: 'http://openweathermap.org/img/wn/', // Base URL for OpenWeather icons
    },
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
