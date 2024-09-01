import { useQuery } from '@apollo/client'
import React, {useState, useEffect} from 'react';
import { useParams , Link} from 'react-router-dom';
// starting to attempt to fetch data from our Cars database to append to website. https://www.apollographql.com/docs/react/data/queries

// getting back to basics the data is not being displayed researching https://www.apollographql.com/tutorials/lift-off-part1/03-schema-definition-language-sdl

// data is finnally able to be displayed at a very raw level. the reason that data was not being displayed was because my graphql query string inside of querys.js was not matching my typedefs table ( id => _id, Car => cars line 5.)

// im able to map data to list item elements 
import { GET_CARS } from '../utils/querys';
const Inv = () => { 
    const {loading, error, data} = useQuery(GET_CARS);
    if (loading) return 'loading...';
    if(error) return `Error!!!! ${error.message}`; 
   console.log("this is data =>",data);
    
    return (
        <div>
            <ul>
                {data.Cars.map((car) => (
                    
                        <li key={car._id}>
                            <Link to={`/inventory/${car._id}`} >
                            {car.Year}
                            {car.Make}
                            {car.Mileage}
                            {car.Description}
                            </Link>
                        </li>
                   
                ))}
            </ul>
        </div>
    );

}
{/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
export default Inv;