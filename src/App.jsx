import React from "react";
import { WeatherProvider } from "./context/WeatherContext";
import DaysWeather from "./components/DaysWeather";
import ShowMainWeather from "./components/ShowMainWeather";

function App() {
  return (
    <WeatherProvider>
      <section className="sm:flex">
        <ShowMainWeather />
        <DaysWeather />
      </section>
    </WeatherProvider>
  );
}

export default App;
