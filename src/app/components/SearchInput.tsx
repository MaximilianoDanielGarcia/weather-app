"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import cn from "clsx";
import { searchLocationByName } from "../lib/location-service";
import { fetchWeatherForecast } from "../lib/weather-service";
import { useWeatherStore } from "../store/weatherStore";
import { useGeoLocationStore } from "../store/geolocationStore";
import { GeoSearchResult } from "../types";

export default function SearchInput() {
    const [query, setQuery] = useState("");
    const [selectedSuggestion, setSelectedSuggestion] = useState<GeoSearchResult | null>(null)
    const [suggestions, setSuggestions] = useState<GeoSearchResult[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const { setWeatherData } = useWeatherStore();
    const { setGeoLocationData } = useGeoLocationStore();

    useEffect(() => {
        if (query.length < 2) {
            setSuggestions([]);
            return;
        }

        const timeout = setTimeout(async () => {
            const data = await searchLocationByName(query);
            if (data) {
                setSuggestions(data);
                setShowSuggestions(true);
            } else {
                setSuggestions([]);
            }
        }, 300);

        return () => clearTimeout(timeout);
    }, [query]);

    const onSearch = async (query: string) => {
        if (!selectedSuggestion) return;

        const weatherData = await fetchWeatherForecast(selectedSuggestion.latitude, selectedSuggestion.longitude);

        setWeatherData(weatherData);
        setGeoLocationData(selectedSuggestion);
    };

    const onSelectSuggestion = async (suggestion: GeoSearchResult) => {
        setSelectedSuggestion(suggestion);
        setShowSuggestions(false);
    };

    const handleSelect = (suggestion: GeoSearchResult) => {
        setQuery(`${suggestion.name}, ${suggestion.country}`);
        setShowSuggestions(false);
        onSelectSuggestion?.(suggestion);
    };

    const handleSearch = () => {
        if (!query.trim()) return;
        onSearch(query.trim());
        setShowSuggestions(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="relative w-full">
            <div className="flex flex-col sm:flex-row items-center justify-center sm:gap-4 gap-3 w-full max-w-[800px] mx-auto">
                <div className="relative flex items-center w-full lg:max-w-[526px] h-[56px] border border-neutral-600 rounded-xl bg-neutral-800">
                    <input
                        ref={inputRef}
                        type="text"
                        className="pl-12 py-2 w-full h-full bg-transparent text-white placeholder-neutral-300 placeholder:pl-1 placeholder:font-sans placeholder:text-[20px] focus:outline-white rounded-xl"
                        placeholder="Search for a place..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onFocus={() => query.length > 1 && setShowSuggestions(true)}
                    />
                    <Image className="absolute left-4.5" src="/assets/images/icon-search.svg" alt="Search" width={20} height={20} />

                    {showSuggestions && suggestions.length > 0 && (
                        <ul className="absolute z-20 top-[56px] mt-2 w-full max-w-[526px] p-1.5 bg-neutral-800 border border-neutral-600 rounded-xl shadow-lg max-h-60 overflow-auto">
                            {suggestions.map((item) => (
                                <li
                                    key={item.id}
                                    className={cn(
                                        "p-2 text-base text-white cursor-pointer bg-neutral-800 border border-neutral-800 hover:border-neutral-600 hover:bg-neutral-700 rounded-lg"
                                    )}
                                    onClick={() => handleSelect(item)}
                                >
                                    {`${item.name}, ${item.country}`}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <button
                    className="shrink-0 grid place-items-center bg-blue-500 rounded-xl h-[56px] sm:w-[114px] w-full hover:bg-blue-700 transition cursor-pointer"
                    onClick={handleSearch}
                >
                    <span className="text-white font-sans text-[20px]">Search</span>
                </button>
            </div>
        </div>
    );
}