import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom';
import { GET_UPCOMING_CARS } from '../utils/querys';
import { Helmet } from 'react-helmet';
import speedo from '../assets/odometer.png'
import SlideShow from '../components/slideshow';
import exteriorColor from '../assets/carprofile.png'
import interiorColor from '../assets/seatcar.png'
import gearBox from '../assets/gearbox.png'
import enginePng from '../assets/engine.png'
import Ripple from '../components/loading.jsx'

const Upcoming = () => {
    const { loading, error, data } = useQuery(GET_UPCOMING_CARS);

    const cars = data?.UpcomingCars || [];

    return (
        <div>
            <Helmet>
                <title>Upcoming Cars | Naan Auto</title>
                <meta name="description" content="Check out the upcoming vehicles arriving soon at Naan Auto in Gulf Breeze, FL." />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://naanauto.com/upcoming" />
            </Helmet>
            <div className='space'>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className='inventory-topbar-and-card-container'>
                        <div className='inventory-topbar inventory-topbar-container'>
                            <span className='inventory-child-container_L'>
                                {cars.length} Upcoming {cars.length === 1 ? 'Vehicle' : 'Vehicles'}
                            </span>
                        </div>
                        <div className='container'>
                            {loading ? (
                                <Ripple className='inventory-rippleloading' />
                            ) : error ? (
                                <p style={{ padding: '2rem', textAlign: 'center' }}>
                                    Unable to load upcoming vehicles right now. Please call us at{' '}
                                    <a href="tel:+18508615000">850-861-5000</a> or check back shortly.
                                </p>
                            ) : cars.length === 0 ? (
                                <p style={{ padding: '2rem', textAlign: 'center' }}>
                                    No upcoming vehicles at this time. Check back soon!
                                </p>
                            ) : cars.map((car) => (
                                <div key={car._id} style={{ textDecoration: 'none' }} className='card'>
                                    <div style={{ position: 'relative' }}>
                                        <Link to={`/inventory/${car._id}`} draggable={false}>
                                            <SlideShow image={car.imageUrl} />
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Upcoming;
