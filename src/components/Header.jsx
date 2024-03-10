import { useContext } from "react";
import Context from "../context/Context";

const Header = () => {
  const { inputRef, handleCity, getWeather, grad } = useContext(Context);

  return (
    <div className="input">
      <input
        type="text"
        ref={inputRef}
        onChange={handleCity}
        placeholder="Pretraži grad"
        onKeyDown={getWeather}
      />
      <h1>{grad}</h1>
    </div>
  );
};

export default Header;
