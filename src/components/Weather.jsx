import React, { useEffect, useState } from "react";

import API from "./APIKey.json";

// https://api.weatherapi.com/v1/current.json?key=7698d519b74f4007b1562808250103&q=XYZ

const Weather = () => {
  const [inputVal, setInputVal] = useState("");
  const [callApi, setCallApi] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTemp = async (cityName) => {
    try {
      const data = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API.Key}&q=${cityName}`
      );

      const jsData = await data.json();
      if (jsData.error) {
        if (jsData.error.code == 1003) {
          alert("City parameter is missing");
        } else {
          alert("Failed to fetch weather data");
        }
        setLoading(false);
        setWeatherData(null);
        return;
      }
      setLoading(false);
      setWeatherData(jsData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!callApi) {
      return;
    }
    setLoading(true);
    fetchTemp(inputVal);
    setCallApi(false);
  }, [callApi]);

  return (
    <div className="container">
      <div className="search_container">
        <input
          type="text"
          placeholder="Enter city name"
          value={inputVal}
          required
          onChange={(e) => setInputVal(e.target.value)}
        />
        <button onClick={() => setCallApi(true)}>Search</button>
      </div>
      {loading && <p>Loading data...</p>}
      {weatherData && (
        <div className="weather-cards">
          <div className="weather-card">
            <h2>Temperature</h2>
            <span>{weatherData?.current["temp_c"]}&deg;C</span>
          </div>
          <div className="weather-card">
            <h2>Humidity</h2>
            <span>{weatherData?.current["humidity"]}%</span>
          </div>
          <div className="weather-card">
            <h2>Condition</h2>
            <span>{weatherData?.current?.condition["text"]}</span>
          </div>
          <div className="weather-card">
            <h2>Wind Speed</h2>
            <span>{weatherData?.current["wind_kph"]} kph</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
