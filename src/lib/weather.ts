// src/lib/weather.ts
import axios from "axios";

export const fetchWeatherData = async (zip: string) => {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    try {
        // Get latitude and longitude from the zip code
        const geocodeResponse = await axios.get(
            `http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apiKey}`
        );

        const { lat, lon } = geocodeResponse.data.coord;

        // Fetch the forecast data for the next 5 days in 3-hour increments
        const forecastResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&units=imperial&appid=${apiKey}`
        );

        return forecastResponse.data.hourly;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
};