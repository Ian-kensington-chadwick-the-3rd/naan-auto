import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook } from '@fortawesome/free-brands-svg-icons';
import naanAutoLogo from '/Naan-auto-logo.jpg'
import LeftArrowIcon from "./arrow";

const Header = () => {
    return (
        <header className="header" >
            <div className="header1">
                <div>
                    <span className="address-and-phone">
                        pensicola florida
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
            <div className="bottomnavbarcontainer">
                <div>
                    <Link to='/'>
                        <img className="carlogo" src={naanAutoLogo}></img>
                    </Link>
                </div>
                <div className="link-container">
                    <Link to='/inventory' className="link" >
                        <span className="orangebottom">
                            Inventory
                        </span>
                    </Link>
                    <Link to='/contactUs' className="link">
                        <span className="orangebottom">
                            Contact Us
                        </span>
                    </Link>
                    <Link to='/aboutUs' className="link">
                        <span className="orangebottom">
                            About us
                        </span>
                    </Link>
                    <div className="dropdown">
                        <LeftArrowIcon className='svg' />
                        <div className="dropdown-content ">
                            <Link to={'/Login'}>
                                login
                            </Link>
                            <Link to={'/protectedRoute/dashboard'}>
                                Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}


export default Header;
