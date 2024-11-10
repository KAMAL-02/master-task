"use client";

import { useState, useEffect } from "react";
import { Droplets, Thermometer, Wind } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WeatherDetailBox } from "./WeatherDetailBox";
import { WeatherSkeleton } from "./WeatherSkeleton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export const Weather = () => {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState({
    city: "New York",
    atmosphere: "Partly Cloudy",
    temperature: 22,
    feelsLike: 24,
    humidity: 65,
    windSpeed: 10,
    sunrise: "6:45 AM",
    sunset: "7:30 PM",
  });

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleSearch = async () => {
    if (!city.trim()) {
      toast.error("Please enter a city name.", {
        containerId: 'GlobalApplicationToast',
      });
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_WEATHERAPI_URL}/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHERAPI_KEY}&units=metric`
      );

      const data = response.data;
      setWeatherData({
        city: data.name,
        atmosphere: data.weather[0].main,
        temperature: data.main.temp,
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
        sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
      });

    } catch (error) {
      toast.error(
        "Unable to fetch weather data. Please try another city.",
        {
          containerId: 'GlobalApplicationToast',
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 mt-3 shadow-md rounded-lg bg-white dark:bg-gray-800 dark:text-white">
      <p className="text-center text-2xl font-semibold mb-4 items-start flex">
        How's the weather today?
      </p>
      <div className="mb-4 flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleCityChange}
          className="flex-1 dark:bg-gray-700"
        />
        <Button onClick={handleSearch} className="ml-2">
          Get Weather
        </Button>
      </div>

      <Card className="w-full max-w-md mx-auto shadow-lg dark:bg-gray-700 dark:text-white">
        <div className={`min-h-[387px] ${loading ? 'h-96-at-633px' : ''}`}>
          {loading ? (
            <WeatherSkeleton />
          ) : (
            <>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                  {weatherData.city}
                </CardTitle>
                <p className="text-center text-muted-foreground dark:text-gray-300">
                  {weatherData.atmosphere}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <WeatherDetailBox
                    icon={Thermometer}
                    label="Temperature"
                    value={`${weatherData.temperature}°C`}
                  />
                  <WeatherDetailBox
                    icon={Thermometer}
                    label="Feels Like"
                    value={`${weatherData.feelsLike}°C`}
                  />
                  <WeatherDetailBox
                    icon={Droplets}
                    label="Humidity"
                    value={`${weatherData.humidity}%`}
                  />
                  <WeatherDetailBox
                    icon={Wind}
                    label="Wind Speed"
                    value={`${weatherData.windSpeed} km/h`}
                  />
                </div>
                <div className="text-center space-y-2">
                  <p>
                    <span className="font-semibold">Sunrise:</span>{" "}
                    {weatherData.sunrise}
                  </p>
                  <p>
                    <span className="font-semibold">Sunset:</span>{" "}
                    {weatherData.sunset}
                  </p>
                </div>
              </CardContent>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};
