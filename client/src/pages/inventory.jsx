import { useQuery } from '@apollo/client'
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GET_CARS, GET_USER, DELETE_CAR } from '../utils/querys';
import { Helmet } from 'react-helmet';
import speedo from '../assets/odometer.png'
import Searchfilter from '../components/searchfilter';
import Pagination from '../components/pagination';
import SlideShow from '../components/slideshow';
import exteriorColor from '../assets/carprofile.png'
import interiorColor from '../assets/seatcar.png'
import gearBox from '../assets/gearbox.png'
import enginePng from '../assets/engine.png'
import Ripple from '../components/loading.jsx'

const Inventory = () => {

    const { data: userData } = useQuery(GET_USER)
    const { loading: carLoading, error: carError, data: carData } = useQuery(GET_CARS);
    var [loggedIn, setLoggedIn] = useState(false);
    const carRef = useRef(null);
    const [searchData, setSearchData] = useState([]);
    const [usedSearch, setUsedSearch] = useState(false)
    const handleSearchData = (data, usedSearch) => {
        // const value = lowerCaseObject(data)
        // console.log("value", value)
        setSearchData(data)
        setUsedSearch(usedSearch)
    }

    // const lowerCaseObject = (obj) => {
    //     let result = {};
    //     // getting object key in outer loop then we need to use that key to access inner loop
    //     for (const outerKey in obj) {
    //         // setting key then setting value
    //         let innerObj = obj[outerKey]
    //         for (const innerKey in innerObj) {
    //         let value = innerObj[innerKey]
    //         return value
    //         }
    //     }
    // }

    // how to access an object [0].key gets value

    // fix this flawed auth
    useEffect(() => {
        if (userData?.User[0]?.Admin) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
    }, [userData])


    const data1 = usedSearch === true ? searchData : (carData?.Cars || []);


    const [paginatedData, setPaginatedData] = useState([]);
    const [carCountEnd, setCarCountEnd] = useState(0);
    const [carCountStart, setCarCountStart] = useState(0);
    const [totalCars, setTotalCars] = useState(0);

    const handlePaginatedData = (paginatedData, page, total) => {
        const newCarCountEnd = (page - 1) * 15 + paginatedData.length
        setPaginatedData(paginatedData)
        setCarCountEnd(newCarCountEnd)
        setCarCountStart((page - 1) * 15 + 1)
        setTotalCars(total)
    }

    if (carLoading) return <Ripple className='inventory-rippleloading' />;
    if (carError) return `Error!!!! ${carError.message}`;

    // to splice we are going to give a page index of 0 which will splice from array 0 - 10 items. next page index is going to be 1 * 10 which will equal index 10 in the next index of 10 b

    // get total numbers of cars 
    return (
        <div>
            <Helmet>
                <script type="application/ld+json">{JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "ItemList",
                    "name": "Used Cars for Sale at Naan Auto — Gulf Breeze, FL",
                    "url": "https://naanauto.com/inventory",
                    "numberOfItems": carData?.Cars?.length || 0,
                    "itemListElement": (carData?.Cars || []).map((car, index) => ({
                        "@type": "ListItem",
                        "position": index + 1,
                        "url": `https://naanauto.com/inventory/${car._id}`,
                        "name": `${car.year} ${car.make} ${car.model}${car.trim ? ` ${car.trim}` : ''}`
                    }))
                })}</script>
                <title>Used Cars for Sale in Gulf Breeze, FL | Naan Auto</title>
                <meta name="description" content="Browse affordable used cars, trucks, and SUVs for sale at Naan Auto in Gulf Breeze, FL. Serving Pensacola, Navarre, Pace, Milton, Fort Walton Beach, Destin, Niceville, Crestview, Freeport, and the Florida Panhandle. Honest pricing, no gimmicks." />
                <meta name="keywords" content="used cars Gulf Breeze FL, used car inventory Pensacola, used trucks SUVs Florida Panhandle, buy used car Navarre FL, used cars Pace FL, used cars Milton FL, used cars Fort Walton Beach, used cars Destin FL, used cars Niceville FL, used cars Crestview FL, used cars Freeport FL, affordable used cars Northwest Florida, car dealerships gulf breeze, used car dealers gulf breeze" />
                <meta name="robots" content="index, follow" />
                <meta name="author" content="Naan Auto" />
                <meta name="theme-color" content="#e95918" />
                <meta name="geo.region" content="US-FL" />
                <meta name="geo.placename" content="Gulf Breeze, Florida" />
                <meta name="geo.position" content="30.3929398;-87.0428434" />
                <meta name="ICBM" content="30.3929398, -87.0428434" />
                <meta property="og:title" content="Used Car Inventory - Naan Auto | Gulf Breeze, FL" />
                <meta property="og:description" content="Browse affordable used cars, trucks, and SUVs at Naan Auto in Gulf Breeze, FL. Serving Pensacola, Navarre, Pace, Milton, Fort Walton Beach, Destin, Niceville, and Crestview." />
                <meta property="og:site_name" content="Naan Auto" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://naanauto.com/inventory" />
                <meta property="og:image" content="https://naanauto.com/logo.PNG" />
                <meta property="og:image:alt" content="Naan Auto Used Car Inventory - Gulf Breeze FL" />
                <meta property="og:locale" content="en_US" />
                <link rel="canonical" href="https://naanauto.com/inventory" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Used Cars for Sale in Gulf Breeze, FL | Naan Auto" />
                <meta name="twitter:description" content="Browse affordable used cars, trucks, and SUVs at Naan Auto in Gulf Breeze, FL. Serving Pensacola, Navarre, Pace, Milton, Fort Walton Beach, Destin, Niceville, and Crestview." />
                <meta name="twitter:image" content="https://naanauto.com/logo.PNG" />
                <meta name="twitter:image:alt" content="Naan Auto Used Car Inventory - Gulf Breeze FL" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-title" content="Naan Auto" />
                <meta name="format-detection" content="telephone=yes" />
            </Helmet>
            <div className='space'>
                {loggedIn ? (
                    <Link to={`/addCar`}>
                        <button title='add a car'>add car</button>
                    </Link>)
                    : ('')}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <div className='search-filter__div' id='inventorySearch'>
                        <Searchfilter onData={handleSearchData} />
                    </div>
                    <div className='inventory-topbar-and-card-container'>
                        <div className='inventory-topbar inventory-topbar-container'>

                            <span className='inventory-child-container_L'>{carCountStart} - {carCountEnd} of {totalCars}</span>

                            <div className='inventory-child-container_R'>
                                <a href='https://www.accreditapp.com/ACCreditApp.aspx?ACCFX=124945o17730'>
                                    <button>Apply for Financing</button>
                                </a>
                            </div>


                        </div>
                        <div className='container'>

                            {paginatedData.map((car) => (

                                <div key={car._id} ref={carRef} style={{ textDecoration: 'none' }} className='card'>

                                    <div style={{ position: 'relative' }}>
                                        {car.sold === true && <span className='sold'>SOLD</span>}
                                        <Link to={`/inventory/${car._id}`}

                                            draggable={false}>

                                            <SlideShow
                                                image={car.imageUrl}
                                            />
                                        </Link>
                                    </div>

                                    <div className='title-price-holder'>
                                        <div className='price-holder'>
                                            <span className='card__title'>{car.year} {car.make} {car.model}</span>
                                            <span className='card__price'>${car.price}</span>
                                        </div>
                                    </div>
                                    <div className='spec-pills'>
                                        <span className='spec-pill'><img src={speedo} draggable={false} />{car.mileage}</span>
                                        <span className='spec-pill'><img src={gearBox} draggable={false} />{car.trans}</span>
                                        <span className='spec-pill'><img src={exteriorColor} draggable={false} />{car.exteriorColor}</span>
                                        <span className='spec-pill'><img src={interiorColor} draggable={false} />{car.interiorColor}</span>
                                        <span className='spec-pill'><img src={enginePng} draggable={false} />{car.engineType}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Pagination data={data1} handlePaginatedData={handlePaginatedData} />
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Inventory;



