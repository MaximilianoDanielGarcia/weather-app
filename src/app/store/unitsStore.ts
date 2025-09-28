import { create } from "zustand";

export type TemperatureUnit = "celsius" | "fahrenheit";
export type WindSpeedUnit = "kmh" | "mph";
export type PrecipitationUnit = "mm" | "in";
export type UnitsBase = "metric" | "imperial";

export type UnitSettings = {
  temperature: TemperatureUnit;
  windSpeed: WindSpeedUnit;
  precipitation: PrecipitationUnit;
  base: UnitsBase;
};

interface UnitStore {
  units: UnitSettings;
  setUnit: <K extends keyof UnitSettings>(type: K, value: UnitSettings[K]) => void;
}

export const useUnitStore = create<UnitStore>((set) => ({
  units: {
    base: "metric",
    temperature: "celsius",
    windSpeed: "kmh",
    precipitation: "mm",
  },
  setUnit: (type, value) =>
    set((state) => ({
      units: {
        ...state.units,
        [type]: value,
      },
    })),
}));