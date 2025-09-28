import CurrentWeather from "./components/CurrentWeather";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";
import SearchInput from "./components/SearchInput";
import WeatherInitializer from "./components/WeatherInitializer";
import { getGeoLocation } from "./lib/location-service";
import { fetchWeatherForecast } from "./lib/weather-service";


export default async function Home() {

  const location = await getGeoLocation();

  if (!location) {
    throw new Error("Could not get location");
  }

  const weatherData = await fetchWeatherForecast(location?.latitude!, location?.longitude!, location?.timezone_abbreviation!);

  if (!weatherData) {
    throw new Error("Could not fetch weather data");
  }

  return (
    <main className="max-w-[1440px] flex flex-col gap-16 pt-8 px-4 mx-auto pb-10">
      <WeatherInitializer data={weatherData} />
      <section className="flex flex-col gap-10">
        <h1 className="font-bricolage text-[52px] text-center max-w-[482px] lg:max-w-full">How's the sky looking today?</h1>

        <SearchInput />
      </section>

      <div className="flex gap-8 mx-auto">
        <div className="flex flex-col gap-12">
          <CurrentWeather city={location.city} country={location.country_name} temp={weatherData.current.temperature_2m} />
          <DailyForecast />
        </div>

        <HourlyForecast />
      </div>

    </main>
  );
}
