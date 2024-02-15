import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const Header = () => {
    return (
        <header className="header" >
            <div className="header1">
                <div>
                    <span className="address-and-phone">
                        pensicola florida
                    </span>
                    <span className="address-and-phone">
                        call us 406-250-2747
                    </span>
                </div>
                <div>
                    <a href="">
                        <FontAwesomeIcon icon={faGoogle} />
                    </a>
                </div>
            </div>
            <div className="bottomnavbarcontainer">
                <div className="">
                    <Link to='/'>
                        <img className="carlogo" src="./src/assets/placeholder-carlogo.jpg"></img>
                    </Link>
                </div>
                <div className="link-container link">
                    <Link to='/aboutUs'>
                        <p className="link">
                            About us
                        </p>
                    </Link>
                    <Link to='/inventory'>
                        <p className="link">
                            Inventory
                        </p>
                    </Link>
                    <Link to='/contactUs'>
                        <p className="link">
                            Contact Us
                        </p>
                    </Link>
                </div>
            </div>
        </header>
    );
}


export default Header;
