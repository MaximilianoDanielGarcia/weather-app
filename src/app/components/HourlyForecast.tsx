"use client"

import React from 'react'
import HourlyForecastCard from './HourlyForecastCard'
import { useWeatherStore } from '../store/weatherStore';
import { useUnitStore } from '../store/unitsStore';
import { getHour12hsFormat, getTemperature } from '../utils';
import WeekdayDropdown from './WeekdayDropdown';

const HourlyForecastCardSkeleton = () => {
    return (
        <div className="w-full h-[60px] rounded-lg bg-neutral-700 border border-neutral-600 animate-pulse">
        </div>
    );
};

const HourlyForecast = () => {

    const { data } = useWeatherStore();
    const { units } = useUnitStore();

    return (
        <section className='flex flex-col w-full h-full xl:max-w-[385px] max-w-[800px] sm:p-6 p-4 gap-4 bg-neutral-800 rounded-2xl shrink-0'>

            <div className='flex items-center w-full justify-between'>
                <h2 className='text-white font-sans text-xl font-semibold'>Hourly forecast</h2>
                <WeekdayDropdown />
            </div>

            <div className='flex flex-col w-full gap-4 h-[592px] overflow-y-scroll scrollbar-custom'>
                {!data ? (
                    Array.from({ length: 8 }).map((_, idx) => (
                        <HourlyForecastCardSkeleton key={idx} />
                    ))
                ) : (
                    data?.hourly.time.map((time: string, idx: number) => (
                        <HourlyForecastCard
                            key={idx}
                            time={getHour12hsFormat(time)}
                            temperature={getTemperature(data.hourly.temperature_2m[idx], units.temperature)}
                            weatherCode={data.hourly.weather_code[idx]}
                        />
                    ))
                )}
            </div>

        </section>
    )
}

export default HourlyForecast