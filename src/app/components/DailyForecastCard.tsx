import Image from 'next/image'
import React from 'react'
import { getWeatherIcon } from '../lib/weather-service'

type Props = {
  day: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
}

const DailyForecastCard = ({day, weatherCode, tempMax, tempMin }: Props) => {
  return (
    <div className='flex flex-col gap-4 items-center lg:min-w-[100px] min-w-[89px] border border-neutral-600 bg-neutral-800 rounded-xl px-2.5 py-4 font-sans'>
        <span className='text-white font-medium text-lg'>{day}</span>
        
        <div className='relative size-[60px]'>
            <Image src={`/assets/images/${getWeatherIcon(weatherCode)}.webp`} alt='sunny' fill/>
        </div>
        
        <div className='flex items-center justify-between w-full'>
            <span className='font-medium text-base text-white'>{tempMax.toFixed(0)}°</span>
            <span className='font-medium text-base text-white'>{tempMin.toFixed(0)}°</span>
        </div>
    </div>
  )
}

export default DailyForecastCard