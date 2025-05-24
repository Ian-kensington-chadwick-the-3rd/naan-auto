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

    if (carLoading) return 'loading...';
    if (carError) return `Error!!!! ${carError.message}`;

    // to splice we are going to give a page index of 0 which will splice from array 0 - 10 items. next page index is going to be 1 * 10 which will equal index 10 in the next index of 10 b

    // get total numbers of cars 
    return (
        <div>
            <Helmet>
                <title>Inventory | Naan Auto</title>
                <meta name='description' content='current inventory for naan-auto' />
                <meta property='og:title' content='Welcome to Naan Auto - Inventory' />
                <meta property='og:site_name' content='Naan Auto' />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://naanauto.com/contactUs" />

                <meta name='twitter:card' content='summary_large_image' />
                <meta name="twitter:title" content="Welcome to Naan Auto - check out our inventory" />
                <meta name="twitter:description" content="naan-auto current inventory" />
                <meta name="twitter:image" content="https://yourdomain.com/images/about-banner.jpg" />
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
                                    <button>Check Out Financing Here</button>
                                </a>
                            </div>


                        </div>
                        <div className='container'>

                            {paginatedData.map((car) => (

                                <div key={car._id} ref={carRef} style={{ textDecoration: 'none' }} className='card'>

                                    <div >
                                        <Link to={`/inventory/${car._id}`}
                                            draggable={false}>
                                            <SlideShow
                                                image={car.imageUrl}
                                            />
                                        </Link>
                                    </div>

                                    <div className='title-price-holder'>
                                        <div className='price-holder'>
                                            <div>
                                                <span>{car.year} {car.make} {car.model}</span>
                                            </div>
                                            <div >
                                                <span>${car.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div >
                                        <ul className='list-style'>
                                            <li><img src={speedo} className='favicon' draggable={false} />
                                                <span className='short-info'>{car.mileage}</span> </li>
                                            <li><img src={gearBox} className='favicon' draggable={false} />
                                                <span className='short-info'>{car.trans}</span></li>
                                            <li>

                                                <img src={exteriorColor} className='favicon' draggable={false} />
                                                <span className='short-info'>{car.exteriorColor}</span>
                                            </li>

                                            <li>
                                                <img src={interiorColor} className='favicon' draggable={false} />
                                                <span className='short-info'>{car.interiorColor}</span>
                                            </li>


                                            <li>
                                                <img src={enginePng} className='favicon' draggable={false} />
                                                <span className='short-info'>{car.engineType}</span>
                                            </li>

                                        </ul>
                                    </div>
                                    <div style={{ overflowX: 'hidden', overflowY: 'hidden', paddingRight: '15px', boxSizing: 'border-box', marginRight: '15px' }}>
                                        <p style={{ paddingLeft: '15px', overflow: 'clip', width: '100%' }}> {car.description}
                                        </p>
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



