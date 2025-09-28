"use client"

import React from 'react'
import HourlyForecastCard from './HourlyForecastCard'
import { useWeatherStore } from '../store/weatherStore';
import { useUnitStore } from '../store/unitsStore';
import { getHour12hsFormat, getTemperature } from '../utils';
import WeekdayDropdown from './WeekdayDropdown';

const HourlyForecast = () => {

    const { data } = useWeatherStore();
    const { units } = useUnitStore();

    return (
        <section className='flex flex-col min-w-[385px] p-6 gap-4 bg-neutral-800 rounded-2xl'>

            <div className='flex items-center justify-between'>
                <h2 className='text-white font-sans text-xl font-semibold'>Hourly forecast</h2>
                <WeekdayDropdown />
            </div>

            <div className='flex flex-col gap-4 h-[592px] overflow-y-scroll scrollbar-custom'>
                {data && data.hourly.time.map((time: string, idx: number) => (
                    <HourlyForecastCard 
                        key={idx} 
                        time={getHour12hsFormat(time)}
                        temperature={getTemperature(data.hourly.temperature_2m[idx], units.temperature)}
                        weatherCode={data.hourly.weather_code[idx]} />
                ))
                }
            </div>

        </section>
    )
}

export default HourlyForecast