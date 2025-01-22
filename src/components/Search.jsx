import "./search.style.css"
import { useNavigate } from "react-router-dom"
import { APP_ROUTE_PATHS } from "../routes/route-path"
import { useCityProvider } from "../context/CityContext"

export const Search = () => {

  const { city, setCity } = useCityProvider()
  const navigate = useNavigate()

  

  function handleSubmit() {
    if(city) {
      navigate(APP_ROUTE_PATHS.DASHBOARD)
    }
  }


  return (
    <>
    <div className="container">
        <h1 className="searchTitle">Search City Weather</h1>
        <input value={city} onChange={(e) => setCity(e.target.value)} type="text" />
        <button className="searchBtn" onClick={handleSubmit}>Search</button>
    </div>
    </>
  ) 
}
