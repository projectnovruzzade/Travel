import React, { useState, useEffect } from 'react'
import PopUpImage from "../assets/images/popup-image.png"
import Button from './Button';
import Exit from "../assets/icons/exit.svg";

const PopUpEmail = ({duration = false, onClose}) => {


  const [popupIsActive,setPopupIsActive] = useState(duration);
  const [email, setEmail] = useState("");

  useEffect(() => {
    setPopupIsActive(duration);
    console.log(duration)
  }, [duration]);

  const [status, setStatus] = useState("default"); // "default" | "loading" | "success" | "error"

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

//   ! this is main part of popup   ( burda goresen işini submit olarsa)
  const handleSubmit = () => {
    setStatus("loading");
    setTimeout(() => {
      if (validateEmail(email)) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    }, 1500);
  };

  const handleTryAgain = () => {
    setStatus("default");
    setEmail("");
  };

  const closePopup = () => {
    setPopupIsActive(false);
    setStatus("default");
    setEmail("");
    if (onClose) onClose();
  };

  const handleCloseUp = (e) => {
    if (e.contains("popup-email-overlay")) {
        closePopup();
    }
  }

  return (
    <div className={`popup-email-overlay ${popupIsActive ? "active" : ""}`} onClick={(e) => handleCloseUp(e.target.classList)}>
        <div className="popup-container" onClick={(e) => console.log(e.target)}>
            <div className="wrapper">
                <div className="exit" onClick={closePopup}>
                    <img src={Exit} alt="" />
                </div>
                <div className="image-part">
                    <img src={PopUpImage} alt="" />
                </div>
                <div className="text-part">
                    {status === "default" && (
                        <>
                            <div className="content-title">
                                Your travel plan is ready!
                            </div>
                            <div className="desc">
                                Don't lose your plan. Enter your email to receive your itinerary.
                            </div>
                            <div className="input-content">
                                <input
                                    type="text"
                                    placeholder='Enter Your Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="button" onClick={handleSubmit}>
                                <Button content={"Get Your Free PLan"} bg_color={"yellowMain"} text_color={"#fff"} />
                            </div>
                        </>
                    )}

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

                    {status === "error" && (
                        <>
                            <div className="content-title">
                                Oops! Something Went Wrong
                            </div>
                            <div className="desc">
                                Failed to send your travel plan. Please check your email address and try again.
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
