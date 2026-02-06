import { Link } from 'react-router-dom'
import logo from '../assets/images/logo.svg'
import { useOnboarding } from '../context/OnboardingContext'

const Logo = () => {
  const { resetData } = useOnboarding();

  return (
    <Link to="/" className='logo' onClick={resetData}>
      <img src={logo} alt="" />
      <span>Travelia</span>
    </Link>
  )
}

export default Logo