import React from 'react'
import "./components.scss";

import Logo from './Logo';
import Button from './Button';

const Header = () => {
  return (
    <header>
        <nav>
            <div className="logo-part">
                <Logo />
            </div>
            <div className="menu-part">

                <a href="https://wa.me/994558246769" target="_blank" rel="noopener noreferrer" className='contact-link'>
                    <Button content="Contact Us" bg_color={"yellowMain"} text_color={"#fff"} />
                </a>
                
            </div>
        </nav>
    </header>
  )
}

export default Header