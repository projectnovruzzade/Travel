import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaStar, FaWhatsapp, FaCheckCircle } from 'react-icons/fa';
import { FiMail, FiClock, FiHome } from 'react-icons/fi';
import { LuMapPin, LuUsers } from 'react-icons/lu';
import { IoAirplaneOutline } from 'react-icons/io5';
import './TeamAbout.css';

import nigarImg from '../../assets/images/nigar-expert.jpg';

const TeamAbout = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    const handleChangeGuide = () => {
        navigate('/expert');
    };

    return (
        <div className="team-about-container">
            <div className="background-image"></div>
            <div className="page-overlay"></div>

            <div className="back-btn-container">
                <button className="breadcrumb-back" onClick={handleBack}>
                    <FaArrowLeft size={12} /> Back
                </button>
            </div>

            <main className="plan-wrapper">
                <div className="title-group">
                    <h1>Your Azerbaijan Journey</h1>
                    <p>5-Day Personalized Itinerary</p>
                </div>

                {/* ITINERARY SECTION */}
                <section className="itinerary-section">
                    <div className="day-header-row">
                        <div className="day-badge">1</div>
                        <h2 className="day-title">Day 1: Old City & Historical Landmarks</h2>
                        <span className="explore-btn">Explore</span>
                    </div>

                    <div className="timeline-container">
                        <div className="timeline-item activity-time">
                            <div className="icon-dot">
                                <FiClock className="rotated-icon" />
                            </div>
                            <div className="item-content">
                                <span className="time-text">09:00-12:00 AM</span>
                            </div>
                        </div>

                        <div className="timeline-item">
                            <div className="icon-dot">
                                <LuMapPin className="rotated-icon" />
                            </div>
                            <div className="item-content">
                                <h3>Icherisheher (Old City)</h3>
                                <p>Explore the UNESCO World Heritage site, visit Maiden Tower</p>
                            </div>
                        </div>

                        <div className="timeline-item">
                            <div className="icon-dot">
                                <LuMapPin className="rotated-icon" />
                            </div>
                            <div className="item-content">
                                <h3>Maiden Tower</h3>
                                <p>Visit the iconic 12th-century defensive tower</p>
                            </div>
                        </div>

                        <div className="timeline-item">
                            <div className="icon-dot">
                                <LuMapPin className="rotated-icon" />
                            </div>
                            <div className="item-content">
                                <h3>Palace of Shirvanshahs</h3>
                                <p>Discover 15th-century royal palace complex</p>
                            </div>
                        </div>

                        <div className="timeline-item">
                            <div className="icon-dot">
                                <LuMapPin className="rotated-icon" />
                            </div>
                            <div className="item-content">
                                <h3>Transportation</h3>
                                <p>Taxi fares between Old City attractions</p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="action-row">
                    <button className="see-all-plan-btn">See All Plan</button>
                </div>

                {/* OPTIONAL SERVICES */}
                <section className="optional-services-container">
                    <h2 className="section-label">Optional Services</h2>

                    <div className="service-card">
                        <div className="service-icon-col">
                            <IoAirplaneOutline className="service-icon airplane" />
                        </div>
                        <div className="service-info-col">
                            <div className="service-top">
                                <h3>Airport Pickup Service</h3>
                                <span className="service-price">$45</span>
                            </div>
                            <p>We'll pick you up from the airport and take you straight to your hotel</p>
                        </div>
                    </div>

                    <div className="service-card guide-card">
                        <div className="service-header-mini">
                            <div className="service-title-col">
                                <h3>Local Tour Guide</h3>
                                <p className="support-label">Support</p>
                            </div>
                            <span className="service-price">$58/day</span>
                        </div>

                        <div className="expert-profile-mini">
                            <div className="profile-image-container">
                                <img src={nigarImg} alt="Nigar Mammadova" className="expert-image" />
                            </div>
                            <div className="expert-info">
                                <div className="expert-name-row">
                                    <h3>Nigar Mammadova</h3>
                                </div>
                                <span className="experience">9 years experience • <FaStar className="star-icon" size={10} /> 4.8</span>
                                <div className="language-tags">
                                    <span className="tag-pill">English</span>
                                    <span className="tag-pill">French</span>
                                    <span className="tag-pill">Turkish</span>
                                </div>
                            </div>
                        </div>
                        <div className="selection-status-row">
                            <span className="guide-selected">
                                <FaCheckCircle size={14} className="check-icon" /> Guide Selected
                            </span>
                            <span className="change-guide" onClick={handleChangeGuide}>Change Guide</span>
                        </div>
                    </div>
                    {/* CONTACT INFORMATION */}

                    <h2 className="section-label">Contact Information</h2>
                    <p className="contact-subtitle">We'll use WhatsApp to stay in touch at the airport and throughout your trip</p>

                    <div className="contact-form">
                        <div className="input-group">
                            <label>Email Address</label>
                            <div className="input-wrapper">
                                <FiMail className="input-icon" />
                                <input type="email" placeholder="your.email@example.com" />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>WhatsApp Number</label>
                            <div className="input-wrapper">
                                <FaWhatsapp className="input-icon" />
                                <input type="text" placeholder="+1 (234) 567-8900" />
                            </div>
                        </div>

                        <button className="submit-contact-btn">Submit Contact Information</button>
                    </div>

                </section>


                {/* HOTEL RECOMMENDATION (at bottom) */}
                <section className="hotel-referral-card bottom-card">
                    <div className="card-left">
                        <div className="home-icon-box">
                            <FiHome size={24} />
                        </div>
                        <div className="card-text">
                            <h3>Don't have a place to stay?</h3>
                            <p>Don't worry, we can help you find the perfect accommodation</p>
                        </div>
                    </div>
                    <button className="explore-hotels-cta">Explore Hotels</button>
                </section>
            </main>
        </div>
    );
};

export default TeamAbout;
