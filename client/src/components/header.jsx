import { Link } from "react-router-dom";


const Header = () => {
    return (
        <header className="header" >
           <div className="header1">
                <div className="header1-center">
                    <span className="address-and-phone">
                        call us 406-250-2747
                    </span>
                </div>
            </div>
            <div className="link-container link">
                <Link to='/aboutUs'>
                    <p className="link">
                        About us
                    </p>
                </Link>
                <Link to='/inv'>
                    <p className="link">
                        Inventory
                    </p>
                </Link>
                <Link to= '/contactUs'>
                    <p className="link">
                        Contact Us
                    </p>
                </Link>
            </div>             
        </header>
    );
}


export default Header;
