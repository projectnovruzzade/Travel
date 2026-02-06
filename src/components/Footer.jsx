import React from "react";
import "./components.scss";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import Logo from "./Logo";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        {/* Sol Hissə: Logo */}
        <div className="footer-left">
          <div className="logo-wrapper">
            <Logo />
          </div>
        </div>

        {/* Orta Hissə: Linklər */}
        <div className="footer-center">
          <Link to="/privacy" className="footer-link">
            Privacy Policy
          </Link>
          <span className="separator">|</span>
          <Link to="/privacy" className="footer-link">
            Terms of Use
          </Link>
        </div>

        {/* Sağ Hissə: Əlaqə */}
        <div className="footer-right">
            <h4>Contact Information</h4>
          <div className="contact-item">
            <FaPhoneAlt className="icon" />
            <span>+994 55 824 67 69 (WhatsApp)</span>
          </div>
          <div className="contact-item">
            <FaEnvelope className="icon" />
            <span>musazadegulnaz6@gmail.com</span>
          </div>
        </div>
      </div>

      {/* Alt Hissə: Copyright */}
      <div className="footer-bottom">
        © Travelia. All rights reserved
      </div>
    </footer>
  );
};

export default Footer;