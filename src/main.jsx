import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { router } from "./routes/router-config.jsx";
import { CityProvider } from './context/CityContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CityProvider>
    <RouterProvider router={router}>
    <App />
    </RouterProvider>
    </CityProvider>
  </StrictMode>,
)
