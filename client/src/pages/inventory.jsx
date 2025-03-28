import { useMutation, useQuery } from '@apollo/client'
import React, {useState, useEffect, useRef} from 'react';
import { useParams , Link} from 'react-router-dom';
import { GET_CARS, GET_USER, DELETE_CAR } from '../utils/querys';
import speedo from '/icons8-speedometer-50.png' 
import price from '/icons8-price-50.png'
import steeringWheel from '/icons8-steering-wheel-50.png'
import hashtag from '/icons8-hashtag-48.png'
import gearBox from '/icons8-gearbox-64.png'
import Searchfilter from '../components/searchfilter';


const Inv = () => {    
 
    const { data: userData} = useQuery(GET_USER)
    const {loading: carLoading, error: carError, data: carData} = useQuery(GET_CARS);
    const [deleteCar] = useMutation(DELETE_CAR)
    var [loggedIn , setLoggedIn] = useState(false);
    const carRef = useRef(null);
    const [searchData, setSearchData] = useState([]);
    const handleSearchData = (data) =>{
        setSearchData(data)
    }
    console.log("rendered data",searchData.map((data)=> data))
    const data1 = searchData !== null ? searchData : carData.Cars;



    
    useEffect(()=>{
        console.log("yay!!!!!! searchData has appeared",searchData)
    },[searchData])
    
    useEffect(()=>{
    if(userData?.User[0]?.Admin){
        setLoggedIn(true)
    } else {
        setLoggedIn(false)
    }
    },[userData]) 

    useEffect(()=>{
        return () => carData
    },[carData])

    if (carLoading) return 'loading...';
    if(carError) return `Error!!!! ${carError.message}`; 
    console.log("this is data =>",carData);
        
    const handleCarDelete  = async (car) =>{ 
        try{
        var carElimination = carRef.current = car._id.toString()
    
        const res = await  deleteCar({
                variables:
                {
                    carId:carElimination
                } 
            })
            console.log("deleted response",res)
        } catch(err){
            console.log(err)
        }
        }


    return (
        <div className='space'>
            {loggedIn ? (
            <Link to={`/addCar`}>
                <button title='add a car'>add car</button>
            </Link>)
                : ('')} 
                <div style={{display:'flex'}}>
                <div style={{paddingLeft:'150px'}}>
                    <Searchfilter onData={ handleSearchData } />
                </div>
            <div className='container'>
            
                    {data1.map((car) => (
                        
                        <div key={car._id} ref={carRef} style={{margin: '20px', textDecoration:'none' }} className='card'>
                        
                            <div> 
                                <Link to={`/inventory/${car._id}`} > 
                                <img src={car.imageUrl[0]} className='card-img'/>
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
                            <div style={{overflow:'hidden'}}>
                                <p style={{paddingLeft:'15px',overflow:'clip'}}> {car.description}</p>
                            </div>
                        {loggedIn ? (
                        <button onClick={() => handleCarDelete(car)}>delete car</button>): 
                        ('')}
                            
                        </div>

                    ))}
            
            </div>
            </div>
        </div>
    );

}

export default Inv; 



