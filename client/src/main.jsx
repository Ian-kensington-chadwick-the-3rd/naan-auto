import  ReactDOM  from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './app.css'
import App from './app.jsx'
import Home from './pages/Home.jsx'
import Error from './pages/error.jsx'
import Inventory from './pages/inventory' 
import InvId from './pages/InvId'
import AddCar from './pages/addCar'
import ContactUs from './pages/contactUs'
import AboutUs from './pages/aboutUs'

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
                // attempting to create and :Id endpoint so that when a user wants to look at the images for a specific car once you click on the list item in inventory it will bring you to that page using the specified id.
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
                path: '/contactUs',
                element: <ContactUs/>
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}></RouterProvider>
)
