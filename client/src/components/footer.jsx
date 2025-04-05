import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { GET_MESSAGE, SEND_MESSAGE } from "../utils/querys";
import { useEffect, useState } from 'react'
import phone from '/icons8-phone-50.png'
import placemarker from '/icons8-place-marker-24.png'
import email from '/icons8-email-50.png'

const footer = () => {
    const [sendMessage] = useMutation(SEND_MESSAGE,{
        refetchQueries:[{query: GET_MESSAGE}]
    })
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        emailAddress: '',
        message: '',
        phoneNumber: '',
    })
    const [validationErrors, setValidationErrors] = useState({})


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


        setForm(prev => ({
            ...prev,
            [name]: value
        }))

    }

    useEffect(() => {
        console.log(validationErrors)
    }, [validationErrors])

    const submitHandler = async (e) => {
        e.preventDefault();
        const notValid = {};

        if (!form.firstName) notValid.firstName = 'please input first name'
        if (!form.lastName) notValid.lastName = 'please input last name'
        if (!form.emailAddress) notValid.emailAddress = 'please input email address'
        if (!form.message) notValid.message = 'please input message'
        if (!form.phoneNumber) notValid.phoneNumber = 'please input phoneNumber'

        if (form.emailAddress && !/^\S+@\S+\.\S+$/.test(form.emailAddress)) {
            notValid.emailAddress = 'Please enter a valid email address';
        }

        if (Object.keys(notValid).length > 0) {
            setValidationErrors(notValid);
            return;
        }


        try {
            const now = new Date();
            const time = now.toLocaleTimeString();
            const date = now.toLocaleDateString();

            sendMessage({
                variables: {
                    firstName: form.firstName,
                    lastName: form.lastName,
                    emailAddress: form.emailAddress,
                    message: form.message,
                    phoneNumber: form.phoneNumber,
                    timeString: time,
                    dateString: date
                   
                   
                }
            })
        } catch (err) {
            console.error(err)
        }

        // create floating label for form to display validation errors useState not finished as far as the looks but the functionality is here just needs to be plugged in.

    }





    return (
        <footer >
            <div className='footer'>

                <div className="contactinfo_push">
                    <div className="contactinfo_push">
                        <h2 className="footer-headers">Contact Info</h2>
                        <hr className="hr1" />
                    </div>
                    <div className="contact-info_text">
                        <Link to='/inventory' className="NAAN-AUTO_font_link contactinfo_push">
                            <span className="montserrat-underline NAAN-AUTO_font">NAAN-AUTO</span>
                        </Link>
                        <div className="contact-info_flex">
                            <img src={phone} className="contact-info_icon" />
                            <span>406-250-2747</span>
                        </div>
                        <div className="contact-info_flex">
                            <img src={placemarker} className="contact-info_icon" />
                            <span className="contactinfo-font">8520 N Palafox St Pensicola FL, 32534</span>
                        </div>
                        <div className="contact-info_flex">
                            <img src={email} className="contact-info_icon" />
                            <span>naanauto@gmail.com</span>
                        </div>
                    </div>
                </div>
                <div >
                    <div>
                        <h2 className="footer-headers">Hours Of Operation</h2>
                        <hr className="hr1" />
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
                <div>
                    <div>
                        <h2 className="footer-headers">Request More Info</h2>
                        <hr className="hr1" />
                    </div>
                    <form className="rmi-form" onSubmit={e => submitHandler(e)}>
                        <div className="rmi-form_grouped_fields">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                className="input-group"
                                onChange={e => changeHandler(e)}
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                className="input-group"
                                onChange={e => changeHandler(e)} />
                        </div>
                        <div className="rmi-form_grouped_fields">
                            <input
                                type="text"
                                name="emailAddress"
                                placeholder="Email Address"
                                className="input-group"
                                onChange={e => changeHandler(e)}
                            />
                            <input
                                type="text"
                                name="phoneNumber"
                                placeholder="Phone Number"
                                className="input-group"
                                onChange={e => changeHandler(e)}
                            />
                        </div>
                        <div>
                            <textarea name='message' placeholder="Enter your message here" className="rmi-form_ask_footer " onChange={e => changeHandler(e)} 
                            maxLength={200}/>
                        </div>
                        <button type="submit" className="rmi-form_button">SUBMIT</button>
                    </form>
                </div>

            </div>
        </footer>
    );
}


export default footer

