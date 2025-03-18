import { Link } from "react-router-dom";
import phone from '/icons8-phone-50.png'
import placemarker from '/icons8-place-marker-24.png'
import email from '/icons8-email-50.png'

const footer = () => {
    return (
        <footer >
            <div className='footer'>

                <div className="contactinfo_push">
                    <div className="contactinfo_push">
                        <h2 className="footer-headers">Contact Info</h2>
                        <hr className="hr1"/>
                    </div>
                    <div className="contact-info_text">
                        <Link to='/inventory' className="NAAN-AUTO_font_link contactinfo_push">
                            <span className="montserrat-underline NAAN-AUTO_font">NAAN-AUTO</span>
                        </Link>
                        <div className="contact-info_flex">
                            <img src={phone} className="contact-info_icon"/>
                            <span>406-250-2747</span>
                        </div>
                        <div className="contact-info_flex">
                            <img src={placemarker} className="contact-info_icon"/>
                            <span className="contactinfo-font">8520 N Palafox St Pensicola FL, 32534</span>
                        </div>
                        <div className="contact-info_flex">
                            <img src={email} className="contact-info_icon"/>
                            <span>naanauto@gmail.com</span>
                        </div>
                    </div>
                </div>
                    <div >
                        <div>
                            <h2 className="footer-headers">Hours Of Operation</h2>
                            <hr className="hr1"/>
                        </div>
                        <div>
                            <ul className="hoo-ul">
                                <li className="hoo-li">
                                    <span>
                                        Monday
                                    </span>
                                    <span>
                                        09:00 AM - 5:00 PM
                                    </span>
                                </li>
                                <li className="hoo-li">
                                    <span>
                                        Tuesday
                                    </span>
                                    <span>
                                        09:00 AM - 5:00 PM
                                    </span>
                                </li>
                                <li className="hoo-li">
                                    <span>
                                        Wednesday
                                    </span>
                                    <span>
                                        09:00 AM - 5:00 PM
                                    </span>
                                </li>
                                <li className="hoo-li">
                                    <span>
                                        Thursday
                                    </span>
                                    <span>
                                        09:00 AM - 5:00 PM
                                    </span>
                                </li>
                                <li className="hoo-li">
                                    <span>
                                        Friday
                                    </span>
                                    <span>
                                        09:00 AM - 5:00 PM
                                    </span>
                                </li>
                                <li className="hoo-li">
                                    <span>
                                        Saturday
                                    </span>
                                    <span>
                                        BY APPOINTMENT ONLY
                                    </span>
                                </li>
                                <li className="hoo-li">
                                    <span>
                                        Sunday
                                    </span>
                                    <span>
                                        BY APPOINTMENT ONLY
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div >
                        <div>
                            <h2 className="footer-headers">Request More Info</h2>
                            <hr className="hr1"/>
                        </div>
                        <form className="rmi-form">
                            <div className="rmi-form_grouped_fields">
                                <input type="text" placeholder="First Name" className="input-group" />
                                <input type="text" placeholder="Last Name" className="input-group" />
                            </div>
                            <div className="rmi-form_grouped_fields">
                                <input type="text" placeholder="Email Address" className="input-group" />
                                <input type="text" placeholder="Phone Number" className="input-group" />
                            </div>
                            <div>
                                <textarea placeholder="Enter your message here" className="rmi-form_ask_footer " />
                            </div>
                            <button type="button" className="rmi-form_button">SUBMIT</button>
                        </form>
                    </div>
              
            </div>
        </footer>
    );
}


export default footer

