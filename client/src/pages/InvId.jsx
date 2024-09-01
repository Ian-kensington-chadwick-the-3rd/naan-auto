import { useParams } from "react-router-dom";
const {loading, error, data} = useQuery(GET_CARS);
// what it looks like i will need to do is extract data from the qeury paramaters and make make something that says if get cars is === to Id from use params .find the data and map it out to the specific Id parameter so that it shows info for this cars data.
const InvId = () => {
    // use the useParams hook to extract data from the specific id 
    const {Id} = useParams();
    console.log(Data)
    return (

    <div>   
      <h1>'this is params {`${Id}`}'</h1>
    </div>
    )
} 

export default InvId;