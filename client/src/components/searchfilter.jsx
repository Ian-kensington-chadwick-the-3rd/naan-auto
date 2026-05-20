
import { SEARCH_FIELD } from '../utils/querys.js'
import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react'

const Searchfilter = ({ onData }) => {
    const [fetchData, { data, error }] = useLazyQuery(SEARCH_FIELD)
    const [filteredData, setfilteredData] = useState([])

    useEffect(() => {
        setfilteredData(data?.searchField || [])
    }, [data]);

    useEffect(() => {
        if (filteredData && hasActiveFilters())
            onData(filteredData, hasActiveFilters());
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
    });

    const hasActiveFilters = () => {
        const hasIntFilters = Object.values(filterInt).some(val => val > 0)
        const hasStringFilters = Object.values(filterString).some(val => val !== '')
        return hasIntFilters || hasStringFilters;
    }

    if (error) {
        console.error("search filter error", error)
    }

    useEffect(() => {
        const variables = { ...filterInt, ...filterString }
        fetchData({ variables })
    }, [filterInt, filterString])

    function formHandler(e) {
        const name = e.target.name;
        const value = e.target.value;
        const intFields = ['minYear', 'maxYear', 'minPrice', 'maxPrice', 'minMileage', 'maxMileage'];
        if (intFields.includes(name)) {
            setFilterInt(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
        } else {
            setFilterString(prev => ({ ...prev, [name]: value }));
        }
        if (name === 'make' && (value === 'all' || value === '')) {
            setMakeFirst(false)
            setFilterString(prev => ({ ...prev, model: '' }))
        }
        if (name === 'make' && value !== '' && value !== 'all') {
            setMakeFirst(true)
        }
    }

    const [makeFirst, setMakeFirst] = useState(false)

    const getMinMax = (value) => {
        if (!filteredData || filteredData.length === 0) return { min: 0, max: 0 }
        const validValues = filteredData.map(d => d[value]).filter(v => v != null)
        if (validValues.length === 0) return { min: 0, max: 0 }
        return { min: Math.min(...validValues), max: Math.max(...validValues) }
    }

    const getUniqueCounts = (field) => {
        if (!filteredData || filteredData.length === 0) return { values: [], counts: {} }
        const values = filteredData
            .map(d => typeof d[field] === 'string' ? d[field] : null)
            .filter(Boolean)
        const counts = {}
        for (const v of values) counts[v] = (counts[v] || 0) + 1
        return { values: [...new Set(values)], counts }
    }

    const year = getMinMax('year');
    const price = getMinMax('price');
    const mileage = getMinMax('mileage');
    const { values: makeValues, counts: makeCounts } = getUniqueCounts('make');
    const { values: modelValues, counts: modelCounts } = getUniqueCounts('model');

    return (
        <form className="search_filter__form">
            <div className='search_filter__background'>
                <h2>Filter</h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label className='search-filter__label'>Price</label>
                    <div className="search_filter__group" onBlur={e => formHandler(e)}>
                        <input type="number" name='minPrice' placeholder={`Min ($${price.min})`} className='search-filter__style' />
                        <input type="number" name='maxPrice' placeholder={`Max ($${price.max})`} className='search-filter__style' />
                    </div>

                    <label className='search-filter__label'>Year</label>
                    <div className="search_filter__group" onBlur={e => formHandler(e)}>
                        <input type="number" name='minYear' placeholder={`Min (${year.min})`} className='search-filter__style' />
                        <input type="number" name='maxYear' placeholder={`Max (${year.max})`} className='search-filter__style' />
                    </div>

                    <label className='search-filter__label'>Mileage</label>
                    <div className="search_filter__group" onBlur={e => formHandler(e)}>
                        <input type="number" name='minMileage' placeholder={`Min (${mileage.min})`} className='search-filter__style' />
                        <input type="number" name='maxMileage' placeholder={`Max (${mileage.max})`} className='search-filter__style' />
                    </div>

                    <label className='search-filter__label'>Make</label>
                    <select onChange={e => formHandler(e)} name='make' value={filterString.make || ''} className='search-filter__style'>
                        <option value='' disabled hidden>Make</option>
                        <option value='all'>All</option>
                        {makeValues.map((val, i) => (
                            <option key={i} value={val}>{`${val} (${makeCounts[val]})`}</option>
                        ))}
                    </select>

                    <label className='search-filter__label'>Model</label>
                    <select onChange={e => formHandler(e)} name='model' value={filterString.model || ''} disabled={!makeFirst} className='search-filter__style'>
                        <option value='' disabled hidden>Model</option>
                        <option value='all'>All</option>
                        {modelValues.map((val, i) => (
                            <option key={i} value={val}>{`${val} (${modelCounts[val]})`}</option>
                        ))}
                    </select>
                </div>
            </div>
        </form>
    )
}

export default Searchfilter;
