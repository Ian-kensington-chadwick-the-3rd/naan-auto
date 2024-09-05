import { useParams } from "react-router-dom";
import { FIND_CAR } from "../utils/querys";
import { useQuery } from '@apollo/client'

// what it looks like i will need to do is extract data from the qeury paramaters and make make something that says if get cars is === to Id from use params .find the data and map it out to the specific Id parameter so that it shows info for this cars data.
const InvId = () => {
    // use the useParams hook to extract data from the specific id 
    const {Id} = useParams();
    const {loading, error, data} = useQuery(FIND_CAR, {variables: {id: Id}});
    
    console.log(Id)
    console.log(data)
 
    const cars = data?.findCar || [];
      console.log("this is car",cars)
  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

    return (
       
        <div>
            <h1>'this is params {Id}'</h1>
            {cars.map((car) => (
                <div key = {car._id}>
                <p>{car.Make}</p>
                <p>{car.Description}</p>
                <p>{car.Mileage}</p>
                <p>{car.Year}</p>
                </div>
            ))}
        </div>
    )
} 

export default InvId;