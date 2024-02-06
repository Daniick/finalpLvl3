import React, { createContext, useContext, useState } from "react";

const WeatherContext = createContext();

export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider = ({ children }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [forecast, setForecast] = useState([]);

  const fetchCitySuggestions = async (searchTerm) => {
    try {
      const apiKey = "59459b057f725229a7b8409b77108a00";
      const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=5&appid=${apiKey}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data);
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

  const fetchWeatherDetails = async (city) => {
    try {
      const apiKey = "59459b057f725229a7b8409b77108a00";
      const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.name},${city.country}&appid=${apiKey}&units=metric`;
      const weatherResponse = await fetch(weatherApiUrl);
      const weatherData = await weatherResponse.json();
      console.log(weatherData);

      const cityWithWeather = {
        id: city.id,
        name: city.name,
        country: city.country,
        temperature: weatherData.main.temp,
        weatherMain: weatherData.weather[0].main,
        windStatus: weatherData.wind.speed,
        humidity: weatherData.main.humidity,
        visibility: weatherData.visibility,
        airPressure: weatherData.main.pressure,
      };
      setSelectedCity(cityWithWeather);

      fetchWeatherForecast(city);
    } catch (error) {
      console.error("Error fetching city details:", error);
    }
  };

  const fetchWeatherForecast = async (city) => {
    try {
      const apiKey = "59459b057f725229a7b8409b77108a00";
      const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city.name},${city.country}&appid=${apiKey}&units=metric`;
      const forecastResponse = await fetch(forecastApiUrl);
      const forecastData = await forecastResponse.json();

      const nextDaysForecast = forecastData.list.map((item) => ({
        date: new Date(item.dt * 1000),
        temperature: {
          min: item.main.temp_min,
          max: item.main.temp_max,
        },
        weather: {
          main: item.weather[0].main,
          description: item.weather[0].description,
        },
      }));
      setForecast(nextDaysForecast);
    } catch (error) {
      console.error("Error fetching weather forecast:", error);
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        suggestions,
        fetchCitySuggestions,
        selectedCity,
        fetchWeatherDetails,
        forecast,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
