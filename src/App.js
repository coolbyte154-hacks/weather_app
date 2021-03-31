import React, { useState } from "react";
import "./App.css";
import Form from "./Form";
import Weather from "./Weather";

function App() {
  //set up state and api key
  const [weather, setWeather] = useState([]);
  //this api key has been changed - in order to protect it
  const APIKEY = "b9b5c37e19cdd7ac09cfa9355";
  // async function fetch set state to api call and organize data

  async function fetchData(e) {
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    e.preventDefault();
    const apiData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&APPID=${APIKEY}`
    )
      .then((res) => res.json())
      .then((data) => data);
    if (city && country) {
      //error handling for input city and country
      setWeather({
        data: apiData,
        city: apiData.city,
        country: apiData.sys.country,
        description: apiData.weather[0].description,
        temperature: apiData.main.temp,
        feels_like: apiData.main.feels_like,
        error: "",
      });
    } else {
      setWeather({
        data: "",
        city: "",
        country: "",
        description: "",
        temperature: "",
        error: "Please Type A City And Country",
      });
    }
  }

  return (
    //send props to form and weather and console weather data
    <div className="App">
      <h3>WEATHER APP</h3>
      <Form getWeather={fetchData} />
      <Weather
        city={weather.city}
        country={weather.country}
        description={weather.description}
        temperature={weather.temperature}
        feel_temperature={weather.feels_like}
        error={weather.error}
      />
      {console.log(weather.data)}
    </div>
  );
}

export default App;
