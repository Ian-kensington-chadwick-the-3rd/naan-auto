import { useMutation, useQuery } from '@apollo/client'
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GET_CARS, GET_USER, DELETE_CAR } from '../utils/querys';
import speedo from '/icons8-speedometer-50.png'
import price from '/icons8-price-50.png'
import steeringWheel from '/icons8-steering-wheel-50.png'
import hashtag from '/icons8-hashtag-48.png'
import gearBox from '/icons8-gearbox-64.png'
import Searchfilter from '../components/searchfilter';
import Pagination from '../components/pagination';
import SlideShow from '../components/slideshow';


const Inv = () => {

    const { data: userData } = useQuery(GET_USER)
    const { loading: carLoading, error: carError, data: carData } = useQuery(GET_CARS);
    var [loggedIn, setLoggedIn] = useState(false);
    const carRef = useRef(null);
    const [searchData, setSearchData] = useState([]);
    const [usedSearch, setUsedSearch] = useState(false)
    const handleSearchData = (data, usedSearch) => {
        setSearchData(data)
        setUsedSearch(usedSearch)
    }
    // const data1 = searchData !== null ? searchData : carData.Cars;

    // fix this flawed auth
    useEffect(() => {
        if (userData?.User[0]?.Admin) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
    }, [userData])

    useEffect(() => {
        console.log(carData)
        console.log(searchData)
    }, [carData])


    console.log("this is data =>", carData);

    useEffect(() => {
        console.log(usedSearch)
    }, [usedSearch])

    const data1 = usedSearch === true ? searchData : (carData?.Cars || []);
    console.log(data1)

    const [paginatedData, setPaginatedData] = useState([])

    const handlePaginatedData = (paginatedData) => {
        setPaginatedData(paginatedData)
    }

    if (carLoading) return 'loading...';
    if (carError) return `Error!!!! ${carError.message}`;

    // to splice we are going to give a page index of 0 which will splice from array 0 - 10 items. next page index is going to be 1 * 10 which will equal index 10 in the next index of 10 b
    return (
        <div className='space'>
            {loggedIn ? (
                <Link to={`/addCar`}>
                    <button title='add a car'>add car</button>
                </Link>)
                : ('')}
            <div style={{ display: 'flex' }}>
                <div style={{ paddingLeft: '50px' }}>
                    <Searchfilter onData={handleSearchData} />
                </div>
                <div>
                    <div className='container'>

                        {paginatedData.map((car) => (

                            <div key={car._id} ref={carRef} style={{ margin: '20px', textDecoration: 'none' }} className='card'>

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
                                        <li><img src={speedo} className='favicon' />
                                            <span className='short-info'>{car.mileage}</span> </li>
                                        <li><img src={gearBox} className='favicon' /><span className='short-info'>{car.trans}</span></li>
                                        <li><img src={price} className='favicon' /><span className='short-info'>{car.price}</span></li>
                                    </ul>
                                </div>
                                <div style={{ overflow: 'hidden' }}>
                                    <p style={{ paddingLeft: '15px', overflow: 'clip' }}> {car.description}</p>
                                </div>
                                {loggedIn ? (
                                    <button onClick={() => handleCarDelete(car)}>delete car</button>) :
                                    ('')}

                            </div>

                        ))}

                    </div>
                    <Pagination data={data1} handlePaginatedData={handlePaginatedData} />
                </div>
            </div>
        </div>
    );

}

export default Inv;



