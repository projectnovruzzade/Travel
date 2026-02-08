import React from "react";
import "./components.scss";
import { IoCallOutline, IoMailOutline } from "react-icons/io5";
import Logo from "./Logo";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        {/* Left Section: Logo */}
        <div className="footer-left">
          <Logo />
        </div>

        {/* Center Section: Links and Copyright */}
        <div className="footer-center">
          <div className="footer-links">
            <Link to="/privacy" className="footer-link">
              Privacy Policy
            </Link>
            <span className="separator">|</span>
            <Link to="/terms" className="footer-link">
              Terms of Use
            </Link>
          </div>
          <div className="footer-copyright">
            © Travelia. All rights reserved
          </div>
        </div>

        {/* Right Section: Contact Information */}
        <div className="footer-right">
          <h4 className="contact-title">Contact Information</h4>
          <div className="contact-item">
            <IoCallOutline className="icon" />
            <span>+994558246769 (WhatsApp)</span>
          </div>
          <div className="contact-item">
            <IoMailOutline className="icon" />
            <span>musazadegulnaz6@gmail.com</span>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
