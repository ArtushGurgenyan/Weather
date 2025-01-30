import { useEffect, useState } from "react";
import { useCityProvider } from "../context/CityContext";
import "./weather.statistic.style.css";
import axios from "axios";
import WeatherChart from "./Line";

const WeatherStatistic = ({ lat, lon }) => {
  const [currentData, setCurrentData] = useState(null);
  const { city } = useCityProvider();
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    const weatherData = async () => {
      if (city) {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=7&units=metric&appid=${apiKey}`
          );
          setCurrentData(response.data);
          setError(null);
        } catch (error) {
          setError(error.message);
        }
      }
    };

    weatherData();
  }, [city]);

  if (!currentData) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="weatherStat">
        <WeatherChart data={currentData} />
        <div className="weath">
          {currentData.list.map((elem, index) => {
            const iconUrl = `http://openweathermap.org/img/wn/${elem?.weather?.[0]?.icon}@2x.png`;

            return (
              <div className="card" key={index}>
                <div>{elem.dt_txt.slice(10, elem.dt_txt.length - 3)}</div>
                <img className="icons" src={iconUrl} alt="" />
                <div>
                  <span className="max_temp">{elem.main.temp_max}°</span>{" "}
                  {elem.main.temp_min}°
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default WeatherStatistic;
