import { Routes, Route } from 'react-router-dom';
import UserLayout from './layout/UserLayout.jsx'

import "./index.scss";

import Home from './pages/Home/index.jsx'
import Onboarding from './pages/Onboarding/index.jsx'
import GetPlan from './pages/GetPlan/GetPlan.jsx'
import Expert from './pages/ExpertTeam/Expert.jsx'
import TeamAbout from './pages/TeamAbout/TeamAbout.jsx'
import Policy from './pages/Policy/index.jsx'
import Error from './pages/Error/index.jsx'

import AdminLayout from './layout/AdminLayout.jsx'


function App() {

  return (
    <>
      <Routes>
        <Route path='admin' element={<AdminLayout />}>
        </Route>
        <Route path='/' element={<UserLayout />} >
          <Route index element={<Home />} />
          <Route path='onboarding' element={<Onboarding />} />
          <Route path='get-plan' element={<GetPlan />} />
          <Route path='expert' element={<Expert />} />
          <Route path='team-about' element={<TeamAbout />} />
        </Route>
        <Route path='/privacy' element={<Policy />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </>
  )
}

export default App
