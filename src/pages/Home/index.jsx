import React from 'react'
import Button from '../../components/Button'
import Welcome from './Welcome.jsx'
import About from './About.jsx'
import usePageTitle from '../../hooks/usePageTitle'


const Home = () => {
  usePageTitle("Home");
  return (
    <div id='app-home' style={{display: 'flex', flexDirection: "column"}}>
      <Welcome />
      <About />
    </div>

  )
}

export default Home