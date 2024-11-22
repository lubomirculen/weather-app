// src/app/weather/[zip]/page.tsx

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

type WeatherDescription = {
    description: string;
    icon: string;
};

type WeatherMain = {
    temp: number;
};

type WeatherListItem = {
    dt: number; // Timestamp of the forecast
    main: WeatherMain; // Temperature information
    weather: WeatherDescription[]; // Array of weather descriptions
};

type WeatherDataResponse = {
    list: WeatherListItem[]; // List of weather data points
};

// Server-side function that fetches the weather data
async function fetchWeatherData(zip: string): Promise<WeatherListItem[]> {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

    if (!apiKey) {
        throw new Error('API key is missing!');
    }

    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&units=imperial&appid=${apiKey}`
    );

    const data: WeatherDataResponse = await response.json();

    if (!data.list) {
        throw new Error('Weather data not available');
    }

    return data.list; // Return the list of weather data points
}

// This is the component that will render the page
export default async function WeatherPage({ params }: { params: { zip: string } }) {
    const { zip } = params;

    // Fetch the weather data for the zip code
    const weatherData = await fetchWeatherData(zip);

    return (
        <div className="bg-light py-10">
            <div className="container">
                <h1 className="text-center">{`Weather Forecast for ${zip}`}</h1>

                {/* Static link to navigate back to homepage */}
                <div className="back-button-container">
                    <Link href="/" className="back-button">
                        &larr; Back to Home
                    </Link>
                </div>

                <div className="grid">
                    {weatherData.map((weather) => {
                        const date = new Date(weather.dt * 1000); // Convert timestamp to readable date
                        return (
                            <div className="weather-card" key={weather.dt}>
                                <Image
                                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                    alt={weather.weather[0].description}
                                    width={100}
                                    height={100}
                                    priority
                                />
                                <h3>{date.toLocaleString()}</h3>
                                <p className="temp">{weather.main.temp}°F</p>
                                <p className="description">{weather.weather[0].description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
