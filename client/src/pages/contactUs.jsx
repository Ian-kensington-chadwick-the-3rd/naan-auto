import GoogleMaps from "../components/googlemaps";
import { useState, useRef, useEffect } from 'react'
import { useMutation } from "@apollo/client";
import { SEND_MESSAGE, GET_MESSAGE } from "../utils/querys";
import { Helmet } from "react-helmet";
import successfullMessage from '../assets/message200.gif'
import unsuccessfullMessage from '../assets/message404.gif'
import ringingGif from '../assets/icons8-phone-ringing.gif'
import mapMarker from '../assets/icons8-map-pin.gif'

const contactUs = () => {
   const [sendMessage] = useMutation(SEND_MESSAGE, {
      refetchQueries: [{ GET_MESSAGE }]
   })



   const [successMessage, setSuccessMessage] = useState(false)
   const [showPopUp, setShowPopUp] = useState(false)


   const [form, setForm] = useState({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      emailAddress: '',
      message: ''
   })

   const [focusForm, setFocusForm] = useState({
      firstName: false,
      lastName: false,
      phoneNumber: false,
      emailAddress: false,
      message: false,
   })

   const previousForm = useRef({})


   const onChangeHandler = (e) => {
      e.preventDefault();
      const { name, value } = e.target;
      setForm((prev) => ({
         ...prev,
         [name]: value
      }))
   }

   const [clientMessage, setClientMessage] = useState('')


   const submitFormHandler = async (e) => {
      e.preventDefault();

      const emptyForm = !form.firstName && !form.lastName && !form.message && !form.phoneNumber && !form.emailAddress
      if (emptyForm) {
         setClientMessage('you can not send an empty form');
         setSuccessMessage(false);
         popUpMessage();
         return;
      };

      const sameInput =
         form.firstName === previousForm.current.firstName &&
         form.lastName === previousForm.current.lastName &&
         form.phoneNumber === previousForm.current.phoneNumber &&
         form.emailAddress === previousForm.current.emailAddress &&
         form.message === previousForm.current.message;

      if (sameInput) {
         setClientMessage('you cant send the same message twice')
         setSuccessMessage(false);
         popUpMessage();
         return;
      };

      const fillOutEveryField = !form.firstName || !form.lastName || !form.message || !form.phoneNumber || !form.emailAddress
      if (fillOutEveryField) {
         setClientMessage('please fill out each input.');
         setSuccessMessage(false);
         popUpMessage();
         return;
      }

      const { data } = await sendMessage({
         variables: { ...form }
      })

      if (data?.sendMessage?.success) {
         setSuccessMessage(true)
         previousForm.current = { ...form }

         setClientMessage('message sent')
      } else {
         setSuccessMessage(false)
         setClientMessage('message not sent')
      }
      popUpMessage();
   }

   const popUpMessage = () => {
      setShowPopUp(true)
      setTimeout(() => {
         setShowPopUp(false)
      }, 3000)
   }

   // const clickAble = () =>{
   //    setTimeout(()=>{
   //       return true;
   //    },3000)
   //    return false;
   // }

   // console.log(clickAble())

   return (
      <div>
         <Helmet>
            <title>Contact Us | Naan Auto - Used Car Dealer in Gulf Breeze, FL</title>
            <meta name="description" content="Contact Naan Auto, your local used car dealership in Gulf Breeze, FL. Call 850-861-5000 or send us a message. Serving Pensacola, Navarre, Fort Walton Beach, Destin, Niceville, Crestview, Freeport, and the Florida Panhandle." />
            <meta name="keywords" content="contact Naan Auto, used car dealer Gulf Breeze FL phone number, car dealership Pensacola contact, used cars Navarre FL, used cars Fort Walton Beach, used cars Destin FL, used cars Niceville FL, used cars Crestview FL, used cars Freeport FL, Florida Panhandle car dealer" />
            <meta name="robots" content="index, follow" />
            <meta name="author" content="Naan Auto" />
            <meta name="theme-color" content="#e95918" />
            <meta name="geo.region" content="US-FL" />
            <meta name="geo.placename" content="Gulf Breeze, Florida" />
            <meta name="geo.position" content="30.3929398;-87.0428434" />
            <meta name="ICBM" content="30.3929398, -87.0428434" />
            <meta property="og:title" content="Contact Naan Auto - Used Car Dealer in Gulf Breeze, FL" />
            <meta property="og:description" content="Get in touch with Naan Auto in Gulf Breeze, FL. Call 850-861-5000 or send us a message. Serving Pensacola and surrounding areas." />
            <meta property="og:site_name" content="Naan Auto" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://naanauto.com/contactUs" />
            <meta property="og:image" content="https://naanauto.com/logo.PNG" />
            <meta property="og:image:alt" content="Contact Naan Auto - Used Car Dealership Gulf Breeze FL" />
            <meta property="og:locale" content="en_US" />
            <link rel="canonical" href="https://naanauto.com/contactUs" />
            <link rel="preload" href="./assets/rowancomp.webp" as="image" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Contact Naan Auto - Used Car Dealer in Gulf Breeze, FL" />
            <meta name="twitter:description" content="Get in touch with Naan Auto in Gulf Breeze, FL. Call 850-861-5000 or send us a message." />
            <meta name="twitter:image" content="https://naanauto.com/logo.PNG" />
            <meta name="twitter:image:alt" content="Contact Naan Auto - Used Car Dealership Gulf Breeze FL" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-title" content="Naan Auto" />
            <meta name="format-detection" content="telephone=yes" />
         </Helmet>
         {showPopUp &&
            <section className="pop-up-message ">
               {successMessage ?
                  <div className="popup-center"><span style={{ color: 'green' }}>{clientMessage}</span><img src={successfullMessage} /></div> :
                  <div className="popup-center"><span style={{ color: 'red' }}>{clientMessage}</span><img src={unsuccessfullMessage} /></div>
               }

            </section>}
         <section className='scenerybackground'>
            <div className="about-us-hero-overlay">
               <h1 className="about-us-hero-title">Contact Us</h1>
            </div>
         </section>

         {/* ── Main content ── */}
         <div className="crev-wrapper">

            {/* Left: dark info panel */}
            <div className="crev-info">
               <div>
                  <span className="crev-eyebrow parkinsans">Gulf Breeze, FL</span>
                  <h1 className="crev-heading">Get In Touch</h1>
                  <p className="crev-subtext parkinsans">
                     We're a family-owned dealership and we treat every customer like one of our own.
                     Reach out anytime — we'd love to hear from you.
                  </p>
               </div>

               <hr className="crev-divider" />

               <div className="crev-contact-items">
                  <a href="tel:+18508615000" className="crev-contact-link parkinsans">
                     <img src={ringingGif} style={{ width: '22px', height: '22px', flexShrink: 0 }} alt="" />
                     850-861-5000
                  </a>
                  <div className="crev-contact-item parkinsans">
                     <img src={mapMarker} style={{ width: '20px', height: '20px', flexShrink: 0, marginTop: '2px' }} alt="" />
                     <span>4327 Gulf Breeze Parkway<br />Gulf Breeze, FL 32563</span>
                  </div>
               </div>

               <hr className="crev-divider" />

               <div>
                  <p className="crev-hours-title">Opening Hours</p>
                  <ul className="crev-hours-list parkinsans">
                     <li><span>Monday</span><span>11:00 AM – 5:00 PM</span></li>
                     <li><span>Tuesday</span><span>12:00 PM – 5:00 PM</span></li>
                     <li><span>Wednesday</span><span>11:00 AM – 5:00 PM</span></li>
                     <li><span>Thursday</span><span>11:00 AM – 5:00 PM</span></li>
                     <li><span>Friday</span><span>11:00 AM – 5:00 PM</span></li>
                     <li><span>Saturday</span><span>By Appointment</span></li>
                     <li><span>Sunday</span><span>By Appointment</span></li>
                  </ul>
               </div>

             
            </div>

            {/* Right: form */}
            <div className="crev-form-panel">
               <h2 className="crev-form-heading">Send Us a Message</h2>
               <p className="crev-form-sub parkinsans">Fill out the form below and we'll get back to you shortly.</p>

               <form className="contact-us_form_form" onSubmit={(e) => submitFormHandler(e)}>
                  <div className="contact-us_form_group">
                     <div className="custom-field">
                        <input type="text" className="contact-us_form_size" name='firstName'
                           onChange={(e) => onChangeHandler(e)}
                           onFocus={() => setFocusForm({ ...focusForm, firstName: true })}
                           onBlur={() => setFocusForm({ ...focusForm, firstName: false })}
                        />
                        <span className={focusForm.firstName || form.firstName ? "contact-us_form_naming placeholder placeholder-up noclick" : 'contact-us_form_naming placeholder up noclick'} draggable={false}>First Name</span>
                     </div>
                     <div className="custom-field">
                        <input type="text" className="contact-us_form_size" name='lastName'
                           onFocus={() => setFocusForm({ ...focusForm, lastName: true })}
                           onBlur={() => setFocusForm({ ...focusForm, lastName: false })}
                           onChange={(e) => onChangeHandler(e)}
                        />
                        <span className={focusForm.lastName || form.lastName ? "contact-us_form_naming placeholder placeholder-up noclick" : 'contact-us_form_naming placeholder up noclick'} draggable={false}>Last Name</span>
                     </div>
                  </div>
                  <div className="contact-us_form_group">
                     <div className="custom-field">
                        <input type="text" className="contact-us_form_size" name='emailAddress'
                           onFocus={() => setFocusForm({ ...focusForm, emailAddress: true })}
                           onBlur={() => setFocusForm({ ...focusForm, emailAddress: false })}
                           onChange={(e) => onChangeHandler(e)}
                        />
                        <span className={focusForm.emailAddress || form.emailAddress ? "contact-us_form_naming placeholder placeholder-up noclick" : 'contact-us_form_naming placeholder up noclick'} draggable={false}>Email Address</span>
                     </div>
                     <div className="custom-field">
                        <input type="text" className="contact-us_form_size" name="phoneNumber"
                           onFocus={() => setFocusForm({ ...focusForm, phoneNumber: true })}
                           onBlur={() => setFocusForm({ ...focusForm, phoneNumber: false })}
                           onChange={(e) => onChangeHandler(e)}
                        />
                        <span className={focusForm.phoneNumber || form.phoneNumber ? "contact-us_form_naming placeholder placeholder-up noclick" : 'contact-us_form_naming placeholder up noclick'} draggable={false}>Phone Number</span>
                     </div>
                  </div>
                  <textarea placeholder="What can we help you with?"
                     className="contact-us_form_textarea"
                     name="message"
                     onChange={(e) => onChangeHandler(e)}
                  />
                  <button type="submit" className="contact-us_form_button">SUBMIT</button>
               </form>
            </div>
         </div>

         {/* ── Map ── */}
         <div className="crev-map">
            <GoogleMaps size={'size'} alt='google maps directions' />
         </div>
      </div>
   )

}

export default contactUs;


