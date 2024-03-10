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

  let inputRef = useRef();

  const handleCity = (e) => {
    setGrad(e.target.value);
  };

  useEffect(() => {
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

  const getWeather = (e) => {
    if (e.key === "Enter") {
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${koordinate.lat}&longitude=${koordinate.long}&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min`
      )
        .then((res) => res.json())
        .then((data) => {
          setDaily(data.daily);
          const newData = Array.from({ length: 7 }, (_, i) =>
            data.hourly.temperature_2m.slice(i * 24, (i + 1) * 24)
          );
          setHourly(newData);
          setChart([]);
        })
        .catch((error) => {
          console.log("Error kod dohvaćivanja vremena", error);
        });
      inputRef.current.value = "";
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
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
