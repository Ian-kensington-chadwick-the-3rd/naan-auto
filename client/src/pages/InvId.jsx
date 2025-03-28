import { Link, useParams } from "react-router-dom";
import { FIND_CAR } from "../utils/querys";
import { useQuery } from '@apollo/client'
import { useState } from 'react'
import GoogleMaps from './../components/googlemaps'



const InvId = () => {
    // use the useParams hook to extract data from the specific id 
    const { Id } = useParams();
    const { loading, error, data } = useQuery(FIND_CAR, { variables: { id: Id } });
    const [slideIndex, setSlideIndex] = useState(0);

    console.log(Id);
    console.log(data);


    const cars = data?.findCar || [];
    console.log("this is car", cars)
    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error: {error.message}</p>;
    console.log(data)
    let dataImg = data?.findCar[0]?.imageUrl;

    const arrayLength = cars[0].imageUrl.length;

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

    return (
        <section>
            <section className="center">
                <div className=" vehicle-info-top">
                    {cars.map((car) => (
                        [<div className="info-top-left"><p >20{car.Year} {car.Make} model </p> </div>,
                        <div className="info-top-right"><p> $20,000</p></div>]
                    ))}
                </div>
            </section>
            <section className="center">
                <section>
                    <div className="picture-container">
                        <div className="slideshow-container">
                            <div className="slide-wrapper" style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
                                {dataImg?.map((src, index) => (
                                    <img key={index} src={src} alt={`Car ${index}`} />
                                ))}
                            </div>
                            <button className="slider-button left" onClick={() => setIndexBackwards()}>&#60;</button>
                            <button className="slider-button right" onClick={() => setIndexForwards()}>&#62;</button>
                        </div>
                        <div className="picture-list">
                            {dataImg?.map((src, index) => (
                                <img key={index} src={src} alt={`Car ${index}`} width={'103px'} height={'85px'} className="mini-picture-spacing" onClick={() => jumpToIndex(index)} />
                            ))}
                        </div>
                    </div>
                    <div className="description-box">
                        <h2 className="car-description">Description</h2>
                        <p>{cars[0].Description} </p>
                    </div>
                    <div>
                        <GoogleMaps className='google-api'/>
                    </div>
                </section>

                {cars.map((car, index) => (
                    <section key={index}>
                        <div className="car-info sticky-car-info car-info-top">
                            <div className="vehicle-info-rows">
                                <div>
                                    <p style={{fontSize:'22px',fontWeight:'bolder'}}>vehicle Info</p>
                                    <hr className="hr2"/>
                                </div>
                            </div>
                            <div className="vehicle-info-rows">
                                <div>
                                    <p className="car-inv">Make | {car.make}</p>
                                    <hr className="hr1"/>
                                </div>
                            </div>
                            <div className="vehicle-info-rows">
                                <div>
                                    <p className="car-inv">Model | {car.model}</p>
                                    <hr className="hr1"/>
                                </div>
                            </div>
                            <div className="vehicle-info-rows" >
                                <div>
                                    <p className="car-inv">Mileage | {car.mileage}</p>
                                    <hr className="hr1"/>
                                </div>
                            </div>
                            <div className="vehicle-info-rows" >
                                <div>
                                    <p className="car-inv">Year | {car.year}</p>
                                    <hr className="hr1"/>
                                </div>
                            </div >
                            <div className="vehicle-info-rows">
                                <div>
                                    <p className="car-inv">VIN | {car.vin || '...'}</p>
                                    <hr className="hr1"/>
                                </div>
                            </div>
                            <div className="vehicle-info-rows">
                                <div>
                                    <img></img>
                                </div>
                                <div>
                                    <p className="car-inv">New/Used | Used</p>
                                    <hr className="hr1"/>
                                </div>
                            </div>
                            <div className="vehicle-info-rows">
                                <div>
                                    <p className="car-inv">Price | ${car.price}</p>
                                    <hr className="hr1"/>
                                </div>
                            </div>
                        </div>
                        <div className="btn-list car-info sticky-buttons">
                            <Link to='/contactUs'>
                            <button className=".btn-list button">contact us</button>
                            </Link>
                            <a href='https://www.accreditapp.com/ACCreditApp.aspx?ACCFX=124945o17730'>
                            <button className=".btn-list button"  >Finance</button>
                            </a>
                        </div>
                    </section>

                ))}

            </section>
        </section>
    )
}

export default InvId;