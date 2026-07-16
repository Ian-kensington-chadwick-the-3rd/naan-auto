import { useMutation } from "@apollo/client";
import { ADD_CAR, GET_CARS, PRESIGNED_URL, SEARCH_FIELD } from "../utils/querys";
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react'
import heic2any from 'heic2any';
import Loading from "./loading";

const AddCarData = () => {
    const [addCar] = useMutation(ADD_CAR, {
        refetchQueries: [
            { query: GET_CARS },
            { query: SEARCH_FIELD }
        ]
    });
    const [createPresignedUrl] = useMutation(PRESIGNED_URL);
    if (addCar.loading) return <p>Loading...</p>;
    if (addCar.error) return <p>Error: {addCar.error.message}</p>;

    const emptyForm = {
        year: '', make: '', model: '', mileage: '',
        description: '', trans: '', imageUrl: [],
        price: '', vin: '', drivetrain: '',
        exteriorColor: '', interiorColor: '',
        fuelType: '', engineType: '', condition: '',
        titleHistory: '', ownership: '', trim: '',
        upcoming: false,
    };

    const [loadingCss, setLoadingCss] = useState(false);
    const [miniModal, setMiniModal] = useState(false);
    const [validation, setValidation] = useState({});
    const [form, setForm] = useState(emptyForm);
    const [focus, setFocus] = useState({
        year: false, make: false, model: false, mileage: false,
        description: false, trans: false, imageUrl: false,
        price: false, vin: false, drivetrain: false,
        exteriorColor: false, interiorColor: false,
        fuelType: false, engineType: false, condition: false,
        titleHistory: false, ownership: false, trim: false,
    });
    const [pictureInvalid, setPictureInvalid] = useState([]);
    const [carUploadSuccess, setCarUploadSuccess] = useState(false);

    const handleFocus = (f) => setFocus(prev => ({ ...prev, [f]: true }));
    const handleBlur = (f) => setFocus(prev => ({ ...prev, [f]: false }));

    const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    const handleInputChange = (e) => {
        e.preventDefault();
        const { name, value, type, files, checked } = e.target;
        if (type === 'file') {
            setForm(prev => ({ ...prev, imageUrl: Array.from(files) }));
        } else if (type === 'checkbox') {
            setForm(prev => ({ ...prev, [name]: checked }));
        } else if (name === 'price' || name === 'year' || name === 'mileage') {
            setForm(prev => ({ ...prev, [name]: value === 0 ? '' : Number(value) }));
        } else {
            setForm(prev => ({ ...prev, [name]: capitalizeFirstLetter(value) }));
        }
    };

    async function formHandler(e) {
        setValidation({});
        e.preventDefault();
        const missingFields = {};

        if (!form.imageUrl || form.imageUrl.length === 0) missingFields.img = 'Please select at least one image';
        if (!form.year) missingFields.year = 'Year is required';
        if (!form.model) missingFields.model = 'Model is required';
        if (!form.make) missingFields.make = 'Make is required';
        if (!form.price) missingFields.price = 'Price is required';
        if (!form.mileage) missingFields.mileage = 'Mileage is required';

        const nextYear = new Date().getFullYear() + 1;
        if (form.year && (form.year < 1900 || form.year > nextYear))
            missingFields.year = `Year must be 1900–${nextYear}`;
        if (form.price && form.price <= 0) missingFields.price = 'Must be greater than zero';
        if (form.mileage && form.mileage <= 0) missingFields.mileage = 'Must be greater than zero';

        if (missingFields.img) {
            setValidation(missingFields);
            setMiniModal(true);
            return;
        }

        if (Object.keys(missingFields).length > 0) {
            setValidation(missingFields);
            return;
        }

        setLoadingCss(true);

        // Convert any HEIC/HEIF files (iPhone default format) to JPEG before processing
        let filesToProcess;
        try {
            filesToProcess = await Promise.all(
                Array.from(form.imageUrl).map(async (file) => {
                    const ext = file.name.split('.').pop().toLowerCase();
                    const isHeic = file.type === 'image/heic' || file.type === 'image/heif' || ext === 'heic' || ext === 'heif';
                    if (!isHeic) return file;
                    const blob = await heic2any({ blob: file, toType: 'image/jpeg', quality: 0.85 });
                    const converted = Array.isArray(blob) ? blob[0] : blob;
                    const newName = file.name.replace(/\.(heic|heif)$/i, '.jpg');
                    return new File([converted], newName, { type: 'image/jpeg' });
                })
            );
        } catch (err) {
            console.error('HEIC conversion failed:', err);
            setValidation({ img: 'Failed to convert image. Please export photos as JPEG and retry.' });
            setMiniModal(true);
            setCarUploadSuccess(false);
            setLoadingCss(false);
            return;
        }

        try {
            let invalidImages = 0;
            let processedCount = 0;
            await new Promise((resolve, reject) => {
                filesToProcess.forEach((file, index) => {
                    const reader = new FileReader();
                    const img = new Image();
                    reader.onload = (event) => { img.src = event.target.result; img.file = file; };
                    img.onload = () => {
                        const ratio = img.width / img.height;
                        if (Math.abs(ratio - 4 / 3) > 0.01) {
                            setPictureInvalid(prev => [...prev, filesToProcess[index].name]);
                            setMiniModal(true);
                            setCarUploadSuccess(false);
                            setLoadingCss(false);
                            invalidImages++;
                        }
                        processedCount++;
                        if (processedCount === filesToProcess.length) {
                            invalidImages > 0 ? reject(new Error('Invalid aspect ratios')) : resolve();
                        }
                    };
                    reader.onerror = () => {
                        processedCount++;
                        if (processedCount === filesToProcess.length) {
                            invalidImages > 0 ? reject(new Error('Invalid aspect ratios')) : resolve();
                        }
                    };
                    reader.readAsDataURL(file);
                });
            });
        } catch (err) {
            console.log(err);
            return;
        }

        const uploadImageUrl = [];
        try {
            for (const img of filesToProcess) {
                const uniqueKey = `cars/${uuidv4()}.jpg`;
                const { data } = await createPresignedUrl({ variables: { key: uniqueKey } });
                if (!data?.createPresignedUrl?.presignedUrl) {
                    console.error('Failed to get presigned URL:', data);
                    continue;
                }
                if (!img) { console.error('Invalid image'); continue; }
                const response = await fetch(data.createPresignedUrl.presignedUrl, {
                    method: 'PUT', body: img,
                    headers: { 'Content-Type': img.type || 'image/jpeg' },
                    mode: 'cors'
                });
                if (response.ok) uploadImageUrl.push(uniqueKey);
                else console.error(`Failed to upload: ${uniqueKey}`);
            }

            if (uploadImageUrl.length === 0) {
                setValidation({ img: 'No images uploaded successfully. Check your connection and try again.' });
                setMiniModal(true);
                setCarUploadSuccess(false);
                setLoadingCss(false);
                return;
            }

            const result = await addCar({
                variables: {
                    year: form.year, make: form.make, model: form.model,
                    mileage: form.mileage, description: form.description,
                    trans: form.trans, imageUrl: uploadImageUrl,
                    price: form.price, vin: form.vin, drivetrain: form.drivetrain,
                    exteriorColor: form.exteriorColor, interiorColor: form.interiorColor,
                    fuelType: form.fuelType, engineType: form.engineType,
                    condition: form.condition, titleHistory: form.titleHistory,
                    ownership: form.ownership, trim: form.trim,
                    upcoming: form.upcoming
                }
            });
            if (!result) throw new Error('Car failed to add');
            setLoadingCss(false);
            setMiniModal(true);
            setCarUploadSuccess(true);
            setForm(emptyForm);
        } catch (error) {
            console.error('Error uploading:', error);
            setLoadingCss(false);
        }
    }

    useEffect(() => {
        if (Object.keys(validation).length > 0) window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [validation]);

    useEffect(() => {
        if (carUploadSuccess === false) setLoadingCss(false);
    }, [carUploadSuccess]);

    const closeModal = () => { setMiniModal(false); setCarUploadSuccess(false); setPictureInvalid([]); };

    const field = (type, name, label, required = false) => (
        <label className="custom-field">
            <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleInputChange}
                className="input"
                onFocus={() => handleFocus(name)}
                onBlur={() => handleBlur(name)}
            />
            <span
                className={`placeholder${focus[name] || form[name] || validation[name] ? ' placeholder-up' : ''}`}
                style={validation[name] ? { color: '#ff6b35' } : {}}
            >
                {validation[name] || `${label}${required ? ' *' : ''}`}
            </span>
        </label>
    );

    return (
        <div className="addcar__parent-container">
            {miniModal && (
                <div className="addcar__modal-overlay" onClick={closeModal}>
                    <div className="addcar__modal" onClick={e => e.stopPropagation()}>
                        {pictureInvalid.length > 0 && (
                            <div className="addcar__modal-section">
                                <p className="addcar__modal-label">Invalid aspect ratio</p>
                                <ul className="addcar__modal-list">
                                    {pictureInvalid.map((name, i) => <li key={i}>{name}</li>)}
                                </ul>
                                <p className="addcar__modal-hint">Images must be 4:3 ratio (width ÷ height = 1.333)</p>
                            </div>
                        )}
                        {validation.img && pictureInvalid.length === 0 && (
                            <div className="addcar__modal-section">
                                <p className="addcar__modal-label">{validation.img}</p>
                            </div>
                        )}
                        <div className={`addcar__modal-status ${carUploadSuccess ? 'success' : 'failure'}`}>
                            {carUploadSuccess ? '✓ Vehicle added successfully!' : '✗ Upload failed'}
                        </div>
                        <button type="button" className="addcar__modal-close" onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}

            {loadingCss && <Loading className="loading" />}

            <form onSubmit={e => formHandler(e)} className={`addcar__form${loadingCss ? ' blur' : ''}`}>

                <div className="addcar__section">
                    <h3 className="addcar__section-title">Photos</h3>
                    <div className="addcar__upload-zone">
                        <span className="addcar__upload-icon">🖼</span>
                        <label className="addcar__upload-label" htmlFor="car-images">Upload Car Photos</label>
                        <input
                            id="car-images"
                            type="file"
                            name="imageUrl"
                            multiple
                            onChange={handleInputChange}
                            className="addcar__file-input"
                        />
                        <span className="addcar__upload-hint">4:3 ratio required · JPG / PNG / WEBP</span>
                    </div>
                </div>

                <div className="addcar__section">
                    <h3 className="addcar__section-title">Vehicle Info</h3>
                    <div className="addcar__fields-grid">
                        {field('number', 'year', 'Year', true)}
                        {field('text', 'make', 'Make', true)}
                        {field('text', 'model', 'Model', true)}
                        {field('text', 'trim', 'Trim')}
                    </div>
                </div>

                <div className="addcar__section">
                    <h3 className="addcar__section-title">Pricing & Mileage</h3>
                    <div className="addcar__fields-grid">
                        {field('number', 'price', 'Price', true)}
                        {field('number', 'mileage', 'Mileage', true)}
                        {field('text', 'vin', 'VIN')}
                    </div>
                </div>

                <div className="addcar__section">
                    <h3 className="addcar__section-title">Specifications</h3>
                    <div className="addcar__fields-grid">
                        {field('text', 'trans', 'Transmission')}
                        {field('text', 'drivetrain', 'Drivetrain')}
                        {field('text', 'fuelType', 'Fuel Type')}
                        {field('text', 'engineType', 'Engine Type')}
                    </div>
                </div>

                <div className="addcar__section">
                    <h3 className="addcar__section-title">Appearance</h3>
                    <div className="addcar__fields-grid">
                        {field('text', 'exteriorColor', 'Exterior Color')}
                        {field('text', 'interiorColor', 'Interior Color')}
                    </div>
                </div>

                <div className="addcar__section">
                    <h3 className="addcar__section-title">History</h3>
                    <div className="addcar__fields-grid">
                        {field('text', 'condition', 'Condition')}
                        {field('text', 'titleHistory', 'Title History')}
                        {field('text', 'ownership', 'Ownership')}
                    </div>
                </div>

                <div className="addcar__section">
                    <h3 className="addcar__section-title">Description</h3>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleInputChange}
                        className="addcar__description"
                        placeholder="Enter vehicle description..."
                    />
                </div>

                <div className="addcar__section">
                    <h3 className="addcar__section-title">Listing Options</h3>
                    <label className="addcar__toggle-row">
                        <input
                            type="checkbox"
                            name="upcoming"
                            checked={form.upcoming}
                            onChange={handleInputChange}
                            className="addcar__toggle-checkbox"
                        />
                        <span className="addcar__toggle-label">Add to Upcoming</span>
                    </label>
                </div>

                <div className="addcar__submit-row">
                    <button type="submit" className="addcar__button">Add Vehicle</button>
                </div>

            </form>
        </div>
    );
};

export default AddCarData;
