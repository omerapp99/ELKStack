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
    let formData = new FormData();
    formData.append("city", query);

    fetch(`api/`, { method: 'post', body: formData })
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

  const handleStoreWeather = () => {
    if (!dailyWeather) return; // Ensure there's data to store

    // Create a payload to store in DynamoDB
    const weatherData = {
      city: city_name,
      country: country_name,
      dailyWeather: dailyWeather, // You might want to adjust this structure based on your needs
      timestamp: new Date().toISOString() // Optional: add a timestamp
    };

    fetch('store-weather/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(weatherData),
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message || 'Weather data stored successfully!');
    })
    .catch(error => {
      console.error('Error storing weather data:', error);
      alert('Failed to store weather data.');
    });
  };

  useEffect(() => {
    document.title = 'Weather Checker Web';
  }, []);

  const handleDownloadImage = () => {
    fetch('https://omerapp99bucket.s3.eu-north-1.amazonaws.com/sky.jpg')
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sky.jpg'; 
        a.click();
        URL.revokeObjectURL(url);
      })
      .catch(error => console.error('Error downloading image:', error));
  };

  return (
    <div className="App">
      <header style={{ backgroundImage: `url(${background})` }} className="App-header">
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
          <button onClick={handleDownloadImage}>
            Download Image
          </button>
          <button onClick={handleStoreWeather}>
            Store Weather Data
          </button>
          <TableComponent data={dailyWeather} />
        </div>
      </header>
    </div>
  );
}

export default App;
