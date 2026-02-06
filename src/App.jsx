import { Routes, Route } from 'react-router-dom';
import UserLayout from './layout/UserLayout.jsx'

import "./index.scss";

import Home from './pages/Home/index.jsx'
import Onboarding from './pages/Onboarding/index.jsx'
import Policy from './pages/Policy/index.jsx'
import Error from './pages/Error/index.jsx'
import GetPlan from './pages/getPlan/GetPlan.jsx'
import ScrollToTop from './components/ScrollToTop'

import AdminLayout from './layout/AdminLayout'


function App() {

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path='admin' element={<AdminLayout />}>
        </Route>
        <Route path='/' element={<UserLayout />} >
          <Route index element={<Home />} />
          <Route path='onboarding' element={<Onboarding />} />
          <Route path='get-plan' element={<GetPlan />} />
        </Route>
        <Route path='/privacy' element={<Policy />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </>
  )
}

export default App
