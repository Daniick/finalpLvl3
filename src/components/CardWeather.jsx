import React, { useEffect, useState } from "react";
import Card from "./Card";
import "./Cartas.css";
import { useWeather } from "../context/WeatherContext";

const CardWeather = () => {
  const { forecast, isCelsius, getTemperature } = useWeather();
  const [afternoonForecast, setAfternoonForecast] = useState([]);

  const initialForecast = Array.from({ length: 5 }, (_, index) => ({
    date: new Date(new Date().getTime() + (index + 1) * 24 * 60 * 60 * 1000),
    temperature: { min: null, max: null },
    weather: { main: "No forecast", description: "" },
  }));

  useEffect(() => {
    if (forecast.length > 0) {
      const currentDate = new Date();
      const nextDaysForecast = forecast.filter((dayForecast) => {
        const nextDay = new Date(currentDate);
        nextDay.setDate(nextDay.getDate() + 1);
        return (
          dayForecast.date.getDate() >= nextDay.getDate() &&
          dayForecast.date.getHours() >= 12 &&
          dayForecast.date.getHours() <= 15
        );
      });

      const sortedNextDays = nextDaysForecast
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .slice(0, 5);

      while (sortedNextDays.length < 5) {
        sortedNextDays.push({ ...initialForecast[sortedNextDays.length] });
      }

      setAfternoonForecast(sortedNextDays);
    } else {
      setAfternoonForecast(initialForecast);
    }
  }, [forecast]);

  return (
    <section className="pl-10 max-sm:mx-auto pr-6 lg:pl-20   lg:mx-auto pt-10 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6 max-sm:w-fit cartas">
      {afternoonForecast.map((dayForecast, index) => (
        <Card
          key={index}
          date={dayForecast.date}
          minTemperature={getTemperature(dayForecast.temperature.min)}
          maxTemperature={getTemperature(dayForecast.temperature.max)}
          weather={dayForecast.weather}
        />
      ))}
    </section>
  );
};

export default CardWeather;
