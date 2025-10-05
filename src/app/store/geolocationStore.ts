import { create } from "zustand";
import { GeoLocation, GeoSearchResult } from "../types";

interface GeoLocationState {
    current: Partial<GeoLocation> | null;
    data: Partial<GeoSearchResult> | null;
    setGeoLocationData: (update: Partial<GeoSearchResult>) => void;
    setCurrentLocation: (update: Partial<GeoLocation>) => void;
}

export const useGeoLocationStore = create<GeoLocationState>((set) => ({
    current: null,
    setCurrentLocation: (update) =>
        set((state) => ({
            current: {
                ...state.current,
                ...update,
            },
        })),
    data: null,
    setGeoLocationData: (update) =>
        set((state) => ({
            data: {
                ...state.data,
                ...update,
            },
        })),
}));