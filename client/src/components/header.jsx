import { Link } from "react-router-dom";


const Header = () => {
    return (
        <header className="header" >
            <div className="header1">
                <p>
                    call us 406-250-2747
                </p>
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
