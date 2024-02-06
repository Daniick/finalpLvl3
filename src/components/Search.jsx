// Search.js
import React, { useState } from "react";
import { useWeather } from "../context/WeatherContext";
import { IconSearch } from "@tabler/icons-react";

const Search = ({ onCitySelect }) => {
  // Recibe onCitySelect como prop
  const { suggestions, fetchCitySuggestions, fetchWeatherDetails } =
    useWeather();
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    fetchCitySuggestions(value);
  };

  const handleSelect = async (city) => {
    await fetchWeatherDetails(city);
    setSearchTerm("");
    onCitySelect(city); // Llama a onCitySelect cuando se selecciona una ciudad
  };

  return (
    <div className="mt-10 ml-5 relative ">
      <IconSearch className="absolute left-3 top-2 text-gray-400" />
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search for cities..."
        className="pl-10 w-[330px] bg-[#1E213A] p-2 text-white border max-sm:w-[270px] "
      />
      <button className="ml-5 bg-blue-600 text-white p-2 px-5">Search</button>
      <ul className="mt-12 text-white">
        {suggestions.map((city) => (
          <li
            className="w-[439px] hover:border h-8 pl-2 cursor-pointer items-center pb-10 pt-5 mt-8 max-sm:w-[380px]"
            key={city.id}
            onClick={() => handleSelect(city)}
          >
            {city.name}, {city.country}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
