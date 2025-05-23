import  ReactDOM  from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {lazy,Suspense} from 'react'
import {Navigate} from 'react-router-dom'
import './app.css';
import App from './app.jsx';
import Error from './pages/error.jsx';
import Inventory from './pages/inventory.jsx';
import InvId from './pages/InvId.jsx';
import ContactUs from './pages/contactUs.jsx';
import AboutUs from './pages/aboutUs.jsx';
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./components/protectedRoute.jsx";
import Credits from './pages/credits.jsx'
import TermsAndConditions from "./pages/tandc.jsx";
import SiteMap from "./pages/sitemap.jsx";
import PrivacyPolicy from "./pages/privacypolicy.jsx";
const Dashboard = lazy(()=> import('./pages/adminDashboard.jsx'))

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <Error/>,
        children: [
            {
                index: true,
                element: <Navigate to="/inventory" replace />
            },
            {
                path: 'aboutUs',
                element: <AboutUs/>
            },
            {
                path: 'inventory',
                element: <Inventory/>,
            },
            {
                path: 'inventory/:Id',
                element: <InvId/>
            },
            {
                path: 'Login',
                element: <Login/>
            },
            {
                path: 'contactUs',
                element: <ContactUs/>
            },
            {
                path: 'credits',
                element: <Credits/>
            },
            {
                path:'termsandconditions',
                element: <TermsAndConditions/>
            },
            {
                path:'sitemap',
                element: <SiteMap/>
            },
            {
                path:'privacypolicy',
                element: <PrivacyPolicy/>
            },
            {
                path:'protectedRoute',
                element: <ProtectedRoute/>,
                children: [
                    {
                        path:'dashboard',
                        element: <Dashboard/>
                    },

                ]
            }
        ]
    },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
    <Suspense fallback={<div>...loading</div>}>
        <RouterProvider router={router}></RouterProvider>
    </Suspense>
)
