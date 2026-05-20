import Star from '../components/star.jsx'
import j from '../assets/j.png'
import t from '../assets/t.png'
import k from '../assets/k.png'
import { Helmet } from 'react-helmet'
const AboutUs = () => {
   const link = 'https://www.google.com/search?sca_esv=032488618a09524f&rlz=1C1CHBD_enUS1074US1074&sxsrf=AHTn8zram3_JQ1Ex7bfoNfDHG30Up7Bt-w:1746221079952&si=APYL9bs7Hg2KMLB-4tSoTdxuOx8BdRvHbByC_AuVpNyh0x2Kzb9PppLXBpZHDenjDN68weFQ3SikW2F8uhgkI9RZtwVMEp4Ar85yHgbEPtaFVy1HmE96EgwsZejyLZ_k27Z9eay7Kd_G&q=NAAN+Auto+Reviews&sa=X&ved=2ahUKEwjR1K253IWNAxWxKFkFHVeXEhgQ0bkNegQILBAD&biw=1920&bih=957&dpr=1'

   const reviews = [
      {
         img: j,
         name: 'Justin Redd',
         text: 'We went to the lot very polite and professional owners vehicles are very clean maintained we even had an issue occur with the car they asked for receipts they took off the price. Nothing major but they want to help and make things right without hassel or anything. They are willing to work with customers and very professional with their job they tell you everything with the vehicle upfront. I highly recommend this lot to anyone needing a vehicle there\'s no loop around gimmicks strait upfront and reasonable prices.'
      },
      {
         img: t,
         name: 'Thedream Craftlife',
         text: 'This is possibly the best dealer I have dealt with in all my 68 years. The car was as they said and the price and terms were very good! We have put 10,000 miles on the car in the last 7 months and have only had to change the engine oil and filter. Jason and his wife are very honest. I can\'t recommend them enough!!! I will go back to them for our cars from now on!'
      },
      {
         img: k,
         name: 'Kandi Firestone',
         text: 'We recently purchased a vehicle with/for our daughter, and we couldn\'t be more pleased with the experience here. Stephanie and Jason were upfront about the vehicles on their lot, patiently answered about a zillion of our questions, and worked with us on financing to get the perfect car for our girl. Honestly, they have gone above and beyond what we ever would\'ve expected from a used car dealership. We\'ve had the vehicle for a little over a month now and have had no issues. Our daughter has even taken it on a 7 hour road trip, and it drove beautifully. Jason and Stephanie are honest, accommodating, knowledgeable, and just all-around good people. We definitely would purchase another through them 🙂'
      },
      {
         img: t,
         name: 'Tatum Salter',
         text: 'Recently bought a car from here, and they were so helpful and kind! Worked with me after my wreck to make sure I had the right car for me! Put a new battery in it and had it checked by a mechanic to make sure that the car didn\'t need any major work and then told me up front what needed done to the car like a new air filter the smallest things they were super up front with and were honest and truthful about. COULDNT HAVE ASKED FOR A BETTER EXPERIENCE!!!! recommend over and over such kind hearted people!'
      },
      {
         img: t,
         name: 'Terry Manley',
         text: 'Oh my goodness I cannot tell more people that they should go to them to get a car they shopped every week for us a car until they found one that they knew that I would love they brought it back and they told me about it they were so patient because we\'ve picked out three or four before that and every one of them sold out from underneath this so we were just waiting and through their prayers and ours and patients with all of it we finally found a vehicle and within 3 hours we walked out the door with it it was the most amazing experience they are the most amazing people easiest people we\'ve ever worked with I hope and pray every day that God blesses them amazingly Jason and Stephanie we love you.'
      },
   ]

   return (
      <div>
         <Helmet>
            <script type="application/ld+json">{JSON.stringify({
               "@context": "https://schema.org",
               "@type": "AutoDealer",
               "name": "Naan Auto",
               "url": "https://naanauto.com",
               "telephone": "+1-850-861-5000",
               "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "4327 Gulf Breeze Parkway",
                  "addressLocality": "Gulf Breeze",
                  "addressRegion": "FL",
                  "postalCode": "32563",
                  "addressCountry": "US"
               },
               "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "5",
                  "reviewCount": "5",
                  "bestRating": "5",
                  "worstRating": "1"
               },
               "review": [
                  {
                     "@type": "Review",
                     "author": { "@type": "Person", "name": "Justin Redd" },
                     "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                     "reviewBody": "Very polite and professional owners, vehicles are very clean and maintained. They want to help and make things right without hassle. Straight upfront and reasonable prices."
                  },
                  {
                     "@type": "Review",
                     "author": { "@type": "Person", "name": "Thedream Craftlife" },
                     "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                     "reviewBody": "This is possibly the best dealer I have dealt with in all my 68 years. The car was as they said and the price and terms were very good. Jason and his wife are very honest. I can't recommend them enough!"
                  },
                  {
                     "@type": "Review",
                     "author": { "@type": "Person", "name": "Kandi Firestone" },
                     "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                     "reviewBody": "Stephanie and Jason were upfront about the vehicles, patiently answered all our questions, and worked with us on financing. They have gone above and beyond what we ever would have expected from a used car dealership."
                  },
                  {
                     "@type": "Review",
                     "author": { "@type": "Person", "name": "Tatum Salter" },
                     "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                     "reviewBody": "Recently bought a car from here, and they were so helpful and kind! They were super up front and honest about everything. COULDN'T HAVE ASKED FOR A BETTER EXPERIENCE!"
                  },
                  {
                     "@type": "Review",
                     "author": { "@type": "Person", "name": "Terry Manley" },
                     "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                     "reviewBody": "I cannot tell more people that they should go to them to get a car. They are the most amazing people, easiest people we have ever worked with. Jason and Stephanie are amazing."
                  }
               ]
            })}</script>
            <title>About Us | Naan Auto - Used Car Dealership in Gulf Breeze, FL</title>
            <meta name="description" content="Learn about Naan Auto, a family-owned used car dealership in Gulf Breeze, FL serving Pensacola, Navarre, Fort Walton Beach, Destin, Niceville, Crestview, Freeport, and the Florida Panhandle. Honest, trustworthy service with no gimmicks." />
            <meta name="keywords" content="about Naan Auto, family owned car dealership Gulf Breeze FL, used car dealer Pensacola, honest car dealership Florida Panhandle, used cars Navarre, used cars Fort Walton Beach, used cars Destin, used cars Niceville, used cars Crestview, used cars Freeport" />
            <meta name="robots" content="index, follow" />
            <meta name="author" content="Naan Auto" />
            <meta name="theme-color" content="#e95918" />
            <meta name="geo.region" content="US-FL" />
            <meta name="geo.placename" content="Gulf Breeze, Florida" />
            <meta name="geo.position" content="30.3929398;-87.0428434" />
            <meta name="ICBM" content="30.3929398, -87.0428434" />
            <meta property="og:title" content="About Naan Auto - Family-Owned Used Car Dealer in Gulf Breeze, FL" />
            <meta property="og:description" content="Family-owned used car dealership in Gulf Breeze, FL. Jason and Stephanie are committed to honest, trustworthy service for customers in Pensacola and beyond." />
            <meta property="og:site_name" content="Naan Auto" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://naanauto.com/aboutUs" />
            <meta property="og:image" content="https://naanauto.com/logo.PNG" />
            <meta property="og:image:alt" content="Naan Auto - Family-Owned Used Car Dealership Gulf Breeze FL" />
            <meta property="og:locale" content="en_US" />
            <link rel="canonical" href="https://naanauto.com/aboutUs" />
            <link rel="preload" href="./assets/pexelsfinal.webp" as="image" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="About Naan Auto - Family-Owned Used Car Dealer in Gulf Breeze, FL" />
            <meta name="twitter:description" content="Family-owned used car dealership in Gulf Breeze, FL. Honest, trustworthy service with no gimmicks." />
            <meta name="twitter:image" content="https://naanauto.com/logo.PNG" />
            <meta name="twitter:image:alt" content="Naan Auto - Family-Owned Used Car Dealership Gulf Breeze FL" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-title" content="Naan Auto" />
            <meta name="format-detection" content="telephone=yes" />
         </Helmet>

         <section className='about-us-headerpic'>
            <div className="about-us-hero-overlay">
               <h1 className="about-us-hero-title">About Us</h1>
            </div>
         </section>

         <div className="about-us_container">
            <section className="about-us_background_l">
               <div className="about-us-story">
                  <h2 className="about-us-section-title">Our Story</h2>
                  <p className="about-us_text parkinsans">At Naan Auto we're a Montana originated dealership, built on family values, trust, God, and a heart for serving others. We are here to find you the right vehicle for every stage of life, from your first car to a growing family's SUV.</p>
                  <p className="about-us_text parkinsans">We know that buying a car isn't just a transaction — it's about safety, reliability, and finding something that fits your lifestyle. That's why we treat every customer like family, offering personalized service, dependable vehicles, and honest advice you can count on.</p>
                  <span className="about-us-signature">— Jason &amp; Stephanie</span>
               </div>
            </section>

            <section className="about-us_background_r">
               <h2 className="about-us-section-title">Customer Reviews</h2>
               {reviews.map((review, i) => (
                  <div key={i} className="about-us-review-card">
                     <div className="about-us-testimonial-pic-container">
                        <a href={link}>
                           <img className="about-us-testimoniol-pfp" src={review.img} alt={review.name} />
                        </a>
                        <div className="about-us-reviewer-info">
                           <a className="nostyle" href={link}>
                              <span className="about-us-testimonial-name">{review.name}</span>
                           </a>
                           <div className="about-us-stars">
                              <Star /><Star /><Star /><Star /><Star />
                           </div>
                        </div>
                     </div>
                     <p className="about-us-testimonial-text">{review.text}</p>
                  </div>
               ))}
            </section>
         </div>
      </div>
   )
}

export default AboutUs
