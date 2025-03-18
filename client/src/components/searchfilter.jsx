
import { SEARCH_FIELD } from '../utils/querys.js'
import { useQuery, useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react'


const Searchfilter = ({ onData }) => {
    const [fetchData, { data, error }] = useLazyQuery(SEARCH_FIELD)
    const [filteredData, setfilteredData] = useState([])

    useEffect(() => {
        console.log("filtered Data has been passed to parent component", filteredData)

        onData(filteredData)
    }, [filteredData])

    const [filterInt, setFilterInt] = useState({
        minYear: 0,
        maxYear: 0,
        minPrice: 0,
        maxPrice: 0,
        minMileage: 0,
        maxMileage: 0,
    });

    const [filterString, setFilterString] = useState({
        make: '',
        model: '',
        description: '',
        trans: '',
        imageUrl: '',
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

    const [makeFirst, setMakeFirst] = useState(false)
    const [formReset, setFormReset] = useState(false)

    // in react updating a usestate that contains a boolean or number is considered read only replacing 
    // a usestate that posseses an object is considered mutating if you update filter.minyear = year BAD. in react everything is immutable
    // instead react allows you to pass the previous data so that you are not updating the old data 
    // but you are only replacing the data that is specified through the form name='modelname'
    // here i use [name]: value because it specifys a property with a dynamic name meaning i dont have to create a function that handles a change for every single form variable 

    // second use data to query search field 

    // this whole thing needs fixing will send a query correctly but wont query correct data


    if (error) {
        console.log("we got a problem", error)
    }

    // get queried data and set the final use hook to give data to /inventory page
    useEffect(() => {
        if (data) {
            console.log('success data retrieved', data)
            setfilteredData(data.searchField)
        }
        console.log("interacted is now", makeFirst)
    }, [data]);



    useEffect(() => {

        const peanutButterSpread = { ...filterInt, ...filterString }

        fetchData({ variables: peanutButterSpread })
    }, [filterInt, filterString])

    // first recieve user input set user data to filter
    function formHandler(e) {
        const name = e.target.name;
        const value = e.target.value;
        console.log("target???", e.target)
        console.log("form handler!!!", [name, value])
        if (
            name === "minYear" ||
            name === "maxYear" ||
            name === "minPrice" ||
            name === "maxPrice" ||
            name === "minMileage" ||
            name === "maxMileage" ||
            name === "price") {
            setFilterInt((prevData) => ({
                ...prevData,
                [name]: parseInt(value) || 0
            }));
        } else {

            setFilterString((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
        if (name === 'make' && value !== '') {
            condition(value)
        }
        if (name === 'make' && value === 'all') {
            setMakeFirst(false)
        }


        if (name && value) {
            setFormReset(true)
        }
    }

    const condition = (value) => {
        if (value !== null && value !== 'all') {
            console.log('interacted value', value)
            setMakeFirst(true)
        }
    }
    // gets the minimum or maximum amount to tell the users what the lowest/heighest value they can go to
    const getMinMax = (value) =>{
        if(filteredData && filteredData.length === 0) return {min: 0, max: 0}

        const validValues = filteredData.map(data => data[value]).filter(value => value !== null && value !== undefined)

        if(validValues.length === 0) return {min:0, max:0}

        return {
            min: Math.min(...validValues),
            max: Math.max(...validValues)
        }
    }
    // displays the count of how many duplicates per car for any filter option below 
    const getDuplicates = (value) => {
        if(filteredData && filteredData.length ===0) return 0

        const array = filteredData.map((data) => data[value]);

        const counts = {};
        for(const element of array){
            counts[element] = (counts[element] || 0) + 1
        }
        return counts
    }


    const makeCount = getDuplicates('make');
    const modelCount = getDuplicates('model');
    const transCount = getDuplicates('trans');
    const drivetrainCount = getDuplicates('drivetrain');
    const exteriorColorCount = getDuplicates('exteriorColor');
    const interiorColorCount = getDuplicates('interiorColor');
    const fuelTypeCount = getDuplicates('fuelType');
    const engineType = getDuplicates('engineType');
    const ownershipCount = getDuplicates('ownership');
    const titleHistoryCount = getDuplicates('titleHistory');


    const year = getMinMax('year');
    const price = getMinMax('price');
    const mileage = getMinMax('mileage');

    return (
        <form className="search_filter__form" >
            <div className='search_filter__background'>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <h2>basic filters</h2>
                    <div className="search_filter__group" onBlur={e => formHandler(e)}>
                        <input type="number" name='minPrice' placeholder={`min Price ($${price.min}) `} className=' search-filter__style' />
                        <input type="number" name='maxPrice' placeholder={`max Price ($${price.max})`} className=' search-filter__style' />
                    </div>
                    <div className="search_filter__group " onBlur={e => formHandler(e)}>
                        <input type="number" name='minYear' placeholder={`min Year (${year.min})`} className=' search-filter__style' />
                        <input type="number" name='maxYear' placeholder={`max Year (${year.max})`} className=' search-filter__style' />
                    </div>
                    <div className="search_filter__group" onBlur={e => formHandler(e)}>
                        <input type="number" name='minMileage' placeholder={`min Mileage (${mileage.min})`} className=' search-filter__style' />
                        <input type="number" name='maxMileage' placeholder={`max Mileage (${mileage.max})`} className=' search-filter__style' />
                    </div>
                </div>
                <h2>advanced filters</h2>
                <div className='advanced-filters__column'>

                    <select onChange={e => formHandler(e)} name='make' value={filterString.make === undefined ? '' : filterString.make} className='search-filter__style'>
                        <option key={`make-default`} value='' disabled hidden>Make</option>
                        <option key={`make-all`} value='all' >All</option>
                        {[...new Set(filteredData.map((data) => data.make))].map((data, index) => {
                            const key = `make-${index}`;
                            return (
                                data === null ? (
                                        <option key={key} value='' disabled> no make filter options</option> 
                                ) : (
                                    <option key={key} value={data}>
                                        {`${data} (${makeCount[data]})`}
                                    </option>)
                            )
                        })}
                    </select>

                    <select onChange={e => formHandler(e)} name='model' value={filterString.model === undefined ? '' : filterString.model}  {...makeFirst === false ? { disabled: true } : ''} className='search-filter__style'>
                        <option key={`model-default`} value='' disabled hidden>Model</option>
                        <option key={`model-all`} value='all'>All</option>
                        {[...new Set(filteredData.map((data) => data.model))].map((data, index) => {
                            const key = `model-${index}`;
                            return (
                                <option key={key} value={data}>
                                    {`${data} (${modelCount[data]})`}
                                </option>

                            )
                        })}
                    </select>
                    <select onChange={e => formHandler(e)} name='trans' value={filterString.trans === undefined ? '' : filterString.trans} className='search-filter__style'>
                        <option key={`trans-default`} value='' disabled hidden>Transmission</option>
                        <option key={`trans-all`} value='all'>All</option>
                        {[...new Set(filteredData.map((data) => data.trans))].map((data, index) => {
                            const key = `trans-${index}`;
                            return (
                                data === null ? (
                                        <option key={key} value='' disabled>no transmission filter options</option>
                                ) : (
                                    <option key={key} value={data}>
                                        {`${data} (${transCount[data]})`}
                                    </option>)
                            )
                        })}
                    </select>
                    <select onChange={e => formHandler(e)} name='drivetrain' value={filterString.drivetrain === undefined ? '' : filterString.drivetrain} className='search-filter__style'>
                        <option key={`drivetrain-default`} value='' disabled hidden>drivetrain</option>
                        <option key={`drivetrain-all`} value='all'>All</option>
                        {[...new Set(filteredData.map((data) => data.drivetrain))].map((data, index) => {
                            const key = `drivetrain-${index}`;
                            return (
                                data === null ? (
                                    
                                        <option key={key} value='' disabled> no drivetrain filter options</option>
                                    
                                ) : (
                                    <option key={key} value={data}>
                                        {`${data} (${drivetrainCount[data]})`}
                                    </option>)
                            )
                        })}
                    </select>
                    <select onChange={e => formHandler(e)} name='exteriorColor' value={filterString.exteriorColor === undefined ? '' : filterString.exteriorColor} className='search-filter__style'>
                        <option key={`exteriorColor-default`} value='' disabled hidden>Exterior Color</option>
                        <option key={`exteriorColor-all`} value='all'>All</option>
                        {[...new Set(filteredData.map((data) => data.exteriorColor))].map((data, index) => {
                            const key = `exteriorColor-${index}`;
                            return (
                                data === null ? (
                                    
                                        <option key={key} value='' disabled> no exterior color filter options</option>
                                    
                                ) : (
                                    <option key={key} value={data}>
                                        {`${data} (${exteriorColorCount[data]})`}
                                    </option>)
                            )
                        })}
                    </select>
                    <select onChange={e => formHandler(e)} name='interiorColor' value={filterString.interiorColor === undefined ? '' : filterString.interiorColor} className='search-filter__style'>
                        <option key={`interiorColor-default`} value='' disabled hidden>Interior Color</option>
                        <option key={`interiorColor-all`} value='all'>All</option>
                        {[...new Set(filteredData.map((data) => data.interiorColor))].map((data, index) => {
                            const key = `interiorColor-${index}`;
                            return (
                                data === null ? (
                                    
                                        <option key={key} value='' disabled> no interior filter options</option>
                                    
                                ) : (
                                    <option key={key} value={data}>
                                        {`${data} (${interiorColorCount[data]})`}
                                    </option>)
                            )
                        })}
                    </select>
                    <select onChange={e => formHandler(e)} name='fuelType' value={filterString.fuelType ? '' : filterString.fuelType} className='search-filter__style'>
                        <option key={`fuelType-default`} value='' disabled hidden>Fuel Type</option>
                        <option key={`fuelType-all`} value='all'>All</option>
                        {[...new Set(filteredData.map((data) => data.fuelType))].map((data, index) => {
                            const key = `fuelType-${index}`;
                            return (
                                data === null ? (
                                    
                                        <option key={key} value='' disabled> no fuel type filter options</option>
                                    
                                ) : (
                                    <option key={key} value={data}>
                                        {`${data} (${fuelTypeCount[data]})`}
                                    </option>)
                            )
                        })}
                    </select>
                    <select onChange={e => formHandler(e)} name='engineType' value={filterString.engineType === undefined ? '' : filterString.engineType} className='search-filter__style'>
                        <option key={`engineType-default`} value='' disabled hidden>Engine Type</option>
                        <option key={`engineType-all`} value='all'>All</option>
                        {[...new Set(filteredData.map((data) => data.engineType))].map((data, index) => {
                            const key = `engineType-${index}`;
                            return (
                                data === null ? (

                                        <option key={key} value='' disabled> no engine type filter options</option>

                                ) : (
                                    <option key={key} value={data}>
                                        {`${data} (${engineType[data]})`}
                                    </option>)
                            )
                        })}
                    </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <h2>Vehicle History</h2>
                    <div className="search_filter__group ">
                        <select className='search-filter__style' name='ownership' value={filterString.ownership === undefined ? '' : filterString.ownership} style={{ width: '100%', height: '30px' }}>
                            <option key={0} value='' disabled hidden>Ownership</option>
                            <option key={1} value='all'>All</option>
                            {[...new Set(filteredData.map((data) => data.ownership))].map((data, index) => {
                                const key = `ownership-${index}`;
                                return (
                                    data === null ? (
                                        <>
                                            <option key={key} value='' disabled> no ownership filter options</option>
                                        </>
                                    ) : (
                                        <option key={key} value={data}>
                                            {`${data} (${ownershipCount[data]})`}
                                        </option>)
                                )
                            })}
                        </select>
                        <input type="text" name="vin" placeholder="vin" className='search-filter__style' />
                    </div>
                    <div >
                        <select className='search-filter__style' name='titleHistory' value={filterString.titleHistory === undefined ? '' : filterString.titleHistory} style={{ width: '100%', height: '30px' }}>
                            <option key={0} value='' disabled hidden>Title History</option>
                            <option key={1} value='all'>All</option>
                            {[...new Set(filteredData.map((data) => data.titleHistory))].map((data, index) => {
                            const key = `ownership-${index}`;    
                                return (
                                    data === null ? (
                                        <>
                                            <option key={key} value='' disabled> no title history filter options</option>
                                        </>
                                    ) : (
                                        <option key={index} value={data}>
                                            {`${data} (${ titleHistoryCount[data]})`}
                                        </option>)
                                )
                            })}
                        </select>
                    </div>

                </div>
            </div>
        </form>
    )
}

export default Searchfilter;

// <input type='text' name='model' placeholder='model'/>
// <input type='text' name='make' placeholder='make'/>
// <input type="text" name="trans" placeholder="transmission"/>
// <input type="text" name="drivetrain" placeholder="drivetrain"/>
// <input type="text" name="exteriorColor" placeholder="exterior color"/>
// <input type="text" name="interiorColor" placeholder="interior color"/>
// <input type="text" name='fuelType' placeholder="fuel type"/>
// <input type="text" name="engineType" placeholder="engine type"/>