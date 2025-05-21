import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook } from '@fortawesome/free-brands-svg-icons';
import naanAutoLogo from '../assets/naannewlogo.jpg'
import LeftArrowIcon from "./arrow";
import { AUTH_CHECK } from "../utils/querys";
import { useQuery } from '@apollo/client';
import { useEffect, useState, useRef } from 'react';

const Header = () => {

    const [isAdmin, setIsAdmin] = useState(false);
    const Key = localStorage.getItem('token');

    const { data } = useQuery(AUTH_CHECK);
    useEffect(() => {
        if (data?.AuthCheck) {
            setIsAdmin(true);
        }
    }, [data])


    const [stickyHeader, setStickyHeader] = useState(false);
    const [tabletAndUnderVw, setTabletAndUnderVw] = useState(false);
    const [mobileTabActive, setMobileTabActive] = useState(false);


    useEffect(() => {
        console.log(window.innerWidth)
        const tabletUnderVw = () => {
            if (window.innerWidth <= 768) {
                setTabletAndUnderVw(true);
            } else {
                setTabletAndUnderVw(false)
            }
        }

        tabletUnderVw();

        window.addEventListener('resize', tabletUnderVw);
        window.addEventListener('scroll', tabletUnderVw);

        return () => {
            window.removeEventListener('resize', tabletUnderVw);
            window.removeEventListener('scroll', tabletUnderVw);
        }

    }, [])


    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY >= 120 && tabletAndUnderVw === true) {
                console.log(window.scrollY)
                setStickyHeader(true);
            } else {
                setStickyHeader(false);
            }
        }
        window.addEventListener('scroll', onScroll);
        window.addEventListener('resize', onScroll)
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        }
    }, [tabletAndUnderVw,])

    useEffect(() => {
        if (mobileTabActive) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
    }, [])

    const location = useLocation();
    const urlpathname = location.pathname;

    const [urlLocation, setUrlLocation] = useState({
        inventory: true,
        contactUs: false,
        aboutUs: false,
        login: false,
        dashboard: false,
    })

    // so basically the point of this useEffect is because url location is handled by click i need a way to change it when router
    // sends admin to dashboard on a succsesfull loggin but because im not clicking it it wont set it so i need a way to automatically set it on dashboard load
    // all this codes says if url is /dashboard set css active header for dashboard true.
    useEffect(() => {
        const urlpathname = location.pathname;
        switch (urlpathname) {
            case '/inventory':
                setUrlLocation({
                    inventory: true,
                    contactUs: false,
                    aboutUs: false,
                    login: false,
                    dashboard: false,
                })
                break;
            case '/contactUs':
                setUrlLocation({
                    inventory: false,
                    contactUs: true,
                    aboutUs: false,
                    login: false,
                    dashboard: false,
                })
                break;
            case '/aboutUs':
                setUrlLocation({
                    inventory: false,
                    contactUs: false,
                    aboutUs: true,
                    login: false,
                    dashboard: false,
                })
                break;
            case '/Login':
                setUrlLocation({
                    inventory: false,
                    contactUs: false,
                    aboutUs: false,
                    login: true,
                    dashboard: false,
                })
                break;
            case '/protectedRoute/dashboard':
                setUrlLocation({
                    inventory: false,
                    contactUs: false,
                    aboutUs: false,
                    login: false,
                    dashboard: true,
                })
        }
    }, [urlpathname])

    const directions = 'https://www.google.com/maps/place/4327+Gulf+Breeze+Pkwy,+Gulf+Breeze,+FL+32563/@30.3929444,-87.0454237,17z/data=!3m1!4b1!4m6!3m5!1s0x8890db5d648dea2b:0xf659fe1011b45078!8m2!3d30.3929398!4d-87.0428434!16s%2Fg%2F11f54xlgyw?entry=ttu&g_ep=EgoyMDI1MDUxNS4wIKXMDSoASAFQAw%3D%3D';

    return (
        <header className="header" >
            <div className="header1">
                <div>
                    <a className="nostyle" href={directions}>
                        <span className="address-and-phone">
                            4327 Gulf Breeze Parkway, Gulf Breeze FL |
                        </span>
                    </a>
                    <span className="address-and-phone" style={{ marginLeft: '4px' }}>
                        call us at
                    </span>
                    <span className="satisfy-regular" style={{ marginLeft: '6px' }} >
                        850-861-5000
                    </span>

                </div>
                <div>
                    <a href="https://www.facebook.com/naanmotors/">
                        <FontAwesomeIcon icon={faSquareFacebook} className="fabook" />
                    </a>
                </div>
            </div>
            <div className={stickyHeader ? "bottomnavbarcontainer fixedheader" : 'bottomnavbarcontainer'}>

                <Link to='/inventory' onClick={() => scrollTo({ top: 0, behavior: 'smooth' })} >
                    <img className="carlogo" src={naanAutoLogo}>
                    </img>
                </Link>
                <div className="link-container ">
                    <Link to='/inventory' className="link" id="nav-mobile" onClick={() => scrollTo({ top: 0, behavior: 'smooth' })} >
                        <span className={urlLocation.inventory && "orangebottom"} id="nav-mobile">
                            Inventory
                        </span>
                    </Link>
                    <Link to='/contactUs' className="link" id="nav-mobile" onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}>
                        <span className={urlLocation.contactUs && "orangebottom"} id="nav-mobile">
                            Contact Us
                        </span>
                    </Link>
                    <Link to='/aboutUs' className="link" id="nav-mobile" onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}>
                        <span className={urlLocation.aboutUs && "orangebottom"} id="nav-mobile">
                            About us
                        </span>
                    </Link>

                    <div className="dropdown" id="nav-mobile">
                        <LeftArrowIcon className='svg' />
                        <div className="dropdown-content ">
                            <Link to={'/Login'} onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}>
                                login
                            </Link>
                            {isAdmin !== false && (
                                <Link to={'/protectedRoute/dashboard'} onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}>
                                    Dashboard
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className={mobileTabActive ? "mobiletab active" : 'mobiletab'} onClick={
                        () => !mobileTabActive ?
                            setMobileTabActive(true) : setMobileTabActive(false)
                    }>
                        <span className={mobileTabActive ? "hamburger active" : 'hamburger'} />
                        <span className={mobileTabActive ? "hamburger active" : 'hamburger'} />
                        <span className={mobileTabActive ? "hamburger active" : 'hamburger'} />
                        <nav className="navtab">
                            <ul>
                                <li className="nostyle">
                                    <Link to='/inventory' className={urlLocation.inventory ? "urltrue link nostyle" : "link nostyle"} onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}>
                                        Inventory
                                    </Link>
                                </li>
                                <li className="nostyle ">
                                    <Link to='/contactUs' className={urlLocation.contactUs ? "urltrue link nostyle" : "link nostyle"} onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}>
                                        Contact Us
                                    </Link>
                                </li>
                                <li className="nostyle">
                                    <Link to='/aboutUs' className={urlLocation.aboutUs ? "urltrue link nostyle" : "link nostyle"} onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}>
                                        About us
                                    </Link>
                                </li>
                                <li className="nostyle">
                                    <Link to={'/Login'} className={urlLocation.login ? "urltrue link nostyle" : "link nostyle"} onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}>
                                        login
                                    </Link>
                                </li>
                                <li className="nostyle">
                                    {isAdmin && (
                                        <Link to={'/protectedRoute/dashboard'} className={urlLocation.dashboard ? "urltrue link nostyle" : "link nostyle"} onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}>
                                            Dashboard
                                        </Link>
                                    )}
                                </li>
                            </ul>

                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}


export default Header;
