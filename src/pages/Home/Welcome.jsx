import React from "react";
import "./style.scss";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import ai_icon from "../../assets/icons/ai-icon.svg";
import grow_icon from "../../assets/icons/grow-icon.svg";
import support_icon from "../../assets/icons/support-icon.svg";

const Welcome = () => {
  return (
    <section id="home">
      <div className="container">
        <div className="container-title">
          <h1>Are You Ready To Discover Azerbaijan ?</h1>
        </div>
        <div className="container-desc">
          <p>
            Feel the harmony of ancient spirit and modernism at every step.
            Discover a unique geography where historical heritage meets
            contemporary luxury with us.
          </p>
        </div>
        <Link to="/destinations">
          <Button
            content="Plan Your Journey"
            bg_color={"yellowMain"}
            text_color={"#fff"}
          />
        </Link>
      </div>
      <div className="footer-features">
        <div className="feature-item">
          <span className="icon">
            <img src={ai_icon} alt="" />
          </span>
          <span className="text">Design your journey with the power of AI</span>
        </div>
        <div className="feature-item">
          <span className="icon">
            <img src={grow_icon} alt="" />
          </span>
          <span className="text">
            Skip the sign-up and start planning your trip instantly
          </span>
        </div>
        <div className="feature-item">
          <span className="icon">
            <img src={support_icon} alt="" />
          </span>
          <span className="text">
            Every plan includes expert local tour guide support.
          </span>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
