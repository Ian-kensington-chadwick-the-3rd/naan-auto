import  ReactDOM  from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './app.css';
import App from './app.jsx';
import Home from './pages/Home.jsx';
import Error from './pages/error.jsx';
import Inventory from './pages/Inventory.jsx' ;
import InvId from './pages/InvId.jsx';
import AddCar from './pages/addCar.jsx';
import ContactUs from './pages/contactUs.jsx';
import AboutUs from './pages/aboutUs.jsx';
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./components/protectedRoute.jsx";
import Dashboard from './pages/adminDashboard.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <Error/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: '/aboutUs',
                element: <AboutUs/>
            },
            {
                path: '/inventory',
                element: <Inventory/>,
            },
            {
                path: '/inventory/:Id',
                element: <InvId/>
            },
            {
                path:'/addcar',
                element: <AddCar/>
            },
            {
                path: '/Login',
                element: <Login/>
            },
            {
                path: '/contactUs',
                element: <ContactUs/>
            },
            {
                path:'/protectedRoute',
                element: <ProtectedRoute/>,
                children: [
                    {
                        index: true,
                        path:'/protectedRoute/dashboard',
                        element: <Dashboard/>
                    },
                ]
            }
        ]
    },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}></RouterProvider>
)
