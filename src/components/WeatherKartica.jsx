import { useContext } from "react";
import Context from "../context/Context";

const WeatherKartica = ({ index }) => {
  const { daily, setChart, hourly, setSelectedDate, setDataLoaded } =
    useContext(Context);

  const handleChartData = () => {
    setChart([...hourly[index]]); //Prosljeđujemo u chart varijablu 24 elemenata iz hourly vezanu po indeksu jer hourly sadrzi 7 nizova unutar kojih imamo 24 elemenata
    setDataLoaded(true); // postavljamo na true jer početno stanje false da se ne loada HighChart prilikom stranice
    setSelectedDate(daily.time[index]); // u varijablu selectedDate spremamo datum za usporedbu i iscrtavanje crvene linije u budućnosti
  };

  return (
    <div className="weather-card" onClick={handleChartData}>
      <h1>{daily.time[index].split("-").reverse().join(".")}</h1>
      <h3>Max: {daily.temperature_2m_max[index]}°C</h3>
      <h3>Min: {daily.temperature_2m_min[index]}°C</h3>
    </div>
  );
};

export default WeatherKartica;
