import React from "react";
import "./components.scss";
import { Link } from "react-router-dom";
import Logo from "./Logo";

import ContactButton from "./ContactButton";

const Header = () => {
  return (
    <header>
      <nav>
        <div className="logo-part">
          <Logo />
        </div>
        <div className="menu-part">
          <Link to="/">
            <ContactButton
              content="Contact Us"
              bg_color={"yellowMain"}
              text_color={"#fff"}
            />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
