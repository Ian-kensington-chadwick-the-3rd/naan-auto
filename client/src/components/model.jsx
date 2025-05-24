import { useState, useEffect } from 'react'
import { UPDATE_CAR } from '../utils/querys'
import { useMutation } from '@apollo/client'

const Modal = ({ showModal, closeModal, img, id }) => {

    if (!showModal) return null

    const [image, setImage] = useState([])
    const [draggedIndex, setDraggedIndex] = useState(null)


    const [updateImgIndex] = useMutation(UPDATE_CAR)

    const dragStartHandler = (index) => {
        setDraggedIndex(index)
    }

    const dragOverHandler = (e) => {
        if(e.cancelable){
            e.preventDefault();
        }
    }

    const dropHandler = (dropIndex) => {
        if (draggedIndex !== null && dropIndex !== null) {
            const newImages = [...image]
            const [draggedImage] = newImages.splice(draggedIndex, 1)
            newImages.splice(dropIndex, 0, draggedImage)
            setImage(newImages)
            setDraggedIndex(null)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        updateImgIndex({
            variables: {
                _id: id,
                imageUrl: image
            }
        })

    }

    return (
        <div style={modalBackground}>
            <button type="button" onClick={closeModal} style={{ position: 'absolute', right: '10px', top: '10px' }}>X</button>
            <div style={imageDirection} >
                {image.map((image, index) => (
                    <div onDragStart={() => dragStartHandler(index)}
                        onDrop={() => dropHandler(index)}
                        onDragOver={(e) => dragOverHandler(e)} 
                        onTouchStart={() => {dragStartHandler(index)}}
                        onTouchMove={(e) => {dragOverHandler(e)}}
                        onTouchEnd={() => {dropHandler(index)}}
                        key={index}>
                        <img style={imageStyle} src={image} draggable={true}></img>
                    </div>

                ))}
            </div>
            <div style={buttonContainer}>
                <button  onClick={e => submitHandler(e)}>submit</button>
            </div>
        </div>
    )
}

export default Modal;

const imageStyle = {
    height: '100px', width: '100px'
};

const modalBackground = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'white',
    borderRadius: '8px',
    width: '800px',
    height: '800px',
    zIndex: 2
};

const imageDirection = {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px'
};

const buttonContainer = {
    display: 'flex',
    justifyContent: 'center',
}