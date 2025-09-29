import { create } from "zustand";
import { GeoSearchResult } from "../types";

interface GeoLocationState {
    data: Partial<GeoSearchResult> | null;
    setGeoLocationData: (update: Partial<GeoSearchResult>) => void;
}

export const useGeoLocationStore = create<GeoLocationState>((set) => ({
    data: null,
    setGeoLocationData: (update) =>
        set((state) => ({
            data: {
                ...state.data,
                ...update,
            },
        })),
}));