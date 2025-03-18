import { useMutation } from "@apollo/client";
import { ADD_CAR, PRESIGNED_URL } from "../utils/querys";
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import { Link, Navigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';






const addCarData = () => { 
    const [addCar] = useMutation(ADD_CAR);
    const [createPresignedUrl] = useMutation(PRESIGNED_URL);
if (addCar.loading) return <p>Loading...</p>;
if (addCar.error) return <p>Error: {error.message}</p>;
if (addCar.data === null) return <p>No data available</p>;
if(addCar.data){
    Navigate('/inventory')
}
  
   

    async function picHandler(event) {
        event.preventDefault()
        const picture = document.getElementById('fileId').files
        const year = document.getElementById('yearId').value
        const make = document.getElementById('makeId').value
        const mileage = document.getElementById('mileageId').value
        const disc = document.getElementById('descriptionId').value
        const trans = document.getElementById('transId').value
        const model = document.getElementById('modelId').value
        const price = document.getElementById('priceId').value
        const vin = document.getElementById('vinId').value
        console.log('year', year, 'make', make, 'mileage', mileage, 'disc', disc, 'trans', trans,)

        
        console.log(uploadImageUrl,"result")
       
        var uploadImageUrl = [];
        try {
             
            for (const img of picture) {
          const uniqueKey = `cars/${uuidv4()}.jpg`; 
                const { data } = await createPresignedUrl({
                    variables: { key: uniqueKey }
                });

            if (!data || !data.createPresignedUrl || !data.createPresignedUrl.PresignedUrl) {
                console.error('Failed to get presigned URL:', data);
                continue; 
            }

            if (!img) {
                console.error('Invalid image found in the array');
                continue; 
            }  


                const contentType = img.type || 'image/jpeg'; 
                console.log('Image content type:', contentType);


                console.log('Presigned URL:', data);
                const url = data.createPresignedUrl.PresignedUrl;
        
                const response = await fetch(url, {
                    method: 'PUT',
                    body: img,
                    headers: {
                        'Content-Type': contentType
                    },
                    mode: 'cors'
                });
        
                console.log('Upload response:', response);
                
                if (!response.ok) {
                    throw new Error(`Failed to upload image with key: ${uniqueKey}`);
                }
        
             
                uploadImageUrl.push(uniqueKey);
            }
        
         
            await addCar({
                variables: {
                    year: parseInt(year),
                    make: make,
                    model: model,
                    mileage: parseInt(mileage),
                    description: disc,
                    trans: trans,
                    imageUrl: uploadImageUrl, 
                    price: parseInt(price),
                    vin: parseInt(vin),
                }
            });
            if(!addCar){
                throw new Error(console.log('error car failed to add'))
            }
            console.log('Car added successfully');
        
        } catch (error) {
            console.error('Error uploading image or adding car:', error);
        }

}
    return (
        <div style={{display:'flex',justifyContent:'center'}}>
            <form onSubmit={event => picHandler(event)} style={{
                display:'flex', 
                justifyContent:'center',
                flexDirection:'column',
                width: '300px',
                gap:'10px'
            
            }}>
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

                <label htmlFor="modelId">model</label>
                <input type="text" id="modelId"></input>

                <label htmlFor="price">price</label>
                <input type="text" id="priceId"></input>

                <label htmlFor="Trans">vin</label>
                <input type="text" id="vinId"></input>

                
                <input type='submit' value='submit'></input>
                
            </form>
        </div>
    );



};
export default addCarData


   // for (var pair of formData.entries()) {
            //     console.log(pair[0]+ ', ' + pair[1]); 
            // }
  // const formData = new FormData();
            // formData.append('file',img);
            // formData.append('timestamp', Math.floor(Date.now() / 1000));



 //ahttps:pi.cloudinary.com/v1_1/dm8t2zlt4/image/upload

 // formData.append('upload_preset', 'phpgox3z');

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