import { useState } from 'react'


const SlideShow = ({ image = [], id, index }) => {

    
    const arrayLength = image.length;

    const [slideIndex, setSlideIndex] = useState(0);

    const setIndexForwards = () => {
        setSlideIndex((prevIndex) =>
            prevIndex === arrayLength - 1 ? 0 : prevIndex + 1);
    }

    const setIndexBackwards = () => {
        setSlideIndex((prevIndex) =>
            prevIndex === 0 ? arrayLength - 1 : prevIndex - 1);
    }

    return (
        <div>
            <div className="admin-dashboard__slideshow-container">
                <div className="slide-wrapper">
                    {image.map((img, index) => {
                        return (
                            
                            <img 
                            src={img} 
                            key={index} 
                            style={{transform:`translateX(-${slideIndex * 100}%)`}}
                            />

                            
                        )
                    })}
                </div>
                <button className="slider-button left" onClick={() => setIndexBackwards()}>&#60;</button>
                <button className="slider-button right" onClick={() => setIndexForwards()}>&#62;</button>
            </div>
        </div>
    );
}

export default SlideShow;