import React from "react";
import CardWeather from "./CardWeather";
import HighLights from "./HighLights";

const DaysWeather = () => {
  return (
    <section className="bg-[#100E1D] w-full h-full text-white  sm:h-screen  sm:px-[200px] z-10 max-sm:h-full max-sm:w-full ">
      <div className={` justify-end mr-[80px] sm:flex hidden `}>
        <button className=" bg-[#6E707A] ml-4 mt-6 text-white  py-3 px-4 rounded-full">
          °C
        </button>
        <button className=" bg-[#6E707A] ml-4 mt-6 text-white  py-3 px-4 rounded-full">
          °F
        </button>
      </div>
      <div className="max-sm:justify-center">
        <CardWeather />
      </div>
      <h1 className="text-[24px]  ml-4 mt-5 sm:ml-[90px]">
        Today's Highlights
      </h1>
      <div>
        <HighLights />
      </div>
    </section>
  );
};

export default DaysWeather;
