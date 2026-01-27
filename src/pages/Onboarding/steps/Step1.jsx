import "./step.scss"
import { useOnboarding } from "../../../context/OnboardingContext";
import ActiveTravel from "../../../assets/images/active-travel.png";
import PassiveTravel from "../../../assets/images/passive-travel.png";

const Step1 = () => {

  const { onboardingData, updateData } = useOnboarding();
  const setUserTravelStyle = (value) => updateData("travelStyle", value);
  const userTravelStyle = onboardingData.travelStyle;

  

  return (
    <div className="step-content">
      <div className="step-title">
        Choose your travel style
      </div>
      <div className="travel-style-content">
        <div className="content-item active" onClick={() => setUserTravelStyle('active')}>
          <div className={`img-box ${userTravelStyle === "active" ? "active" : ""}`}>
            <img src={ActiveTravel} alt="Active Travel" />
          </div>
          <div className={`item-title ${userTravelStyle === "active" ? "active" : ""}`}>Active Travel</div>
        </div>
        <div className="content-item passive" onClick={() => setUserTravelStyle('passive')}>
          <div className={`img-box ${userTravelStyle === "passive" ? "active" : ""}`}>
            <img src={PassiveTravel} alt="Passive Travel" />
          </div>
          <div className={`item-title ${userTravelStyle === "passive" ? "active" : ""}`}>Passive Travel</div>
        </div>
      </div>
    </div>
  )
}

export default Step1
