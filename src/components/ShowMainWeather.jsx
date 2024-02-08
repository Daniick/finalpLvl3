import Search from "./Search";
import React, { useEffect, useState } from "react";
import { useWeather } from "../context/WeatherContext";
import {
  IconCurrentLocation,
  IconMapPinFilled,
  IconX,
} from "@tabler/icons-react";
import ClearImage from "../assets/Clear.png";
import LightCloudImage from "../assets/LightCloud.png";
import LightRain from "../assets/LightRain.png";
import Snow from "../assets/Snow.png";
import Thunderstorm from "../assets/Thunderstorm.png";
import DefaultImage from "../assets/HeavyCloud.png";
import "./ShowMainWeather.css";

const ShowMainWeather = () => {
  const { fetchWeatherDetails, selectedCity } = useWeather();
  const [isModalOpen, setModalOpen] = useState(false);
  const [displayedCity, setDisplayedCity] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);

  useEffect(() => {
    setDisplayedCity(selectedCity);
  }, [selectedCity]);

  useEffect(() => {
    const getCurrentDate = () => {
      const date = new Date();
      const options = {
        weekday: "short",
        day: "numeric",
        month: "short",
      };
      const [weekday, day, month] = date
        .toLocaleDateString("en-US", options)
        .split(" ");
      return `${weekday}  ${month} ${day}`;
    };
    setCurrentDate(getCurrentDate());
  }, []);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleCitySelect = (city) => {
    fetchWeatherDetails(city);
    setModalOpen(false);
  };

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

  const imagePath = displayedCity
    ? getImagePath(displayedCity.weatherMain)
    : DefaultImage;

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <section className="w-full min-h-screen bg-[#1E213A] sm:min-h-auto sm:max-w-screen-md md:max-w-screen-lg lg:max-w-[550px]  mx-auto relative overflow-hidden">
      <div className="flex sm:flex justify-between items-center p-4 max-lg:w-auto">
        <button
          className="bg-[#6E707A] sm:ml-12 text-white py-2 px-4 shadow-md shadow-black text-sm sm:text-base max-lg:w-50"
          onClick={openModal}
        >
          Search for places
        </button>
        <button
          className="bg-[#6E707A] text-white py-2 px-2 shadow-2xl shadow-md shadow-black rounded-full sm:mr-10"
          onClick={handleRefresh}
        >
          <IconCurrentLocation />
        </button>
      </div>
      {displayedCity && !isModalOpen ? (
        <div className="flex flex-col items-center mt-8 sm:mt-16">
          <div className=" top-10 sm:w-[450px] sm:h-[300px] align-top back grande"></div>
          <img
            src={imagePath}
            className="max-sm:w-[230px] animate-bounce animate-duration-[3500ms] max-lg:w-[140px]"
            alt=""
          />

          <h1 className="text-[200px] text-[#E7E7EB] mt-[40px] sm:text-[140px] lg:text-[140px] xl:text-[200px]">
            {displayedCity.temperature}
            <span className="text-[50px]">°C</span>
          </h1>
          <h1 className="text-[50px] text-[#A09FB1] mt-[10px] font-medium">
            {displayedCity.weatherMain}
          </h1>
          <h1 className="text-[18px] text-[#A09FB1] mt-[5px] flex">
            Today &nbsp;&nbsp;&nbsp; · &nbsp;&nbsp;&nbsp;{currentDate}
          </h1>
          <h1 className="text-[20px] text-[#A09FB1] mt-[5px] flex">
            <IconMapPinFilled />
            &nbsp;&nbsp;{displayedCity.name}, {displayedCity.country}
          </h1>
        </div>
      ) : (
        <div className="flex flex-col items-center mt-8 sm:mt-16">
          <div className="back sm:w-[450px] sm:h-[300px] grande"></div>
          <img src={imagePath} className="w-[230px]" alt="" />
          <h1 className="text-[24px] text-gray-500 mt-4">no city selected</h1>
          <h1 className="text-[100px] text-[#E7E7EB] mt-[120px]">15°C</h1>
          <h1 className="text-[50px] text-[#A09FB1] mt-[50px]">shower</h1>
          <h1 className="text-[18px] text-[#A09FB1] mt-[30px] flex">
            {currentDate}
          </h1>
          <h1 className="text-[20px] text-[#A09FB1] mt-[30px] flex">
            <IconMapPinFilled />
            &nbsp;&nbsp;Lugar
          </h1>
        </div>
      )}
      {isModalOpen && (
        <div className="absolute inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute inset-0">
            <div className="bg-[#1E213A] w-full sm:w-[600px] h-full p-4  justify-center">
              <button
                className="absolute top-0 right-0 m-4 text-gray-500 "
                onClick={closeModal}
              >
                <IconX color="white" stroke={3} />
              </button>
              <Search onCitySelect={handleCitySelect} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ShowMainWeather;
