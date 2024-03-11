import { useContext } from "react";
import Context from "../context/Context";

const WeatherKartica = ({ index }) => {
  const { daily, setChart, hourly, setSelectedDate, setDataLoaded } =
    useContext(Context);

  if (
    !daily ||
    !daily.weather_code ||
    !daily.time ||
    !daily.temperature_2m_max ||
    !daily.temperature_2m_min
  ) {
    return null; // Return null if daily data is not available
  }

  const handleChartData = () => {
    setChart([...hourly[index]]);
    setDataLoaded(true);
    setSelectedDate(daily.time[index]);
  };

  // Function to get the first three letters of the day
  const getShortDayName = (dateString) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const date = new Date(dateString);
    const dayIndex = date.getDay();
    return days[dayIndex];
  };

  const WeatherCodeLibrary = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly Cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Drizzle: Light",
    53: "Drizzle: Moderate",
    55: "Drizzel: dense ",
    56: "Freezing drizzle: light",
    57: "Freezing drizzle: dense",
    61: "Rain: slight",
    63: "Rain: moderate",
    65: "Rain: heavy",
    66: "Freezing rain: light",
    67: "Freezing rain: heavy",
    71: "Snow fall: slight",
    73: "Snow fall: moderate",
    75: "Snow fall: heavy",
    77: "Snow grains",
    80: "Rain showers: slight",
    81: "Rain showers: moderate",
    82: "Rain showers: violent",
    85: "Snow showers: slight",
    86: "Snow showers: heavy",
    95: "Thunderstorm: slight or moderate",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
  };

  const description = WeatherCodeLibrary[daily.weather_code[index]];

  return (
    <div className="weather-card" onClick={handleChartData}>
      <p className="day">{getShortDayName(daily.time[index])}</p>
      <p className="time">{daily.time[index].split("-").reverse().join(".")}</p>
      <p className="forecast">{description}</p>
      <p className="temp">
        {daily.temperature_2m_min[index].toFixed()}°c /{" "}
        {daily.temperature_2m_max[index].toFixed()}°c
      </p>
    </div>
  );
};

export default WeatherKartica;
