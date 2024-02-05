import React, { useState, useEffect } from "react";

const Search = ({ onCitySelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const apiKey = "59459b057f725229a7b8409b77108a00";
        const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=5&appid=${apiKey}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        const cities = data.map((city) => ({
          id: city.id,
          name: city.name,
          country: city.country,
        }));

        setSuggestions(cities);
      } catch (error) {
        console.error("Error fetching city suggestions:", error);
        setSuggestions([]);
      }
    };

    if (searchTerm.length > 0) {
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleSelect = (city) => {
    onCitySelect(city);
    setSearchTerm("");
    setSuggestions([]);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for cities..."
      />
      <ul>
        {suggestions.map((city) => (
          <li key={city.id} onClick={() => handleSelect(city)}>
            {city.name}, {city.country}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
