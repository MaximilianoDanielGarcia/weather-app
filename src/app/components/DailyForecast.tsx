"use client"

import React from 'react'
import DailyForecastCard from './DailyForecastCard'
import { useWeatherStore } from '../store/weatherStore';
import { useUnitStore } from '../store/unitsStore';
import { getNameOfDay, getTemperature } from '../utils';

const DailyForecastCardSkeleton = () => {
    return (
        <div className="lg:min-w-[100px] h-[165px] min-w-[89px] border border-neutral-600 bg-neutral-800 rounded-xl animate-pulse">
        </div>
    );
};

const DailyForecast = () => {

    const { data } = useWeatherStore();
    const { units } = useUnitStore();
    return (
        <section className='w-full max-w-[800px] flex flex-col gap-5'>
            <h2 className='font-sans text-xl font-semibold text-white'>Daily forecast</h2>

            <div className='grid md:grid-cols-7 grid-cols-3 gap-4 w-full'>
                {data ? data.daily.time.map((date: string, idx: number) => (
                    <DailyForecastCard
                        key={idx}
                        day={getNameOfDay(date)}
                        tempMax={getTemperature(data.daily.temperature_2m_max[idx], units.temperature)}
                        tempMin={getTemperature(data.daily.temperature_2m_min[idx], units.temperature)}
                        weatherCode={data.daily.weather_code[idx]} />
                )) : (
                    Array.from({ length: 7 }).map((_, idx) => (
                        <DailyForecastCardSkeleton key={idx} />
                    ))
                )
                }

            </div>
        </section>
    )
}

export default DailyForecast