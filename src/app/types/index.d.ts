export interface WeatherForecast {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: {
    time: string;
    interval: string;
    temperature_2m: string;
    wind_speed_10m: string;
    weather_code: string;
    apparent_temperature: string;
    relative_humidity_2m: string;
    precipitation: string;
  };
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
    wind_speed_10m: number;
    weather_code: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    precipitation: number;
  };
  hourly_units: {
    time: string;
    temperature_2m: string;
    relative_humidity_2m: string;
    wind_speed_10m: string;
    weather_code: string;
  };
  hourly: {
    time: string[]; // Array de tiempos (ISO 8601)
    temperature_2m: number[]; // Array de temperaturas a 2m para cada hora en °C
    relative_humidity_2m: number[]; // Array de humedades relativas a 2m para cada hora en %
    wind_speed_10m: number[]; // Array de velocidades del viento a 10m para cada hora en km/h
    weather_code: number[];
  };
  daily_units: {
    time: string;
    weather_code: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[]; 
    temperature_2m_min: number[]; 
  };
}

export interface GeoLocation {
  ip: string;
  country_code: string;
  country_name: string;
  region_code: string;
  region_name: string;
  city: string;
  zip_code: string;
  timezone: string;
  timezone_abbreviation: string;
  latitude: number;
  longitude: number;
  metro_code: number;
}

export interface GeoSearchResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  country: string;
  admin1_id: number;
  admin2_id?: number;
  admin3_id?: number;
  timezone: string;
  population?: number;
  postcodes?: string[];
  country_id: number;
  admin1: string;
  admin2?: string;
  admin3?: string;
}

export interface GeoSearchResponse {
  results: GeoSearchResult[];
}