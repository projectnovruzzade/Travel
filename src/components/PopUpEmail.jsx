import { useState, useEffect } from 'react'
import PopUpImage from "../assets/images/popup-image.png"
import Button from './Button';
import Exit from "../assets/icons/exit.svg";
import api from '../services/api';

const PopUpEmail = ({ duration = false, onClose, plan }) => {


    const [popupIsActive, setPopupIsActive] = useState(duration);
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({ email: "", general: "" });

    useEffect(() => {
        setPopupIsActive(duration);
    }, [duration]);

    const [status, setStatus] = useState("default"); // "default" | "loading" | "success" | "error"

    const validateEmail = (email) => {
        return email.length <= 50 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };


    const handleSubmit = async () => {
        let newErrors = { email: "", general: "" };
        let hasError = false;

        if (!email) {
            newErrors.email = "Email cannot be left blank.";
            hasError = true;
        } else if (email.length > 50) {
            newErrors.email = "Email must be a maximum of 50 characters.";
            hasError = true;
        } else if (!validateEmail(email)) {
            newErrors.email = "Please enter a valid email address (text@domain.com).";
            hasError = true;
        }

        if (hasError) {
            setErrors(newErrors);
            setStatus("error");
            return;
        }

        setStatus("loading");
        setErrors({ email: "", general: "" });

        try {
            await api.post("/api/mail/send-plan", { email, plan });
            console.log("Email sent successfully");
            setStatus("success");
        } catch (error) {
            console.error("Failed to send plan email:", error);
            setStatus("error");
            setErrors({ ...newErrors, general: "Failed to send. Please try again later." });
        }
    };

    const handleTryAgain = () => {
        setStatus("default");
        setEmail("");
        setErrors({ email: "", general: "" });
    };

    const closePopup = () => {
        setPopupIsActive(false);
        setStatus("default");
        setEmail("");
        setErrors({ email: "", general: "" });
        if (onClose) onClose();
    };

    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            closePopup();
        }
    };

    return (
        <div className={`popup-email-overlay ${popupIsActive ? "active" : ""}`} onClick={handleOverlayClick}>
            <div className="popup-container">
                <div className="wrapper">
                    <div className="exit" onClick={closePopup}>
                        <img src={Exit} alt="" />
                    </div>
                    <div className="image-part">
                        <img src={PopUpImage} alt="" />
                    </div>
                    <div className="text-part">
                        {status === "default" || (status === "error" && (errors.email || errors.general)) ? (
                            <>
                                <div className="content-title">
                                    Your travel plan is ready!
                                </div>
                                <div className="desc">
                                    Don't lose your plan. Enter your email address to receive your itinerary.
                                </div>
                                <div className="input-content">
                                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', color: 'black', opacity: 0.8 }}>Email Address</label>
                                    <input
                                        type="text"
                                        placeholder='your.email@example.com'
                                        value={email}
                                        maxLength={50}
                                        style={{
                                            width: '100%',
                                            boxSizing: 'border-box',
                                            border: errors.email ? '1px solid #f44336' : '1px solid transparent'
                                        }}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {errors.email && <span className="error-msg" style={{ color: '#f44336', fontSize: '10px', display: 'block', marginTop: '2px' }}>{errors.email}</span>}
                                </div>
                                {errors.general && <div className="error-msg" style={{ color: '#f44336', fontSize: '12px', marginTop: '10px', textAlign: 'center' }}>{errors.general}</div>}
                                <div className="button" onClick={handleSubmit} style={{ marginTop: '20px' }}>
                                    <Button content={"Get Your Free Plan"} bg_color={"yellowMain"} text_color={"#fff"} />
                                </div>
                            </>
                        ) : null}

                        {status === "loading" && (
                            <>
                                <div className="content-title">
                                    Sending...
                                </div>
                                <div className="desc">
                                    Please wait while we send your travel plan.
                                </div>
                                <div className="button loading">
                                    <span className="btn_badge" style={{ backgroundColor: "#222", color: "#fff" }}>Sending...</span>
                                </div>
                            </>
                        )}

                        {status === "success" && (
                            <>
                                <div className="content-title">
                                    Message Sent Successfully!
                                </div>
                                <div className="desc">
                                    Your travel plan has been sent to your email address. Please check your inbox.
                                </div>
                                <div className="button success">
                                    <span className="btn_badge" style={{ backgroundColor: "#00A63E", color: "#fff" }}>✓ Successfully Sent</span>
                                </div>
                            </>
                        )}

                        {status === "error" && !errors.email && !errors.general && (
                            <>
                                <div className="content-title">
                                    Oops! Something Went Wrong
                                </div>
                                <div className="desc">
                                    Failed to send your travel plan. Please check your details and try again.
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

export default PopUpEmail
