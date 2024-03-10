import React, { useContext } from "react";
import Context from "../context/Context";
import { WiHumidity } from "react-icons/wi";
import { GiWindsock } from "react-icons/gi";

const Daily = () => {
  const { currentWeather } = useContext(Context);
  return (
    <>
      {currentWeather.main !== undefined ? (
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{currentWeather.name}</p>
            </div>
            <div className="temperature">
              <p>{currentWeather.main.temp.toFixed()}°C</p>
            </div>
            <div className="description">
              <p>{currentWeather.weather[0].main}</p>
            </div>
          </div>
          <div className="bottom">
            <div className="humidity">
              <WiHumidity />
              <p>{currentWeather.main.humidity} %</p>
            </div>
            <div className="wind">
              <GiWindsock />
              <p>{currentWeather.wind.speed.toFixed()} m/s</p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Daily;
