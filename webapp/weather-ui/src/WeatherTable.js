// Reviewd By Rotem and Daniel

import React from 'react';
import './App.css';

const TableComponent = ({ data }) => {
  if (!data || data.length === 0) {
    return <div class="default">Please enter a location</div>;
  }

  if (data === "blink") {
    return <div class="blink">Please enter a location</div>;
  }

  const weatherData = data[0];
  if (!weatherData.days_day || !weatherData.days_night) {
    return <div>Weather data is incomplete</div>;
  }

  // Limit the number of days to 7
  const maxDays = 7;
  const daysToShow = Math.min(weatherData.days_day.length, maxDays);

  const headers = ['Day', 'Day Temperature (°C)', 'Night Temperature (°C)', 'Humidity(%)'];
  const rows = weatherData.days_day.slice(0, daysToShow).map((dayTemp, index) => ({
    day: index + 1,
    dayTemp,
    nightTemp: weatherData.days_night[index],
    humidty: weatherData.humidity[index]
  }));

  return (
    <table>
      <thead>
        <tr>
          {headers.map(header => <th key={header}>{header}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <td>Day {row.day}</td>
            <td>{row.dayTemp}°C</td>
            <td>{row.nightTemp}°C</td>
            <td>{row.humidty}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
