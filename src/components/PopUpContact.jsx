import { useState, useEffect } from 'react'
import PopUpImage from "../assets/images/popup-image.png"
import Button from './Button';
import Exit from "../assets/icons/exit.svg";
import api from '../services/api';

const PopUpContact = ({ duration = false, onClose, plan }) => {

    const [popupIsActive, setPopupIsActive] = useState(duration);
    const [phone, setPhone] = useState("");
    const [errors, setErrors] = useState({ phone: "", general: "" });

    useEffect(() => {
        setPopupIsActive(duration);
    }, [duration]);

    const [status, setStatus] = useState("default"); // "default" | "loading" | "success" | "error"

    const validatePhone = (phone) => {
        // Allows +, spaces, and 7-20 digits
        const digitsOnly = phone.replace(/[\s+]/g, "");
        return /^\d{7,20}$/.test(digitsOnly);
    };

    const handleSubmit = async () => {
        let newErrors = { phone: "", general: "" };
        let hasError = false;

        if (!phone) {
            newErrors.phone = "Phone cannot be left blank.";
            hasError = true;
        } else if (!validatePhone(phone)) {
            newErrors.phone = "Phone must be between 7-20 digits. Only digits, '+' and spaces are allowed.";
            hasError = true;
        }

        if (hasError) {
            setErrors(newErrors);
            setStatus("error");
            return;
        }

        setStatus("loading");
        setErrors({ phone: "", general: "" });

        try {
            await api.post("/api/mail/send-contact", { phone, plan });
            setStatus("success");
        } catch (error) {
            console.error("Failed to send contact info:", error);
            setStatus("error");
            setErrors({ ...newErrors, general: "Failed to send. Please try again later." });
        }
    };

    const handleTryAgain = () => {
        setStatus("default");
        setPhone("");
        setErrors({ phone: "", general: "" });
    };

    const closePopup = () => {
        setPopupIsActive(false);
        setStatus("default");
        setPhone("");
        setErrors({ phone: "", general: "" });
        if (onClose) onClose();
    };

    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            closePopup();
        }
    };

    return (
        <div className={`popup-contact-overlay ${popupIsActive ? "active" : ""}`} onClick={handleOverlayClick}>
            <div className="popup-container">
                <div className="wrapper">
                    <div className="exit" onClick={closePopup}>
                        <img src={Exit} alt="" />
                    </div>
                    <div className="image-part">
                        <img src={PopUpImage} alt="" />
                    </div>
                    <div className="text-part">
                        {status === "default" || (status === "error" && (errors.phone || errors.general)) ? (
                            <>
                                <div className="content-title">
                                    Airport Pickup Service
                                </div>
                                <div className="desc">
                                    Please enter your WhatsApp number to arrange your airport transfer.
                                </div>
                                <div className="input-content">
                                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', color: 'black', opacity: 0.8 }}>WhatsApp Number</label>
                                    <input
                                        type="text"
                                        placeholder='+994 50 000 00 00'
                                        value={phone}
                                        maxLength={20}
                                        style={{
                                            width: '100%',
                                            boxSizing: 'border-box',
                                            border: errors.phone ? '1px solid #f44336' : '1px solid transparent'
                                        }}
                                        onChange={(e) => setPhone(e.target.value.replace(/[^0-9+\s]/g, ""))}
                                    />
                                    {errors.phone && <span className="error-msg" style={{ color: '#f44336', fontSize: '10px', display: 'block', marginTop: '2px' }}>{errors.phone}</span>}
                                </div>
                                {errors.general && <div className="error-msg" style={{ color: '#f44336', fontSize: '12px', marginTop: '10px', textAlign: 'center' }}>{errors.general}</div>}
                                <div className="button" onClick={handleSubmit} style={{ marginTop: '20px' }}>
                                    <Button content={"Confirm Pickup"} bg_color={"yellowMain"} text_color={"#fff"} />
                                </div>
                            </>
                        ) : null}

                        {status === "loading" && (
                            <>
                                <div className="content-title">
                                    Processing...
                                </div>
                                <div className="desc">
                                    Please wait while we confirm your request.
                                </div>
                                <div className="button loading">
                                    <span className="btn_badge" style={{ backgroundColor: "#222", color: "#fff" }}>Sending...</span>
                                </div>
                            </>
                        )}

                        {status === "success" && (
                            <>
                                <div className="content-title">
                                    Request Received!
                                </div>
                                <div className="desc">
                                    We have received your WhatsApp number. Our team will contact you shortly.
                                </div>
                                <div className="button success">
                                    <span className="btn_badge" style={{ backgroundColor: "#00A63E", color: "#fff" }}>✓ Successfully Sent</span>
                                </div>
                            </>
                        )}

                        {status === "error" && !errors.phone && !errors.general && (
                            <>
                                <div className="content-title">
                                    Oops! Something Went Wrong
                                </div>
                                <div className="desc">
                                    Failed to send your contact information. Please try again.
                                </div>
                                <div className="button error">
                                    <span className="btn_badge" style={{ backgroundColor: "rgba(244, 67, 54, 1)", color: "#fff" }}>✕ Error Occurred</span>
                                </div>
                                <div className="try-again-badge" onClick={handleTryAgain}>
                                    Try again
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopUpContact
