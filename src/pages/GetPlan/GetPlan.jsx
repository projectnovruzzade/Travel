import { useNavigate } from 'react-router-dom';
import './GetPlan.css';
import { FaArrowLeft } from 'react-icons/fa';
import { LuUsers, LuMapPin } from 'react-icons/lu';
import { FiHome, FiClock } from 'react-icons/fi';
import { IoAirplaneOutline } from 'react-icons/io5';

import PopUpEmail from '../../components/PopUpEmail';
import { useState } from 'react';
import { useOnboarding } from '../../context/OnboardingContext';
import api from '../../services/api';


const GetPlan = () => {
    const navigate = useNavigate();
    const [duration, setDuration] = useState(false);
    const [exploreLoading, setExploreLoading] = useState(false);
    const { onboardingData } = useOnboarding();

    const planData = onboardingData.planData;
    const days = Array.isArray(planData?.days) ? planData.days : [];
    const totalDays = days.length;
    const firstDay = days[0] || null;
    const firstDayItinerary = Array.isArray(firstDay?.itinerary) ? firstDay.itinerary : [];

    const handleBack = () => {
        navigate(-1);
    };

    const handleExplore = async () => {
        if (!planData || exploreLoading) return;

        setExploreLoading(true);
        try {
            const enriched = await api.post("/api/plan/enrich", planData);

            const firstDayEnriched = Array.isArray(enriched?.days) ? enriched.days[0] : null;
            if (firstDayEnriched) {
                const itinerary = Array.isArray(firstDayEnriched.itinerary) ? firstDayEnriched.itinerary : [];
                for (const slot of itinerary) {
                    const activities = Array.isArray(slot?.activities) ? slot.activities : [];
                    for (const activity of activities) {
                        if (activity.explore_url) {
                            window.open(activity.explore_url, "_blank");
                        }
                    }
                }
            }
        } catch (error) {
            console.error("Error enriching plan:", error);
        } finally {
            setExploreLoading(false);
        }
    };

    if (!planData) {
        return (
            <div className="get-plan-container">
                <div className="background-image"></div>
                <div className="page-overlay"></div>
                <div className="back-btn-container">
                    <button className="breadcrumb-back" onClick={() => navigate('/')}>
                        <FaArrowLeft size={12} /> Back
                    </button>
                </div>
                <main className="plan-wrapper">
                    <div className="title-group">
                        <h1>No Plan Available</h1>
                        <p>Please complete the onboarding to generate your itinerary.</p>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="get-plan-container">
            <div className="background-image"></div>
            <div className="page-overlay"></div>
            <PopUpEmail duration={duration} onClose={() => setDuration(false)} plan={planData} />

            <div className="back-btn-container">
                <button className="breadcrumb-back" onClick={handleBack}>
                    <FaArrowLeft size={12} /> Back
                </button>
            </div>

            {/* MAIN CONTENT */}
            <main className="plan-wrapper">

                <div className="title-group">
                    <h1>Your Azerbaijan Journey </h1>
                    <p>{totalDays}-Day Personalized Itinerary</p>
                </div>

                {/* ITINERARY SECTION - First Day Only */}
                <section className="itinerary-section">
                    <div className="day-header-row">
                        <div className="day-badge">{firstDay?.day ?? "-"}</div>
                        <h2 className="day-title">Day {firstDay?.day ?? "-"}: {firstDay?.city || "Destination"}</h2>
                        <a href="#" className="explore-btn" onClick={(e) => { e.preventDefault(); handleExplore(); }}>
                            {exploreLoading ? "Loading..." : "Explore"}
                        </a>
                    </div>

                    <div className="timeline-container">
                        {firstDayItinerary.length === 0 && (
                            <div className="timeline-item">
                                <div className="item-content">
                                    <p>No itinerary details are available yet.</p>
                                </div>
                            </div>
                        )}

                        {firstDayItinerary.map((slot, slotIndex) => (
                            <div key={slotIndex}>
                                {/* Time Slot */}
                                <div className="timeline-item activity-time">
                                    <div className="icon-dot">
                                        <FiClock className="rotated-icon" />
                                    </div>
                                    <div className="item-content">
                                        <span className="time-text">{slot.time_slot}</span>
                                    </div>
                                </div>

                                {/* Activities within this time slot */}
                                {(Array.isArray(slot.activities) ? slot.activities : []).map((activity, actIndex) => (
                                    <div className="timeline-item" key={actIndex}>
                                        <div className="icon-dot">
                                            <LuMapPin className="rotated-icon" />
                                        </div>
                                        <div className="item-content">
                                            <h3>{activity.place_name}</h3>
                                            <p>{activity.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
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
                    <button
                        className="explore-hotels-cta"
                        onClick={() => window.open("https://www.booking.com", "_blank")}
                    >
                        Explore Hotels
                    </button>
                </section>

                {/* OPTIONAL SERVICES */}
                <section className="optional-services-container">
                    <h2 className="section-label">Optional Services</h2>
                    <div className="services-list">
                        <div className="service-card" onClick={() => setDuration(true)} style={{ cursor: 'pointer' }}>
                            <div className="service-icon-col">
                                <IoAirplaneOutline className="service-icon rotated-icon airplane" />
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
                                <LuUsers className="service-icon rotated-icon" />
                            </div>
                            <div className="service-info-col">
                                <h3>Local Tour Guide<br />Support</h3>
                                <p>Choose from our expert local guides - specialists in history, culture, and adventure</p>
                            </div>
                            <div className="service-right-col">
                                <span className="service-price">$50-70/day</span>
                                <span className="guides-link" onClick={() => navigate('/expert')}>See All Guides →</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default GetPlan;
