import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TravelOption from "../../../components/TravelOption";
import { useOnboarding } from "../../../context/OnboardingContext";

const interests = ["Nature", "City", "Adventure", "History", "Gastronomy", "Culture"];

const Step3 = () => {
  const { updateData, onboardingData } = useOnboarding();
  const [selectedInterests, setSelectedInterests] = useState(onboardingData.travelInterest || []);

  const handleInterestClick = (interest) => {
    setSelectedInterests((prev) => {
      if (prev.includes(interest)) {
        return prev.filter((item) => item !== interest);
      }
      if (prev.length >= 3) {
        toast.error("You can select up to 3 interests only!");
        return prev;
      }
      return [...prev, interest];
    });
  };

  useEffect(() => {
    updateData("travelInterest", selectedInterests);
    console.log(onboardingData);
    
  }, [selectedInterests]);

  return (
    <div className="step-content">
      <div className="step-title">What are your interests?</div>
      <div className="travel-interest-content">
        <div className="interest-wrapper">
          {interests.map((interest) => (
            <div
              key={interest}
              className={`option ${interest}`}
              onClick={() => handleInterestClick(interest)}
            >
              <TravelOption
                content={interest}
                icon_type={interest}
                className={selectedInterests.includes(interest) ? "active" : ""}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step3;
