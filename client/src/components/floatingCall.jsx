import { useState } from 'react'

const FloatingCall = () => {
    const [open, setOpen] = useState(false)

    return (
        <div className="floating-call" onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false) }} tabIndex={-1}>
            {open && (
                <div className="floating-call-popup">
                    <a href="tel:+18508615000" className="floating-call-option call">
                        📞 Call Us
                    </a>
                    <a href="sms:+18508615000" className="floating-call-option text">
                        💬 Text Us
                    </a>
                </div>
            )}
            <button
                className="floating-call-btn"
                onClick={() => setOpen(prev => !prev)}
                aria-label="Contact us"
            >
                📞
            </button>
        </div>
    )
}

export default FloatingCall
