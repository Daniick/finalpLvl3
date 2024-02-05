import DaysWeather from "./components/DaysWeather";
import ShowMainWeather from "./components/ShowMainWeather";

function App() {
  return (
    <section className="sm:flex ">
      <ShowMainWeather />

      <DaysWeather />
    </section>
  );
}

export default App;
