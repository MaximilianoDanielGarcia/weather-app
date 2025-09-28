import { create } from "zustand";
import { WeatherForecast } from "../types";

interface WeatherStoreState {
    data: WeatherForecast | null;
    setWeatherData: (data: WeatherForecast | null) => void;
}

export const useWeatherStore = create<WeatherStoreState>((set) => ({
    data: null,
    setWeatherData: (data: WeatherForecast | null) => {
        set({ data });
    },
}));