import React from 'react'
import ai_icon_2 from '../../assets/icons/ai-icon-2.svg';
import help_icon from '../../assets/icons/help-icon.svg';
import transport_icon from '../../assets/icons/transport-icon.svg';
import location_icon from '../../assets/icons/location-icon.svg';
import about_image from '../../assets/images/about-overlay.png';

const About = () => {
  return (
    <section id='about'>
        <div className="wrapper">
            <div className="content-title">
                <h1>Why Choose  Us?</h1>
            </div>
            <div className="content-desc">
                <p>
                    An Itinerary That Knows You. Forget standard tours. Our AI doesn't just suggest places; it creates a personalized experience that fits your time and pocket. Tell us what you love, and let technology handle the rest.
                </p>
            </div>
            <div className="cover-part">
                <div className="text-part">

                    <div className="text-box-container">

                        <div className="text-box">
                            <div className="icon">
                                <img src={ai_icon_2} alt="" />
                            </div>
                            <div className="text">
                                <div className="main-text">
                                    Smart Planning
                                </div>
                                <div className="desc-text">
                                    We analyze your interests to craft your ideal itinerary.
                                </div>
                            </div>
                        </div>
                            <div className="text-box">
                            <div className="icon">
                                <img src={help_icon} alt="" />
                            </div>
                            <div className="text">
                                <div className="main-text">
                                    Budget Friendly
                                </div>
                                <div className="desc-text">
                                    We offer the best experiences and fun tailored to your budget.
                                </div>
                            </div>
                        </div>
                            <div className="text-box">
                            <div className="icon">
                                <img src={transport_icon} alt="" />
                            </div>
                            <div className="text">
                                <div className="main-text">
                                   Airport Pickup
                                </div>
                                <div className="desc-text">
                                    We pick you up from the airport and take you straight to your hotel.
                                </div>
                            </div>
                        </div>
                            <div className="text-box">
                            <div className="icon">
                                <img src={location_icon} alt="" />
                            </div>
                            <div className="text">
                                <div className="main-text">
                                    Local Guide Support
                                </div>
                                <div className="desc-text">
                                    Explore Azerbaijan with experienced local guides.
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <div className="image-part">
                    <div className="image-box">
                        <img src={about_image} alt="" />
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default About