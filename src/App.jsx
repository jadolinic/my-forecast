import Header from "./components/Header";
import Daily from "./components/Daily";
import HourlyData from "./components/HourlyData";
import ListaKartica from "./components/ListaKartica";
import { WeatherProvider } from "./context/Context";

const App = () => {
  return (
    <div className="App">
      <WeatherProvider>
        <Header />
        <Daily />
        <ListaKartica />
        <HourlyData />
      </WeatherProvider>
    </div>
  );
};

export default App;
