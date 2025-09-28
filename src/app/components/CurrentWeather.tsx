"use client"

import Image from 'next/image'
import React from 'react'
import { convertPrecipitation, convertWindVelocity, getFormattedDate, getTemperature } from '../utils';
import { useWeatherStore } from '../store/weatherStore';
import { useGeoLocationStore } from '../store/geolocationStore';
import { useUnitStore } from '../store/unitsStore';
import { getWeatherIcon } from '../lib/weather-service';

type Props = {
    city?: string;
    country?: string;
    temp?: number;
}

const CurrentWeather = ({ city, country, temp }: Props) => {

    const { data } = useWeatherStore();
    const { data: geoLocationData } = useGeoLocationStore();
    const { units } = useUnitStore();

    return (
        <section className='flex flex-col gap-8 max-w-[800px]'>
            <div className='relative grid min-h-[286px] px-6 rounded-[20px] overflow-hidden'>
                <div className='absolute w-full h-full top-0 left-0 -z-10'>
                    <div className='relative w-full h-full'>
                        <Image src={"/assets/images/bg-today-small.svg"} alt='' className='sm:hidden block object-cover' fill />
                        <Image src={"/assets/images/bg-today-large.svg"} alt='' className='sm:block hidden object-cover' fill />
                    </div>
                </div>

                <div className='flex flex-col sm:flex-row justify-between items-center w-full'>
                    <div className='flex-1 flex flex-col gap-1.5 sm:text-left text-center'>
                        <span className='font-bold text-[28px] font-sans leading-tight'>{geoLocationData?.name ?? city}, {geoLocationData?.country ?? country}</span>
                        <span className='font-sans text-lg font-medium opacity-80'>{getFormattedDate()}</span>
                    </div>

                    <div className='flex-1 flex items-center sm:justify-end justify-between gap-3 w-full'>
                        <div className='relative w-[120px] h-[120px]'>
                            <Image src={`/assets/images/${getWeatherIcon(data?.current.weather_code ?? 1)}.webp`} alt='weather icon' className='contain' fill />
                        </div>
                        <span className='font-sans font-semibold text-[96px]'><span className='italic pr-3'>{getTemperature(data?.current.temperature_2m ?? temp!, units.temperature)}</span>°</span>
                    </div>
                </div>

            </div>


            <div className='grid sm:grid-cols-4 grid-cols-2 sm:gap-6 gap-4'>

                {data ? (
                    <>
                        <div className='flex flex-col justify-between gap-2 border border-neutral-600 p-5 rounded-xl bg-neutral-800'>
                            <span className='text-neutral-200 font-medium text-lg font-sans'>Feels Like</span>
                            <span className='text-white font-sans text-[32px] font-light leading-tight'>{getTemperature(data?.current.apparent_temperature!, units.temperature)}°</span>
                        </div>

                        <div className='flex flex-col justify-between gap-2 border border-neutral-600 p-5 rounded-xl bg-neutral-800'>
                            <span className='text-neutral-200 font-medium text-lg font-sans'>Humidity</span>
                            <span className='text-white font-sans text-[32px] font-light leading-tight'>{data?.current.relative_humidity_2m}%</span>
                        </div>

                        <div className='flex flex-col justify-between gap-2 border border-neutral-600 p-5 rounded-xl bg-neutral-800'>
                            <span className='text-neutral-200 font-medium text-lg font-sans'>Wind</span>
                            <span className='text-white font-sans text-[32px] font-light leading-tight'>{convertWindVelocity(data?.current.wind_speed_10m!, units.windSpeed)} {units.windSpeed == "kmh" ? 'km/h' : 'mph'}</span>
                        </div>

                        <div className='flex flex-col justify-between gap-2 border border-neutral-600 p-5 rounded-xl bg-neutral-800'>
                            <span className='text-neutral-200 font-medium text-lg font-sans'>Precipitation</span>
                            <span className='text-white font-sans text-[32px] font-light leading-tight'>{convertPrecipitation(data?.current.precipitation!, units.precipitation)} {units.precipitation}</span>
                        </div>
                    </>

                ) : (

                    <>
                    <span className='text-neutral-200 font-medium text-lg font-sans'>Loading...</span>
                    
                    </>
                )}

            </div>

        </section>
    )
}

export default CurrentWeather