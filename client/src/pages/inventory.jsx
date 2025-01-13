import { useMutation, useQuery } from '@apollo/client'
import React, {useState, useEffect, useRef} from 'react';
import { useParams , Link} from 'react-router-dom';
import { GET_CARS, GET_USER, DELETE_CAR } from '../utils/querys';
// starting to attempt to fetch data from our Cars database to append to website. https://www.apollographql.com/docs/react/data/queries

// getting back to basics the data is not being displayed researching https://www.apollographql.com/tutorials/lift-off-part1/03-schema-definition-language-sdl

// data is finnally able to be displayed at a very raw level. the reason that data was not being displayed was because my graphql query string inside of querys.js was not matching my typedefs table ( id => _id, Car => cars line 5.)

// im able to map data to list item elements 

const Inv = () => {    
 
    const { data: userData} = useQuery(GET_USER)
    const {loading: carLoading, error: carError, data: carData} = useQuery(GET_CARS);
    const [deleteCar] = useMutation(DELETE_CAR)
    var [loggedIn , setLoggedIn] = useState(false);
    const carRef = useRef(null);

   
    
    
    
    useEffect(()=>{
    if(userData?.User[0]?.Admin){
        setLoggedIn(true)
    } else {
        setLoggedIn(false)
    }
    },[userData]) 



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
        <div>
            <div>
                <Link to={'/Login'}>
                <button>login</button>
                </Link>
            </div>

            {loggedIn ? (
            <Link to={`/addCar`}>
                <button title='add a car'>add car</button>
            </Link>)
                : ('')} 

            <div>
                <ul>
                    {carData.Cars.map((car) => (
                        
                        <li key={car._id} ref={carRef}>
                            <Link to={`/inventory/${car._id}`} >
                                {car.Year}
                                {car.Make}
                                {car.Mileage}
                                {car.Description}
                                <img src={car.imageUrl[0]} width={500} height={400}></img>
                            </Link>
                        {loggedIn ? (
                        <button onClick={() => handleCarDelete(car)}>delete car</button>): 
                        ('')}
                            
                        </li>

                    ))}
                </ul>
            </div>
        </div>
    );

}
{/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
export default Inv; 





// function picHandler(event){
    //     event.preventDefault()
    //     const picture = document.getElementById('fileId').files
        
    //    let reader = new FileReader();
      
    //     let file
    //     for (let i = 0; i < picture.length; i++) {
    //          let reader = new FileReader();
    //         file = picture[i]
    //         console.log(file)
    //             reader.onload = function () {
    //             console.log(reader.result)
                
    //         };  
    //         reader.readAsDataURL(file)  
    //         var base64 = reader.result
    //         let base64String = base64.split(',')[1]
    //         base64StringArray.push(base64String);
            
    //     }
    //     reader.onerror = function(){
    //         console.log(reader.error)
    //     }
    // }
        