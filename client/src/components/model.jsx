import { useState, useEffect } from 'react'
import { UPDATE_CAR, PRESIGNED_URL } from '../utils/querys'
import { useMutation } from '@apollo/client'

const Modal = ({ showModal, closeModal, img, id }) => {

    if (!showModal) return null

    

    const [image, setImage] = useState([])
    const [draggedIndex, setDraggedIndex] = useState(null)
    const [updateImg] = useMutation(UPDATE_CAR)  
    
    
    useEffect(()=>{
        if(img.length > 0){
            setImage(img)
        }
    },[])

    const dragStartHandler = (index) => {
        console.log(index)
        setDraggedIndex(index)
    }

    const dragOverHandler = (e) => {
            e.preventDefault();
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

    const deleteHandler = (index) =>{
        const newImages = [...image]
        const deletedImg = newImages.splice(index,1)
        setImage(deletedImg)
    }
    
    const submitHandler = (e) => {
        e.preventDefault();
        updateImg({
            variables: {
                _id: id,
                imageUrl: image
            }
        })

    }

    return (
        <div className='admin-dashboard___modal-background'>
            <button type="button" onClick={closeModal} style={{ position: 'absolute', right: '10px', top: '10px' }}>X</button>
            <div className='admin-dashboard___image-direction' >
                {image.map((image, index) => (
                    <div onDragStart={() => dragStartHandler(index)}
                        onDrop={() => dropHandler(index)}
                        onDragOver={(e) => dragOverHandler(e)}
                        // onTouchStart={() => { dragStartHandler(index) }}
                        // onTouchMove={(e) => { dragOverHandler(e) }}
                        // onTouchEnd={() => { dropHandler(index) }}
                        key={index}>
                        <div>
                        <img style={imageStyle} src={image} draggable={true}/>
                        <button className='deleteimg'>i</button>
                        </div>
                    </div>
                ))}
            </div>

            <div>
                <div className='admin-dashboard___btn-container'>
                    <input type='file' name='file'/>
                </div>
                <div>

                </div>
                <div className='admin-dashboard___btn-container'>
                    <button onClick={e => submitHandler(e)}>submit</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;

const imageStyle = {
    height: '150px', width: '150px'
};

const buttonContainer = {
    display: 'flex',
    justifyContent: 'center',
}