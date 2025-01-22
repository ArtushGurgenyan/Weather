import { createContext, useContext, useEffect, useState } from 'react'


export const CityContext =  createContext({
  city: "", 
  setCity: () => {}
})

export const CityProvider = ({children}) => {
  
    const savedCity = localStorage.getItem("city") || "Yerevan";
    const [city, setCity] = useState(savedCity);
  
    useEffect(() => {
      if (city) {
        localStorage.setItem("city", city);
      }
    }, [city]);
  

    return (
   <CityContext.Provider value={{city, setCity}}>
   {children}
   </CityContext.Provider>
  )
}

export const useCityProvider = () => {
    return useContext(CityContext);
};