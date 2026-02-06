import React from "react";
import "./components.scss";
import { IoCallOutline, IoMailOutline } from "react-icons/io5";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-top-row">
          {/* Left Section: Logo */}
          <div className="footer-left">
            <Logo />
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

        {/* Center Section: Links and Copyright */}
        <div className="footer-center">
          <div className="footer-links">
            <a href="/privacy" className="footer-link">
              Privacy Policy
            </a>
            <span className="separator">|</span>
            <a href="/terms" className="footer-link">
              Terms of Use
            </a>
          </div>
          <div className="footer-copyright">
            © Travelia. All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
