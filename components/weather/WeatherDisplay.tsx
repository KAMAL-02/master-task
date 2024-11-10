"use client";

import React from 'react';
import { Droplets, Thermometer, Wind } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeatherDetailBox } from "./WeatherDetailBox";
import MoonLoader from "react-spinners/MoonLoader";
import { WeatherData } from '../../types/weather/weatherType';

interface WeatherDisplayProps {
  loading: boolean;
  weatherData: WeatherData;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  loading,
  weatherData,
}) => (
  <Card className="w-full max-w-md mx-auto shadow-lg dark:bg-gray-700 dark:text-white">
    <div className="min-h-[387px]">
      {loading ? (
        <div className="min-h-[387px] flex items-center justify-center">
          <MoonLoader size="40" />
        </div>
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
);

export default React.memo(WeatherDisplay);