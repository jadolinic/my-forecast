import WeatherKartica from "./WeatherKartica";
import { useContext } from "react";
import Context from "../context/Context";

const ListaKartica = () => {
  const { daily } = useContext(Context);
  return (
    <div className="weather-list">
      {daily.time &&
        daily.time.length > 0 &&
        daily.time.map((_, index) => (
          <WeatherKartica key={index} index={index} />
        ))}
    </div>
  );
};

export default ListaKartica;
