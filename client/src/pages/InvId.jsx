import { Link, useParams } from "react-router-dom";
import { FIND_CAR } from "../utils/querys";
import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import GoogleMaps from './../components/googlemaps'
import play from '../assets/icons8-play-32.png'
import pause from '../assets/icons8-pause-32.png'

const InvId = () => {
    // use the useParams hook to extract data from the specific id 
    const { Id } = useParams();
    const { loading, error, data } = useQuery(FIND_CAR, { variables: { id: Id } });
    const [slideIndex, setSlideIndex] = useState(0);
    const cars = data?.findCar || [];


    console.log(data)
    let dataImg = data?.findCar[0]?.imageUrl;
    

    const arrayLength = cars[0]?.imageUrl?.length;
    console.log(arrayLength)
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

    const [timerPause, setTimerPause] = useState(false)

    useEffect(() => {
        if(timerPause) return;

        let id = setInterval(setIndexForwards,2000)

        if(timerPause) return clearInterval(id);
        return () => clearInterval(id)

    }, [arrayLength,timerPause]);

    const [stickyHeader, setStickyHeader] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY >= 200) {
                setStickyHeader(true); 
            } else {
                setStickyHeader(false);
            }
        }
        window.addEventListener('resize',onscroll)
        window.addEventListener('scroll', onScroll);
        return () => {window.removeEventListener('click', onScroll); window.removeEventListener('resize',onscroll);}
    }, [stickyHeader])

    const [tabletAndUnderVw, setTabletAndUnderVw] = useState(false);

    useEffect(()=>{
        const tabletUnderVw = () =>{
            if(window.innerWidth <= 768){
                setTabletAndUnderVw(true);
            } else {
                setTabletAndUnderVw(false)
            }
        }
        window.addEventListener('scroll',tabletUnderVw);
        window.addEventListener('resize',tabletUnderVw);

        return () => {window.removeEventListener('scroll',tabletUnderVw); window.removeEventListener('resize',tabletUnderVw);} 
    },[tabletAndUnderVw])

    // css conditionals
    const HeaderTabletUnderVw = stickyHeader && tabletAndUnderVw ?
    `vehicle-info-top position-fixed fixedinfo-invid` : " vehicle-info-top"

    const HeaderTabletOverVw = stickyHeader &&  " vehicle-info-top  position-fixed"
// if sticky header true add 
    

    const pictureSpaceTabletUnderVw = stickyHeader && tabletAndUnderVw ? "stickyheadertopspaceundertabletvw picture-container " : "   picture-container  "

    const pictuerSpaceTabletOverVw = stickyHeader && !tabletAndUnderVw ? 
        "stickyheadertopspaceovertabletvw" : ''
// add 20vh if tablet and sticky header true
// else add


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;


    return (
        <section>
            <div className="car-details-container">
                <div className={ `${HeaderTabletUnderVw}  ${HeaderTabletOverVw}`} >
                    {cars.map((car) => (
                        [<div className="info-top-left"><p >{car.year} {car.make} {car.model} </p> </div>,
                        <div className="info-top-right"><p> ${car.price}</p></div>]
                    ))}
                </div>
                <section className="center-dup">
                    <section>
                        <div className={`${pictureSpaceTabletUnderVw} ${pictuerSpaceTabletOverVw }`}>
                            <div className="slideshow-container">
                                <div className="slide-wrapper" style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
                                    {dataImg?.map((src, index) => (
                                        <img key={index} src={src} alt={`Car ${index}`} />
                                    ))}
                                </div>
                                <button className="slider-button left" onClick={() => setIndexBackwards()}>&#60;</button>
                                <button className="slider-button right" onClick={() => setIndexForwards()}>&#62;</button>
                                { !timerPause ?
                                <img src={pause} className="pause-btn" onClick={() => setTimerPause(true)}></img>
                                :
                                <img src={play} className="pause-btn" onClick={()=> setTimerPause(false)}></img>
                                }
                            </div>
                            <div className="picture-list">
                                {dataImg?.map((src, index) => (
                                    <img key={index} src={src} alt={`Car ${index}`} width={'103px'} height={'85px'} className="mini-picture-spacing" onClick={() => jumpToIndex(index)} />
                                ))}
                            </div>
                        </div>

                        {cars.map((car, index) => (
                            <section key={index} className="car-info">

                                <div className="description-box " >
                                    <h2 className="car-description">vehicle Info</h2>
                                </div>
                                <div className="info-bg-flex">
                                    <div className="flex-col-gap">
                                        <div className="info-bg" >
                                            <div className="vehicle-info-flex">
                                                <span className="car-inv-header title-bg">Mileage</span>
                                                <span className="car-inv">{car.mileage || '...'} </span>
                                            </div>
                                        </div>
                                        <div className="info-bg">
                                            <div className="vehicle-info-flex">
                                                <span className="car-inv-header title-bg">Drivetrain</span>
                                                <span className="car-inv">{car.drivetrain || '...'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-col-gap">
                                        <div className="info-bg">
                                            <div className="vehicle-info-flex">
                                                <span className="car-inv-header title-bg ">Int Color</span>
                                                <span className="car-inv">{car.interiorColor || '...'}</span>
                                            </div>
                                        </div>
                                        <div className="info-bg">
                                            <div className="vehicle-info-flex">
                                                <span className="car-inv-header title-bg">Ext Color</span>
                                                <span className="car-inv">{car.exteriorColor || '...'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-col-gap">
                                        <div className="info-bg">
                                            <div className="vehicle-info-flex">
                                                <span className="car-inv-header title-bg">Fuel Type</span>
                                                <span className="car-inv">{car.fuelType || '...'}</span>
                                            </div>
                                        </div>
                                        <div className="info-bg">
                                            <div className="vehicle-info-flex">
                                                <span className="car-inv-header title-bg">Transmission</span>
                                                <span className="car-inv">{car.trans || '...'}</span>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-col-gap">
                                        <div className="info-bg">
                                            <div className="vehicle-info-flex">
                                                <span className="car-inv-header vehicle-history title-bg" >Ownership</span>
                                                <span className="car-inv">{car.ownership || '...'}</span>

                                            </div>
                                        </div>
                                        <div className=" info-bg">
                                            <div className="vehicle-info-flex">
                                                <span className="car-inv-header title-bg">Title History</span>
                                                <span className="car-inv"> {car.titleHistory || '...'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="info-bg" >
                                        <div className="vehicle-info-flex">
                                            <span className="car-inv-header vehicle-history title-bg">VIN</span>
                                            <span className="car-inv">{car.vin || '...'}</span>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        ))}

                        <div className="description-box">
                            <h2 className="car-description">Description</h2>
                            <p>{cars[0].Description}</p>
                        </div>
                        <div style={{ marginBottom: '50px' }}>
                            <GoogleMaps className='google-api' />
                        </div>
                    </section>
                    <section style={{ marginBottom: '49px' }}>
                        <div className="sticky-buttons ">
                            <div className="btn-list car-info">
                                <Link to='/contactUs'>
                                    <button>contact us</button>
                                </Link>
                                <a href='https://www.accreditapp.com/ACCreditApp.aspx?ACCFX=124945o17730'>
                                    <button>Finance</button>
                                </a>
                            </div>
                            <div className="contact-widget-bg flexcolumn">
                                <Link className="nostyle" to={'/aboutUs'}>
                                    <span className="montserrat-underline naanautowidget">NAAN-AUTO</span>
                                </Link>
                                <span className="naanautowidgetphone parkinsans">406-407-5950</span>
                                <span className="naanautowidgetaddress">8520 N Palafox St Pensicola FL, 32534</span>
                            </div>
                        </div>
                    </section>
                </section>
            </div>
        </section>
    )
}

export default InvId;