import React from "react";
import { useWeather } from "../context/WeatherContext";
import {
  IconArrowDownLeft,
  IconArrowDownRight,
  IconArrowNarrowDown,
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconArrowNarrowUp,
  IconArrowUpLeft,
} from "@tabler/icons-react";
import { IconArrowUpRight } from "@tabler/icons-react";

const HighLights = () => {
  const { selectedCity } = useWeather();

  // Función para obtener la dirección del viento como una flecha
  const getWindDirectionArrow = (degrees) => {
    const directions = [
      <IconArrowNarrowUp />,
      <IconArrowUpRight />,
      <IconArrowNarrowRight />,
      <IconArrowDownRight />,
      <IconArrowNarrowDown />,
      <IconArrowDownLeft />,
      <IconArrowNarrowLeft />,
      <IconArrowUpLeft />,
    ];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  };

  return (
    <section className="text-center grid grid-cols-1  mt-10  sm:ml-[70px] sm:grid-cols-2 sm:mr-[35px] ">
      <div className="w-[370px] max-sm:w-[400px] h-[204px] m-6 max-sm:mx-auto bg-[#1E213A]">
        <h5 className="align-top">Wind Status</h5>
        <h1 className="mb-3 mt-5 text-[30px]">
          <span className="text-[38px] font-bold">
            {selectedCity ? selectedCity.windStatus.speed || "-" : "-"}
          </span>{" "}
          mph
        </h1>
        <p className=" flex  justify-center ">
          <span className="border border-gray-600 rounded-xl bg-gray-600 ">
            {selectedCity
              ? getWindDirectionArrow(selectedCity.windStatus.deg)
              : "-"}{" "}
          </span>
          &nbsp; &nbsp; WSW
        </p>
      </div>
      <div className="w-[405px] max-sm:w-[400px] h-[204px] m-6 max-sm:mx-auto bg-[#1E213A] relative">
        <h5 className="align-top">Humidity</h5>
        <h1 className="mb-3 mt-5 text-[30px]">
          <span className="text-[38px] font-bold">
            {selectedCity ? selectedCity.humidity || "-" : "-"}
          </span>
          %
        </h1>
        <div className="flex justify-around text-white text-xs">
          <span className="ml-[70px]">0</span>
          <span>50</span>
          <span className="mr-[70px]">100</span>
        </div>
        <div className="flex justify-center w-[200px] max-sm:w-[160px] h-2 mt-1 ml-[100px] relative">
          <div className="absolute inset-0 bg-white rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-yellow-400"
              style={{
                width: `${selectedCity ? selectedCity.humidity || 0 : 0}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="w-[370px] h-[159px] max-sm:w-[400px] max-sm:mx-auto m-6 bg-[#1E213A] ">
        <h5 className="align-top">Visibility</h5>
        <h1 className="mb-3 mt-5 text-[30px]">
          <span className="text-[38px] font-bold">
            {selectedCity ? selectedCity.visibility || "-" : "-"}
          </span>{" "}
          miles
        </h1>
      </div>
      <div className="w-[405px] h-[159px] max-sm:w-[400px] max-sm:mx-auto m-6 bg-[#1E213A]">
        <h5 className="align-top">Air Pressure</h5>
        <h1 className="mb-3 mt-5 text-[30px]">
          <span className="text-[38px] font-bold">
            {selectedCity ? selectedCity.airPressure || "-" : "-"}
          </span>{" "}
          mb
        </h1>
      </div>
    </section>
  );
};

export default HighLights;
