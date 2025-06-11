import { useState, useEffect } from 'react'
import { UPDATE_CAR, PRESIGNED_URL, DELETE_IMG,} from '../utils/querys'
import { useMutation } from '@apollo/client'
import { v4 as uuidv4 } from 'uuid';

const Modal = ({ showModal, closeModal, img, id}) => {

    if (!showModal) return null

 console.log(img)

    const [image, setImage] = useState([])
    const [draggedIndex, setDraggedIndex] = useState(null)
    const [updateImg] = useMutation(UPDATE_CAR)
    const [deleteImg] = useMutation(DELETE_IMG)
    const [createPresignedUrl] = useMutation(PRESIGNED_URL);
    const [imgUploadArr, setImgUploadArr] = useState([])
    const [pictureInvalid, setPictureInvalid] = useState([]);
    // const [carUploadSuccess, setCarUploadSuccess] = useState(false);
    // const [loadingCss, setLoadingCss] = useState(false);
    // const [miniModal, setMiniModal] = useState(false)




    useEffect(() => {
        if (img.length > 0) {
            setImage(img)
        }
    }, [])

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

    const deleteHandler = async (index) => {
        const newImages = [...image]
        newImages.splice(index, 1)
        setImage(newImages)
        const delImg = image[index]
        // hand url to cloudflare for deletion 
        await deleteImg({
            variables: { url: delImg }
        })
        // update with current array
        await updateImg({
            variables: {
                _id: id,
                imageUrl: newImages,
            }
        })
    }
    // first we need to recieve the file and loop through them add to cloudflare
    // second we need to recieve the presigned url and append them to our already existing image array
    const handleChange = (e) => {
        const imgs = e.target.files;
        setImgUploadArr(Array.from(imgs))
    }
    console.log(imgUploadArr)

    async function submitHandler(e) {
        e.preventDefault();
        let invalidImages = 0;
        let processedCount = 0;
        if (imgUploadArr.length > 0) {
            try {
                await new Promise((resolve, reject) => {

                    const files = Array.from(imgUploadArr);

                    files.forEach((file, index) => {
                        const reader = new FileReader();
                        const img = new Image();
                        reader.onload = (event) => {
                            img.src = event.target.result;
                            img.file = file;
                        };

                        const fileExtension = file.name.split('.').pop().toLowerCase();

                        if (file.type === 'image/heic' || fileExtension === 'heic') {
                            validation.img = '.heic img type not accepted by any browsers'
                            setValidation(validation)
                            return;
                        }
                        img.onload = () => {
                            const ratio = img.width / img.height;
                            const expected = 4 / 3
                            const tolerance = 0.01

                            console.log(`Image dimensions: ${img.width}px × ${img.height}px`);
                            const notFourThreeRatio = img.width / img.height

                            if (Math.abs(ratio - expected) > tolerance) {
                                setPictureInvalid((prev) => [...prev, imgUploadArr[index].name]);
                                invalidImages++;
                                console.log('img does not equal 4:3 ratio', notFourThreeRatio, imgUploadArr[index].name);
                            }
                            processedCount++;

                            if (processedCount === files.length) {
                                if (invalidImages > 0) {
                                    reject(new Error('Some images have invalid aspect ratios'));
                                } else {
                                    resolve();
                                }
                            }
                        };
                        reader.onerror = (error) => {
                            console.error(error);
                            processedCount++;
                            if (processedCount === files.length) {
                                if (invalidImages > 0) {
                                    reject(new Error('Some images have invalid aspect ratios'));
                                } else {
                                    resolve();
                                }
                            }
                        }
                        reader.readAsDataURL(file);
                    })
                });
                if (invalidImages > 0) return;
            } catch (err) {
                console.log(err)
                if (invalidImages > 0) return;
            }
            try {
                const uploadedKeys = [];
                for (const img of imgUploadArr) {
                    const uniqueKey = `cars/${uuidv4()}.jpg`;
                    const { data } = await createPresignedUrl({
                        variables: { key: uniqueKey }
                    });

                    if (!data || !data.createPresignedUrl || !data.createPresignedUrl.presignedUrl) {
                        console.error('Failed to get presigned URL:', data);
                        continue;
                    }

                    if (!img) {
                        console.error('Invalid image found in the array');
                        continue;
                    }
                    const contentType = img.type || 'image/jpeg';
                    console.log('Presigned URL:', data);
                    const url = data.createPresignedUrl.presignedUrl;

                    const response = await fetch(url, {
                        method: 'PUT',
                        body: img,
                        headers: {
                            'Content-Type': contentType
                        },
                        mode: 'cors'
                    });
                    
                    console.log('Upload response:', response);
                    if (response.ok) {
                        const baseUrl = 'https://images.naanauto.com';
                        const formatedUrl = imgUploadArr > 1 ? imageUrl.map(key => `${baseUrl}/${key}`) : `${baseUrl}/${uniqueKey}`
                        uploadedKeys.push(formatedUrl)
                    } else {
                        console.error(`Failed to upload image with key: ${uniqueKey}`);
                    }
                }
                const result = await updateImg({
                    variables: {
                        _id:id,
                        imageUrl:[...image , ...uploadedKeys]
                    }
                })  
                closeModal();

                if(!result){
                    throw new Error('failed to upload car image')
                }
            } catch (err) {
                console.error(err)
            }
        } else {
            await updateImg({
                variables: {
                    _id:id,
                    imageUrl: image
                }
            })
        }
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
                            <img style={imageStyle} src={image} draggable={true} />
                            <button onClick={() => deleteHandler(index)} className='deleteimg'>x</button>
                        </div>
                    </div>
                ))}
            </div>

            <div>
                <div className='admin-dashboard___btn-container'>
                    <input type='file' name='file' multiple onChange={e => handleChange(e)} />
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