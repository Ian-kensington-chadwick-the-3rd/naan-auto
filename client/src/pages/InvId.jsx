import { Link, useParams } from "react-router-dom";
import { FIND_CAR } from "../utils/querys";
import { useQuery } from '@apollo/client'
import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import GoogleMaps from './../components/googlemaps'
import Ripple from '../components/loading.jsx'

const InvId = () => {
    // use the useParams hook to extract data from the specific id 
    const { Id } = useParams();
    const { loading, error, data } = useQuery(FIND_CAR, { variables: { id: Id } });
    const [slideIndex, setSlideIndex] = useState(0);

    const cars = data?.findCar || [];

    let dataImg = data?.findCar[0]?.imageUrl;

    const arrayLength = cars[0]?.imageUrl?.length;
    const setIndexForwards = () => {
        setSlideIndex((prevIndex) =>
            prevIndex === arrayLength - 1 ? 0 : prevIndex + 1);
    }

    const setIndexBackwards = () => {
        setSlideIndex((prevIndex) =>
            prevIndex === 0 ? arrayLength - 1 : prevIndex - 1);
    }

    const jumpToIndex = (index) => {
        setSlideIndex(index);
    }



    const [stickyHeader, setStickyHeader] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY >= 120) {
                setStickyHeader(true);
            } else {
                setStickyHeader(false);
            }
        }
        window.addEventListener('resize', onscroll)
        window.addEventListener('scroll', onScroll);
        return () => { window.removeEventListener('click', onScroll); window.removeEventListener('resize', onscroll); }
    }, [stickyHeader])

    const [tabletAndUnderVw, setTabletAndUnderVw] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const tabletUnderVw = () => {
            if (window.innerWidth <= 768) {
                setTabletAndUnderVw(true);
            } else {
                setTabletAndUnderVw(false)
            }
        }
        window.addEventListener('scroll', tabletUnderVw);
        window.addEventListener('resize', tabletUnderVw);

        return () => { window.removeEventListener('scroll', tabletUnderVw); window.removeEventListener('resize', tabletUnderVw); }
    }, [tabletAndUnderVw])

    // css conditionals
    const HeaderTabletUnderVw = stickyHeader && tabletAndUnderVw ?
        `vehicle-info-top position-fixed fixedinfo-invid` : " vehicle-info-top"

    const HeaderTabletOverVw = stickyHeader && " vehicle-info-top  position-fixed"
    // if sticky header true add 


    const pictureSpaceTabletUnderVw = stickyHeader && tabletAndUnderVw ? "stickyheadertopspaceundertabletvw picture-container " : "   picture-container  "

    const pictuerSpaceTabletOverVw = stickyHeader && !tabletAndUnderVw ?
        "stickyheadertopspaceovertabletvw" : ''
    // add 20vh if tablet and sticky header true
    // else add
    const swipeStartX = useRef(null);

    const onSwipeTouchStart = (e) => {
        swipeStartX.current = e.touches[0].clientX;
    };

    const onSwipeTouchEnd = (e) => {
        if (swipeStartX.current === null) return;
        const delta = e.changedTouches[0].clientX - swipeStartX.current;
        swipeStartX.current = null;
        if (delta < -40) setIndexForwards();
        else if (delta > 40) setIndexBackwards();
    };

    const draggingRef = useRef(false);
    const startXRef = useRef(0);
    const startOffsetRef = useRef(0);
    const offsetRef = useRef(0);

    const pictureRef = useRef(null);
    const outerPictureRef = useRef(null);

    useEffect(() => {
        offsetRef.current = 0;
        if (pictureRef.current) {
            pictureRef.current.style.transition = 'none';
            pictureRef.current.style.transform = 'translateX(0px)';
        }
    }, [dataImg]);

    const touchStart = (e) => {
        if (!tabletAndUnderVw) return;
        draggingRef.current = true;
        startXRef.current = e.touches[0].pageX;
        startOffsetRef.current = offsetRef.current;
    };

    const draggingPic = (e) => {
        if (!draggingRef.current || !pictureRef.current || !outerPictureRef.current) return;
        const delta = e.touches[0].pageX - startXRef.current;
        const parentWidth = outerPictureRef.current.offsetWidth;
        const stripWidth = pictureRef.current.scrollWidth;
        const maxOffset = Math.min(0, parentWidth - stripWidth);
        const newOffset = Math.max(maxOffset, Math.min(0, startOffsetRef.current + delta));
        offsetRef.current = newOffset;
        pictureRef.current.style.transition = 'none';
        pictureRef.current.style.transform = `translateX(${newOffset}px)`;
    };

    const touchEnd = () => {
        draggingRef.current = false;
        if (pictureRef.current) {
            pictureRef.current.style.transition = 'transform 0.15s ease-out';
        }
    };


    


    if (loading) return <Ripple/>;
    if (error) return <p>Error: {error.message}</p>;


    const car = cars[0];

    return (
        <section>
            {car && (
                <Helmet>
                    <script type="application/ld+json">{JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://naanauto.com" },
                            { "@type": "ListItem", "position": 2, "name": "Inventory", "item": "https://naanauto.com/inventory" },
                            { "@type": "ListItem", "position": 3, "name": `${car.year} ${car.make} ${car.model}`, "item": `https://naanauto.com/inventory/${car._id}` }
                        ]
                    })}</script>
                    <script type="application/ld+json">{JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Vehicle",
                        "name": `${car.year} ${car.make} ${car.model}`,
                        "brand": { "@type": "Brand", "name": car.make },
                        "model": car.model,
                        "vehicleModelDate": String(car.year),
                        "mileageFromOdometer": { "@type": "QuantitativeValue", "value": car.mileage, "unitCode": "SMI" },
                        "driveWheelConfiguration": car.drivetrain,
                        "vehicleTransmission": car.trans,
                        "fuelType": car.fuelType,
                        "color": car.exteriorColor,
                        "vehicleInteriorColor": car.interiorColor,
                        "vehicleIdentificationNumber": car.vin,
                        "description": car.description,
                        "image": car.imageUrl?.[0] || "https://naanauto.com/logo.PNG",
                        "offers": {
                            "@type": "Offer",
                            "price": car.price,
                            "priceCurrency": "USD",
                            "availability": car.sold ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
                            "url": `https://naanauto.com/inventory/${car._id}`,
                            "seller": {
                                "@type": "AutoDealer",
                                "name": "Naan Auto",
                                "address": {
                                    "@type": "PostalAddress",
                                    "streetAddress": "4327 Gulf Breeze Parkway",
                                    "addressLocality": "Gulf Breeze",
                                    "addressRegion": "FL",
                                    "postalCode": "32563",
                                    "addressCountry": "US"
                                }
                            }
                        }
                    })}</script>
                    <title>{`${car.year} ${car.make} ${car.model}${car.trim ? ` ${car.trim}` : ''} - Used Cars Gulf Breeze FL | Naan Auto`}</title>
                    <meta name="description" content={`${car.year} ${car.make} ${car.model}${car.trim ? ` ${car.trim}` : ''} for sale at Naan Auto in Gulf Breeze, FL. ${car.mileage} miles, ${car.trans}, ${car.exteriorColor}. Serving Pensacola, Navarre, Fort Walton Beach, Destin, Niceville, Crestview, and the Florida Panhandle.`} />
                    <meta name="keywords" content={`${car.year} ${car.make} ${car.model}${car.trim ? ` ${car.trim}` : ''} for sale, used ${car.make} Gulf Breeze FL, used ${car.make} Pensacola, used cars Navarre FL, used cars Fort Walton Beach, used cars Destin FL, used cars Niceville FL, used cars Crestview FL, used cars Freeport FL, Florida Panhandle used cars`} />
                    <meta name="robots" content="index, follow" />
                    <meta name="author" content="Naan Auto" />
                    <meta name="theme-color" content="#e95918" />
                    <meta name="geo.region" content="US-FL" />
                    <meta name="geo.placename" content="Gulf Breeze, Florida" />
                    <meta name="geo.position" content="30.3929398;-87.0428434" />
                    <meta name="ICBM" content="30.3929398, -87.0428434" />
                    <meta property="og:title" content={`${car.year} ${car.make} ${car.model} | Naan Auto - Gulf Breeze, FL`} />
                    <meta property="og:description" content={`${car.year} ${car.make} ${car.model} for sale at Naan Auto in Gulf Breeze, FL. ${car.mileage} miles, ${car.trans}, ${car.exteriorColor}.`} />
                    <meta property="og:type" content="website" />
                    <meta property="og:site_name" content="Naan Auto" />
                    <meta property="og:image" content={car.imageUrl?.[0] || "https://naanauto.com/logo.PNG"} />
                    <meta property="og:image:alt" content={`${car.year} ${car.make} ${car.model} for sale at Naan Auto`} />
                    <meta property="og:locale" content="en_US" />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={`${car.year} ${car.make} ${car.model} | Naan Auto - Gulf Breeze, FL`} />
                    <meta name="twitter:description" content={`${car.year} ${car.make} ${car.model} for sale at Naan Auto in Gulf Breeze, FL. ${car.mileage} miles, ${car.trans}.`} />
                    <meta name="twitter:image" content={car.imageUrl?.[0] || "https://naanauto.com/logo.PNG"} />
                    <meta name="twitter:image:alt" content={`${car.year} ${car.make} ${car.model} for sale at Naan Auto`} />
                    <meta name="mobile-web-app-capable" content="yes" />
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta name="apple-mobile-web-app-title" content="Naan Auto" />
                    <meta name="format-detection" content="telephone=yes" />
                    <link rel="canonical" href={`https://naanauto.com/inventory/${car._id}`} />
                </Helmet>
            )}
            <div className="car-details-container">
                <div className={`${HeaderTabletUnderVw}  ${HeaderTabletOverVw}`} >
                    {cars.map((car) => (
                        [<div className="info-top-left"><p >{car.year} {car.make} {car.model}{car.trim ? ` ${car.trim}` : ''} </p> </div>,
                        <div className="info-top-right"><p> ${car.price}</p></div>]
                    ))}
                </div>
                <section className="center-dup">
                    <section className="invid-main">
                        <div className={`${pictureSpaceTabletUnderVw} ${pictuerSpaceTabletOverVw}`}>
                            <div className="slideshow-container" onTouchStart={onSwipeTouchStart} onTouchEnd={onSwipeTouchEnd}>
                            {cars[0].sold === true && <span className="sold" style={{zIndex:'1',fontSize:'100px'}}>SOLD</span>}
                                <div className="slide-wrapper" style={{ transform: `translateX(-${slideIndex * 100}%)`, position:'relative' }}>
                                    {dataImg?.map((src, index) => (
                                        <img key={index} src={src} alt={`${car.year} ${car.make} ${car.model} - Naan Auto Gulf Breeze FL photo ${index + 1}`} />
                                    ))}
                                </div>
                                <button className="slider-button left" onClick={() => setIndexBackwards()}>&#60;</button>
                                <button className="slider-button right" onClick={() => setIndexForwards()}>&#62;</button>
                            </div>
                            <div className="picture-list " ref={outerPictureRef} >
                                <div className="img-wrapper" ref={pictureRef}
                                    onTouchStart={touchStart}
                                    onTouchMove={draggingPic}
                                    onTouchEnd={touchEnd}
                                >
                                    {dataImg?.map((src, index) => (
                                        <img key={index}
                                            src={src}
                                            alt={`${car.year} ${car.make} ${car.model} - Naan Auto Gulf Breeze FL photo ${index + 1}`}
                                            width={'103px'}
                                            height={'85px'}
                                            className={index === slideIndex ? "active  mini-picture-spacing" : "mini-picture-spacing"}
                                            onClick={() => jumpToIndex(index)}
                                            draggable={false}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        {cars.map((car, index) => (
                            <section key={index} className="car-info">

                                <div className="description-box">
                                    <h2 className="car-description">Vehicle Info</h2>
                                </div>
                                <div className="invid__sections">

                                    <div className="invid__section">
                                        <h3 className="invid__section-title">Specifications</h3>
                                        <div className="info-bg-flex">
                                            <div className="info-bg">
                                                <div className="vehicle-info-flex">
                                                    <span className="car-inv-header">Mileage</span>
                                                    <span className="car-inv">{car.mileage || '...'}</span>
                                                </div>
                                            </div>
                                            <div className="info-bg">
                                                <div className="vehicle-info-flex">
                                                    <span className="car-inv-header">Transmission</span>
                                                    <span className="car-inv">{car.trans || '...'}</span>
                                                </div>
                                            </div>
                                            <div className="info-bg">
                                                <div className="vehicle-info-flex">
                                                    <span className="car-inv-header">Drivetrain</span>
                                                    <span className="car-inv">{car.drivetrain || '...'}</span>
                                                </div>
                                            </div>
                                            <div className="info-bg">
                                                <div className="vehicle-info-flex">
                                                    <span className="car-inv-header">Fuel Type</span>
                                                    <span className="car-inv">{car.fuelType || '...'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="invid__section">
                                        <h3 className="invid__section-title">Appearance</h3>
                                        <div className="info-bg-flex">
                                            <div className="info-bg">
                                                <div className="vehicle-info-flex">
                                                    <span className="car-inv-header">Exterior Color</span>
                                                    <span className="car-inv">{car.exteriorColor || '...'}</span>
                                                </div>
                                            </div>
                                            <div className="info-bg">
                                                <div className="vehicle-info-flex">
                                                    <span className="car-inv-header">Interior Color</span>
                                                    <span className="car-inv">{car.interiorColor || '...'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="invid__section invid__section--last">
                                        <h3 className="invid__section-title">History</h3>
                                        <div className="info-bg-flex">
                                            <div className="info-bg">
                                                <div className="vehicle-info-flex">
                                                    <span className="car-inv-header">Ownership</span>
                                                    <span className="car-inv">{car.ownership || '...'}</span>
                                                </div>
                                            </div>
                                            <div className="info-bg">
                                                <div className="vehicle-info-flex">
                                                    <span className="car-inv-header">Title History</span>
                                                    <span className="car-inv">{car.titleHistory || '...'}</span>
                                                </div>
                                            </div>
                                            <div className="info-bg info-bg--vin">
                                                <div className="vehicle-info-flex">
                                                    <span className="car-inv-header">VIN</span>
                                                    <span className="car-inv">{car.vin || '...'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </section>
                        ))}

                        <div className="description-box">
                            <h2 className="car-description">Description</h2>
                            <p className="">{cars[0].description}</p>
                        </div>
                        <div>
                            <GoogleMaps className='google-api' />
                        </div>
                    </section>
                    <section className="sticky-buttons-section">
                        <div className="sticky-buttons ">
                            <div className="btn-list car-info">
                                <Link to='/contactUs'>
                                    <button>Contact Us</button>
                                </Link>
                                <a href='https://www.accreditapp.com/ACCreditApp.aspx?ACCFX=124945o17730'>
                                    <button>Apply for Financing</button>
                                </a>
                            </div>
                            <div className="contact-widget-bg flexcolumn">
                                <Link className="nostyle" to={'/aboutUs'}>
                                    <span className="montserrat-underline naanautowidget">NAAN-AUTO</span>
                                </Link>
                                <span className="naanautowidgetphone parkinsans">850-861-5000</span>
                                <span className="naanautowidgetaddress">4327 Gulf Breeze Parkway, Gulf Breeze FL</span>
                            </div>
                        </div>
                    </section>
                </section>
            </div>
        </section>
    )
}

export default InvId;