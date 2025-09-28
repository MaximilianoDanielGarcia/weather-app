import { create } from "zustand";
import { GeoSearchResult } from "../types";

interface GeoLocationState {
    data: GeoSearchResult | null;
    setGeoLocationData: (data: GeoSearchResult | null) => void;
}

export const useGeoLocationStore = create<GeoLocationState>((set) => ({
    data: null,
    setGeoLocationData: (data: GeoSearchResult | null) => {
        set({ data });
    },
}));