import CurrentWeather from "./components/CurrentWeather";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";
import SearchInput from "./components/SearchInput";
import WeatherInitializer from "./components/WeatherInitializer";

export default async function Home() {

  return (
    <main className="max-w-[1440px] w-full flex flex-col lg:gap-12 gap-8 pt-12 px-4 mx-auto pb-10">
      <WeatherInitializer />
      <section className="flex flex-col items-center w-full lg:gap-14 gap-12">
        <h1 className="font-bricolage text-[52px] text-center max-w-[482px] lg:max-w-full">How&apos;s the sky looking today?</h1>

        <SearchInput />
      </section>

      <div className="flex xl:flex-row flex-col items-center gap-8 w-full justify-center">
        <div className="flex flex-col justify-center items-center gap-12 w-full xl:w-auto shrink-0">
          <CurrentWeather />
          <DailyForecast />
        </div>

        <HourlyForecast />
      </div>

    </main>
  );
}
