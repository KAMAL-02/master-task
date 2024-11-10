import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');

  if (!city) {
    return NextResponse.json(
      { error: 'City parameter is required' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `${process.env.WEATHERAPI_URL}/weather?` + new URLSearchParams({
        q: city,
        appid: process.env.WEATHERAPI_KEY!,
        units: 'metric'
      })
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch weather data');
    }

    const transformedData = {
      city: data.name,
      atmosphere: data.weather[0].main,
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
      sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
    };

    return NextResponse.json(transformedData);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}