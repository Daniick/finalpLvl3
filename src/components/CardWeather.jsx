import React, { useEffect, useState } from "react";
import Card from "./Card";
import { useWeather } from "../context/WeatherContext";

const CardWeather = () => {
  const { forecast } = useWeather();
  const [afternoonForecast, setAfternoonForecast] = useState([]);

  useEffect(() => {
    if (forecast.length > 0) {
      const currentDate = new Date();
      const nextDaysForecast = forecast.filter((dayForecast) => {
        // Comparar con la fecha actual más un día
        const nextDay = new Date(currentDate);
        nextDay.setDate(nextDay.getDate() + 1);
        return (
          dayForecast.date.getDate() >= nextDay.getDate() && // Utiliza ">=" para incluir el día actual
          dayForecast.date.getHours() >= 12 && // A partir de las 12 PM
          dayForecast.date.getHours() <= 15 // Hasta las 3 PM
        );
      });

      // Limitar a los próximos 5 días
      setAfternoonForecast(nextDaysForecast.slice(0, 7));
    }
  }, [forecast]); // Solo actualizar cuando cambie el pronóstico

  return (
    <section className="px-4 lg:px-20 pt-10 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6 max-sm:w-fit ">
      {afternoonForecast.map((dayForecast, index) => (
        <Card
          key={index}
          date={dayForecast.date}
          temperature={dayForecast.temperature}
          weather={dayForecast.weather}
        />
      ))}
    </section>
  );
};

export default CardWeather;
