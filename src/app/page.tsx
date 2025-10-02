import CurrentWeather from "./components/CurrentWeather";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";
import SearchInput from "./components/SearchInput";
import WeatherInitializer from "./components/WeatherInitializer";
import { getGeoLocation } from "./lib/location-service";
import { fetchWeatherForecast } from "./lib/weather-service";


export default async function Home() {

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  await sleep(10000);
  const location = await getGeoLocation();

  if (!location) {
    throw new Error("Could not get location");
  }

  const weatherData = await fetchWeatherForecast(location.latitude, location.longitude, location.timezone_abbreviation);

  if (!weatherData) {
    throw new Error("Could not fetch weather data");
  }

  return (
    <main className="max-w-[1440px] w-full flex flex-col lg:gap-12 gap-8 pt-12 px-4 mx-auto pb-10">
      <WeatherInitializer data={weatherData} />
      <section className="flex flex-col items-center w-full lg:gap-14 gap-12">
        <h1 className="font-bricolage text-[52px] text-center max-w-[482px] lg:max-w-full">How&apos;s the sky looking today?</h1>

        <SearchInput />
      </section>

      <div className="flex xl:flex-row flex-col items-center gap-8 w-full justify-center">
        <div className="flex flex-col justify-center items-center gap-12 w-full xl:w-auto shrink-0">
          <CurrentWeather city={location.city} country={location.country_name} />
          <DailyForecast />
        </div>

        <HourlyForecast />
      </div>

    </main>
  );
}
