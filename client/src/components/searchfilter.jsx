
import { SEARCH_FIELD, } from '../utils/querys.js'
import { useQuery, useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react'


const Searchfilter = ({ onData }) => {
    // queries data only when called by the fetchData function
    const [fetchData, { data, error, loading }] = useLazyQuery(SEARCH_FIELD)
    // this hook recieves the data quiried by SEARCH_FIELD and is then mapped through to display the current car options
    const [filteredData, setfilteredData] = useState([])

    useEffect(() => {
        setfilteredData(data?.searchField || [])
    }, [data]);


    // if search filter has been used

    // ships data to parent component adminForm
    useEffect(() => {
        if (filteredData && hasActiveFilters())
            onData(filteredData, hasActiveFilters());

    }, [filteredData])

    // integer form
    const [filterInt, setFilterInt] = useState({
        minYear: 0,
        maxYear: 0,
        minPrice: 0,
        maxPrice: 0,
        minMileage: 0,
        maxMileage: 0,
    });

    // string form
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

    const hasActiveFilters = () => {
        const hasIntFilters = Object.values(filterInt).some(val => val > 0)
        const hasStringFilters = Object.values(filterString).some(val => val !== '' && val !== 'all')
        return hasIntFilters || hasStringFilters;
    }


    if (error) {
        console.log("we got a problem", error)
    }

    // get queried data and set the final use hook to give data to /inventory page


    // this hook fetches the data chosen from the form in filter and int reference the fetchdata function at the top
    useEffect(() => {
        const peanutButterSpread = { ...filterInt, ...filterString }
        fetchData({ variables: peanutButterSpread })
    }, [filterInt, filterString])

    // handles the form and parses the values correctly for backend
    function formHandler(e) {
        const name = e.target.name;
        const value = e.target.value;
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



    }

    // this hook makes sure that car.make is first chosen before they can search model
    const [makeFirst, setMakeFirst] = useState(false)
    const [formReset, setFormReset] = useState(false)

    const condition = (value) => {
        if (value !== null && value !== 'all') {
            setMakeFirst(true)
        }
    }
    // gets the minimum or maximum amount to tell the users what the lowest/heighest value they can go to
    const getMinMax = (value) => {
        if (filteredData && filteredData.length === 0) return { min: 0, max: 0 }

        const validValues = filteredData.map(data => data[value]).filter(value => value !== null && value !== undefined)

        if (validValues.length === 0) return { min: 0, max: 0 }

        return {
            min: Math.min(...validValues),
            max: Math.max(...validValues)
        }
    }
    // displays the count of how many duplicates per car for any filter option below 
    const getDuplicates = (value) => {
        if (filteredData && filteredData.length === 0) return {};

        const array = filteredData.map((data) => data[value]).filter(val => val !== null && val !== undefined && val !== '');

        console.log(array)
        const counts = {};
        for (const element of array) {
            counts[element] = (counts[element] || 0) + 1
        }
        return counts;
    }


    const makeCount = getDuplicates('make');
    const modelCount = getDuplicates('model');
    const transCount = getDuplicates('trans');
    const drivetrainCount = getDuplicates('drivetrain');
    const exteriorColorCount = getDuplicates('exteriorColor');
    const interiorColorCount = getDuplicates('interiorColor');
    const fuelTypeCount = getDuplicates('fuelType');
    const engineTypeCount = getDuplicates('engineType');
    const ownershipCount = getDuplicates('ownership');
    const titleHistoryCount = getDuplicates('titleHistory');

    const year = getMinMax('year');
    const price = getMinMax('price');
    const mileage = getMinMax('mileage');


    const validMakeData = [...new Set(filteredData.map(data => data.make))].filter(val => val !== undefined && val !== null && val !== '')
    const validModelData = [...new Set(filteredData.map(data => data.model))].filter(val => val !== undefined && val !== null && val !== '')
    const validTransData = [...new Set(filteredData.map(data => data.trans))].filter(val => val !== undefined && val !== null && val !== '')
    const validDrivetrainData = [...new Set(filteredData.map(data => data.drivetrain))].filter(val => val !== undefined && val !== null && val !== '')
    const validExteriorColorData = [...new Set(filteredData.map(data => data.exteriorColor))].filter(val => val !== undefined && val !== null && val !== '')
    const validInteriorColorData = [...new Set(filteredData.map(data => data.interiorColor))].filter(val => val !== undefined && val !== null && val !== '')
    const validFuelTypeData = [...new Set(filteredData.map(data => data.fuelType))].filter(val => val !== undefined && val !== null && val !== '')
    const validEngineTypeData = [...new Set(filteredData.map(data => data.engineType))].filter(val => val !== undefined && val !== null && val !== '')
    const validOwnershipData = [...new Set(filteredData.map(data => data.ownership))].filter(val => val !== undefined && val !== null && val !== '')
    const validTitleHistoryData = [...new Set(filteredData.map(data => data.titleHistory))].filter(val => val !== undefined && val !== null && val !== '')

    console.log(validTransData)

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
                        <option key={`make-all`} value='all'>All</option>
                        {validMakeData.length <= 0 ? (
                            <option key="no-options" value=''>
                                no make search options
                            </option>
                        ) : (
                            validMakeData.map((data, index) => {
                                const key = `make-${index}`; 
                                return (
                                    <option key={key} value={data}>
                                        {`${data} (${makeCount[data]})`}
                                    </option>
                                );
                               
                            })
                        )}
                    </select>

                    <select onChange={e => formHandler(e)} name='model' value={filterString.model === undefined ? '' : filterString.model}  {...makeFirst === false ? { disabled: true } : ''} className='search-filter__style'>
                        <option key={`model-default`} value='' disabled hidden>Model</option>
                        <option key={`model-all`} value='all'>All</option>
                        {validModelData.length <= 0 ? (
                            <option key="no-options" value=''>
                                no model search options
                            </option>
                        ) : (
                            validModelData.map((data, index) => {
                                const key = `make-${index}`;
                                console.log(data)
                                return (
                                    <option key={key} value={data}>
                                        {`${data} (${modelCount[data]})`}
                                    </option>
                                );
                            })
                        )}
                    </select>
                    <select onChange={e => formHandler(e)} name='trans' value={filterString.trans === undefined ? '' : filterString.trans} className='search-filter__style'>
                        <option key={`trans-default`} value='' disabled hidden>Transmission</option>
                        <option key={`trans-all`} value='all'>All</option>
                        {validTransData.length <= 0 ? (
                            <option key="no-options" value=''>
                                no trans search options
                            </option>
                        ) : (
                            validTransData.map((data, index) => {
                                const key = `make-${index}`;
                                return (
                                    <option key={key} value={data}>
                                        {`${data} (${transCount[data]})`}
                                    </option>
                                );
                            })
                        )}
                    </select>
                    <select onChange={e => formHandler(e)} name='drivetrain' value={filterString.drivetrain === undefined ? '' : filterString.drivetrain} className='search-filter__style'>
                        <option key={`drivetrain-default`} value='' disabled hidden>drivetrain</option>
                        <option key={`drivetrain-all`} value='all'>All</option>
                        {validDrivetrainData.length <= 0 ? (
                            <option key="no-options" value=''>
                                no drivetrain search options
                            </option>
                        ) : (
                            validDrivetrainData.map((data, index) => {
                                const key = `make-${index}`;
                                return (
                                    <option key={key} value={data}>
                                        {`${data} (${ drivetrainCount[data]})`}
                                    </option>
                                );
                            })
                        )}
                    </select>
                    <select onChange={e => formHandler(e)} name='exteriorColor' value={filterString.exteriorColor === undefined ? '' : filterString.exteriorColor} className='search-filter__style'>
                        <option key={`exteriorColor-default`} value='' disabled hidden>Exterior Color</option>
                        <option key={`exteriorColor-all`} value='all'>All</option>
                        {validExteriorColorData.length <= 0 ? (
                            <option key="no-options" value=''>
                                no exterior color search options
                            </option>
                        ) : (
                            validExteriorColorData.map((data, index) => {
                                const key = `make-${index}`;
                                return (
                                    <option key={key} value={data}>
                                        {`${data} (${exteriorColorCount[data]})`}
                                    </option>
                                );
                            })
                        )}
                    </select>
                    <select onChange={e => formHandler(e)} name='interiorColor' value={filterString.interiorColor === undefined ? '' : filterString.interiorColor} className='search-filter__style'>
                        <option key={`interiorColor-default`} value='' disabled hidden>Interior Color</option>
                        <option key={`interiorColor-all`} value='all'>All</option>
                        {validInteriorColorData.length <= 0 ? (
                            <option key="no-options" value=''>
                                no interior color search options
                            </option>
                        ) : (
                            validInteriorColorData.map((data, index) => {
                                const key = `make-${index}`;
                                return (
                                    <option key={key} value={data}>
                                        {`${data} (${interiorColorCount[data]})`}
                                    </option>
                                );
                            })
                        )}
                    </select>
                    <select onChange={e => formHandler(e)} name='fuelType' value={filterString.fuelType ? '' : filterString.fuelType} className='search-filter__style'>
                        <option key={`fuelType-default`} value='' disabled hidden>Fuel Type</option>
                        <option key={`fuelType-all`} value='all'>All</option>
                        {validFuelTypeData.length <= 0 ? (
                            <option key="no-options" value=''>
                                no fuel type search options
                            </option>
                        ) : (
                            validFuelTypeData.map((data, index) => {
                                const key = `make-${index}`;
                                return (
                                    <option key={key} value={data}>
                                        {`${data} (${fuelTypeCount[data]})`}
                                    </option>
                                );
                            })
                        )}
                    </select>
                    <select onChange={e => formHandler(e)} name='engineType' value={filterString.engineType === undefined ? '' : filterString.engineType} className='search-filter__style'>
                        <option key={`engineType-default`} value='' disabled hidden>Engine Type</option>
                        <option key={`engineType-all`} value='all'>All</option>
                        {validEngineTypeData.length <= 0 ? (
                            <option key="no-options" value=''>
                                no engine type search options
                            </option>
                        ) : (
                            validEngineTypeData.map((data, index) => {
                                const key = `make-${index}`;
                                return (
                                    <option key={key} value={data}>
                                        {`${data} (${engineTypeCount[data]})`}
                                    </option>
                                );
                            })
                        )}
                    </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <h2>Vehicle History</h2>
                    <div className="search_filter__group ">
                        <select className='search-filter__style' name='ownership' value={filterString.ownership === undefined ? '' : filterString.ownership} style={{ width: '100%', height: '30px' }}>
                            <option key={0} value='' disabled hidden>Ownership</option>
                            <option key={1} value='all'>All</option>
                            {validOwnershipData.length <= 0 ? (
                            <option key="no-options" value=''>
                                no make search options
                            </option>
                        ) : (
                            validOwnershipData.map((data, index) => {
                                const key = `make-${index}`;
                                return (
                                    <option key={key} value={data}>
                                        {`${data} (${ownershipCount[data]})`}
                                    </option>
                                );
                            })
                        )}
                        </select>
                        <input type="text" name="vin" placeholder="vin" className='search-filter__style' />
                    </div>
                    <div >
                        <select className='search-filter__style' name='titleHistory' value={filterString.titleHistory === undefined ? '' : filterString.titleHistory} style={{ width: '100%', height: '30px' }}>
                            <option key={0} value='' disabled hidden>Title History</option>
                            <option key={1} value='all'>All</option>
                            {validTitleHistoryData.length <= 0 ? (
                            <option key="no-options" value=''>
                                no make search options
                            </option>
                        ) : (
                            validTitleHistoryData.map((data, index) => {
                                const key = `make-${index}`;
                                return (
                                    <option key={key} value={data}>
                                        {`${data} (${titleHistoryCount[data]})`}
                                    </option>
                                );
                            })
                        )}
                        </select>
                    </div>

                </div>
            </div>
        </form>
    )
}

export default Searchfilter;

