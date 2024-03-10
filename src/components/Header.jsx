import { useContext } from "react";
import Context from "../context/Context";

const Header = () => {
  const { inputRef, handleCity, getWeather } = useContext(Context);

  return (
    <div className="input">
      <h1>My Weather</h1>
      <input
        type="text"
        ref={inputRef}
        onChange={handleCity}
        placeholder="Pretraži grad"
        onKeyDown={getWeather}
      />
    </div>
  );
};

export default Header;
