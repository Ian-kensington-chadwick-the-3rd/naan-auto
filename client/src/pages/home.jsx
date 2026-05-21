import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useState, useEffect } from 'react'
import carView from '../assets/carview.jpg'
import frontLot from '../assets/frontlot.jpg'
import naanSign from '../assets/naansign.jpg'


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
                <script type="application/ld+json">{JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": [
                        {
                            "@type": "Question",
                            "name": "Do you offer financing?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Yes. We finance through Credit Acceptance, making approval accessible even with challenged credit. The average down payment is around $2,500, but depending on your situation you could drive away with nothing down. Apply online or come in and we'll walk you through your options — no pressure."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "What warranty do your vehicles come with?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Most vehicles we sell come with a 3-month / 3,000-mile limited powertrain warranty so you can drive away with confidence. We stand behind every car on our lot."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "What are your business hours?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "We are open Monday 11:00 AM – 5:00 PM, Tuesday 12:00 PM – 5:00 PM, Wednesday through Friday 11:00 AM – 5:00 PM, and Saturday and Sunday by appointment. Call us at 850-861-5000."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "Where is Naan Auto located?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "We are located at 4327 Gulf Breeze Parkway, Gulf Breeze, FL 32563 — just minutes from Pensacola. Call us at 850-861-5000."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "What areas does Naan Auto serve?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "We serve Gulf Breeze, Pensacola, Navarre, Pace, Milton, Fort Walton Beach, Destin, Niceville, Crestview, Freeport, and the entire Florida Panhandle including Santa Rosa and Escambia County."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "How much is the down payment?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "The average down payment is around $2,500, but depending on your credit situation you may qualify for no money down. We work with Credit Acceptance to find the best financing option for you."
                            }
                        }
                    ]
                })}</script>
                <title>Naan Auto | Used Car Dealership in Gulf Breeze, FL</title>
                <meta name="description" content="Naan Auto is a family-owned used car dealership in Gulf Breeze, FL. Quality pre-owned vehicles with flexible financing through Credit Acceptance — as low as $0 down. 3-month/3,000-mile warranty. Serving Pensacola, Navarre, Pace, Milton, Fort Walton Beach, Destin, Niceville, Crestview, and all of Santa Rosa and Escambia County. Call 850-861-5000." />
                <meta name="keywords" content="used cars Gulf Breeze FL, pre-owned cars Gulf Breeze FL, used car dealership Pensacola FL, used cars Navarre FL, used cars Pace FL, used cars Milton FL, used cars Fort Walton Beach FL, used cars Destin FL, used cars Niceville FL, used cars Crestview FL, used cars Freeport FL, Santa Rosa County used cars, Escambia County used cars, buy used car Northwest Florida, affordable used cars Florida Panhandle, used cars near me Pensacola, cheap used cars Pensacola FL, military car dealer Pensacola, NAS Pensacola used cars, used trucks Gulf Breeze, used SUV Gulf Breeze, Naan Auto, car dealer Gulf Breeze, family owned car dealer Gulf Breeze, used car financing Gulf Breeze FL, auto financing Pensacola FL, bad credit car loans Gulf Breeze, no credit car financing Florida Panhandle, Credit Acceptance dealer Gulf Breeze, low down payment used cars Pensacola, Credit Acceptance financing Gulf Breeze FL, car warranty Gulf Breeze FL, powertrain warranty used car Florida, used cars 32563, used cars 32561, used pickup trucks Gulf Breeze FL, used trucks Pensacola FL, used SUV Pensacola FL, used family SUV Gulf Breeze, used cars under 10000 Pensacola, used cars under 15000 Gulf Breeze, second chance auto financing Pensacola, auto loan approval Gulf Breeze FL, no money down car dealer Florida Panhandle, Naan Auto reviews, naanauto.com, car dealerships near me Gulf Breeze, used car lots Gulf Breeze FL, pre-owned trucks Florida Panhandle, used sedans Gulf Breeze FL, vehicle financing Gulf Breeze FL, used cars Santa Rosa County FL" />
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
                <meta property="og:description" content="Family-owned used car dealership in Gulf Breeze, FL. Affordable used cars, trucks, and SUVs with flexible financing through Credit Acceptance — as low as $0 down. Serving Pensacola, Navarre, Pace, Milton, Fort Walton Beach, Destin, Niceville, and Crestview." />
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
                <meta name="twitter:description" content="Family-owned used car dealership in Gulf Breeze, FL. Flexible financing through Credit Acceptance, as low as $0 down. Affordable used cars, trucks, and SUVs. Serving Pensacola, Navarre, Pace, Milton, Fort Walton Beach, and Destin." />
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
                        <button
                            className="home-cta-secondary"
                            onClick={() => document.getElementById('financing').scrollIntoView({ behavior: 'smooth' })}
                        >
                            Financing Info
                        </button>
                    </div>
                    <p className="home-hero-footnote parkinsans">
                        Don't see what you're looking for? <Link to="/contactUs" className="home-hero-footnote-link">Reach out</Link> — we'll help you find the right vehicle.
                    </p>
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

                <section className="home-financing" id="financing">
                    <h2 className="home-financing-title">Financing & Warranty</h2>
                    <p className="home-financing-sub parkinsans">
                        We believe everyone deserves a fair shot at reliable transportation — regardless of your credit history.
                    </p>
                    <div className="home-financing-cards">
                        <div className="home-financing-card">
                            <div className="home-financing-card-icon">$</div>
                            <h3 className="home-financing-card-title">Flexible Financing</h3>
                            <p className="home-financing-card-text parkinsans">
                                We finance through Credit Acceptance, making approval more accessible than you'd expect.
                                The average down payment is around $2,500 — but depending on your situation, you could
                                drive away with nothing down at all. Come in or apply online and we'll walk you through your options, no pressure.
                            </p>
                            <a href="https://www.accreditapp.com/ACCreditApp.aspx?ACCFX=124945o17730" target="_blank" rel="noopener noreferrer">
                                <button className="home-cta-primary home-financing-apply-btn">Apply for Financing</button>
                            </a>
                        </div>
                        <div className="home-financing-card">
                            <div className="home-financing-card-icon">✓</div>
                            <h3 className="home-financing-card-title">Vehicle Warranty</h3>
                            <p className="home-financing-card-text parkinsans">
                                Most vehicles we sell come with a 3-month / 3,000-mile limited powertrain warranty so you
                                can drive away with confidence. We stand behind every car on our lot — if something isn't
                                right, we'll make it right.
                            </p>
                        </div>
                    </div>
                    <p className="home-financing-cta parkinsans">
                        Questions about financing? Give us a call at{' '}
                        <a href="tel:+18508615000" className="home-phone-link">850-861-5000</a> — we're happy to walk you through your options.
                    </p>
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
                        <strong>Fridays at 6:00 PM</strong> &mdash; stop by the lot or give us a call at{' '}
                        <a href="tel:+18508615000" className="home-phone-link">850-861-5000</a> for details.
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
