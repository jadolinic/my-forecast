import { useContext } from "react";
import Context from "../context/Context";

const WeatherKartica = ({ index }) => {
  const { daily, setChart, hourly, setSelectedDate, setDataLoaded } =
    useContext(Context);

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

  return (
    <div className="weather-card" onClick={handleChartData}>
      <p className="temp">{daily.temperature_2m_max[index]}°C</p>
      <p className="day">{getShortDayName(daily.time[index])}</p>
      <p className="temp">{daily.temperature_2m_min[index]}°C</p>
    </div>
  );
};

export default WeatherKartica;
