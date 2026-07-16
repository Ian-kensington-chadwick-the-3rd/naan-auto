import { useEffect, useRef, useState } from 'react';

const Lightbox = ({ images, startIndex, onClose }) => {
    const [index, setIndex] = useState(startIndex);
    const [scale, setScale] = useState(1);
    const [origin, setOrigin] = useState({ x: 50, y: 50 });
    const imgRef = useRef(null);
    const thumbRefs = useRef([]);

    const prev = () => { setIndex(i => (i === 0 ? images.length - 1 : i - 1)); setScale(1); };
    const next = () => { setIndex(i => (i === images.length - 1 ? 0 : i + 1)); setScale(1); };

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    useEffect(() => {
        const thumb = thumbRefs.current[index];
        if (thumb) thumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }, [index]);

    const handleImgClick = (e) => {
        e.stopPropagation();
        if (scale > 1) {
            setScale(1);
        } else {
            const rect = imgRef.current.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            setOrigin({ x, y });
            setScale(2.5);
        }
    };

    return (
        <div className="lightbox__overlay" onClick={onClose}>
            <button className="lightbox__close" onClick={onClose}>✕</button>

            <div className="lightbox__main" onClick={e => e.stopPropagation()}>
                <button className="lightbox__arrow lightbox__arrow--left" onClick={prev}>&#8249;</button>

                <div className="lightbox__img-wrapper">
                    <img
                        ref={imgRef}
                        src={images[index]}
                        className="lightbox__img"
                        style={{
                            transform: `scale(${scale})`,
                            transformOrigin: `${origin.x}% ${origin.y}%`,
                            cursor: scale > 1 ? 'zoom-out' : 'zoom-in',
                        }}
                        onClick={handleImgClick}
                        draggable={false}
                    />
                </div>

                <button className="lightbox__arrow lightbox__arrow--right" onClick={next}>&#8250;</button>
            </div>

            <div className="lightbox__thumbs" onClick={e => e.stopPropagation()}>
                {images.map((src, i) => (
                    <img
                        key={i}
                        src={src}
                        ref={el => thumbRefs.current[i] = el}
                        className={`lightbox__thumb${i === index ? ' lightbox__thumb--active' : ''}`}
                        onClick={() => { setIndex(i); setScale(1); }}
                        draggable={false}
                    />
                ))}
            </div>
        </div>
    );
};

export default Lightbox;
