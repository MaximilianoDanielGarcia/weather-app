"use client"

import { useEffect } from 'react'
import { useWeatherStore } from '../store/weatherStore';
import { useGeoLocationStore } from '../store/geolocationStore';
import { fetchWeatherForecast } from '../lib/weather-service';

const WeatherInitializer = () => {
  const { setCurrentLocation } = useGeoLocationStore();
   const setWeatherData = useWeatherStore((state) => state.setWeatherData);

  useEffect(() => {
    const getGeo = async () => {
      try {
        const res = await fetch("https://api.ipbase.com/v1/json/");
        const data = await res.json();
        setCurrentLocation(data);

        const weather = await fetchWeatherForecast(
          data.latitude,
          data.longitude,
          data.timezone_abbreviation
        );
        setWeatherData(weather);
      } catch (err) {
        console.error("Error getting location or weather:", err);
      } 
    };

    getGeo();
  }, []);

  return null;
}

export default WeatherInitializer