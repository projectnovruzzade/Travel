import MagicIcon from "../assets/icons/magic-icon.svg";
import LoadingImage from "../assets/images/loading-image.svg"

const LoadingScreen = () => {
  return (
    <div className="onboarding-container loading-container">
      <img src={LoadingImage} alt="Generating" className="loading-icon" />
      <div className="step-title">Generating your itinerary</div>
      <div className="loading-dots">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>
  );
};

export default LoadingScreen;
