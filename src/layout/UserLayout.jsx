import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'


const UserLayout = () => {
  return (
    <main>
      <Header />
        <Outlet />
        <Footer/>
    </main>
  )
}

export default UserLayout