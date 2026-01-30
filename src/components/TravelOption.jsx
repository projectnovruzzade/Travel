import React from 'react'
// ! step 2 icons
import SoloIcon from '../assets/icons/solo-icon.png'
import CoupleIcon from '../assets/icons/couple-icon.png'
import FriendsIcon from '../assets/icons/friends-icon.png'
import FamilyIcon from '../assets/icons/family-icon.png'

// ! step 3 icons
import NatureIcon from '../assets/icons/nature-icon.png'
import CityIcon from '../assets/icons/city-icon.png'
import AdventureIcon from '../assets/icons/adventure-icon.png'
import HistoryIcon from '../assets/icons/history-icon.png'
import GastronomyIcon from '../assets/icons/gastronomy-icon.png'
import CultureIcon from '../assets/icons/culture-icon.png'


const optionsIcon = {
    Solo: SoloIcon,
    Couple: CoupleIcon,
    Friends: FriendsIcon,
    Family: FamilyIcon,

    Nature: NatureIcon,
    City: CityIcon,
    Adventure: AdventureIcon,
    History: HistoryIcon,
    Gastronomy: GastronomyIcon,
    Culture: CultureIcon
}



const TravelOption = ({content, icon_type,className}) => {
  return (
    <div className={`travel-opt-btn ${className || ''}`}>
        <span className="icon">
            <img src={optionsIcon[icon_type]} alt="" />
        </span>
        <span className="text">
            {content}
        </span>
    </div>
  )
}

export default TravelOption