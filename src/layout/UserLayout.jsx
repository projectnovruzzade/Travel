import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'


const UserLayout = () => {
  return (
    <main>
      <Header />
        <Outlet />
    </main>
  )
}

export default UserLayout