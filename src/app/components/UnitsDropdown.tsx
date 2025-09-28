"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import cn from "clsx";
import { useUnitStore } from "../store/unitsStore";

export default function UnitsDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { units, setUnit } = useUnitStore();

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const toggleUnitsSystem = () => {
        if (units.base === "imperial") {
            setUnit("temperature", "celsius");
            setUnit("windSpeed", "kmh");
            setUnit("precipitation", "mm");
            setUnit("base", "metric");
        } else {
            setUnit("temperature", "fahrenheit");
            setUnit("windSpeed", "mph");
            setUnit("precipitation", "in");
            setUnit("base", "imperial");
        }
    };

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

    return (
        <div ref={dropdownRef} className="relative inline-block text-left">
            <button
                onClick={toggleDropdown}
                className="flex items-center h-[42px] gap-2 px-4 py-2 bg-neutral-800 rounded-lg border border-neutral-600 hover:bg-neutral-700 transition cursor-pointer"
            >
                <Image src={"/assets/images/icon-units.svg"} width={16} height={16} alt="" />
                <span className="font-sans font-light text-base">Units</span>
                <Image src={"/assets/images/icon-dropdown.svg"} width={12} height={10} alt="" />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-[214px] bg-neutral-800 border border-neutral-600 rounded-xl px-2 py-1.5 shadow-lg z-10 space-y-2">
                    <button
                        onClick={toggleUnitsSystem}
                        className="w-full hover:bg-neutral-600 rounded-lg px-2 py-2.5 cursor-pointer">

                        <div className="flex gap-2 items-center justify-between">
                            <span className="font-sans text-left text-white text-sm font-medium">{units.base === "metric" ? 'Switch to Imperial' : 'Switch to Metric'}</span>

                            <div
                                className={`relative w-12 h-6 flex items-center rounded-full p-1 transition-colors bg-neutral-700`}
                            >
                                <span
                                    className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${units.base === "imperial" ? "translate-x-6" : "translate-x-0"
                                        }`}
                                />
                            </div>
                        </div>

                    </button>

                    {/* Temperature */}
                    <div className="border-b border-neutral-600 pb-1">
                        <h4 className="font-medium text-sm text-neutral-300 px-2 mb-2 font-sans">
                            Temperature
                        </h4>
                        <div className="flex flex-col gap-1">
                            {["celsius", "fahrenheit"].map((value) => (
                                <label
                                    key={value}
                                    className={cn(
                                        "flex items-center justify-between gap-1 p-2 rounded-lg cursor-pointer hover:bg-neutral-600",
                                        units.temperature === value && "bg-neutral-700"
                                    )}
                                >
                                    <input
                                        type="radio"
                                        name="temperature"
                                        className="hidden"
                                        value={value}
                                        checked={units.temperature === value}
                                        onChange={() => setUnit("temperature", value as any)}
                                    />
                                    <span className="text-base font-medium text-white font-sans">
                                        {value === "celsius" ? "Celsius (°C)" : "Fahrenheit (°F)"}
                                    </span>
                                    {units.temperature === value && (
                                        <Image
                                            src={"/assets/images/icon-checkmark.svg"}
                                            alt=""
                                            width={14}
                                            height={17}
                                        />
                                    )}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Wind Speed */}
                    <div className="border-b border-neutral-600 pb-1">
                        <h4 className="font-medium text-sm text-neutral-300 px-2 mb-2 font-sans">
                            Wind Speed
                        </h4>
                        <div className="flex flex-col gap-1">
                            {["kmh", "mph"].map((value) => (
                                <label
                                    key={value}
                                    className={cn(
                                        "flex items-center justify-between gap-1 p-2 rounded-lg cursor-pointer hover:bg-neutral-600",
                                        units.windSpeed === value && "bg-neutral-700"
                                    )}
                                >
                                    <input
                                        type="radio"
                                        name="windSpeed"
                                        className="hidden"
                                        value={value}
                                        checked={units.windSpeed === value}
                                        onChange={() => setUnit("windSpeed", value as any)}
                                    />
                                    <span className="text-base font-medium text-white font-sans">
                                        {value}
                                    </span>
                                    {units.windSpeed === value && (
                                        <Image
                                            src={"/assets/images/icon-checkmark.svg"}
                                            alt=""
                                            width={14}
                                            height={17}
                                        />
                                    )}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Precipitation */}
                    <div>
                        <h4 className="font-medium text-sm text-neutral-300 px-2 mb-2 font-sans">
                            Precipitation
                        </h4>
                        <div className="flex flex-col gap-1">
                            {["mm", "in"].map((value) => (
                                <label
                                    key={value}
                                    className={cn(
                                        "flex items-center justify-between gap-1 p-2 rounded-lg cursor-pointer hover:bg-neutral-600",
                                        units.precipitation === value && "bg-neutral-700"
                                    )}
                                >
                                    <input
                                        type="radio"
                                        name="precipitation"
                                        className="hidden"
                                        value={value}
                                        checked={units.precipitation === value}
                                        onChange={() => setUnit("precipitation", value as any)}
                                    />
                                    <span className="text-base font-medium text-white font-sans">
                                        {value}
                                    </span>
                                    {units.precipitation === value && (
                                        <Image
                                            src={"/assets/images/icon-checkmark.svg"}
                                            alt=""
                                            width={14}
                                            height={17}
                                        />
                                    )}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
