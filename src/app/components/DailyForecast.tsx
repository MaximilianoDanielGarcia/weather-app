"use client"

import React from 'react'
import DailyForecastCard from './DailyForecastCard'
import { useWeatherStore } from '../store/weatherStore';
import { useUnitStore } from '../store/unitsStore';
import { getNameOfDay, getTemperature } from '../utils';

const DailyForecast = () => {

    const { data } = useWeatherStore();
    const { units } = useUnitStore();
    return (
        <section className='w-full max-w-[800px] flex flex-col gap-5'>
            <h2 className='font-sans text-xl font-semibold text-white'>Daily forecast</h2>

            <div className='grid sm:grid-cols-7 grid-cols-3 gap-4'>
                {data && data.daily.time.map((date: string, idx: number) => (
                    <DailyForecastCard
                        key={idx} 
                        day={getNameOfDay(date)}
                        tempMax={getTemperature(data.daily.temperature_2m_max[idx], units.temperature)}
                        tempMin={getTemperature(data.daily.temperature_2m_min[idx], units.temperature)}
                        weatherCode={data.daily.weather_code[idx]} />
                ))

                }

            </div>
        </section>
    )
}

export default DailyForecast