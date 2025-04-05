import { useQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from 'react'
import { GET_CARS, UPDATE_CAR, DELETE_CAR, SEARCH_FIELD } from "../utils/querys";
import Searchfilter from "./searchfilter";
import Modal from "./model";

const AdminForm = () => {
    const { loading, data, error, refetch } = useQuery(GET_CARS);
    const [updateCar] = useMutation(UPDATE_CAR,{
        refetchQueries: [{query: GET_CARS}]
    });
    const [deleteCar] = useMutation(DELETE_CAR,{
        refetchQueries: [
            {query: GET_CARS},
            {query: SEARCH_FIELD}
        ]
    });
    
    useEffect(()=>{
        refetch();
    },[refetch])

    useEffect(()=>{
        console.log("this is refetch",refetch)
    },[data])

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
        ownership: ''
    })
    console.log(data)



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
                ownership: selectedCar.ownership || ''
            })
            console.log(form)
        }
    }, [selectedCar])

    const carUpdate = async (e, _id) => {
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
            console.error(err)
        }
    }
    const handleFormSubmit = async (e, carId, imageUrl) => {
        e.preventDefault();
        const submitButtonName = e.nativeEvent.submitter.name;
        console.log(submitButtonName)
        if (submitButtonName === 'delete') {
            await carDelete(e, carId, imageUrl)
        }
        else {
            await carUpdate(e, carId)
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
    useEffect(()=>{
        console.log(usedSearch)
    },[usedSearch])
    const handleSearchData = (data, usedSearch) => {
        setSearchData(data)
        setUsedSearch(usedSearch)
    }

    const [modal, setModal] = useState(false)

    const showModal = () => {
        setModal(true);
        console.log(modal)
    }

    const closeModal = () => {
        setModal(false);
        console.log(modal)
    }

    const [modalImage, setModalImage] = useState()
    const showImage = (img) => {
        setModalImage(img)
    }

    const [imageId, setImageId] = useState()
    const modalId = (id) => {
        setImageId(id)
    }
    console.log(data?.Cars,"this is DATA CARSSSSS")
    const data1 = usedSearch === true ? searchData : (data?.Cars || []);
    
    console.log("data1!!!!!!!!!!",data1)
    if (loading) return 'loading... cars';
    if (error) return 'error with loading cars', error;

    return (
        <div style={{ display: 'flex' }}>
            <Modal showModal={modal} closeModal={closeModal} img={modalImage} id={imageId} />

            <Searchfilter onData={handleSearchData} />


            <div className="container-dashboard">
                {data1.map((car, index) => (
                    <div key={index} className='admin-dashboard__item' >
                        <div>
                            <img src={car.imageUrl} key={index} style={{ width: '400px', height: '400px' }} ></img>

                            <div className="admin-dashboard__imgscrollbar" >
                                <img src={car.imageUrl} key={index} style={{ width: '100px', height: '100px' }} onClick={() => { showModal(); showImage(car.imageUrl); modalId(car._id); }} />
                            </div>

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
                            <button type="submit" className="rmi-form_button">Update Car</button>
                            <button type="submit" name="delete" >Delete</button>
                        </form>
                    </div>

                ))}
            </div>
        </div>
    )
};


export default AdminForm;