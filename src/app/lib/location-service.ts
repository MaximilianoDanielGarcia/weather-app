import { GeoLocation, GeoSearchResponse, GeoSearchResult } from "../types";

export async function getGeoLocation(): Promise<GeoLocation | null> {
  try {
    const response = await fetch('https://api.ipbase.com/v1/json/');
    
    if (!response.ok) {
      console.error(`Error en la respuesta del servidor api ipbase: ${response.status}`);
      return null;
    }

    const data: GeoLocation = await response.json();
    return data;

  } catch (error) {
    console.error('Error al obtener la geolocalización:', error);
    return null;
  }
}


export async function searchLocationByName(name: string): Promise<GeoSearchResult[] | null> {
  const encodedName = encodeURIComponent(name);
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodedName}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Error en la respuesta del servidor geocoding-api: ${response.status}`);
      return null;
    }

    const data: GeoSearchResponse = await response.json();
    return data.results || null;

  } catch (error) {
    console.error('Error al buscar ubicación:', error);
    return null;
  }
}