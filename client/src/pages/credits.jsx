import icon8engine from '../assets/engine.png'
import icon8gearbox from '../assets/gearbox.png'
import icon8CarProfile from '../assets/carprofile.png'
import icon8speedometer from '../assets/odometer.png'
import icons8CarSeat from '../assets/seatcar.png'
import icons8email from '../assets/icons8-email-50.png'
import icons8MapPinGif from '../assets/icons8-map-pin.gif'
import icons8MapPinWhite from '../assets/icons8-place-marker-24.png'
import icons8PhoneWhite from '../assets/icons8-phone-50.png'
import icons8PhoneRinging from '../assets/icons8-phone-ringing.gif'
import icons8PlayButton from '../assets/icons8-play-32.png'
import icons8PauseButton from '../assets/icons8-pause-32.png'

const Extra = () => {
    return (
        <section className="terms-and-conditions-container">
            <div style={{
                backgroundColor:'white',
                margin:'10px',
                borderRadius:'10px',
                padding:'15px',
                border:'50px solid white',
            }}>
                <div>
                    <h1>developer</h1>
                    created and maintained by <a href="https://www.linkedin.com/in/ian-sills-668497291/">ian</a>
                </div>
                <div>
                    <h1>icons used from icons8</h1>
                    <ul>
                        <li>
                            <a href='https://icons8.com/icon/kiWpAGiZlgn4/engine'>
                                <img src={icon8engine} />
                            </a>
                        </li>
                        <li>
                            <a href='https://icons8.com/icon/62656/gearbox'>
                                <img src={icon8gearbox} />
                            </a>
                        </li>
                        <li>
                            <a href='https://icons8.com/icon/16551/suv'>
                                <img src={icon8CarProfile} />
                            </a>
                        </li>
                        <li>
                            <a href='https://icons8.com/icon/68757/odometer'>
                                <img src={icon8speedometer} />
                            </a>
                        </li>
                        <li>
                            <a href='https://icons8.com/icon/GOh5Umx9qe8u/car-seat'>
                                <img src={icons8CarSeat} />
                            </a>
                        </li>
                        <li>
                            <a href='https://icons8.com/icon/12580/email'>
                                <img
                                 style={{backgroundColor:'black'}}
                                 src={icons8email} />
                            </a>
                        </li>
                        <li>
                            <a href='https://icons8.com/icon/96RE9rrwGcm6/place-marker'>
                                <img src={icons8MapPinGif} />
                            </a>
                        </li>
                        <li>
                            <a href='https://icons8.com/icon/7m5Vq18Xqd0t/phone-ringing'>
                                <img src={icons8PhoneRinging} />
                            </a>
                        </li>
                        <li>
                            <a href='https://icons8.com/icon/9730/phone'>
                                <img 
                                style={{backgroundColor:'black'}}
                                src={icons8PhoneWhite} />
                            </a>
                        </li>
                        <li>
                            <a href='https://icons8.com/icon/85839/place-marker'>
                                <img 
                                style={{backgroundColor:'black'}} 
                                src={icons8MapPinWhite} 
                                />
                            </a>
                        </li>
                        <li>
                            <a href='https://icons8.com/icon/398/play'>
                                <img src={icons8PlayButton} />
                            </a>
                        </li>
                        <li>
                            <a href='https://icons8.com/icon/403/pause'>
                                <img src={icons8PauseButton} />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Extra;