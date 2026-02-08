import React, { useEffect, useState } from "react";
import "./style.scss";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import ai_icon from "../../assets/icons/ai-icon.svg";
import grow_icon from "../../assets/icons/grow-icon.svg";
import support_icon from "../../assets/icons/support-icon.svg";
import magic_icon from "../../assets/icons/magic-icon.svg";
import bgImage1 from "../../assets/images/background-overlay.png";
import bgImage2 from "../../assets/images/background-overlay_2.png";
import bgImage3 from "../../assets/images/background-overlay_3.png";
import bgImage4 from "../../assets/images/background-overlay_4.png";
import bgImage5 from "../../assets/images/background-overlay_5.png";


// ! api olaraq api.get() api.put() olaraq istifade edesen
// ! fs
import api from "../../services/api";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/swiper-bundle.css";

const backgroundImages = [bgImage1, bgImage2, bgImage3, bgImage4, bgImage5];

const Welcome = () => {


  const handlerPlanJourney = async (e) => {
    e.preventDefault();
    // ! bura start journey klik edende bu function handle olacaq

    try {
      const response = await api.post("/V1/journeys", {});
      let journeyId = response.id;
      console.log("Response:", journeyId);

      // Navigate to onboarding with journey ID
      navigate("/onboarding", { state: { journeyId } });
    } catch (error) {
      console.error("Error creating journey:", error);
    }
  };

  return (
    <section id="home">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="slide"
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={1000}
        className="background-slider"
      >
        {backgroundImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className="slide-bg"
              style={{ backgroundImage: `url(${image})` }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="home-content">
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
          <span
            className="main-btn-link"
            onClick={handlerPlanJourney}
          >
            <Button
              content={`Plan Your Journey  `}
              icon_content={magic_icon}
              bg_color={"yellowMain"}
              text_color={"#fff"}
            />
          </span>
          <p className="terms">
            By continuing, you agree to our{" "}
            <Link to="/privacy">Terms of Service and Privacy Policy.</Link>
          </p>
        </div>
        <div className="footer-features">
          <div className="feature-item">
            <span className="icon">
              <img src={ai_icon} alt="" />
            </span>
            <span className="text">
              Design your journey with the power of AI
            </span>
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
      </div>
    </section>
  );
};

export default Welcome;
