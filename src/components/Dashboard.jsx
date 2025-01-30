import { useCityProvider } from "../context/CityContext";
import "./dashboard.style.css";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import WeatherStatistic from "./WeatherStatistic";

export const Dashboard = () => {
  const { city } = useCityProvider();
  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const today = new Date();

  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);

  useEffect(() => {
    if (city) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&exclude=current,minutely,daily&appid=${apiKey}`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("City not found or API error");
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          setError(null);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [city]);

  if (error) return <p>{error}</p>;
  if (!data) return <p>Loading...</p>;

  const iconUrl = `http://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}@2x.png`;

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <>
      <div className="weatherCard">
        <div className="leftSide">
          <div className="icon">
            <img src={iconUrl} alt="Weather icon" />
          </div>
          <div className="temp">
            <span>{data.main.temp}°C</span>
            <div>
              {data.main.temp_max}°C / {data.main.temp_min}°C
            </div>
          </div>
          <div className="details">
            <div>Precipitation: 100%</div>
            <div>Humidity: {data.main.humidity} %</div>
            <div>Wind: {data.wind.speed} km/h</div>
          </div>
        </div>
        <div className="rightSide">
          <div className="nameCity">{data.name}</div>
          <div className="currentData">
            {formattedDate}
            <IoIosArrowDown onClick={handleShow} />
          </div>
          <div>{data.weather[0].description}</div>
        </div>
      </div>
      {show && <WeatherStatistic lat={data.coord.lat} lon={data.coord.lon} />}
    </>
  );
};
