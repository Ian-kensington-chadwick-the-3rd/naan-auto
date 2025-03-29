import { useMutation } from "@apollo/client";
import { ADD_CAR, PRESIGNED_URL } from "../utils/querys";
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import { Link, Navigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react'





const AddCarData = () => { 
    const [addCar] = useMutation(ADD_CAR);
    const [createPresignedUrl] = useMutation(PRESIGNED_URL);
if (addCar.loading) return <p>Loading...</p>;
if (addCar.error) return <p>Error: {error.message}</p>;

        const [form, setForm] = useState({
            year: null,
            make: '',
            model: '',
            mileage:null,
            description: '',
            trans: null,
            imageUrl: [], 
            price: null,
            vin: '',
            drivetrain:'',
            exteriorColor:'',
            interiorColor:'',
            fuelType:'',
            engineType:'',
            condition:'',
            titleHistory:'' ,
            ownership:'' ,
        });
        useEffect(()=>{
            console.log(form)
        },[form])

        // set form

        const handleInputChange = (e) =>{
            e.preventDefault()
            const { name, value , type, files } = e.target;
            console.log([name,value])
            if (type === 'file') {
                setForm(prev => ({
                    ...prev,
                    imageUrl: Array.from(files)
                }));
            } else if(name === 'price' || name === 'year' || name === 'mileage'){
                setForm((prev) => ({
                    ...prev,
                    [name]: value === 0 ? '' : Number(value)
                }));
            } else {
                setForm((prev) => ({
                    ...prev,
                    [name]: value
                }));
            }
        }

        async function formHandler(e) {
            e.preventDefault()
    
        const picture = form.imageUrl;
        var uploadImageUrl = [];
        console.log(uploadImageUrl)
        try {

            if(addCar.errors.message){return console.error(addCar.errors.message)}

            for (const img of picture) {
            const uniqueKey = `cars/${uuidv4()}.jpg`; 
                const { data } = await createPresignedUrl({
                    variables: { key: uniqueKey }
                });

            if (!data || !data.createPresignedUrl || !data.createPresignedUrl.presignedUrl) {
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
                const url = data.createPresignedUrl.presignedUrl;
        
                const response = await fetch(url, {
                    method: 'PUT',
                    body: img,
                    headers: {
                        'Content-Type': contentType
                    },
                    mode: 'cors'
                });
        
                console.log('Upload response:', response);
                
                
                if  (response.ok)  {
                    uploadImageUrl.push(uniqueKey);
                } else {
                    console.error(`Failed to upload image with key: ${uniqueKey}`);
                }
        
                
            } 
        
            await addCar({
                    variables: {
                        year: form.year,
                        make: form.make,
                        model: form.model,
                        mileage: form.mileage,
                        description: form.description,
                        trans: form.trans,
                        imageUrl: uploadImageUrl,
                        price: form.price,
                        vin: form.vin,
                        drivetrain: form.drivetrain,
                        exteriorColor: form.exteriorColor,
                        interiorColor: form.interiorColor,
                        fuelType: form.fuelType,
                        engineType: form.engineType,
                        condition: form.condition,
                        titleHistory: form.titleHistory,
                        ownership: form.ownership
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
            <form onSubmit={e => formHandler(e)} style={{
                display:'flex', 
                justifyContent:'center',
                flexDirection:'column',
                width: '300px',
                gap:'10px'
            
            }}>
                <label >Upload car picture</label> <br />
                <input type='file' name='imageUrl' multiple onChange={handleInputChange}/>


                <label >year</label>
                <input type='number' name="year" value={form.year} onChange={handleInputChange}/>

                <label >make</label>
                <input type='text' name="make" value={form.make} onChange={handleInputChange}/>

                <label >mileage</label>
                <input type='number' name="mileage" value={form.mileage} onChange={handleInputChange}/>

                <label >description</label>
                <textarea  name="description" value={form.description} onChange={handleInputChange}/>

                <label> transmission</label>
                <input type="text" name="trans" value={form.trans} onChange={handleInputChange}/>

                <label> model</label>
                <input type="text" name="model" value={form.model} onChange={handleInputChange}/>

                <label> price</label>
                <input type="text" name="price" value={form.price} onChange={handleInputChange}/>

                <label> vin</label>
                <input type="text" name="vin" value={form.vin} onChange={handleInputChange}/>

                <label >drivetrain</label>
                <input name="drivetrain" value={form.drivetrain} onChange={handleInputChange}/>

                <label>exterior color</label>
                <input type="text" name="exteriorColor" value={form.exteriorColor} onChange={handleInputChange}/>

                <label >interior color</label>
                <input type="text" name="interiorColor" value={form.interiorColor} onChange={handleInputChange}/>

                <label>fuel type</label>
                <input type="text" name="fuelType" value={form.fuelType} onChange={handleInputChange}/> 

                <label>engineType</label>
                <input name="engineType" value={form.engineType} onChange={handleInputChange}/>

                <label>condition</label>
                <input name="condition" value={form.condition} onChange={handleInputChange}/>

                <label>titleHistory</label>
                <input name="titleHistory" value={form.titleHistory} onChange={handleInputChange}/>

                <label>ownership</label>
                <input name="ownership" value={form.ownership} onChange={handleInputChange} />
    
                <input type='submit' value='submit'/>
                
            </form>
        </div>
    );



};
export default AddCarData

