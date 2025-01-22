import { useCityProvider } from "../context/CityContext"
import "./dashboard.style.css"
import { useNavigate } from "react-router-dom"
import { APP_ROUTE_PATHS } from "../routes/route-path"
import { useEffect, useState } from "react"


export const Dashboard = () => {
  const navigate = useNavigate()
  const {city, setCity} = useCityProvider()
  const [data, setData] = useState()
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY


  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => setData(data))
  },[city])



  function handleBack() {
    navigate(APP_ROUTE_PATHS.SEARCH)
    setCity("")
  }


  return (
    <>
      <div className="weatherCard">

        {data && (
          <div className="cardWrapper">
          <h2>{data.name}</h2>
          <div className="about">
          <span>Weather:</span>
          <span>{data.weather[0].description}</span>
          </div>
          <div className="about">  
          <span>Humidity:</span>
          <span>{data.main.humidity}%</span>
          </div>
          <div className="about">
          <span>Wind Speed:</span>
          <span>{data.wind.speed}</span>
          </div>
          <div className="about">
          <span>{data.main.temp_min}°F/</span>
          <span>{data.main.temp_max}°F</span>
          </div>
          </div>
        )}

      </div>
      <button className="backBtn" onClick={handleBack}>Back to Search</button>
    </>
  )
}
