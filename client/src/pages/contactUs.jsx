import GoogleMaps from "../components/googlemaps";

const contactUs = () => {
   return (
      <section className="push">
         <section className='scenerybackground' />
         <section>
            <div>
               <div className="contact-us_tops_section">
                  <section className="contact-us_header">
                     <h1 className="contact-us_header_font"> Contact Us</h1>
                     <hr className="hr2" />
                     <div>
                        <p className="contact-us_description_font parkinsans">
                           We’re here to assist you with all your automotive needs!
                        </p>
                        <p className="contact-us_description_font parkinsans">
                           Whether you have questions about our inventory, financing options, or simply want to chat about your dream car, just fill out the form and our dedicated team at Naan Auto of Pensicola will gladly help!
                        </p>

                     </div>
                     <div className='flex-middle'>
                        <img src="/peopletalking.gif"  style={{ height: '500px',width:'500px' }} />
                     </div>

                  </section>
                  <section className="contact-us_form_container">
                     <form className="contact-us_form_form">

                        <div className="contact-us_form_group">
                           <div className="flex">
                              <div>
                                 <span className="contact-us_form_naming">First Name</span>
                                 <hr className="hr1" />
                              </div>
                              <input type="text" placeholder="First Name" className="contact-us_form_size"></input>
                           </div>
                           <div className="flex">
                              <div>
                                 <span className="contact-us_form_naming">Last Name</span>
                                 <hr className="hr1" />
                              </div>
                              <input type="text" placeholder="Last Name" className="contact-us_form_size"></input>
                           </div>
                        </div>
                        <div className="contact-us_form_group">
                           <div className="flex">
                              <div>
                                 <span className="contact-us_form_naming">Email Address</span>
                                 <hr className="hr1" />
                              </div>
                              <input type="text" placeholder="Email Address" className="contact-us_form_size"></input>
                           </div>
                           <div className="flex">
                              <div>
                                 <span className="contact-us_form_naming">Phone Number</span>
                                 <hr className="hr1" />
                              </div>
                              <input type="text" placeholder="Phone Number" className="contact-us_form_size"></input>
                           </div>

                        </div>
                        <div style={{display:'flex'}}>
                           <textarea placeholder="What can we help you with?" className="contact-us_form_textarea flex"></textarea>
                        </div>
                        <button className="contact-us_form_button">SUBMIT</button>
                     </form>
                  </section>

               </div>
            </div>
            <section className="contact-us_tops_section">
               <div className="dealer-information">
                  <div>
                     <h2>Company Info</h2>
                     <hr className="hr1"/>
                  </div>
                  <div className="contact-us_company_info contact-us_font">
                     <h3>Phone Number</h3>
                     <div>
                        <img src="/icons8-phone-ringing.gif" style={{width:'30px',height:'30px',paddingRight:'5px'}}/>
                        <span style={{color:'orange'}}>406-250-2747</span>
                     </div>
                  </div>
                  <div className="contact-us_company_info contact-us_font">
                     <h3>Address</h3>
                     <div style={{display:'flex'}}>
                     <img src="/icons8-map-pin.gif" style={{width:'30px',height:'30px', paddingRight:'5px'}}/>
                     <span style={{color:'orange'}} >8520 N Palafox St Pensicola FL, 32534</span>
                     </div>
                  </div>
                  <div>
                     <div>
                     <h2>Opening Hours</h2>
                     <hr className="hr1"/>
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
               <GoogleMaps className='googleapi2' />
            </section>

         </section>
      </section>
   )

}

export default contactUs;


// dealer info
// contact us form
// google maps component
// request more info