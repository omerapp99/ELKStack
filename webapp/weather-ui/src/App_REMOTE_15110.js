// Reviewd By Rotem and Daniel

import React, { useEffect, useState } from "react";
import './App.css';
import TableComponent from './WeatherTable';
import background from "./background.jpg";


function App() {
  const [dailyWeather, setDailyWeather] = useState(null);
  const [query, setquery] = useState("");
  const [city_name, setcity] = useState();
  const [country_name, setcountry] = useState();

  function getData(query) {

    let formData = new FormData() //Create bodyform for the POST 
    formData.append("city", query) //Append it into the POST form

    fetch(`api/`, {method: 'post', body: formData}) // Send POST request to the flask server
      .then(response => response.json())
      .then(json => {
        setDailyWeather(json);
        setcity(json[0].address);
        setcountry(json[0].country);  
      })
      .catch(error => {
        setDailyWeather("blink");
        setcity("");
        setcountry("");
      });
  };

  useEffect(() => {
    document.title = 'Weather Checker';
  }, []);

  return (
    <div className="App">
      <header style={{ backgroundImage: `url(${background})` }} class123Name="App-header">
        <div className="input-group">
          <p>City: {city_name}</p>
          <p>Country: {country_name}</p>
          <input
            onChange={(newValue) => setquery(newValue.target.value)}
            type="text"
            id="name"
            placeholder="Enter city name"
          />
          <button onClick={() => getData(query)}>
            Search
          </button>
          <TableComponent data={dailyWeather} />
        </div>
      </header>
    </div>
  );
}

export default App;
