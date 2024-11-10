"use client";

import React from 'react';
import { WeatherDetailBoxProps } from '../../types/weather/weatherType';

export const WeatherDetailBox: React.FC<WeatherDetailBoxProps> = ({ 
  icon: Icon, 
  label, 
  value 
}) => (
  <div className="p-4 shadow-lg rounded-lg bg-white dark:bg-gray-600 flex items-center space-x-2">
    <Icon className="w-5 h-5 text-primary dark:text-gray-200" />
    <div>
      <p className="text-sm font-medium dark:text-gray-200">{label}</p>
      <p className="text-xl font-bold dark:text-white">{value}</p>
    </div>
  </div>
);