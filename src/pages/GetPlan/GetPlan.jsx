import { useNavigate, Link } from 'react-router-dom';
import './GetPlan.css';
import { FaArrowLeft } from 'react-icons/fa';
import { LuUsers, LuMapPin } from 'react-icons/lu';
import { FiHome, FiClock } from 'react-icons/fi';
import { IoAirplaneOutline } from 'react-icons/io5';

import PopUpEmail from '../../components/PopUpEmail';
import { useState } from 'react';


const GetPlan = () => {
    const navigate = useNavigate();
    const [duration, setDuration] = useState(false);

    const handleBack = () => {
        navigate(-1);

    };
    const handleExpert = () => {
        window.scrollTo(0, 0);
        navigate('/expert');
    };

    return (
        <div className="get-plan-container">
            <div className="background-image"></div>
            <div className="page-overlay"></div>
           <PopUpEmail duration={duration} onClose={() => setDuration(false)} />


            <div className="back-btn-container">
                <button className="breadcrumb-back" onClick={handleBack}>
                    <FaArrowLeft size={12} /> Back
                </button>
            </div>
            {/* MAIN CONTENT */}
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
                    <button className="see-all-plan-btn" onClick={() => setDuration(true)}>See All Plan</button>
                </div>

                {/* HOTEL RECOMMENDATION */}
                <section className="hotel-referral-card">
                    <div className="card-left">
                        <div className="home-icon-box">
                            <FiHome className="rotated-icon" />
                        </div>
                        <div className="card-text">
                            <h3>Don't have a place to stay?</h3>
                            <p>Don't worry, we can help you find the perfect accommodation</p>
                        </div>
                    </div>
                    <button className="explore-hotels-cta">Explore Hotels</button>
                </section>

                <section className="optional-services-container">
                    <h2 className="section-label">Optional Services</h2>
                    <div className="services-list">
                        <div className="service-card">
                            <div className="service-icon-col">
                                <IoAirplaneOutline className="service-icon airplane" />
                            </div>
                            <div className="service-info-col">
                                <h3>Airport Pickup Service</h3>
                                <p>We'll pick you up from the airport and take you straight to your hotel</p>
                            </div>
                            <div className="service-right-col">
                                <span className="service-price">$45</span>
                            </div>
                        </div>

                        <div className="service-card">
                            <div className="service-icon-col">
                                <LuUsers className="service-icon" />
                            </div>
                            <div className="service-info-col">
                                <h3>Local Tour Guide <br /> Support</h3>
                                <p>Choose from our expert local guides - specialists in history, culture, and adventure</p>
                            </div>
                            <div className="service-right-col">
                                <span className="service-price">$50-70/day</span>
                                <span onClick={handleExpert} className="guides-link">See All Guides →</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default GetPlan;
