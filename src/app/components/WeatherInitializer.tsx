"use client"

import { useEffect } from 'react'
import { useWeatherStore } from '../store/weatherStore';
import { WeatherForecast } from '../types';

const WeatherInitializer = ({ data }: { data: WeatherForecast | null}) => {
   const setWeatherData = useWeatherStore((state) => state.setWeatherData);

  useEffect(() => {
    setWeatherData(data);
  }, [data, setWeatherData]);

  return null;
}

export default WeatherInitializer