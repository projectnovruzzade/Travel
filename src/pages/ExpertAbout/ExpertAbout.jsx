import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaArrowLeft, FaStar, FaWhatsapp, FaCheckCircle } from 'react-icons/fa';
import { FiMail, FiClock, FiHome } from 'react-icons/fi';
import { LuMapPin, LuUsers } from 'react-icons/lu';
import { IoAirplaneOutline } from 'react-icons/io5';
import PopUpEmail from '../../components/PopUpEmail';
import PopUpContact from '../../components/PopUpContact';
import api from '../../services/api';
import { useOnboarding } from '../../context/OnboardingContext';
import './ExpertAbout.css';

import nigarImg from '../../assets/images/nigar-expert.jpg';

const ExpertAbout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { onboardingData } = useOnboarding();
    const planData = onboardingData.planData;
    const days = Array.isArray(planData?.days) ? planData.days : [];
    const totalDays = days.length || 5;
    const firstDay = days[0] || null;
    const firstDayItinerary = Array.isArray(firstDay?.itinerary) ? firstDay.itinerary : [];

    const [isPopupOpen, setIsPopupOpen] = React.useState(false);
    const [isContactOpen, setIsContactOpen] = React.useState(false);
    const [exploreLoading, setExploreLoading] = React.useState(false);
    // Form state
    const [email, setEmail] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [errors, setErrors] = React.useState({ email: "", phone: "" });
    const [status, setStatus] = React.useState("default");
    const [isSelected, setIsSelected] = React.useState(false);

    // Get expert data from state or use Nigar as default
    const expert = location.state?.expert || {
        id: 6,
        name: "Nigar Mammadova",
        image: nigarImg,
        experience: "9 years experience",
        rating: 4.8,
        tours: 410,
        price: "$58/day",
        languages: ["English", "French", "Turkish"]
    };

    const validateEmail = (email) => {
        return email.length <= 50 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePhone = (phone) => {
        const digitsOnly = phone.replace(/[\s+]/g, "");
        return /^\d{7,20}$/.test(digitsOnly);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let newErrors = { email: "", phone: "" };
        let hasError = false;

        if (!email) {
            newErrors.email = "Email cannot be left blank.";
            hasError = true;
        } else if (email.length > 50) {
            newErrors.email = "Email must be a maximum of 50 characters.";
            hasError = true;
        } else if (!validateEmail(email)) {
            newErrors.email = "Please enter a valid email format (text@domain.com).";
            hasError = true;
        }

        if (!phone) {
            newErrors.phone = "Phone number cannot be left blank.";
            hasError = true;
        } else if (!validatePhone(phone)) {
            newErrors.phone = "Phone must be between 7-20 digits. Only digits and '+' are accepted.";
            hasError = true;
        }

        if (hasError) {
            setErrors(newErrors);
            return;
        }

        setErrors({ email: "", phone: "" });
        setStatus("loading");

        // Simulating API call
        setTimeout(() => {
            setStatus("success");
            // In a real app, you'd call api.post("/api/mail/send-plan", { email, phone, expert })
        }, 1500);
    };

    const handleBack = () => {
        navigate(-1);
    };

    const handleGuideClick = () => {
        setIsSelected(true);
        toast.success("This expert has been chosen successfully", {
            style: {
                border: '1px solid #00A63E',
                padding: '16px',
                color: '#00A63E',
            },
            iconTheme: {
                primary: '#00A63E',
                secondary: '#FFFAEE',
            },
        });
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
            toast.error("Failed to explore destinations. Please try again.");
        } finally {
            setExploreLoading(false);
        }
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
                    <h1>Your Azerbaijan Journey </h1>
                    <p>{totalDays}-Day Personalized Itinerary</p>
                </div>

                {/* ITINERARY SECTION */}
                <section className="itinerary-section">
                    <div className="day-header-row">
                        <div className="day-badge">{firstDay?.day ?? "1"}</div>
                        <h2 className="day-title">Day {firstDay?.day ?? "1"}: {firstDay?.city || "Old City & Historical Landmarks"}</h2>
                        <span
                            className="explore-btn"
                            onClick={handleExplore}
                            style={{ cursor: 'pointer' }}
                        >
                            {exploreLoading ? "Loading..." : "Explore"}
                        </span>
                    </div>

                    <div className="timeline-container">
                        {firstDayItinerary.length === 0 ? (
                            <div className="timeline-item">
                                <div className="item-content">
                                    <p>No itinerary details are available yet.</p>
                                </div>
                            </div>
                        ) : (
                            firstDayItinerary.map((slot, slotIndex) => (
                                <div key={slotIndex}>
                                    <div className="timeline-item activity-time">
                                        <div className="icon-dot">
                                            <FiClock className="rotated-icon" />
                                        </div>
                                        <div className="item-content">
                                            <span className="time-text">{slot.time_slot}</span>
                                        </div>
                                    </div>

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
                            ))
                        )}
                    </div>
                </section>

                <div className="action-row">
                    <button className="see-all-plan-btn" onClick={() => setIsPopupOpen(true)}>See All Plan</button>
                </div>

                {/* OPTIONAL SERVICES */}
                <section className="optional-services-container">
                    <h2 className="section-label">Optional Services</h2>

                    <div className="service-card" onClick={() => setIsContactOpen(true)} style={{ cursor: 'pointer' }}>
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
                            <span className="service-price">{expert.price}</span>
                        </div>

                        <div className="expert-profile-mini">
                            <div className="profile-image-container">
                                <img src={expert.image} alt={expert.name} className="expert-image" />
                            </div>
                            <div className="expert-info">
                                <div className="expert-name-row">
                                    <h3>{expert.name}</h3>
                                </div>
                                <span className="experience">{expert.experience} • <FaStar className="star-icon" size={10} /> {expert.rating}</span>
                                <div className="language-tags">
                                    {expert.languages.map((lang, idx) => (
                                        <span key={idx} className="tag-pill">{lang}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="selection-status-row">
                            <span
                                className={`guide-selected ${isSelected ? 'selected' : ''}`}
                                onClick={handleGuideClick}
                            >
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
                            <label style={{ color: 'white' }}>Email Address</label>
                            <div className="input-wrapper" style={{ border: errors.email ? '1px solid #f44336' : '' }}>
                                <FiMail className="input-icon" />
                                <input
                                    type="email"
                                    placeholder="your.email@example.com"
                                    value={email}
                                    maxLength={50}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            {errors.email && <span style={{ color: '#f44336', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.email}</span>}
                        </div>

                        <div className="input-group">
                            <label style={{ color: 'white' }}>WhatsApp Number</label>
                            <div className="input-wrapper" style={{ border: errors.phone ? '1px solid #f44336' : '' }}>
                                <FaWhatsapp className="input-icon" />
                                <input
                                    type="text"
                                    placeholder="+994 50 000 00 00"
                                    value={phone}
                                    maxLength={20}
                                    onChange={(e) => setPhone(e.target.value.replace(/[^0-9+]/g, ""))}
                                />
                            </div>
                            {errors.phone && <span style={{ color: '#f44336', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.phone}</span>}
                        </div>

                        <button
                            className="submit-contact-btn"
                            onClick={handleSubmit}
                            disabled={status === "loading"}
                        >
                            {status === "loading" ? "Submitting..." : status === "success" ? "✓ Submitted Successfully" : "Submit Contact Information"}
                        </button>
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
                    <button
                        className="explore-hotels-cta"
                        onClick={() => window.open("https://www.booking.com", "_blank")}
                    >
                        Explore Hotels
                    </button>
                </section>
            </main>

            <PopUpEmail
                duration={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                plan={null} // Or actual plan if available in context
            />
            <PopUpContact
                duration={isContactOpen}
                onClose={() => setIsContactOpen(false)}
                plan={null}
            />
        </div>
    );
};

export default ExpertAbout;
