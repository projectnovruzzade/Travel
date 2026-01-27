import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/images/logo.svg'

const Logo = () => {
  return (
    <Link to="/" className='logo'>
      <img src={logo} alt="" />
      <span>Travelia</span>
    </Link>
  )
}

export default Logo