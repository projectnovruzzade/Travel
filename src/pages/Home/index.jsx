import React from 'react'
import Button from '../../components/Button'
import Welcome from './Welcome.jsx'
import About from './About.jsx'

const Home = () => {
  return (
    <div id='app-home' style={{display: 'flex', flexDirection: "column"}}>
      <Welcome />
      <About />
    </div>

  )
}

export default Home