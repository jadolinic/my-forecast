import WeatherKartica from "./WeatherKartica";
import { useContext } from "react";
import Context from "../context/Context";

const ListaKartica = () => {
  const { daily } = useContext(Context);

  if (!daily || !daily.time || daily.time.length === 0) {
    return null; // Return null or any other fallback UI if necessary
  }

  const firstFiveCards = daily.time.slice(0, 5);
  return (
    <div className="weather-list">
      {daily.time &&
        daily.time.length > 0 &&
        firstFiveCards.map((_, index) => (
          <WeatherKartica key={index} index={index} />
        ))}
    </div>
  );
};

export default ListaKartica;
