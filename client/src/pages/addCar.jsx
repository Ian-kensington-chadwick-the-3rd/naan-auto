import { useMutation } from "@apollo/client";
import { ADD_CAR } from "../utils/querys";
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import { Link } from "react-router-dom";
// gathering my thoughts on how to connect cloudinary so that the payload is percieved as a cloudinary secure url because the base64 url is too big of a payload. After i want to put it in my database stringUrl



const addCarData = () => {

    const [addCar] = useMutation(ADD_CAR);

    async function picHandler(event) {
        event.preventDefault()
        const picture = document.getElementById('fileId').files
        const year = document.getElementById('yearId').value
        const make = document.getElementById('makeId').value
        const mileage = document.getElementById('mileageId').value
        const disc = document.getElementById('descriptionId').value
        const trans = document.getElementById('transId').value
        console.log('year', year, 'make', make, 'mileage', mileage, 'disc', disc, 'trans', trans,)

        let base64StringArray = [];

        let file
        for (let i = 0; i < picture.length; i++) {
            let reader = new window.FileReader();
            file = picture[i]
            console.log(file)

            const base64String = await new Promise((resolve, reject) => {
                reader.onload = () => {
                    console.log(reader.result);
                    const base64 = reader.result;
                    resolve(base64);
                };
                reader.onerror = () => reject(reader.error);
                reader.readAsDataURL(file);
            });

            base64StringArray.push(base64String);
        }
        console.log("this is base array", base64StringArray)
        var uploadImageUrl = [];
        for (const base64String of base64StringArray) {
    
            const formData = new FormData();
            formData.append('file',base64String);
            formData.append('upload_preset', 'phpgox3z');
            formData.append('timestamp', Math.floor(Date.now() / 1000));
            for (var pair of formData.entries()) {
                console.log(pair[0]+ ', ' + pair[1]); 
            }
            try {

                const response = await fetch('https://api.cloudinary.com/v1_1/dm8t2zlt4/image/upload', {
                
                    method: 'POST',

                    body: formData

                });

                const data = await response.json();
                uploadImageUrl.push(data.secure_url)
                console.log('Uploaded image URL:', data.public_id);
           
            } catch (error) {

                console.error('Error uploading image:', error);

            }
        }


        // new plan the payload to use addCar mutation is for base64StringArray is too large i have to "fetch" the cloudinary api and send the base64 directly to cloudinary from the client side instead of through the backend after i get the secure.url or public name or how ever i need to recieve the file name so i can dynamically render it to the page ill save that id to the backend so that it can be referenced by car id.
        await addCar({
            variables: {
                Year: parseInt(year),
                Make: make,
                Mileage: parseInt(mileage),
                Description: disc,
                Trans: trans,
                imageUrl: uploadImageUrl,
            }
        })


    }
    return (
        <div>
            {/* creating a form to test sending file data and seeing how i should send it through my server */}
            <form onSubmit={event => picHandler(event)}>
                <label htmlFor='fileId'>Upload car picture</label> <br />
                <input type='file' id='fileId' name='images[]' multiple></input>


                <label htmlFor="yearId">year</label>
                <input type='number' id="yearId"></input>

                <label htmlFor="makeId">make</label>
                <input type='string' id="makeId"></input>

                <label htmlFor="mileageId">mileage</label>
                <input type='number' id="mileageId"></input>

                <label htmlFor="description">description</label>
                <input type='text' id="descriptionId"></input>

                <label htmlFor="Trans">transmission</label>
                <input type="text" id="transId"></input>
                {/* <Link to='/inventory'> */}
                <input type='submit' value='submit'></input>
                {/* </Link> */}
            </form>
        </div>
    );



};
export default addCarData












// widget gallery using cloudinary
// https://www.youtube.com/watch?v=01dy6J9PXzY

// really good video for verification
// https://www.youtube.com/watch?v=LzMXdnABrCM

// so here is what i learned that the easiest way to upload images to cloudinary locally through your computer is to convert file from blob to base64
// https://www.youtube.com/watch?v=3o1Z5N9TeuQ&t=204s reference

// step one get data from client transfer to base64
// step two send base64 data to cloudinary
// step three GET data from cloudinary and display it to the page
// i dont know where to add this step but i need to do all this while having it connected to my graphql database so that the images that are uploaded to cloudinary are connected to my database through cloundinarys secureUrl string.



// const base64String = await new Promise((resolve, reject)) => {
//     reader.onload = () => {
//     console.log(reader.result)
//     var base64 = reader.result
//     resolve(base64.split(',')[1])
// };
// reader.onerror = () => reject(reader.error);
// reader.readAsDataURL(file)



// base64StringArray.push(base64String);
// }