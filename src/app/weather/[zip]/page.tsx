// app/weather/[zip]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// Define types for the OpenWeather API response
interface Weather {
    description: string;
    icon: string;
}

interface Main {
    temp: number;
}

interface Forecast {
    dt: number; // Unix timestamp
    weather: Weather[];
    main: Main;
}

const WeatherPage = async ({ params }: { params: { zip: string } }) => {
    const zip = params.zip;

    console.log('Fetching forecast for zip:', zip); // Log the zip code

    // Fetch the 5-day forecast data from OpenWeather API
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=imperial`
    );

    if (!response.ok) {
        console.error('Failed to fetch forecast data:', response.statusText); // Log the error
        return notFound(); // Return a 404 page if the forecast data is not found
    }

    const data = await response.json();
    console.log('API forecast data:', data); // Log the full API response for inspection

    // Check if data is as expected
    if (!data || !data.list || data.list.length === 0) {
        console.error('Invalid forecast data:', data); // Log invalid data response
        return notFound(); // Return 404 if data structure is invalid
    }

    // Group the forecast data by day
    const groupedByDay = data.list.reduce((acc: { [key: string]: Forecast[] }, current: Forecast) => {
        const date = new Date(current.dt * 1000);
        const day = date.toLocaleDateString(); // Group by the day (e.g., '10/30/2024')

        if (!acc[day]) {
            acc[day] = [];
        }
        acc[day].push(current);
        return acc;
    }, {});

    return (
        <div>
            <h2>Weather Forecast for {zip}</h2>

            {/* Static link to navigate back to homepage */}
            <div className="back-button-container">
                <Link href="/" className="back-button">
                    &larr; Back to Home
                </Link>
            </div>

            {/* Display the forecast for each day */}
            {Object.keys(groupedByDay).map((day) => {
                const forecasts = groupedByDay[day]; // Explicitly type this as Forecast[]
                return (
                    <div key={day} className="daily-forecast">
                        <h3>{day}</h3>
                        <div className="forecast">
                            {forecasts.map((forecast: Forecast) => {
                                const iconUrl = `${process.env.OPENWEATHER_IMAGE_BASE_URL}${forecast.weather[0].icon}@2x.png`; // Use the env variable
                                return (
                                    <div key={forecast.dt} className="forecast-item">
                                        <h4>{new Date(forecast.dt * 1000).toLocaleTimeString()}</h4>
                                        <Image
                                            src={iconUrl}
                                            alt={forecast.weather[0].description}
                                            width={100}
                                            height={100}
                                            priority
                                        />
                                        <p>{forecast.weather[0].description}</p>
                                        <p>{forecast.main.temp}°F</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default WeatherPage;
