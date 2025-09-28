"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import cn from "clsx";
import { weekdays } from "../utils";
import { fetchHourlyForecastForDay } from "../lib/weather-service";
import { useWeatherStore } from "../store/weatherStore";

const getToday = (): string => {
    const date = new Date();
    const dayIndex = date.getDay(); // Sunday = 0
    return weekdays[(dayIndex + 6) % 7];
};

export default function WeekdayDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState(getToday());
    const { data, setWeatherData } = useWeatherStore();

    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSelectDay = async (day: string) => {
        setSelectedDay(day);
        setIsOpen(false);

        if (data) {
            const forecast = await fetchHourlyForecastForDay(data?.latitude!, data?.longitude!, day, data?.timezone!);

            setWeatherData({
                ...data,
                hourly: forecast?.hourly!
            });
        }
    };

    return (
        <div ref={dropdownRef} className="relative inline-block text-left">
            <button
                onClick={toggleDropdown}
                className="flex items-center h-[42px] gap-2 px-4 py-2 bg-neutral-800 rounded-lg border border-neutral-600 hover:bg-neutral-700 transition cursor-pointer"
            >
                <span className="font-sans font-light text-base">{selectedDay}</span>
                <Image
                    src="/assets/images/icon-dropdown.svg"
                    width={12}
                    height={10}
                    alt="dropdown icon"
                />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-[214px] bg-neutral-800 border border-neutral-600 rounded-xl px-2 py-1.5 shadow-lg z-10 space-y-1">
                    {weekdays.map((day) => (
                        <button
                            key={day}
                            onClick={() => handleSelectDay(day)}
                            className={cn(
                                "w-full text-left px-2 py-2.5 rounded-lg hover:bg-neutral-600 transition flex justify-between items-center",
                                selectedDay === day && "bg-neutral-700"
                            )}
                        >
                            <span className="text-base font-medium text-white font-sans">
                                {day}
                            </span>

                            {selectedDay === day && (
                                <Image
                                    src="/assets/images/icon-checkmark.svg"
                                    alt="selected"
                                    width={14}
                                    height={17}
                                />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
