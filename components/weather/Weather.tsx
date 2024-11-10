"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import WeatherDisplay from "./WeatherDisplay";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { WeatherData } from "../../types/weather/weatherType";

export const Weather = () => {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData>({
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
      const response = await axios.get('/api/weather', {
        params: { city: city.trim() }
      });

      setWeatherData(response.data);
    } catch (error) {
      console.log(error);
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
        How&apos;s the weather today?
      </p>
      <div className="mb-4 flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleCityChange}
          className="flex-1 dark:bg-gray-700"
        />
        <Button 
          onClick={handleSearch} 
          className="ml-2"
          disabled={loading}
        >
          {loading ? "Loading..." : "Get Weather"}
        </Button>
      </div>
      <WeatherDisplay loading={loading} weatherData={weatherData} />
    </div>
  );
};