import { createContext, useState, useEffect, useRef } from "react";

const Context = createContext();

export const WeatherProvider = ({ children }) => {
  const [grad, setGrad] = useState("");
  const [koordinate, setKoordinate] = useState({ lat: 0, long: 0 });
  const [dataLoaded, setDataLoaded] = useState(false);
  const [hourly, setHourly] = useState([]);
  const [daily, setDaily] = useState([]);
  const [chart, setChart] = useState([]);
  const [selectedDate, setSelectedDate] = useState(0);

  const [currentWeather, setCurrentWeather] = useState({});
  const api = {
    key: "030715aa3f60613533c215ff8c44708e",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  let inputRef = useRef();

  const handleCity = (e) => {
    setGrad(e.target.value);
  };

  useEffect(() => {
    if (!grad) return; // Don't proceed if grad is empty
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${grad}`)
      .then((res) => res.json())
      .then((data) => {
        const { latitude, longitude } = data.results[0];
        setKoordinate({ lat: latitude, long: longitude });
      })
      .catch((error) => {
        console.log("Error kod dohvata koordinata", error);
      });
  }, [grad]);

  useEffect(() => {
    if (hourly.length > 0) {
      setChart([...hourly[0]]);
      setDataLoaded(true);
      setSelectedDate(daily.time[0]);
    }
  }, [hourly, daily]);

  const getWeather = (e) => {
    if (e.key === "Enter") {
      const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${koordinate.lat}&longitude=${koordinate.long}&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min`;
      const currentWeatherUrl = `${api.base}weather?q=${grad}&units=metric&APPID=${api.key}`;

      fetch(forecastUrl)
        .then((res) => res.json())
        .then((data) => {
          setDaily(data.daily);
          const newData = Array.from({ length: 5 }, (_, i) =>
            data.hourly.temperature_2m.slice(i * 24, (i + 1) * 24)
          );
          setHourly(newData);
          setChart([]);
        })
        .catch((error) => {
          console.log("Error kod dohvaćivanja vremena", error);
        });

      fetch(currentWeatherUrl)
        .then((res) => res.json())
        .then((data) => setCurrentWeather(data))
        .catch((error) => {
          console.log("Error kod dohvaćivanja dnevne prognoze", error);
        });
      inputRef.current.value = "";

      setDataLoaded(false);
    }
  };

  return (
    <Context.Provider
      value={{
        grad,
        inputRef,
        koordinate,
        handleCity,
        getWeather,
        daily,
        setHourly,
        hourly,
        chart,
        setChart,
        dataLoaded,
        setDataLoaded,
        selectedDate,
        setSelectedDate,
        currentWeather,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
