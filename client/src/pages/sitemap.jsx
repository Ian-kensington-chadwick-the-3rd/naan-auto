import {Link} from 'react-router-dom'
import { GET_CARS } from '../utils/querys';
import { useQuery } from '@apollo/client';

const SiteMap = () =>{
    const {data,loading,error} = useQuery(GET_CARS)
   

    return (
        <div className='terms-and-conditions-container'>
            <div className='terms-and-conditions-background'>
            <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <h1>Sitemap</h1>
            <ul>
                <li><Link to={'/inventory'}>Inventory</Link></li>
                <li><Link to={'/contactUs'}>Contact Us</Link></li>
                <li><Link to={'/aboutUs'}>About Us</Link></li>
                <li><Link to={'/termsandconditions'}>Terms And Conditions</Link></li>
                <li><Link to={'/sitemap'}>Sitemap</Link></li>
                <li><Link to={'/privacypolicy'}>Privacy Policy</Link></li>
                <li><Link to={'/credits'}>Credits</Link></li>
            </ul>
            <h1>Inventory</h1>
            <ul>
            {data && data.Cars.map((car,i) => {
                return <li key={i}>{car.year}{car.make}{car.model}</li>
            })}
            </ul>
            <p>{loading && 'loading...'}</p>
            <p>{error && `error ${error}`}</p>
            </div>
            </div>
        </div> 
    )
}

export default SiteMap;