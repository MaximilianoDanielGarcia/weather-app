import Image from 'next/image'
import React from 'react'
import { getWeatherIcon } from '../lib/weather-service'

type Props = {
    weatherCode: number;
    time: string;
    temperature: number;
}

const HourlyForecastCard = ({ weatherCode, time, temperature }: Props) => {
    return (
        <div className='flex gap-3 w-full items-center justify-between h-[60px] bg-neutral-700 border border-neutral-600 rounded-lg px-3 py-2.5'>

            <div className='flex items-center gap-2'>
                <div className='relative size-[40px]'>
                    <Image src={`/assets/images/${getWeatherIcon(weatherCode)}.webp`} alt='' fill />
                </div>
                <span className='font-sans font-medium text-[20px] text-white'>{time}</span>
            </div>

            <span className='font-sans font-medium text-[20px] text-white'>{temperature}°</span>
        </div>
    )
}

export default HourlyForecastCard