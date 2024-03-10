import Header from "./components/Header";
import HourlyData from "./components/HourlyData";
import ListaKartica from "./components/ListaKartica";
import { WeatherProvider } from "./context/Context";

const App = () => {
  return (
    <WeatherProvider>
      <Header />
      <ListaKartica />
      <HourlyData />
    </WeatherProvider>
  );
};

export default App;
