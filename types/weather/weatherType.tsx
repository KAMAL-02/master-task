export interface WeatherData {
    city: string;
    atmosphere: string;
    temperature: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    sunrise: string;
    sunset: string;
  }
  
  export interface WeatherDetailBoxProps {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    label: string;
    value: string | number;
  }