import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { GET_MESSAGE, SEND_MESSAGE } from "../utils/querys";
import { useState } from 'react'
import phone from '../assets/icons8-phone-50.png'
import placemarker from '../assets/icons8-place-marker-24.png'
import email from '../assets/icons8-email-50.png'
import successfullMessage from '../assets/message200.gif'
import unsuccessfullMessage from '../assets/message404.gif'

const footer = () => {
    const [sendMessage] = useMutation(SEND_MESSAGE, {
        refetchQueries: [{ query: GET_MESSAGE }]
    })
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        emailAddress: '',
        message: '',
        phoneNumber: '',
    })
    const [validationErrors, setValidationErrors] = useState({})
    const [showPopUp, setShowPopUp] = useState(false)
    const [successMessage, setSuccessMessage] = useState(false)
    const [clientMessage, setClientMessage] = useState('')

    const popUpMessage = () => {
        setShowPopUp(true)
        setTimeout(() => setShowPopUp(false), 3000)
    }

    const changeHandler = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        if (validationErrors[name]) {
            setValidationErrors((prev) => {
                const updatedErrors = { ...prev };
                delete updatedErrors[name];
                return updatedErrors;
            })
        }
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const notValid = {};
        if (!form.firstName) notValid.firstName = true
        if (!form.lastName) notValid.lastName = true
        if (!form.emailAddress) notValid.emailAddress = true
        if (!form.message) notValid.message = true
        if (!form.phoneNumber) notValid.phoneNumber = true
        if (form.emailAddress && !/^\S+@\S+\.\S+$/.test(form.emailAddress)) {
            notValid.emailAddress = true;
        }
        if (Object.keys(notValid).length > 0) {
            setValidationErrors(notValid);
            setSuccessMessage(false);
            setClientMessage('please fill out each input.');
            popUpMessage();
            return;
        }
        try {
            const { data } = await sendMessage({
                variables: {
                    firstName: form.firstName,
                    lastName: form.lastName,
                    emailAddress: form.emailAddress,
                    message: form.message,
                    phoneNumber: form.phoneNumber,
                }
            })
            if (data?.sendMessage?.success) {
                setSuccessMessage(true);
                setClientMessage('message sent');
            } else {
                setSuccessMessage(false);
                setClientMessage('message not sent');
            }
        } catch (err) {
            console.error(err)
            setSuccessMessage(false);
            setClientMessage('message not sent');
        }
        popUpMessage();
    }

    const mapLink = 'https://www.google.com/maps/place/4327+Gulf+Breeze+Pkwy,+Gulf+Breeze,+FL+32563/@30.3929444,-87.0454237,17z/data=!3m1!4b1!4m6!3m5!1s0x8890db5d648dea2b:0xf659fe1011b45078!8m2!3d30.3929398!4d-87.0428434!16s%2Fg%2F11f54xlgyw?entry=ttu&g_ep=EgoyMDI1MDUyNi4wIKXMDSoASAFQAw%3D%3D';
    const phoneLink = 'tel:+18508615000';
    const emailLink = 'mailto:naanauto@gmail.com';

    return (
        <>
        {showPopUp &&
            <section className={`pop-up-message ${successMessage ? 'pop-up-message--success' : 'pop-up-message--error'}`}>
                <div className="popup-center">
                    <img src={successMessage ? successfullMessage : unsuccessfullMessage} alt="" />
                    <span>{clientMessage}</span>
                </div>
            </section>}
        <footer>
            <div className='footer'>
                <div className="footer-columns">

                    {/* Column 1: Brand + Contact */}
                    <div className="footer-column">
                        <Link to='/inventory' className="NAAN-AUTO_font_link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            <span className="montserrat-underline NAAN-AUTO_font">NAAN-AUTO</span>
                        </Link>
                        <p className="footer-tagline">Honest. Family-owned. Gulf Breeze, FL.</p>
                        <h3 className="footer-section-label">Contact Info</h3>
                        <div className="contact-info_text">
                            <div className="contact-info_flex">
                                <img src={phone} className="contact-info_icon" alt="" />
                                <a href={phoneLink} className="nostylewhite">850-861-5000</a>
                            </div>
                            <div className="contact-info_flex">
                                <img src={placemarker} className="contact-info_icon" alt="" />
                                <a href={mapLink} className="nostylewhite">4327 Gulf Breeze Parkway, Gulf Breeze FL</a>
                            </div>
                            <div className="contact-info_flex">
                                <img src={email} className="contact-info_icon" alt="" />
                                <a href={emailLink} className="nostylewhite">naanauto@gmail.com</a>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Hours */}
                    <div className="footer-column">
                        <h3 className="footer-section-label">Operating Hours</h3>
                        <ul className="hoo-ul">
                            <li className="hoo-li"><span>Monday</span><span>11:00 AM – 5:00 PM</span></li>
                            <li className="hoo-li"><span>Tuesday</span><span>12:00 PM – 5:00 PM</span></li>
                            <li className="hoo-li"><span>Wednesday</span><span>11:00 AM – 5:00 PM</span></li>
                            <li className="hoo-li"><span>Thursday</span><span>11:00 AM – 5:00 PM</span></li>
                            <li className="hoo-li"><span>Friday</span><span>11:00 AM – 5:00 PM</span></li>
                            <li className="hoo-li"><span>Saturday</span><span>By Appointment</span></li>
                            <li className="hoo-li"><span>Sunday</span><span>By Appointment</span></li>
                        </ul>
                    </div>

                    {/* Column 3: Form */}
                    <div className="footer-column" id="footer-mobile">
                        <h3 className="footer-section-label">Request More Info</h3>
                        <form className="rmi-form" onSubmit={e => submitHandler(e)}>
                            <div className="rmi-form_grouped_fields">
                                <input type="text" name="firstName" placeholder="First Name"
                                    className="input-group" maxLength={20} onChange={e => changeHandler(e)} />
                                <input type="text" name="lastName" placeholder="Last Name"
                                    className="input-group" maxLength={20} onChange={e => changeHandler(e)} />
                            </div>
                            <div className="rmi-form_grouped_fields">
                                <input type="text" name="emailAddress" placeholder="Email Address"
                                    className="input-group" maxLength={40} onChange={e => changeHandler(e)} />
                                <input type="text" name="phoneNumber" placeholder="Phone Number"
                                    className="input-group" maxLength={20} onChange={e => changeHandler(e)} />
                            </div>
                            <textarea name="message" placeholder="What can we help you with?"
                                className="rmi-form_ask_footer" onChange={e => changeHandler(e)} maxLength={200} />
                            <button type="submit" className="rmi-form_button">SUBMIT</button>
                        </form>
                    </div>

                </div>
            </div>

            <section className="bottom-border-container">
                <div className="bottom-border-links">
                    <Link className="nostyle" to='/termsandconditions' onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}>Terms &amp; Conditions</Link>
                    <Link className="nostyle" to='/privacypolicy' onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}>Privacy Policy</Link>
                    <Link className="nostyle" to='/credits' onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}>Credits</Link>
                    <Link className="nostyle" to='/sitemap' onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}>Sitemap</Link>
                </div>
                <span className="footer-copyright">© {new Date().getFullYear()} Naan Auto. All rights reserved.</span>
            </section>
        </footer>
        </>
    );
}

export default footer
