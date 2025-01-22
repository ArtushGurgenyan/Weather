import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { APP_ROUTE_PATHS } from "./route-path"
import { Search } from "../components/Search";
import { Dashboard } from "../components/Dashboard"
import { Navigate } from "react-router-dom";


export const router = createBrowserRouter([
    {
        element: <App/>
    },
    {
        path: APP_ROUTE_PATHS.SEARCH,
        element: <Search/>
    },
    {
        path: APP_ROUTE_PATHS.DASHBOARD,
        element: <Dashboard/>
    },
    {
        path: "*",
        element: <Navigate to={APP_ROUTE_PATHS.SEARCH} replace />,
    }
])