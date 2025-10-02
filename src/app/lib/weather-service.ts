import { WeatherForecast } from "../types";
import { getNextDateOfWeek } from "../utils";


export function getWeatherIcon(code: number): string {
  if ([0, 1].includes(code)) return 'icon-sunny';
  if (code === 2) return 'icon-partly-cloudy';
  if (code === 3) return 'icon-overcast';
  if ([45, 48].includes(code)) return 'icon-fog';

  if ([51, 53, 55, 56, 57].includes(code)) {
    return 'icon-drizzle';
  }

  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return 'icon-rain';
  }

  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return 'icon-snow';
  }

  if ([95, 96, 99].includes(code)) {
    return 'icon-storm';
  }

  return 'icon-unknown';
}

export async function fetchWeatherForecast(latitude: number, longitude: number, timezone: string = "auto"): Promise<WeatherForecast | null> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation,weather_code&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=${timezone}&forecast_hours=8`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Error en la respuesta del servidor: ${response.status}`);
      return null;
    }

    const data: WeatherForecast = await response.json();

    return data;

  } catch (error) {
    console.error('Error al obtener el pronóstico:', error);
    return null;
  }
}

export async function fetchHourlyForecastForDay(latitude: number, longitude: number, day: string, timezone: string) {
  const date = getNextDateOfWeek(day);

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation,weather_code&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=${timezone}&start_date=${date}&end_date=${date}`;

  try {
    const res = await fetch(url);
    const data: WeatherForecast = await res.json();

    return data;
  } catch (error) {
    console.error('Error getting hourly forecast for day:', error);
    return null;
  }
}