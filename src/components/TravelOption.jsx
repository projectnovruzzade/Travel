import React from 'react'
import SoloIcon from '../assets/icons/solo-icon.png'
import CoupleIcon from '../assets/icons/couple-icon.png'
import FriendsIcon from '../assets/icons/friends-icon.png'
import FamilyIcon from '../assets/icons/family-icon.png'

const optionsIcon = {
    Solo: SoloIcon,
    Couple: CoupleIcon,
    Friends: FriendsIcon,
    Family: FamilyIcon
}



const TravelOption = ({content, icon_type}) => {
  return (
    <div className='travel-opt-btn'>
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