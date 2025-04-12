import { useState, useRef, useEffect } from 'react'

const SlideShow = ({ image = [], id, index, onDragStatusChange }) => {
    const arrayLength = image.length;
    const [wasDragged, setWasDragged] = useState(false);
    const [slideIndex, setSlideIndex] = useState(0);
    const [dragging, setDragging] = useState(false);
    let startX = useRef(0);
    let totalDraggedDistance = useRef(0);
    let slideWrapperRef = useRef(null);

    const dragThreshold = 10;

    const setIndexForwards = () => {
        setSlideIndex((prevIndex) =>
            prevIndex === arrayLength - 1 ? 0 : prevIndex + 1);
    }

    const setIndexBackwards = () => {
        setSlideIndex((prevIndex) =>
            prevIndex === 0 ? arrayLength - 1 : prevIndex - 1);
    }

    const getClientX = (e) => {
        if (e.touches && e.touches.length > 0) return e.touches[0].clientX;
        if (e.changedTouches && e.changedTouches.length > 0) return e.changedTouches[0].clientX;
        return e.clientX;
    };

    const mouseDownAction = (e) => {
        setDragging(true);
        setWasDragged(false);
        startX.current = getClientX(e);

        if (onDragStatusChange) {
            onDragStatusChange(true);
        }
    }

    const mouseUpAction = (e) => {
        if (!dragging) return;
        
        // Check if it was a meaningful drag or just a click
        const dragDistance = Math.abs(totalDraggedDistance.current);
        
        if (dragDistance > dragThreshold) {
            setWasDragged(true);
            if (totalDraggedDistance.current > 100) {
                setIndexBackwards();
            } else if (totalDraggedDistance.current < -100) {
                setIndexForwards();
            }
        }


        totalDraggedDistance.current = 0;
        setDragging(false);

        setTimeout(() => {
            if (onDragStatusChange) {
                onDragStatusChange(false);
            }
        }, 50);
    }

    const mouseMoveAction = (e) => {
        if (!dragging) return;
        const currentX = getClientX(e);
        totalDraggedDistance.current = currentX - startX.current;

        if (Math.abs(totalDraggedDistance.current) > dragThreshold) {
            setWasDragged(true);
            
            if (onDragStatusChange) {
                onDragStatusChange(true);
            }
        }

        if (slideWrapperRef.current) {
            const basePositon = -slideIndex * 100;
            const containerWidth = slideWrapperRef.current.offsetWidth;
            const dragPercentage = (totalDraggedDistance.current / containerWidth) * 150;

            slideWrapperRef.current.style.transform = `translateX(calc(${basePositon}% + ${dragPercentage}%))`;
            slideWrapperRef.current.style.transition = 'none';
        }
    }

    const handleClick = (e) => {
        if (wasDragged) {
            e.preventDefault();
            e.stopPropagation();
            setWasDragged(false);
        }
    };

    // Effect for slide transition
    useEffect(() => {
        if (slideWrapperRef.current && !dragging) {
            slideWrapperRef.current.style.transform = `translateX(-${slideIndex * 100}%)`;
            slideWrapperRef.current.style.transition = 'transform 0.3s ease';
        }
    }, [slideIndex, dragging]);

    // Add global mouse event listeners
    useEffect(() => {
        if (!dragging) return;
        
        const handleGlobalMouseMove = (e) => mouseMoveAction(e);
        const handleGlobalMouseUp = (e) => mouseUpAction(e);
        

        document.addEventListener('mousemove', handleGlobalMouseMove);
        document.addEventListener('mouseup', handleGlobalMouseUp);
        
        return () => {
            document.removeEventListener('mousemove', handleGlobalMouseMove);
            document.removeEventListener('mouseup', handleGlobalMouseUp);
        };
    }, [dragging]);

    // Add global click capture for canceling clicks after drag
    useEffect(() => {
        document.addEventListener('click', handleClick, true);
        
        return () => {
            document.removeEventListener('click', handleClick, true);
        };
    }, [wasDragged]);

    return (
        <div>
            <div className="admin-dashboard__slideshow-container">
                <div className="slide-wrapper1"
                    onTouchStart={(e) => mouseDownAction(e)}
                    onMouseDown={(e) => mouseDownAction(e)}
                    onTouchMove={(e) => mouseMoveAction(e)}
                    onTouchEnd={(e) => mouseUpAction(e)}
                    ref={slideWrapperRef}
                >
                    {image.slice(0, 5).map((img, index) => {
                        return (
                            <img
                                src={img}
                                key={index}
                                draggable={false}
                            />
                        )
                    })}
                </div>  
                {arrayLength > 1 ?
                <div className={'dragbuttons-container'}>
                    {image.slice(0, 5).map((__, index) => {
                        return (
                            <button key={index} className={slideIndex === index ? 'drag-btn-active drag-btn':'drag-btn'} />
                        )
                    })}
                </div>
                : ''}
            </div>
        </div>
    );
}

export default SlideShow;