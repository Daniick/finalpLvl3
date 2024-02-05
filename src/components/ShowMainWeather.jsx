import React, { useState } from "react";
import {
  IconCurrentLocation,
  IconMapPinFilled,
  IconX,
} from "@tabler/icons-react";
import imagen from "../assets/LightCloud.png";
import "./ShowMainWeather.css";
import Search from "./Search";

const ShowMainWeather = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    closeModal();
  };

  return (
    <section className="w-full h-screen bg-[#1E213A] sm:w-[600px] sm:h-screen relative">
      <div className="flex justify-between sm:hidden">
        <button
          className="bg-[#6E707A] ml-4 mt-4 text-white p-3"
          onClick={openModal}
        >
          Search for places
        </button>
        <button className="bg-[#6E707A] mr-5 mt-4 text-white py-3 px-3 rounded-full">
          <IconCurrentLocation />
        </button>
      </div>
      <div className="hidden sm:flex justify-between">
        <button
          className="bg-[#6E707A] ml-4 mt-4 text-white p-3"
          onClick={openModal}
        >
          Search for places
        </button>
        <button className="bg-[#6E707A] mr-5 mt-4 text-white py-3 px-3 rounded-full">
          <IconCurrentLocation />
        </button>
      </div>
      {selectedCity ? (
        <div className="flex flex-col items-center mt-16">
          <div className="back sm:w-[450px] sm:h-[300px] grande"></div>
          <img src={imagen} className="w-[230px]" alt="" />
          <h1 className="text-[24px] text-[#E7E7EB] mt-4">
            {selectedCity.name}, {selectedCity.country}
          </h1>
          <h1 className="text-[100px] text-[#E7E7EB] mt-[120px]">
            {selectedCity.temperature}°C
          </h1>
          <h1 className="text-[50px] text-[#A09FB1] mt-[10px]"></h1>
          <h1 className="text-[18px] text-[#A09FB1] mt-[5px] flex">
            Today &nbsp;&nbsp;&nbsp;&nbsp; · &nbsp;&nbsp;&nbsp;&nbsp; fecha
          </h1>
          <h1 className="text-[20px] text-[#A09FB1] mt-[5px] flex">
            <IconMapPinFilled />
            &nbsp;&nbsp;{selectedCity.name}, {selectedCity.country}
          </h1>
        </div>
      ) : (
        <div className="flex flex-col items-center mt-16">
          <div className="back sm:w-[450px] sm:h-[300px] grande"></div>
          <img src={imagen} className="w-[230px]" alt="" />
          <h1 className="text-[24px] text-[#E7E7EB] mt-4">no city selected</h1>
          <h1 className="text-[100px] text-[#E7E7EB] mt-[120px]">15°C</h1>
          <h1 className="text-[50px] text-[#A09FB1] mt-[50px]">shower</h1>
          <h1 className="text-[18px] text-[#A09FB1] mt-[30px] flex">
            Today &nbsp;&nbsp;&nbsp;&nbsp; · &nbsp;&nbsp;&nbsp;&nbsp; fecha
          </h1>
          <h1 className="text-[20px] text-[#A09FB1] mt-[30px] flex">
            <IconMapPinFilled />
            &nbsp;&nbsp;Lugar
          </h1>
        </div>
      )}
      {isModalOpen && (
        <div className="absolute inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed inset-0">
            <div className="bg-[#1E213A] w-full sm:w-[526px] h-full p-4  sm:translate-x-0 transition-transform ease-out duration-300">
              <Search onCitySelect={handleCitySelect} />
              <button
                className="absolute top-0 right-0 m-4 text-gray-500"
                onClick={closeModal}
              >
                <IconX color="white" stroke={3} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ShowMainWeather;
