

import {useEffect, useState} from 'react'




const Pagination = ({ data, handlePaginatedData }) =>{

    const setActivePageIndexPrev = () =>{
        pageIndex === 1 ? setActivePage(pageArray.length) : setActivePage(prev => prev - 1)
    }

    const setActivePageIndexNext = () =>{
        pageIndex === pageArray.length ? setActivePage(1) : setActivePage(prev => prev + 1)
    }

    const [activePage, setActivePage] = useState(1)
    const [pageIndex, setPageIndex] = useState(1);

    console.log(pageIndex)

    const total = data.length;
    const start = (pageIndex - 1) * 9;
    const end = start + 9;
    const totalPages = Math.ceil(total / 9);

    const prevPage = () => {
        if (pageIndex === 1) {
            setPageIndex(totalPages)
        } else {
            setPageIndex(prev => prev - 1)
        }
    }

    const nextPage = () => {
        if (pageIndex === totalPages) {
            setPageIndex(1)
        } else {
            setPageIndex(prev => prev + 1);
        }
    }

    const pageArray = [];
    for (let i = 0; i < totalPages; i++) {
        pageArray.push(i + 1)
    }
    console.log(pageArray)
    console.log("pageINDEX!!!!!!",pageIndex)

    
    useEffect(()=>{
        const paginatedData = data.slice(start, end)
        handlePaginatedData(paginatedData)
    },[start,end,data])
   
    

    console.log("data1!!!!!!!!!!", data)

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return(
        <div className="pagination-container">
        <button className="pagination__btn" onClick={() => { prevPage(); setActivePageIndexPrev();}}>&#60;</button>

        {pageArray.map((i, index) => {
            return (
                <button
                    className={activePage === i ? 'active-btn pagination__btn' : 'pagination__btn'}
                    onClick={() => {setPageIndex(i);scrollToTop(); setActivePage(i);}}
                    key={index}>
                    {i}
                </button>
            )
        })}
        <button className="pagination__btn" onClick={() => {nextPage(); setActivePageIndexNext();}}>&#62;</button>
    </div>
    )
}

export default Pagination;