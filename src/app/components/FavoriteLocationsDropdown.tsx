"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import cn from "clsx";
import { useFavoritesStore } from "../store/favoritesStore";
import { useWeatherStore } from "../store/weatherStore";
import { fetchWeatherForecast } from "../lib/weather-service";
import { useGeoLocationStore } from "../store/geolocationStore";
import { FavoriteLocation } from "../types";

export default function FavoriteLocationsDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

    const { favorites } = useFavoritesStore();
    const { setWeatherData } = useWeatherStore();
    const { setGeoLocationData } = useGeoLocationStore();

    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSelectFavorite = async (fav: FavoriteLocation) => {
        setSelectedLocation(fav.location);
        setIsOpen(false);

        const data = await fetchWeatherForecast(fav.latitude, fav.longitude);
        if (data) {
            setWeatherData(data);
            setGeoLocationData({ name: fav.city, country: fav.country });
        }
    };

    return (
        <div ref={dropdownRef} className="relative inline-block text-left">
            <button
                onClick={toggleDropdown}
                className="flex items-center h-[42px] gap-2 px-4 py-2 bg-neutral-800 rounded-lg border border-neutral-600 hover:bg-neutral-700 transition cursor-pointer"
            >
                <span className="font-sans font-light text-base">
                    {selectedLocation || "Favorites"}
                </span>
                <Image
                    src="/assets/images/icon-dropdown.svg"
                    width={12}
                    height={10}
                    alt="dropdown icon"
                />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-[240px] bg-neutral-800 border border-neutral-600 rounded-xl px-2 py-1.5 shadow-lg z-10 space-y-1">
                    {favorites.length === 0 ? (
                        <div className="text-sm text-neutral-300 px-2 py-2.5 font-sans">
                            No hay ubicaciones guardadas.
                        </div>
                    ) : (
                        favorites.map((fav) => (
                            <button
                                key={fav.location}
                                onClick={() =>
                                    handleSelectFavorite(fav)
                                }
                                className={cn(
                                    "w-full text-left px-2 py-2.5 rounded-lg hover:bg-neutral-600 transition flex justify-between items-center cursor-pointer",
                                    selectedLocation === fav.location && "bg-neutral-700"
                                )}
                            >

                                <div className="flex items-center gap-1">
                                    {/* GPS Icon */}
                                    <svg className="size-4 text-white" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                    <span className="text-base font-medium text-white font-sans">
                                        {fav.location}
                                    </span>
                                </div>

                                {selectedLocation === fav.location && (
                                    <Image
                                        src="/assets/images/icon-checkmark.svg"
                                        alt="selected"
                                        width={14}
                                        height={17}
                                    />
                                )}
                            </button>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
