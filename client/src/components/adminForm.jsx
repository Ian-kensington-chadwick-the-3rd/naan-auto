import { useQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from 'react'
import { GET_CARS, UPDATE_CAR, DELETE_CAR, SEARCH_FIELD } from "../utils/querys";
import Searchfilter from "./searchfilter";
import Modal from "./model";
import SlideShow from "./slideshow";
import Pagination from "./pagination";
import Ripple from './loading'

const AdminForm = () => {
    const { loading, data, error, refetch } = useQuery(GET_CARS);
    const [updateCar] = useMutation(UPDATE_CAR, {
        refetchQueries: [{ query: GET_CARS }]
    });
    const [deleteCar] = useMutation(DELETE_CAR, {
        refetchQueries: [
            { query: GET_CARS },
            { query: SEARCH_FIELD }
        ]
    });

    useEffect(() => {
        refetch();
    }, [refetch])

   
    // will have the ability to update cars delete cars and create cars
    const [selectedCar, setSelectedCar] = useState(null)
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
        sold: false
    })



    useEffect(() => {
        if (selectedCar) {
            setForm({
                year: selectedCar.year || 0,
                make: selectedCar.make || '',
                model: selectedCar.model || '',
                mileage: selectedCar.mileage || 0,
                description: selectedCar.description || '',
                trans: selectedCar.trans || '',
                imageUrl: selectedCar.imageUrl || [],
                price: selectedCar.price || 0,
                vin: selectedCar.vin || '',
                drivetrain: selectedCar.drivetrain || '',
                exteriorColor: selectedCar.exteriorColor || '',
                interiorColor: selectedCar.interiorColor || '',
                fuelType: selectedCar.fuelType || '',
                engineType: selectedCar.engineType || '',
                condition: selectedCar.condition || '',
                titleHistory: selectedCar.titleHistory || '',
                ownership: selectedCar.ownership || '',
                sold: selectedCar.sold || false 
            })
        }
    }, [selectedCar])
        
    const carUpdate = async (_id) => {
        
       
        try {
            const result = await updateCar({
                variables: {
                    _id,
                    ...form
                }
            })
            return result;
        } catch (err) {
            throw new Error(err)
        }
    }


    const carDelete = async (e, _id, imageUrl) => {
        try {

            const imageUrlArray = Array.isArray(imageUrl) ? imageUrl : [imageUrl];

            const result = await deleteCar({
                variables: {
                    carId: _id,
                    key: imageUrlArray
                }
            })
            return result;
        } catch (err) {
            console.log(err)
        }
    }
    const handleFormSubmit = async (e, carId, imageUrl) => {
        e.preventDefault();
        const submitButtonName = e.nativeEvent.submitter.name;
        if (submitButtonName === 'delete') {
            await carDelete(e, carId, imageUrl)
        }
        if(submitButtonName === 'update'){
           
            await carUpdate(carId)
        }
            
        }
    


    const handleFormChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name === 'year' || name === 'mileage' || name === 'price') {
            setForm((prev) => ({
                ...prev,
                [name]: value === '' ? 0 : Number(value)
            }));
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };


    const [searchData, setSearchData] = useState([]);
    const [usedSearch, setUsedSearch] = useState(false)

    const handleSearchData = (data, usedSearch) => {
        setSearchData(data)
        setUsedSearch(usedSearch)
    }

    const [modal, setModal] = useState(false)

    const showModal = () => {
        setModal(true);
    }

    const closeModal = () => {
        setModal(false);
    }

    const [modalImage, setModalImage] = useState()
    const showImage = (img) => {
        setModalImage(img)
    }

    const [imageId, setImageId] = useState()
    const modalId = (id) => {
        setImageId(id)
    }

    const setSold = async (car) => {
        const newSoldStatus = !car.sold;
     

        try{
            console.log(newSoldStatus)
        const result = await updateCar({
            variables: {
                _id: car._id,
                sold: newSoldStatus 
            }
        });
        console.log(result)
    } catch(e){
        console.error(e)
        console.log(result)
    }
    }
    // grabs id then uses id to update form information
    


    // page equals 1 staring slice 0, 10 page equals 2 next slice if page 

    const data1 = usedSearch === true ? searchData : (data?.Cars || []);
    const [paginatedData, setPaginatedData] = useState([])


    const handlePaginatedData = (paginatedData) => {
        setPaginatedData(paginatedData)
    }

    const soldData = paginatedData.map((car, i)=> car.sold)

  
    
   
    if (loading) return <Ripple className='inventory-rippleloading' />;
    if (error) return <div>{error}</div>;

    return (
        <div className="flex spacing-top">
            <Modal showModal={modal} closeModal={closeModal} img={modalImage} id={imageId} />
            <div className="spacing-left-right" id='inventorySearch'>
                <Searchfilter onData={handleSearchData} />
            </div>
            <div>
                <div className="container">
                    {paginatedData.map((car, index) => (
                        <div key={index} className='admin-dashboard__item' >
                            <div style={{position:'relative'}}>
                                {car.sold === true && <span className="sold">SOLD</span>}
                                <SlideShow image={car.imageUrl} index={index} />
                            </div>
                            <form className="admin-dashboard___input " onSubmit={(e) => handleFormSubmit(e, car._id, car.imageUrl)}>
                                <div>
                                    <label>Year:</label>
                                    <input className="admin-dashboard__input-style"
                                        type="input" value={car._id === selectedCar?._id ? form.year : car.year || ''}
                                        name="year"
                                        onChange={e => handleFormChange(e)}
                                        onClick={() => setSelectedCar(car)}
                                    />
                                </div>
                                <div>
                                    <label>Make:</label>
                                    <input className="admin-dashboard__input-style"
                                        value={car._id === selectedCar?._id ? form.make : car.make || ''}
                                        name="make"
                                        onChange={e => handleFormChange(e)}
                                        onClick={() => setSelectedCar(car)}
                                    />
                                </div>
                                <div>
                                    <label>Model:</label>
                                    <input className="admin-dashboard__input-style"
                                        value={car._id === selectedCar?._id ? form.model : car.model || ''}
                                        name="model"
                                        onChange={e => handleFormChange(e)}
                                        onClick={() => setSelectedCar(car)}
                                    />
                                </div>
                                <div>
                                    <label>Mileage:</label>
                                    <input className="admin-dashboard__input-style"
                                        value={car._id === selectedCar?._id ? form.mileage : car.mileage || ''}
                                        name="mileage"
                                        onChange={e => handleFormChange(e)}
                                        onClick={() => setSelectedCar(car)}
                                    />
                                </div>
                                <div>
                                    <label>Transmission:</label>
                                    <input className="admin-dashboard__input-style"
                                        value={car._id === selectedCar?._id ? form.trans : car.trans || ''}
                                        name="trans"
                                        onChange={e => handleFormChange(e)}
                                        onClick={() => setSelectedCar(car)}
                                    />
                                </div>
                                <div>
                                    <label>Price:</label>
                                    <input className="admin-dashboard__input-style"
                                        value={car._id === selectedCar?._id ? form.price : car.price || ''}
                                        name="price"
                                        onChange={e => handleFormChange(e)}
                                        onClick={() => setSelectedCar(car)}
                                    />
                                </div>
                                <div>
                                    <label>Vin:</label>
                                    <input className="admin-dashboard__input-style"
                                        value={car._id === selectedCar?._id ? form.vin : car.vin || ''}
                                        name="vin"
                                        onChange={e => handleFormChange(e)}
                                        onClick={() => setSelectedCar(car)}
                                    />
                                </div>
                                <div>
                                    <label>Drivetrain:</label>
                                    <input className="admin-dashboard__input-style"
                                        value={car._id === selectedCar?._id ? form.drivetrain : car.drivetrain || ''}
                                        name="drivetrain"
                                        onChange={e => handleFormChange(e)}
                                        onClick={() => setSelectedCar(car)}
                                    />
                                </div>
                                <div>
                                    <label>Exterior Color:</label>
                                    <input
                                        className="admin-dashboard__input-style"
                                        value={car._id === selectedCar?._id ? form.exteriorColor : car.exteriorColor || ''}
                                        name="exteriorColor"
                                        onChange={e => handleFormChange(e)}
                                        onClick={() => setSelectedCar(car)}
                                    />
                                </div>
                                <div>
                                    <label>Interior Color:</label>
                                    <input className="admin-dashboard__input-style"
                                        value={car._id === selectedCar?._id ? form.interiorColor : car.interiorColor || ''}
                                        name="interiorColor"
                                        onChange={e => handleFormChange(e)}
                                        onClick={() => setSelectedCar(car)}
                                    />
                                </div>

                                <div>
                                    <label>Fuel Type:</label>
                                    <input className="admin-dashboard__input-style"
                                        value={car._id === selectedCar?._id ? form.fuelType : car.fuelType || ''}
                                        name="fuelType"
                                        onChange={e => handleFormChange(e)}
                                        onClick={() => setSelectedCar(car)}
                                    />
                                </div>
                                <div>
                                    <label>Engine Type:</label>
                                    <input className="admin-dashboard__input-style"
                                        value={car._id === selectedCar?._id ? form.engineType : car.engineType || ''}
                                        name="engineType"
                                        onChange={e => handleFormChange(e)}
                                        onClick={() => setSelectedCar(car)}
                                    />
                                </div>
                                <div>
                                    <label>Condition:</label>
                                    <input className="admin-dashboard__input-style"
                                        value={car._id === selectedCar?._id ? form.condition : car.condition || ''}
                                        name="condition"
                                        onChange={e => handleFormChange(e)}
                                        onClick={() => setSelectedCar(car)}
                                    />
                                </div>
                                <div>
                                    <label>Title History:</label>
                                    <input className="admin-dashboard__input-style"
                                        value={car._id === selectedCar?._id ? form.titleHistory : car.titleHistory || ''}
                                        name="titleHistory"
                                        onChange={e => handleFormChange(e)}
                                        onClick={() => setSelectedCar(car)}
                                    />
                                </div>
                                <div>
                                    <label>Ownership:</label>
                                    <input className="admin-dashboard__input-style"
                                        value={car._id === selectedCar?._id ? form.ownership : car.ownership || ''}
                                        name="ownership"
                                        onChange={e => handleFormChange(e)}
                                        onClick={() => setSelectedCar(car)}
                                    />
                                </div>
                                <label>Description:</label>
                                <textarea style={{}} className=""
                                    value={car._id === selectedCar?._id ? form.description : car.description || ''}
                                    name="description"
                                    onChange={e => handleFormChange(e)}
                                    onClick={() => setSelectedCar(car)}
                                />
                                <button
                                    className="admin-dashboard___btntop"
                                    src={car.imageUrl}
                                    key={index}
                                    onClick={() => {
                                        showModal();
                                        showImage(car.imageUrl);
                                        modalId(car._id);
                                    }}
                                >img customization
                                </button>
                                <button className="admin-dashboard___btntop" type="button" onClick={() => {setSold(car)}}>Mark as Sold</button>
                                <div className="admin-dashboard___btncontainer">
                                    <button type="button" className="admin-dashboard___btn" >Update Car</button>
                                    <button type="submit" className="admin-dashboard___btn" name="delete">Delete Car</button>
                                </div>
                            </form>
                        </div>
                    ))}
                </div>
                <Pagination data={data1} handlePaginatedData={handlePaginatedData} />
            </div>
        </div>
    )
};


export default AdminForm;