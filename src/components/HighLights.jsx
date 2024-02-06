import React from "react";
import { useWeather } from "../context/WeatherContext";

const HighLights = () => {
  const { selectedCity } = useWeather();

  return (
    <section className="text-center grid grid-cols-1  mt-10  max-sm:grid-cols-1 sm:ml-[70px] sm:grid-cols-2 sm:mr-[110px]">
      {/* Wind Status */}
      <div className="w-[370px] max-sm:w-[328px] h-[204px] m-6  bg-[#1E213A]">
        <h5 className="align-top">Wind Status</h5>
        <h1 className="mb-3 mt-5 text-[30px]">
          <span className="text-[38px] font-bold">
            {selectedCity ? selectedCity.windStatus || "-" : "-"}
          </span>{" "}
          mph
        </h1>
        <p className="align-">wsw</p>
      </div>

      {/* Humidity */}
      <div className="w-[405px] max-sm:w-[328px] h-[204px] m-6 bg-[#1E213A] relative">
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

      {/* Visibility */}
      <div className="w-[370px] h-[159px] max-sm:w-[328px] m-6 bg-[#1E213A] ">
        <h5 className="align-top">Visibility</h5>
        <h1 className="mb-3 mt-5 text-[30px]">
          <span className="text-[38px] font-bold">
            {selectedCity ? selectedCity.visibility || "-" : "-"}
          </span>{" "}
          miles
        </h1>
      </div>

      {/* Air Pressure */}
      <div className="w-[405px] h-[159px] max-sm:w-[328px] m-6 bg-[#1E213A]">
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
