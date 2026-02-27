import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaStar } from 'react-icons/fa';
import './Expert.css';

import elvinImg from '../../assets/images/elvin-expert.png';
import ayselImg from '../../assets/images/aysel-expert.jpg';
import leylaImg from '../../assets/images/leyla-expert.png';
import turalImg from '../../assets/images/tural-expert.jpg';
import rashadImg from '../../assets/images/rashad-expert.jpg';
import nigarImg from '../../assets/images/nigar-expert.jpg';

const expertsData = [
    {
        id: 1,
        name: "Elvin Mammadov",
        image: elvinImg,
        experience: "8 years experience",
        rating: 4.9,
        tours: 450,
        price: "$60/day",
        bio: "Passionate about Azerbaijan's rich history and culture. I specialize in bringing the Old City to life with engaging stories and deep historical knowledge.",
        languages: ["English", "Russian", "Turkish"],
        specialties: ["Historical Sites", "Cultural Tours", "Old City Expert"]
    },
    {
        id: 2,
        name: "Aysel Hasanova",
        image: ayselImg,
        experience: "6 years experience",
        rating: 4.8,
        tours: 320,
        price: "$55/day",
        bio: "Expert in modern Baku and contemporary culture. I love showing visitors the perfect blend of tradition and modernity that makes Azerbaijan unique.",
        languages: ["English", "German", "French"],
        specialties: ["Modern Architecture", "Food Tours", "Photography Spots"]
    },
    {
        id: 3,
        name: "Leyla Aliyeva",
        image: leylaImg,
        experience: "5 years experience",
        rating: 4.7,
        tours: 290,
        price: "$50/day",
        bio: "Art historian and culture enthusiast, I specialize in museum tours and helping visitors discover Azerbaijan's vibrant art scene and local crafts.",
        languages: ["English", "Italian", "Spanish"],
        specialties: ["Art & Museums", "Shopping Tours", "Local Markets"]
    },
    {
        id: 4,
        name: "Tural Ibrahimov",
        image: turalImg,
        experience: "7 years experience",
        rating: 4.9,
        tours: 380,
        price: "$65/day",
        bio: "Food and wine expert passionate about Azerbaijan's culinary heritage. Join me to taste authentic flavors and learn traditional cooking methods.",
        languages: ["English", "Russian", "Georgian"],
        specialties: ["Wine Tours", "Culinary Experiences", "Village Tours"]
    },
    {
        id: 5,
        name: "Rashad Aliyev",
        image: rashadImg,
        experience: "10 years experience",
        rating: 5.0,
        tours: 520,
        price: "$70/day",
        bio: "Adventure specialist with extensive knowledge of Azerbaijan's natural wonders. From the Caucasus Mountains to the Caspian Sea, I'll show you it all.",
        languages: ["English", "Arabic", "Persian"],
        specialties: ["Adventure Tours", "Nature Trips", "Mountain Hiking"]
    },
    {
        id: 6,
        name: "Nigar Mammadova",
        image: nigarImg,
        experience: "9 years experience",
        rating: 4.8,
        tours: 410,
        price: "$58/day",
        bio: "Cultural heritage specialist with deep knowledge of Azerbaijan's traditional crafts, especially carpet weaving. I bring centuries of tradition to life.",
        languages: ["English", "French", "Turkish"],
        specialties: ["Religious Sites", "Carpet Weaving", "Traditional Crafts"]
    }
];

const Expert = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="expert-container">
            <div className="background-image"></div>
            <div className="page-overlay"></div>

            <div className="back-btn-container">
                <button className="breadcrumb-back" onClick={handleBack} id="expert-back-btn">
                    <FaArrowLeft size={12} /> Back
                </button>
            </div>

            <div className="header-section">
                <h1>Meet Our Expert Guides</h1>
                <p>Choose from our carefully selected local guides who are passionate about sharing Azerbaijan's culture, history, and hidden gems</p>
            </div>

            <div className="experts-grid">
                {expertsData.map(expert => (
                    <div className="expert-card" key={expert.id} id={`expert-card-${expert.id}`}>
                        <div className="expert-header">
                            <div className="expert-profile">
                                <div className="profile-image-container">
                                    <img src={expert.image} alt={expert.name} className="expert-image" />
                                </div>
                                <div className="expert-info">
                                    <h2>{expert.name}</h2>
                                    <span className="experience">{expert.experience}</span>
                                    <div className="rating-row">
                                        <FaStar className="star-icon" size={14} />
                                        <span>{expert.rating}</span>
                                        <span style={{ opacity: 0.6 }}>({expert.tours} tours)</span>
                                    </div>
                                </div>
                            </div>
                            <div className="price-tag">
                                {expert.price}
                            </div>
                        </div>

                        <p className="expert-bio">
                            {expert.bio}
                        </p>

                        <div className="tags-container">
                            <div className="tags-section language-tags">
                                {expert.languages.map((lang, idx) => (
                                    <span key={idx} className="tag-pill">{lang}</span>
                                ))}
                            </div>
                            <div className="tags-section">
                                {expert.specialties.map((spec, idx) => (
                                    <span key={idx} className="tag-pill">{spec}</span>
                                ))}
                            </div>
                        </div>

                        <button className="select-btn" onClick={() => navigate('/expert-about', { state: { expert } })}>Select Guide</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Expert;
