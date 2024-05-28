import { useQuery } from '@apollo/client'
import React from 'react';
// starting to attempt to fetch data from our Cars database to append to website. https://www.apollographql.com/docs/react/data/queries

// getting back to basics the data is not being displayed researching https://www.apollographql.com/tutorials/lift-off-part1/03-schema-definition-language-sdl

import { GET_CARS } from '../utils/querys';
const Inv = () => {
   
    const {loading, error, data} = useQuery(GET_CARS)
    if (loading) return 'loading...';
    if(error) return `Error!!!! ${error.message}`; 
   console.log("this is data",data.cars)
    return (
         
        <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );

}

export default Inv;