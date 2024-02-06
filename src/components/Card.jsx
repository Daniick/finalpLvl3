import React from "react";

const Card = ({ date, temperature, weather }) => {
  return (
    <div className="mt-10 sm:flex sm:ml-[10px]">
      <div className="w-[170px]  h-[177px] m-auto m bg-[#1E213A]">
        <h5>{date.toLocaleDateString()}</h5>{" "}
        <p>
          Temperature: {temperature.min}°C - {temperature.max}°C
        </p>{" "}
        <p>
          Weather: {weather.main} - {weather.description}
        </p>{" "}
      </div>
    </div>
  );
};

export default Card;
