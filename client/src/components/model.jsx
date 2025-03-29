import { useState, useEffect } from 'react'

const Modal = ({ showModal, closeModal, img }) => {

    if (!showModal) return null

    const [image, setImage] = useState([])
    useEffect(() => {
        setImage(img)
        console.log(img, "imagessan")
    }, [img])



    return (
        <div style={modalBackground}>
            <button type="button" onClick={closeModal} style={{ position: 'absolute', right: '10px', top: '10px' }}>X</button>
            <div style={imageDirection}>
                {image.map((image,index) => (
                    <div>
                        <img style={imageStyle} src={image} key={index}></img>
                    </div>
                ))}
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
    index: 2
};

const imageDirection ={
    display:'flex',
    justifyContent:'center',
    padding:'10px'
    
};