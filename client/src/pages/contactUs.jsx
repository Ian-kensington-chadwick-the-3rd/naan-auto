import GoogleMaps from "../components/googlemaps";
import { useState, useRef, useEffect } from 'react'
import { useMutation } from "@apollo/client";
import { SEND_MESSAGE, GET_MESSAGE } from "../utils/querys";
import { Helmet } from "react-helmet";
import successfullMessage from '../assets/message200.gif'
import unsuccessfullMessage from '../assets/message404.gif'
import talkingPeople from '../assets/peopletalking.gif'
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
      if(emptyForm){
         setClientMessage('please fill out each input.');
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

      if(sameInput) {
         setClientMessage('you cant send the same message twice')
         setSuccessMessage(false);
         popUpMessage();
         return;
      };

      const {data} = await sendMessage({
         variables: { ...form }
      })
   
      if (data?.sendMessage?.success) {
         setSuccessMessage(true)
         previousForm.current = {...form}
 
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

   const clickAble = () =>{
      setTimeout(()=>{
         return true;
      },3000)
      return false;
   }

   console.log(clickAble())

   return (
      <div>
         <Helmet>
            <title>Contact Us | Naan Auto</title>
            <meta name='description' content='contact us to find out more info about our inventory' />
            <meta property='og:title' content='Welcome to Naan Auto - contact us' />
            <meta property='og:site_name' content='Naan Auto' />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://naanauto.com/contactUs" />
            <link rel="preload" href='./assets/rowancomp.webp' as="image" />
            <meta name='twitter:card' content='summary_large_image' />
            <meta name="twitter:title" content="Welcome to Naan Auto - contact us" />
            <meta name="twitter:description" content="contact us to find out more info about our inventory." />
            <meta name="twitter:image" content="https://yourdomain.com/images/about-banner.jpg" />

         </Helmet>
         {showPopUp &&
            <section className="pop-up-message ">
               {successMessage ?
                  <div className="popup-center"><span style={{color:'green'}}>{clientMessage}</span><img src={successfullMessage} /></div> :
                  <div className="popup-center"><span style={{color:'red'}}>{clientMessage}</span><img src={unsuccessfullMessage}/></div>
               }

            </section>}
         <section className="push">
            <section className='scenerybackground' alt='contact us header picture' />
            <section>
               <div>
                  <div className="contact-us_tops_section">
                     <section className="contact-us_header">
                        <div className="contact-us">
                           <h1 className="contact-us_header_font"> Contact Us</h1>
                           <hr className="hr2" />
                        </div>
                        <div>
                           <p className="contact-us_description_font parkinsans">
                              Looking for answers or just excited to start your car-buying journey?
                           </p>
                           <p className="contact-us_description_font parkinsans">
                           We're here to make the process easy and enjoyable. From finding the perfect vehicle to exploring financing solutions, at Naan-auto we are not just a team we are a family. Simply fill out the form, and we’ll be in touch to help you get started!
                           </p>

                        </div>
                        <div className='flex-middle'>
                           <img src={talkingPeople} className="peopletalkingif" draggable={false} loading="lazy" alt="talking people gif" />

                        </div>

                     </section>
                     <section className="contact-us_form_container">
                        <form className="contact-us_form_form" onSubmit={(e) => submitFormHandler(e)}>

                           <div className="contact-us_form_group">
                              <div className="custom-field">
                                 <input type="text"
                                    className="contact-us_form_size"
                                    name='firstName'
                                    onChange={(e) => onChangeHandler(e)}
                                    onFocus={() => setFocusForm({ ...focusForm, firstName: true })}
                                    onBlur={() => setFocusForm({ ...focusForm, firstName: false })}
                                 />
                                 <span className={focusForm.firstName || form.firstName ? "contact-us_form_naming placeholder placeholder-up noclick" : 'contact-us_form_naming placeholder up noclick'} draggable={false}>First Name</span>
                              </div>
                              <div className="custom-field">
                                 <input type="text"
                                    className="contact-us_form_size"
                                    name='lastName'
                                    onFocus={() => setFocusForm({ ...focusForm, lastName: true })}
                                    onBlur={() => setFocusForm({ ...focusForm, lastName: false })}
                                    onChange={(e) => onChangeHandler(e)}
                                 />
                                 <span className={focusForm.lastName || form.lastName ? "contact-us_form_naming placeholder placeholder-up noclick" : 'contact-us_form_naming placeholder up noclick'} draggable={false}>Last Name</span>
                              </div>
                           </div>
                           <div className="contact-us_form_group">
                              <div className="custom-field">

                                 <input type="text"
                                    className="contact-us_form_size"
                                    name='emailAddress'
                                    onFocus={() => setFocusForm({ ...focusForm, emailAddress: true })}
                                    onBlur={() => setFocusForm({ ...focusForm, emailAddress: false })}
                                    onChange={(e) => onChangeHandler(e)}
                                 />
                                 <span className={focusForm.emailAddress || form.emailAddress ? "contact-us_form_naming placeholder placeholder-up noclick" : 'contact-us_form_naming placeholder up noclick'} draggable={false} >Email Address</span>
                              </div>
                              <div className="custom-field">



                                 <input type="text"
                                    className="contact-us_form_size"
                                    name="phoneNumber"
                                    onFocus={() => setFocusForm({ ...focusForm, phoneNumber: true })}
                                    onBlur={() => setFocusForm({ ...focusForm, phoneNumber: false })}
                                    onChange={(e) => onChangeHandler(e)} />
                                 <span className={focusForm.phoneNumber || form.phoneNumber ? "contact-us_form_naming placeholder placeholder-up noclick" : 'contact-us_form_naming placeholder up noclick'} draggable={false}>Phone Number</span>
                              </div>

                           </div>
                           <div style={{ display: '' }}>
                              <textarea placeholder="What can we help you with?"
                                 className="contact-us_form_textarea flex"
                                 name="message"
                                 onChange={(e) => onChangeHandler(e)}
                              />
                           </div>
                           <button onClick={clickAble}  type="submit" className="contact-us_form_button">SUBMIT</button>
                        </form>
                     </section>
                  </div>
               </div>
               <section className="contact-us_bottom_section">
                  <div className="dealer-information">
                     <div>
                        <div>
                           <h2>Company Info</h2>
                           <hr className="hr1" />
                        </div>
                        <div className="contact-us_company_info contact-us_font">
                           <h3>Phone Number</h3>
                           <div>
                              <img src={ringingGif} style={{ width: '30px', height: '30px', paddingRight: '5px' }} alt="phone ringing gif" />
                              <span className="maincolor">850-861-5000</span>
                           </div>
                        </div>
                        <div className="contact-us_company_info contact-us_font">
                           <h3>Address</h3>
                           <div style={{ display: 'flex' }}>
                              <img src={mapMarker} style={{ width: '30px', height: '30px', paddingRight: '5px' }} alt="map marker gif" />
                              <span className="maincolor" >8520 N Palafox St Pensicola FL, 32534</span>
                           </div>
                        </div>
                        <div>
                           <div>
                              <h2>Opening Hours</h2>
                              <hr className="hr1" />
                           </div>
                           <ul className="contact-us_opening_hours contact-us_font">
                              <li className="contact-us_opening_hours_spacing">
                                 <span>
                                    Monday
                                 </span>
                                 <span>
                                    09:00 AM - 5:00 PM
                                 </span>
                              </li>
                              <li className="contact-us_opening_hours_spacing">
                                 <span>
                                    Tuesday
                                 </span>
                                 <span>
                                    09:00 AM - 5:00 PM
                                 </span>
                              </li>
                              <li className="contact-us_opening_hours_spacing">
                                 <span>
                                    Wednesday
                                 </span>
                                 <span>
                                    09:00 AM - 5:00 PM
                                 </span>
                              </li>
                              <li className="contact-us_opening_hours_spacing">
                                 <span>
                                    Thursday
                                 </span>
                                 <span>
                                    09:00 AM - 5:00 PM
                                 </span>
                              </li>
                              <li className="contact-us_opening_hours_spacing">
                                 <span>
                                    Friday
                                 </span>
                                 <span>
                                    09:00 AM - 5:00 PM
                                 </span>
                              </li>
                              <li className="contact-us_opening_hours_spacing">
                                 <span>
                                    Saturday
                                 </span>
                                 <span>
                                    BY APPOINTMENT ONLY
                                 </span>
                              </li>
                              <li className="contact-us_opening_hours_spacing">
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
                  </div>

                  <GoogleMaps className='googleapi2' size={'size'} alt='google maps directions' />

               </section>

            </section>
         </section>
      </div>
   )

}

export default contactUs;


