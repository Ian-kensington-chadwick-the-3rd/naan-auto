import { useMutation } from "@apollo/client";
import { ADD_CAR, GET_CARS, PRESIGNED_URL, SEARCH_FIELD } from "../utils/querys";
import { AdvancedImage, placeholder } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import { Link, Navigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react'
import AdminForm from "./adminForm";
import Loading from "./loading";

const AddCarData = () => {
    const [addCar] = useMutation(ADD_CAR,{
        refetchQueries: [
            {query: GET_CARS},
            {query: SEARCH_FIELD}
        ]
    });
    const [createPresignedUrl] = useMutation(PRESIGNED_URL);
    if (addCar.loading) return <p>Loading...</p>;
    if (addCar.error) return <p>Error: {addCar.error.message}</p>;

    const [loadingCss, setLoadingCss] = useState(false);

    // if validation 
    const [validation, setValidation] = useState({})
    // sets our form
    const [form, setForm] = useState({
        year: '',
        make: '',
        model: '',
        mileage: '',
        description: '',
        trans: '',
        imageUrl: [],
        price: '',
        vin: '',
        drivetrain: '',
        exteriorColor: '',
        interiorColor: '',
        fuelType: '',
        engineType: '',
        condition: '',
        titleHistory: '',
        ownership: '',
    });

    // this sets css for floating label using the span tag
    const [focus, setFocus] = useState({
        year: false,
        make: false,
        model: false,
        mileage: false,
        description: false,
        trans: false,
        imageUrl: false,
        price: false,
        vin: false,
        drivetrain: false,
        exteriorColor: false,
        interiorColor: false,
        fuelType: false,
        engineType: false,
        condition: false,
        titleHistory: false,
        ownership: false,
    })

    const handleFocus = (field) => {
        setFocus((prev) => ({
            ...prev,
            [field]: true
        }));
    };

    const handleBlur = (field) => {
        setFocus((prev) => ({
            ...prev,
            [field]: false
        }))
    }

    // parses form input for backend
    const handleInputChange = (e) => {
        e.preventDefault()
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setForm(prev => ({
                ...prev,
                imageUrl: Array.from(files)
            }));
        } else if (name === 'price' || name === 'year' || name === 'mileage') {
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
        e.preventDefault();

        const picture = form.imageUrl;
        var uploadImageUrl = [];
        console.log(uploadImageUrl);

        setValidation({});
        const missingFields = {};

        if (!form.year) {
            missingFields.year = 'please input value for year';
        };

        if (!form.model) {
            missingFields.model = 'please input value for model';
        };

        if (!form.make) {
            missingFields.make = 'please input value for make';
        };

        if (!form.price) {
            missingFields.price = 'please input value for price'
        }

        if (!form.mileage) {
            missingFields.mileage = 'please input value for mileage'
        }

        const nextYear = new Date().getFullYear() + 1;
        if (form.year < 1900 || form.year > nextYear) {
            missingFields.year = `between 1900 and year ${nextYear} `;
        };

        if (form.price && form.price <= 0) {
            missingFields.price = 'price must be greater than zero';
        };

        if (form.mileage && form.mileage <= 0) {
            missingFields.mileage = 'mileage must be greater than zero';
        };

        if (Object.keys(missingFields).length > 0) {
            setValidation(missingFields);
            return;
        }
        setLoadingCss(true);
        try {
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


                if (response.ok) {
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
            if (!addCar) {
                throw new Error(console.log('error car failed to add'))
            }
            setLoadingCss(false);
            console.log('Car added successfully');
            setForm({
                year: '',
                make: '',
                model: '',
                mileage: '',
                description: '',
                trans: '',
                imageUrl: [],
                price: '',
                vin: '',
                drivetrain: '',
                exteriorColor: '',
                interiorColor: '',
                fuelType: '',
                engineType: '',
                condition: '',
                titleHistory: '',
                ownership: '',
            })

        } catch (error) {
            console.error('Error uploading image or adding car:', error);
        }

    }


    // we get event.target.name if useState name === form name 

    return (
        <div className="addcar__parent-container">
            {loadingCss && <Loading className={'loading'} />}
            <form onSubmit={e => formHandler(e)} className={`addcar__flex-direction ${loadingCss && 'blur'}`} >
                <div className="addcar__grid-container">
                    <div>
                        <label className="">Upload car pictures</label>
                        <br />
                        <input
                            type='file'
                            name='imageUrl'
                            multiple onChange={handleInputChange}
                        />
                    </div>

                    <label className="custom-field addcar__grid-col-start" >
                        <input
                            type="text"
                            name="year"
                            value={form.year}
                            onChange={handleInputChange}
                            className="input"
                            onFocus={() => handleFocus('year')}
                            onBlur={() => handleBlur('year')} />
                        <span className={`placeholder ${focus.year || form.year || validation.year ? 'placeholder-up' : ''}`}
                        style={validation.year && { color: 'red' }}>
                            {!validation.year ? 'Year!' : validation.year}
                        </span>
                    </label>

                    <label className="custom-field">
                        <input
                            type="text"
                            name="make"
                            value={form.make}
                            onChange={handleInputChange}
                            className="input"
                            onFocus={() => handleFocus('make')}
                            onBlur={() => handleBlur('make')} />
                        <span className={`placeholder ${focus.make || form.make || validation.make ? 'placeholder-up' : ''}`}
                            style={validation.make && { color: 'red' }}>
                            {!validation.make ? 'Make!' : validation.make}
                        </span>
                    </label>


                    <label className="custom-field">
                        <input type="text" name="model"
                            value={form.model} onChange={handleInputChange}
                            onFocus={() => handleFocus('model')}
                            onBlur={() => handleBlur('model')}
                            className="input"
                        />
                        <span className={`placeholder ${focus.model || form.model || validation.model ? 'placeholder-up' : ''}`}
                            style={validation.model && { color: 'red' }}>
                            {!validation.model ? 'Model!' : validation.model}
                        </span>
                    </label>

                    <label className="custom-field">
                        <input type='number'
                            name="mileage"
                            value={form.mileage}
                            onChange={handleInputChange}
                            onFocus={() => handleFocus('mileage')}
                            onBlur={() => handleBlur('mileage')}
                            className="input"
                        />
                        <span className={`placeholder ${focus.mileage || form.mileage || validation.mileage ? 'placeholder-up' : ''}`}
                            style={validation.mileage && { color: 'red' }}>
                            {!validation.mileage ? 'Mileage!' : validation.mileage}
                        </span>
                    </label>

                    <label className="custom-field">
                        <input type="text"
                            name="trans"
                            value={form.trans}
                            onChange={handleInputChange}
                            className="input"
                            onFocus={() => handleFocus('trans')}
                            onBlur={() => handleBlur('trans')} />
                        <span className={`placeholder ${focus.trans || form.trans || validation.trans ? 'placeholder-up' : ''}`}>
                            Transmission
                        </span>
                    </label>

                    <label className="custom-field">
                        <input type="text"
                            name="price"
                            value={form.price}
                            onChange={handleInputChange}
                            className="input"
                            onFocus={() => handleFocus('price')}
                            onBlur={() => handleBlur('price')} />
                        <span className={`placeholder ${focus.price || form.price || validation.price ? 'placeholder-up' : ''}`}
                        style={validation.price && { color: 'red' }}>
                            {!validation.price ? 'Price!' : validation.price}
                        </span>
                    </label>


                    <label className="custom-field"  >
                        <input
                            type="text"
                            name="vin"
                            value={form.vin}
                            onChange={handleInputChange}
                            className="input"
                            onFocus={() => handleFocus('vin')}
                            onBlur={() => handleBlur('vin')} />
                        <span className={`placeholder ${focus.vin || form.vin ? 'placeholder-up' : ''}`}>
                            Vin
                        </span>
                    </label>




                    <label className="custom-field">
                        <input
                            type="text"
                            name="drivetrain"
                            value={form.drivetrain}
                            onChange={handleInputChange}
                            className="input"
                            onFocus={() => handleFocus('drivetrain')}
                            onBlur={() => handleBlur('drivetrain')} />
                        <span className={`placeholder ${focus.drivetrain || form.drivetrain ? 'placeholder-up' : ''}`}>
                            Drivetrain
                        </span>
                    </label>

                    <label className="custom-field">
                        <input
                            type="text"
                            name="exteriorColor"
                            value={form.exteriorColor}
                            onChange={handleInputChange}
                            className="input"
                            onFocus={() => handleFocus('exteriorColor')}
                            onBlur={() => handleBlur('exteriorColor')} />
                        <span className={`placeholder ${focus.exteriorColor || form.exteriorColor ? 'placeholder-up' : ''}`}>
                            Exterior Color
                        </span>
                    </label>

                    <label className="custom-field">
                        <input
                            type="text"
                            name="interiorColor"
                            value={form.interiorColor}
                            onChange={handleInputChange}
                            className="input"
                            onFocus={() => handleFocus('interiorColor')}
                            onBlur={() => handleBlur('interiorColor')} />
                        <span className={`placeholder ${focus.interiorColor || form.interiorColor ? 'placeholder-up' : ''}`}>
                            Interior Color
                        </span>
                    </label>

                    <label className="custom-field">
                        <input
                            type="text"
                            name="fuelType"
                            value={form.fuelType}
                            onChange={handleInputChange}
                            className="input"
                            onFocus={() => handleFocus('fuelType')}
                            onBlur={() => handleBlur('fuelType')} />
                        <span className={`placeholder ${focus.fuelType || form.fuelType ? 'placeholder-up' : ''}`}>
                            Fuel Type
                        </span>
                    </label>

                    <label className="custom-field">
                        <input
                            type="text"
                            name="engineType"
                            value={form.engineType}
                            onChange={handleInputChange}
                            className="input"
                            onFocus={() => handleFocus('engineType')}
                            onBlur={() => handleBlur('engineType')} />
                        <span className={`placeholder ${focus.engineType || form.engineType ? 'placeholder-up' : ''}`}>
                            Engine Type
                        </span>
                    </label>

                    <label className="custom-field">
                        <input
                            type="text"
                            name="condition"
                            value={form.condition}
                            onChange={handleInputChange}
                            className="input"
                            onFocus={() => handleFocus('condition')}
                            onBlur={() => handleBlur('condition')} />
                        <span className={`placeholder ${focus.condition || form.condition ? 'placeholder-up' : ''}`}>
                            Condition
                        </span>
                    </label>

                    <label className="custom-field">
                        <input
                            type="text"
                            name="titleHistory"
                            value={form.titleHistory}
                            onChange={handleInputChange}
                            className="input"
                            onFocus={() => handleFocus('titleHistory')}
                            onBlur={() => handleBlur('titleHistory')} />
                        <span className={`placeholder ${focus.titleHistory || form.titleHistory ? 'placeholder-up' : ''}`}>
                            Title History
                        </span>
                    </label>

                    <label className="custom-field" >
                        <input
                            type="text"
                            name="ownership"
                            value={form.ownership}
                            onChange={handleInputChange}
                            className="input"
                            onFocus={() => handleFocus('ownership')}
                            onBlur={() => handleBlur('ownership')} />
                        <span className={`placeholder ${focus.ownership || form.ownership ? 'placeholder-up' : ''}`}>
                            ownership
                        </span>
                    </label>


                </div>

                <div className="addcar__desc-div">
                    <label >Description</label>
                    <textarea name="description" value={form.description} onChange={handleInputChange} className="addcar__description" placeholder="Car Description" />
                    <button type='submit' value='submit' className="addcar__button">submit</button>
                </div>

            </form>
        </div>
    );



};
export default AddCarData

