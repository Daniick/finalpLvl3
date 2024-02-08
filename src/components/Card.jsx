import React from "react";
import ClearImage from "../assets/Clear.png";
import LightCloudImage from "../assets/LightCloud.png";
import LightRain from "../assets/LightRain.png";
import Snow from "../assets/Snow.png";
import Thunderstorm from "../assets/Thunderstorm.png";
import DefaultImage from "../assets/HeavyCloud.png";
import { useWeather } from "../context/WeatherContext";

const Card = ({ date, minTemperature, maxTemperature, weather }) => {
  const { isCelsius } = useWeather();
  const roundedMinTemp = minTemperature ? Math.round(minTemperature) : 0;
  const roundedMaxTemp = maxTemperature ? Math.round(maxTemperature) : 0;

  const getImagePath = (weatherMain) => {
    switch (weatherMain) {
      case "Clear":
        return ClearImage;
      case "Clouds":
        return LightCloudImage;
      case "Rain":
        return LightRain;
      case "Snow":
        return Snow;
      case "Thunderstorm":
        return Thunderstorm;
      default:
        return DefaultImage;
    }
  };

  const imagePath =
    weather && weather.main ? getImagePath(weather.main) : DefaultImage;

  const getDayOfWeek = (date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      const options = { weekday: "long" };
      return date.toLocaleDateString("en-US", options).slice(0, 3);
    }
  };

  const dayOfWeek = getDayOfWeek(date);

  const getDayOfMonth = (date) => {
    return date.getDate();
  };

  const dayOfMonth = getDayOfMonth(date);

  const getMonth = (date) => {
    const options = { month: "long" };
    return date.toLocaleDateString("en-US", options).slice(0, 3);
  };

  const month = getMonth(date);

  return (
    <div className="mt-10  sm:flex sm:ml-[10px] ">
      <div className="w-[170px] flex flex-col  h-[177px]  bg-[#1E213A]">
        <h5 className="mx-auto mt-1 ">
          {dayOfWeek}/{dayOfMonth}/{month}
        </h5>
        <img
          src={imagePath}
          alt="Weather"
          className="w-24 h-20 mx-auto pr-3 animate-pulse animate-duration-3000"
        />
        <p className="flex justify-between px-8 mt-5 sm:px-4">
          <span>
            {roundedMinTemp}°{isCelsius ? "C" : "F"}{" "}
          </span>
          <span className="text-gray-400">
            {" "}
            {roundedMaxTemp}°{isCelsius ? "C" : "F"}{" "}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Card;
