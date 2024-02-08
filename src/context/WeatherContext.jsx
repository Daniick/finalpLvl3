import React, { createContext, useContext, useEffect, useState } from "react";

const WeatherContext = createContext();

export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider = ({ children }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true);

  useEffect(() => {
    const getLocationAndFetchWeather = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const { latitude, longitude } = position.coords;
        fetchCityByCoordinates(latitude, longitude);
      } catch (error) {
        console.error("Error getting geolocation:", error);
      }
    };

    getLocationAndFetchWeather();
  }, []);

  const fetchCityByCoordinates = async (latitude, longitude) => {
    try {
      const apiKey = "59459b057f725229a7b8409b77108a00";
      const apiUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.length > 0) {
        const city = {
          id: data[0].id,
          name: data[0].name,
          country: data[0].country,
        };
        fetchWeatherDetails(city);
      } else {
        console.error("No city found for the provided coordinates");
      }
    } catch (error) {
      console.error("Error fetching city by coordinates:", error);
    }
  };

  const fetchCitySuggestions = async (searchTerm) => {
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

  const fetchWeatherDetails = async (city) => {
    try {
      const apiKey = "59459b057f725229a7b8409b77108a00";
      const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.name},${city.country}&appid=${apiKey}&units=metric`;
      const weatherResponse = await fetch(weatherApiUrl);
      const weatherData = await weatherResponse.json();

      const cityWithWeather = {
        id: city.id,
        name: city.name,
        country: city.country,
        temperature: Math.round(weatherData.main.temp),
        weatherMain: weatherData.weather[0].main,
        windStatus: {
          speed: weatherData.wind.speed,
          deg: weatherData.wind.deg,
        },
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
      console.log(forecastData);
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

  const celsiusToFahrenheit = (celsius) => {
    return Math.round((celsius * 9) / 5 + 32);
  };

  const fahrenheitToCelsius = (fahrenheit) => {
    return Math.round(((fahrenheit - 32) * 5) / 9);
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius((prev) => !prev);
  };

  const getTemperature = (celsiusTemp) => {
    return isCelsius ? celsiusTemp : celsiusToFahrenheit(celsiusTemp);
  };

  return (
    <WeatherContext.Provider
      value={{
        suggestions,
        fetchCitySuggestions,
        selectedCity,
        fetchWeatherDetails,
        forecast,
        isCelsius,
        toggleTemperatureUnit,
        getTemperature,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
