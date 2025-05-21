import Star from '../components/star.jsx'
import j from '../assets/j.png'
import t from '../assets/t.png'
import k from '../assets/k.png'
import { Helmet } from 'react-helmet'
const AboutUs = () => {
   const link = 'https://www.google.com/search?sca_esv=032488618a09524f&rlz=1C1CHBD_enUS1074US1074&sxsrf=AHTn8zram3_JQ1Ex7bfoNfDHG30Up7Bt-w:1746221079952&si=APYL9bs7Hg2KMLB-4tSoTdxuOx8BdRvHbByC_AuVpNyh0x2Kzb9PppLXBpZHDenjDN68weFQ3SikW2F8uhgkI9RZtwVMEp4Ar85yHgbEPtaFVy1HmE96EgwsZejyLZ_k27Z9eay7Kd_G&q=NAAN+Auto+Reviews&sa=X&ved=2ahUKEwjR1K253IWNAxWxKFkFHVeXEhgQ0bkNegQILBAD&biw=1920&bih=957&dpr=1'

   return (
      <div>
         <Helmet>
            <title>About Us - testimonials | Naan Auto</title>
            <meta name='description' content='Learn more about what naan-auto is really about and our customers experiences' />
            <meta property='og:title' content='Welcome to Naan Auto - Learn More About Us' />
            <meta property='og:site_name' content='Naan Auto' />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://naanauto.com/aboutUs" />
            <link rel="preload" href='./assets/pexelsfinal.webp' as="image" />
            <meta name='twitter:card' content='summary_large_image' />
            <meta name="twitter:title" content="Welcome to Naan Auto - Learn More About Us" />
            <meta name="twitter:description" content="See how we’re redefining car buying through trust and family-first values." />
            <meta name="twitter:image" content="https://yourdomain.com/images/about-banner.jpg" />
         </Helmet>

         <section className='about-us-headerpic' alt='about us header picture' />

         <div className="about-us_container">
            <section className="about-us_background_l">
               <div className="flex ">
                  <div style={{ maxWidth: '400px' }}>
                     <p className="about-us_text parkinsans">At Naan Auto we're a Montana originated dealership, built on family values, trust, God, and a heart for serving others. We are here to find you the right vehicle for every stage of life, from your first car to a growing family's SUV. </p>
                     <p className="about-us_text parkinsans">We know that buying a car isnt just a transaction its about saftey, reliablity, and finding something that fits your lifestyle. Thats why we treat every customer like family, offering personalized service, dependable vehicles, and honest advice you can count on.</p>
                     <span>- Jason and Stephanie</span>
                  </div>

               </div>
            </section>
            <section className="about-us_background_r flex1">
               <div className='about-us-testimonial-container'>
                  <div style={{ backgroundColor: '#0000000a', borderRadius: '10px', }}>
                     <div className="about-us-testimonial-pic-container">
                        <a href={link}>
                           <img className="about-us-testimoniol-pfp" src={j}></img>
                        </a>
                        <div className='flexcolumn'>
                           <a className='nostyle' href={link}>
                              <span className='about-us-testimonial-name'>
                                 Justin Redd
                              </span>
                           </a>
                           <span>2/22/22</span>
                        </div>
                     </div>
                     <div>
                        <Star /><Star /><Star /><Star /><Star />
                     </div>
                     <div>
                        <span >We went to the lot very polite and professional owners vehicles are very clean maintained we even had an issue occur with the car they asked for receipts they took off the price. Nothing major but they want to help and make things right without hassel or anything. They are willing to work with customers and very professional with their job they tell you everything with the vehicle upfront. I highly recommend this lot to anyone needing a vehicle there's no loop around gimmicks strait upfront and reasonable prices.</span>
                        <hr />
                     </div>
                  </div>
               </div>
               <div className='about-us-testimonial-container'>
                  <div style={{ backgroundColor: '#0000000a', borderRadius: '10px', }}>
                     <div className="about-us-testimonial-pic-container">
                        <a href={link}>
                           <img className="about-us-testimoniol-pfp" src={t}></img>
                        </a>
                        <div className='flexcolumn'>
                           <a className='nostyle' href={link}>
                              <span className='about-us-testimonial-name'>
                                 thedream craftlife
                              </span>
                           </a>
                           <span>2/22/22</span>
                        </div>
                     </div>
                     <div>
                        <Star /><Star /><Star /><Star /><Star />
                     </div>
                     <div>
                        <span className=''>This is possibly the best dealer I have dealt with in all my 68 years. The car was as they said and the price and terms were very good! We have put 10,000 miles on the car in the last 7 months and have only had to change the engine oil and filter. Jason and his wife are very honest. I can’t recommend them enough!!! I will go back to them for our cars from now on!</span>
                        <hr />
                     </div>
                  </div>
               </div>
               <div className='about-us-testimonial-container'>
                  <div style={{ backgroundColor: '#0000000a', borderRadius: '10px', }}>
                     <div className="about-us-testimonial-pic-container">
                        <a href={link}>
                           <img className="about-us-testimoniol-pfp" src={k}></img>
                        </a>
                        <div className='flexcolumn'>
                           <a className='nostyle' href={link}>
                              <span className='about-us-testimonial-name'>
                                 Kandi Firestone
                              </span>
                           </a>
                           <span>2/22/22</span>
                        </div>
                     </div>
                     <div>
                        <Star /><Star /><Star /><Star /><Star />
                     </div>
                     <div>
                        <span className=''>
                           We recently purchased a vehicle with/for our daughter, and we couldn't be more pleased with the experience here.
                           Stephanie and Jason were upfront about the vehicles on their lot, patiently answered about a zillion of our questions, and worked with us on financing to get the perfect car for our girl.
                           Honestly, they have gone above and beyond what we ever would've expected from a used car dealership.
                           We've had the vehicle for a little over a month now and have had no issues.
                           Our daughter has even taken it on a 7 hour road trip, and it drove beautifully.
                           Jason and Stephanie are honest, accommodating, knowledgeable, and just all-around good people.
                           We definitely would purchase another through them 🙂</span>
                        <hr />
                     </div>
                  </div>
               </div>
               <div className='about-us-testimonial-container'>
                  <div style={{ backgroundColor: '#0000000a', borderRadius: '10px', }}>
                     <div className="about-us-testimonial-pic-container">
                        <a href={link}>
                           <img className="about-us-testimoniol-pfp" src={t}></img>
                        </a>
                        <div className='flexcolumn'>
                           <a className='nostyle' href={link}>
                              <span className='about-us-testimonial-name'>
                                 Tatum Salter
                              </span>
                           </a>
                           <span>2/22/22</span>
                        </div>
                     </div>
                     <div>
                        <Star /><Star /><Star /><Star /><Star />
                     </div>
                     <div>
                        <span className=''>
                           Recently bought a car from here, and they were so helpful and kind! Worked with me after my wreck to make sure I had the right car for me! Put a new battery in it and had it checked by a mechanic to make sure that the car didn’t need any major work and then told me up front what needed done to the car like a new air filter the smallest things they were super up front with and were honest and truthful about. COULDNT HAVE ASKED FOR A BETTER EXPERIENCE!!!! recommend over and over such kind hearted people !</span>
                        <hr />
                     </div>
                  </div>
               </div>
               <div className='about-us-testimonial-container'>
                  <div style={{ backgroundColor: '#0000000a', borderRadius: '10px', }}>
                     <div className="about-us-testimonial-pic-container">
                        <a className='' href={link}>
                           <img className="about-us-testimoniol-pfp " src={t}></img>
                        </a>
                        <div className='flexcolumn'>
                           <a className='nostyle' href={link}>
                              <span className='about-us-testimonial-name '>
                                 Terry Manley
                              </span>
                           </a>
                           <span>2/22/22</span>
                        </div>
                     </div>
                     <div>
                        <Star /><Star /><Star /><Star /><Star />
                     </div>
                     <div>
                        <span className=''>
                           Oh my goodness I cannot tell more people that they should go to them to get a car they shopped every week for us a car until they found one that they knew that I would love they brought it back and they told me about it they were so patient because we've picked out three or four before that and every one of them sold out from underneath this so we were just waiting and through their prayers and ours and patients with all of it we finally found a vehicle and within 3 hours we walked out the door with it it was the most amazing experience they are the most amazing people easiest people we've ever worked with I hope and pray every day that God blesses them amazingly Jason and Stephanie we love you
                           PS...
                           <br />
                           IF PENSACOLA EVER LOSES JASON AND STEPHANIE FROM NON-MOTORS THEY ARE GOING TO BE SO SORRY BECAUSE THEY WOULD GENERATE SO MUCH AMAZING GREAT HONEST BUSINESS FOR THIS AREA SOMEBODY NEEDS TO OFFER THEM SOMETHING GREAT SO THEY'LL STAY HERE IN THIS AREA FOR A LONG TIME AND KEEP SELLING WONDERFUL CARS WITH THEIR HONEST AND AMAZING SERVICE</span>
                        <hr />
                     </div>
                  </div>
               </div>
            </section>
         </div>
      </div>
   )
}

export default AboutUs
