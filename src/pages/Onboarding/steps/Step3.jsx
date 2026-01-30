import { useEffect, useState } from "react";
import TravelOption from "../../../components/TravelOption";
import { useOnboarding } from "../../../context/OnboardingContext";

const interests = ["Nature", "City", "Adventure", "History", "Gastronomy", "Culture"];

const Step3 = () => {
  const { updateData, onboardingData } = useOnboarding();
  const [selectedInterests, setSelectedInterests] = useState(onboardingData.travelInterest || []);

  const handleInterestClick = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest]
    );
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
              className="option"
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
