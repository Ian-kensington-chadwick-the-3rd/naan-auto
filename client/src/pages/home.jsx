import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useState, useEffect } from 'react'
import naanAutoLogo from '../assets/naannewlogo.jpg'
import carView from '../assets/carview.jpg'
import frontLot from '../assets/frontlot.jpg'
import naanSign from '../assets/naansign.jpg'
// Add your carousel images here:
// import heroImg1 from '../assets/hero1.jpg'
// import heroImg2 from '../assets/hero2.jpg'
// import heroImg3 from '../assets/hero3.jpg'

const carouselImages = [
frontLot,
naanSign,
carView 
]

const HomeCarousel = () => {
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(prev => (prev + 1) % carouselImages.length)
        }, 4000)
        return () => clearInterval(timer)
    }, [])

    const prev = () => setCurrent(c => (c - 1 + carouselImages.length) % carouselImages.length)
    const next = () => setCurrent(c => (c + 1) % carouselImages.length)

    return (
        <div className="home-carousel">
            {carouselImages.map((img, i) => (
                <img
                    key={i}
                    src={img}
                    alt={`Naan Auto Gulf Breeze FL slide ${i + 1}`}
                    className={`home-carousel-img${i === current ? ' active' : ''}`}
                />
            ))}
            <button className="home-carousel-arrow left" onClick={prev} aria-label="Previous slide">&#8249;</button>
            <button className="home-carousel-arrow right" onClick={next} aria-label="Next slide">&#8250;</button>
            <div className="home-carousel-dots">
                {carouselImages.map((_, i) => (
                    <button
                        key={i}
                        className={`home-carousel-dot${i === current ? ' active' : ''}`}
                        onClick={() => setCurrent(i)}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Naan Auto | Used Car Dealership in Gulf Breeze, FL</title>
                <meta name="description" content="Naan Auto is a family-owned used car dealership in Gulf Breeze, FL serving Pensacola, Navarre, Pace, Milton, Fort Walton Beach, Destin, Niceville, Crestview, and all of Santa Rosa and Escambia County. Quality pre-owned vehicles, honest pricing, no gimmicks. Military friendly. Call 850-861-5000." />
                <meta name="keywords" content="used cars Gulf Breeze FL, pre-owned cars Gulf Breeze FL, used car dealership Pensacola FL, used cars Navarre FL, used cars Pace FL, used cars Milton FL, used cars Fort Walton Beach FL, used cars Destin FL, used cars Niceville FL, used cars Crestview FL, used cars Freeport FL, Santa Rosa County used cars, Escambia County used cars, buy used car Northwest Florida, affordable used cars Florida Panhandle, used cars near me Pensacola, cheap used cars Pensacola FL, military car dealer Pensacola, NAS Pensacola used cars, used trucks Gulf Breeze, used SUV Gulf Breeze, Naan Auto, car dealer Gulf Breeze, family owned car dealer Gulf Breeze" />
                <meta name="robots" content="index, follow" />
                <meta name="author" content="Naan Auto" />
                <meta name="theme-color" content="#e95918" />

                {/* Geo tags - local SEO */}
                <meta name="geo.region" content="US-FL" />
                <meta name="geo.placename" content="Gulf Breeze, Florida" />
                <meta name="geo.position" content="30.3929398;-87.0428434" />
                <meta name="ICBM" content="30.3929398, -87.0428434" />

                {/* Open Graph */}
                <meta property="og:title" content="Naan Auto | Used Car Dealership in Gulf Breeze, FL" />
                <meta property="og:description" content="Family-owned used car dealership in Gulf Breeze, FL. Quality used cars, honest pricing, no gimmicks. Serving Pensacola and surrounding areas." />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Naan Auto" />
                <meta property="og:url" content="https://naanauto.com" />
                <meta property="og:image" content="https://naanauto.com/logo.PNG" />
                <meta property="og:image:alt" content="Naan Auto - Used Car Dealership Gulf Breeze FL" />
                <meta property="og:image:width" content="800" />
                <meta property="og:image:height" content="600" />
                <meta property="og:locale" content="en_US" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Naan Auto | Used Car Dealership in Gulf Breeze, FL" />
                <meta name="twitter:description" content="Family-owned used car dealership in Gulf Breeze, FL. Quality used cars, honest pricing, no gimmicks." />
                <meta name="twitter:image" content="https://naanauto.com/logo.PNG" />
                <meta name="twitter:image:alt" content="Naan Auto - Used Car Dealership Gulf Breeze FL" />

                {/* Mobile */}
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-title" content="Naan Auto" />
                <meta name="format-detection" content="telephone=yes" />

                <link rel="canonical" href="https://naanauto.com" />
            </Helmet>

            <div className="home-container">
                <section className="home-hero">
                    <HomeCarousel />
                    <h1 className="home-h1">Used Cars for Sale in Gulf Breeze, FL</h1>
                    <p className="home-subheading parkinsans">
                        Family-owned dealership serving Gulf Breeze, Pensacola, and the surrounding communities.
                        Honest pricing, quality vehicles, no gimmicks.
                    </p>
                    <p className="home-brand-name">Naan Auto</p>
                    <div className="home-cta-group">
                        <Link to="/inventory">
                            <button className="home-cta-primary">Browse Inventory</button>
                        </Link>
                        <Link to="/contactUs">
                            <button className="home-cta-secondary">Contact Us</button>
                        </Link>
                    </div>
                </section>

                <section className="home-features">
                    <div className="home-feature-card">
                        <h2 className="home-feature-title">Family Owned</h2>
                        <p className="home-feature-text parkinsans">
                            Jason and Stephanie treat every customer like family. We're not a big lot — we're people who care about getting you into the right car.
                        </p>
                    </div>
                    <div className="home-feature-card">
                        <h2 className="home-feature-title">Honest Pricing</h2>
                        <p className="home-feature-text parkinsans">
                            No hidden fees, no bait-and-switch. We tell you everything about a vehicle upfront so you can make a confident decision.
                        </p>
                    </div>
                    <div className="home-feature-card">
                        <h2 className="home-feature-title">Quality Vehicles</h2>
                        <p className="home-feature-text parkinsans">
                            We only put cars on our lot that we'd feel good putting our own family in. Quality you can trust, at a price that makes sense.
                        </p>
                    </div>
                </section>

                <section className="home-service-area">
                    <h2 className="home-service-area-title">Serving the Florida Panhandle</h2>
                    <p className="home-service-area-text parkinsans">
                        Based right here in Gulf Breeze, we've had the privilege of selling to customers who've made
                        the drive from Navarre, Pensacola, Pace, Milton, Fort Walton Beach, Destin, Niceville,
                        Crestview, and beyond. Word travels — buyers across Santa Rosa and Escambia County have found
                        it worth the trip for honest pricing and no dealership runaround. Wherever you're coming from
                        across the Panhandle, we'd love to earn your business too.
                    </p>
                    <div className="home-service-area-tags">
                        <span>Gulf Breeze</span><span>Navarre</span><span>Pensacola</span>
                        <span>Pace</span><span>Milton</span><span>Fort Walton Beach</span>
                        <span>Destin</span><span>Niceville</span><span>Crestview</span>
                        <span>Santa Rosa County</span><span>Escambia County</span>
                    </div>
                </section>

                <section className="home-bible-study">
                    <div className="home-bible-study-accent" aria-hidden="true">✝</div>
                    <h2 className="home-bible-study-title">Friday Fellowship</h2>
                    <p className="home-bible-study-text parkinsans">
                        Faith is at the heart of everything we do here at Naan Auto. Every Friday we host a fellowship
                        open to anyone who wants to come customers, neighbors, or anyone just looking for community.
                        Whether you've been going to church your whole life or you're just curious, you're welcome here.
                    </p>
                    <p className="home-bible-study-detail parkinsans">
                        <strong>Fridays</strong> &mdash; stop by the lot or give us a call at{' '}
                        <a href="tel:+18508615000" className="home-phone-link">850-861-5000</a> for time and details.
                    </p>
                </section>

                <section className="home-location">
                    <h2 className="home-location-title">Visit Us in Gulf Breeze, FL</h2>
                    <p className="parkinsans home-location-text">
                        Located at <strong>4327 Gulf Breeze Parkway, Gulf Breeze FL 32563</strong> — just minutes from Pensacola.
                        Give us a call at <a href="tel:+18508615000" className="home-phone-link">850-861-5000</a> or stop by during business hours.
                    </p>
                    <Link to="/inventory">
                        <button className="home-cta-primary">See Available Cars</button>
                    </Link>
                </section>
            </div>
        </div>
    )
}

export default Home
