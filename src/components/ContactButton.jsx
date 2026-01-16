import React, { useState } from 'react';
import './ContactButton.css';

const ContactButton = () => {
  const phoneNumber = "994503362820"; // Əlaqə nömrənizi daxil edin
  const message = "Salam, mən saytdan yazıram.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const [showFallback, setShowFallback] = useState(false);

  const handleContactClick = () => {
  
    const win = window.open(whatsappUrl, '_self');
    
   
    if (!win || win.closed || typeof win.closed === 'undefined') {
      setShowFallback(true);
    }
  };

  return (
    <div className="contact-container">
      <button className="contact-btn" onClick={handleContactClick}>
        Contact Us
      </button>

      {showFallback && (
        <div className="fallback-message">
          <p>WhatsApp açılmadı? Bizimlə əlaqə saxlayın:</p>
          <span className="phone-number" title="Kopyalamaq üçün klikləyin">
            {phoneNumber}
          </span>
          <button 
            className="copy-btn" 
            onClick={() => navigator.clipboard.writeText(phoneNumber)}
          >
        
          </button>
        </div>
      )}
    </div>
  );
};

export default ContactButton;