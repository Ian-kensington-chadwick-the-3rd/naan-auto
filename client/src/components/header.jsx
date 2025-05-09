import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook } from '@fortawesome/free-brands-svg-icons';
import naanAutoLogo from '../assets/Naan-auto-logo.jpg'
import LeftArrowIcon from "./arrow";
import { AUTH_CHECK } from "../utils/querys";
import { useQuery } from '@apollo/client';
import { useEffect, useState, useRef } from 'react';

const Header = () => {

    const [isAdmin, setIsAdmin] = useState(false);
    const Key = localStorage.getItem('token');

    const { data } = useQuery(AUTH_CHECK, {
        variables: { Key },
        skip: !Key,
    });
    useEffect(() => {
        if (data?.AuthCheck) {
            setIsAdmin(true);
        }
    }, [data])

    console.log(data)

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

    }, [stickyHeader])


    useEffect(() => {
        const onScroll = () => {

            if (window.scrollY >= 200 && tabletAndUnderVw) {
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
    }, [tabletAndUnderVw])

    useEffect(()=>{
        if(mobileTabActive){
            document.body.style.overflow = 'hidden'
        } else{
            document.body.style.overflow = ''
        }
    },[mobileTabActive])

    useEffect(() => {
        console.log(stickyHeader)
        console.log(tabletAndUnderVw)
        console.log(mobileTabActive)
    },)
    return (
        <header className="header" >
            <div className="header1">
                <div>
                    <span className="address-and-phone">
                        4327 Gulf Breeze Parkway, Gulf Breeze FL |
                    </span>
                    <span className="address-and-phone" style={{ marginLeft: '4px' }}>
                        call us at
                    </span>
                    <span className="satisfy-regular" style={{ marginLeft: '6px' }} >
                        406-250-2747
                    </span>

                </div>
                <div>
                    <a href="https://www.facebook.com/naanmotors/">
                        <FontAwesomeIcon icon={faSquareFacebook} style={{ textDecoration: 'none', color: 'white' }} />
                    </a>
                </div>
            </div>
            <div className={stickyHeader ? "bottomnavbarcontainer fixedheader" : 'bottomnavbarcontainer'}>
                <div>
                    <Link to='/inventory'>
                        <img className="carlogo" src={naanAutoLogo}></img>
                    </Link>
                </div>
                <div className="link-container ">
                    <Link to='/inventory' className="link" id="nav-mobile" >
                        <span className="orangebottom" id="nav-mobile">
                            Inventory
                        </span>
                    </Link>
                    <Link to='/contactUs' className="link" id="nav-mobile">
                        <span className="orangebottom" id="nav-mobile">
                            Contact Us
                        </span>
                    </Link>
                    <Link to='/aboutUs' className="link" id="nav-mobile">
                        <span className="orangebottom" id="nav-mobile">
                            About us
                        </span>
                    </Link>

                    <div className="dropdown" id="nav-mobile">
                        <LeftArrowIcon className='svg' />
                        <div className="dropdown-content ">
                            <Link to={'/Login'}>
                                login
                            </Link>
                            {isAdmin !== false && (
                                <Link to={'/protectedRoute/dashboard'}>
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
                                    <Link to='/inventory' className="link nostyle"  >
                                        Inventory
                                    </Link>
                                </li>
                                <li className="nostyle ">
                                    <Link to='/contactUs' className="link nostyle">
                                        Contact Us
                                    </Link>
                                </li>
                                <li className="nostyle">
                                    <Link to='/aboutUs' className="link">
                                        About us
                                    </Link>
                                </li>
                                <li className="nostyle">
                                    <Link to={'/Login'}>
                                        login
                                    </Link>
                                </li>
                                <li className="nostyle">
                                {isAdmin && (
                                <Link to={'/protectedRoute/dashboard'}>
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
