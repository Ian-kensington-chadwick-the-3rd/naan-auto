import { useState, useEffect } from 'react'
import { UPDATE_CAR, PRESIGNED_URL, DELETE_IMG } from '../utils/querys'
import { useMutation } from '@apollo/client'
import { v4 as uuidv4 } from 'uuid';
import heic2any from 'heic2any';

const Modal = ({ showModal, closeModal, img, id }) => {
    if (!showModal) return null

    const [image, setImage] = useState([])
    const [draggedIndex, setDraggedIndex] = useState(null)
    const [updateImg] = useMutation(UPDATE_CAR)
    const [deleteImg] = useMutation(DELETE_IMG)
    const [createPresignedUrl] = useMutation(PRESIGNED_URL);
    const [imgUploadArr, setImgUploadArr] = useState([])
    const [pictureInvalid, setPictureInvalid] = useState([]);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (img && img.length > 0) setImage(img)
    }, [])

    const dragStartHandler = (index) => setDraggedIndex(index)
    const dragOverHandler = (e) => e.preventDefault()
    const dropHandler = (dropIndex) => {
        if (draggedIndex !== null && dropIndex !== null && draggedIndex !== dropIndex) {
            const newImages = [...image]
            const [draggedImage] = newImages.splice(draggedIndex, 1)
            newImages.splice(dropIndex, 0, draggedImage)
            setImage(newImages)
        }
        setDraggedIndex(null)
    }

    const touchStartHandler = (_e, index) => setDraggedIndex(index)
    const touchMoveHandler = (e) => e.preventDefault()
    const touchEndHandler = (e) => {
        const touch = e.changedTouches[0];
        const el = document.elementFromPoint(touch.clientX, touch.clientY);
        const dropTarget = el?.closest('[data-index]');
        if (dropTarget) {
            dropHandler(parseInt(dropTarget.dataset.index));
        } else {
            setDraggedIndex(null);
        }
    }

    const deleteHandler = async (index) => {
        const newImages = [...image]
        newImages.splice(index, 1)
        setImage(newImages)
        const delImg = image[index]
        await deleteImg({ variables: { url: delImg } })
        await updateImg({ variables: { _id: id, imageUrl: newImages } })
    }

    const handleChange = async (e) => {
        const files = Array.from(e.target.files);
        setPictureInvalid([]);
        try {
            const converted = await Promise.all(
                files.map(async (file) => {
                    const ext = file.name.split('.').pop().toLowerCase();
                    const isHeic = file.type === 'image/heic' || file.type === 'image/heif' || ext === 'heic' || ext === 'heif';
                    if (!isHeic) return file;
                    const blob = await heic2any({ blob: file, toType: 'image/jpeg', quality: 0.85 });
                    const out = Array.isArray(blob) ? blob[0] : blob;
                    return new File([out], file.name.replace(/\.(heic|heif)$/i, '.jpg'), { type: 'image/jpeg' });
                })
            );
            setImgUploadArr(converted);
        } catch (err) {
            console.error('HEIC conversion failed:', err);
            setPictureInvalid(['Failed to convert HEIC image. Export as JPEG and retry.']);
        }
    }

    async function submitHandler(e) {
        e.preventDefault();

        if (imgUploadArr.length > 0) {
            const invalid = [];
            let processedCount = 0;

            try {
                await new Promise((resolve, reject) => {
                    const files = Array.from(imgUploadArr);
                    files.forEach((file, index) => {
                        const reader = new FileReader();
                        const imgEl = new Image();
                        reader.onload = (event) => { imgEl.src = event.target.result; };
                        imgEl.onload = () => {
                            if (Math.abs(imgEl.width / imgEl.height - 4 / 3) > 0.01)
                                invalid.push(files[index].name);
                            processedCount++;
                            if (processedCount === files.length)
                                invalid.length > 0 ? reject(new Error('Invalid aspect ratios')) : resolve();
                        };
                        reader.onerror = () => {
                            processedCount++;
                            if (processedCount === files.length)
                                invalid.length > 0 ? reject(new Error('Invalid aspect ratios')) : resolve();
                        };
                        reader.readAsDataURL(file);
                    });
                });
            } catch {
                setPictureInvalid(invalid);
                return;
            }

            setUploading(true);
            try {
                const uploadedKeys = [];
                for (const file of imgUploadArr) {
                    const uniqueKey = `cars/${uuidv4()}.jpg`;
                    const { data } = await createPresignedUrl({ variables: { key: uniqueKey } });
                    if (!data?.createPresignedUrl?.presignedUrl) continue;
                    const response = await fetch(data.createPresignedUrl.presignedUrl, {
                        method: 'PUT',
                        body: file,
                        headers: { 'Content-Type': file.type || 'image/jpeg' },
                        mode: 'cors'
                    });
                    if (response.ok) uploadedKeys.push(`https://images.naanauto.com/${uniqueKey}`);
                }
                await updateImg({ variables: { _id: id, imageUrl: [...image, ...uploadedKeys] } });
                closeModal();
            } catch (err) {
                console.error(err);
            } finally {
                setUploading(false);
            }
        } else {
            await updateImg({ variables: { _id: id, imageUrl: image } });
            closeModal();
        }
    }

    return (
        <div className='img-modal__overlay' onClick={closeModal}>
            <div className='img-modal__panel' onClick={e => e.stopPropagation()}>

                <div className='img-modal__header'>
                    <span className='img-modal__title'>Image Customization</span>
                    <button type="button" className='img-modal__close' onClick={closeModal}>✕</button>
                </div>

                {image.length > 0 && (
                    <p className='img-modal__hint'>Hold &amp; drag to reorder · tap × to remove</p>
                )}

                <div className='img-modal__grid'>
                    {image.map((src, index) => (
                        <div
                            key={index}
                            data-index={index}
                            draggable={true}
                            onDragStart={() => dragStartHandler(index)}
                            onDrop={() => dropHandler(index)}
                            onDragOver={dragOverHandler}
                            onTouchStart={(e) => touchStartHandler(e, index)}
                            onTouchMove={touchMoveHandler}
                            onTouchEnd={touchEndHandler}
                            className={`img-modal__card${draggedIndex === index ? ' img-modal__card--dragging' : ''}`}
                            style={{ touchAction: 'none' }}
                        >
                            <img src={src} alt={`photo ${index + 1}`} draggable={false} className='img-modal__card-img' />
                            <span className='img-modal__card-index'>{index + 1}</span>
                            <button type="button" className='img-modal__card-delete' onClick={() => deleteHandler(index)}>✕</button>
                        </div>
                    ))}
                </div>

                <div className='img-modal__section'>
                    <p className='img-modal__section-label'>Add Photos</p>
                    <label className='img-modal__upload-zone' htmlFor="modal-file-input">
                        <span className='img-modal__upload-icon'>🖼</span>
                        <span className='img-modal__upload-text'>Choose files to upload</span>
                        <input
                            id="modal-file-input"
                            type='file'
                            multiple
                            onChange={handleChange}
                            className='img-modal__file-input'
                        />
                        <span className='img-modal__upload-hint'>4:3 ratio · JPG / PNG / WEBP · HEIC supported</span>
                    </label>
                </div>

                {pictureInvalid.length > 0 && (
                    <div className='img-modal__error'>
                        <p className='img-modal__error-label'>Invalid aspect ratio — must be 4:3</p>
                        <ul className='img-modal__error-list'>
                            {pictureInvalid.map((name, i) => <li key={i}>{name}</li>)}
                        </ul>
                    </div>
                )}

                <div className='img-modal__actions'>
                    <button type="button" className='img-modal__btn img-modal__btn--cancel' onClick={closeModal}>
                        Cancel
                    </button>
                    <button
                        type="button"
                        className={`img-modal__btn img-modal__btn--save${uploading ? ' img-modal__btn--loading' : ''}`}
                        onClick={submitHandler}
                        disabled={uploading}
                    >
                        {uploading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Modal;
