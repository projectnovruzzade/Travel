import "./step.scss";
import { useOnboarding } from "../../../context/OnboardingContext";
import ActiveTravel from "../../../assets/images/active-travel.png";
import PassiveTravel from "../../../assets/images/passive-travel.png";

const Step1 = ({ onAdvance }) => {
  const { onboardingData, updateData } = useOnboarding();
  const userTravelStyle = onboardingData.travelStyle;

  const handleStyleClick = (value) => {
    updateData("travelStyle", value);
  };

  const doubleClickHandle = (value) => () => {
      updateData("travelStyle", value);
       console.log("Double clicked:", value);
  };
  return (
    <div className="step-content">
      <div className="step-title">Choose your travel style</div>
      <div className="travel-style-content">
        <div
          className="content-item active"
          onClick={() => handleStyleClick("active")}
          onDoubleClick={doubleClickHandle("active")}
        >
          <div className={`img-box ${userTravelStyle === "active" ? "active" : ""}`}>
            <img src={ActiveTravel} alt="Active Travel" />
          </div>
          <div className={`item-title ${userTravelStyle === "active" ? "active" : ""}`}>
            Active
          </div>
        </div>
        <div
          className="content-item passive"
          onClick={() => handleStyleClick("passive")}
          onDoubleClick={doubleClickHandle("passive")}
        >
          <div className={`img-box ${userTravelStyle === "passive" ? "active" : ""}`}>
            <img src={PassiveTravel} alt="Passive Travel" />
          </div>
          <div className={`item-title ${userTravelStyle === "passive" ? "active" : ""}`}>
            Passive
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;
