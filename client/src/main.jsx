import  ReactDOM  from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './app.css'
import App from './app.jsx'
import Home from './pages/Home.jsx'
import Error from './pages/error.jsx'
import inv from './pages/inventory.jsx'


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
                element: <aboutUs/>
            },
            {
                path: '/inventory',
                element: <inventory/>
            },
            {
                path: '/contactUs',
                element: <contactUs/>
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}></RouterProvider>
)
