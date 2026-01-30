import { useState, useEffect } from "react";
import TravelOption from "../../../components/TravelOption";
import { useOnboarding } from "../../../context/OnboardingContext";

const Step2 = () => {
  const { onboardingData, updateData } = useOnboarding();
  const companion = onboardingData.travelCompanion;

  const selectedOption = companion?.type || null;
  const adultsCounter = companion?.adults ?? 1;
  const childrenCounter = companion?.children ?? 0;

  const [isActiveCounterAdults, setIsActiveCounterAdults] = useState(false);
  const [isActiveCounterChildren, setIsActiveCounterChildren] = useState(false);

  const setCompanionData = (type, adults, children) => {
    updateData("travelCompanion", { type, adults, children });
  };

  const handlerSoloClick = () => setCompanionData("Solo", 1, 0);
  const handlerCoupleClick = () => setCompanionData("Couple", 2, 0);
  const handlerFriendsClick = () => setCompanionData("Friends", 1, 0);
  const handlerFamilyClick = () => setCompanionData("Family", 2, 0);

  const setAdultsCounter = (fn) => {
    setCompanionData(selectedOption, fn(adultsCounter), childrenCounter);
  };

  const setChildrenCounter = (fn) => {
    setCompanionData(selectedOption, adultsCounter, fn(childrenCounter));
  };

  useEffect(() => {
    if (selectedOption === "Solo" || selectedOption === "Couple") {
      setIsActiveCounterAdults(false);
      setIsActiveCounterChildren(false);
    } else if (selectedOption === "Friends") {
      setIsActiveCounterAdults(true);
      setIsActiveCounterChildren(false);
    } else if (selectedOption === "Family") {
      setIsActiveCounterChildren(true);
      setIsActiveCounterAdults(true);
    }
    console.log(onboardingData)
  }, [selectedOption,onboardingData]);

  return (
    <div className="step-content">
      <div className="step-title">Who are you traveling with ?</div>
      <main className="travel-with-content">
        <div className="travel-option-content">
          <div
            className={`travel-option ${selectedOption === "Solo" ? "active" : ""}`}
            onClick={handlerSoloClick}
          >
            <TravelOption content="Solo" icon_type="Solo" />
          </div>
          <div
            className={`travel-option ${selectedOption === "Couple" ? "active" : ""}`}
            onClick={handlerCoupleClick}
          >
            <TravelOption content="Couple" icon_type="Couple" />
          </div>
          <div
            className={`travel-option ${selectedOption === "Friends" ? "active" : ""}`}
            onClick={handlerFriendsClick}
          >
            <TravelOption content="Friends" icon_type="Friends" />
          </div>
          <div
            className={`travel-option ${selectedOption === "Family" ? "active" : ""}`}
            onClick={handlerFamilyClick}
          >
            <TravelOption content="Family" icon_type="Family" />
          </div>
        </div>

        <div className={`counter-content`}>
          <div
            className={`counter-item ${isActiveCounterAdults ? "active" : ""}`}
          >
            <span className="counter-name">Adults</span>
            <div className="counter-controls">
              <button
                className="counter-btn"
                onClick={() =>
                  setAdultsCounter((prev) => Math.max(1, prev - 1))
                }
              >
                -
              </button>
              <span className="counter-value">{adultsCounter}</span>
              <button
                className="counter-btn"
                onClick={() =>
                  setAdultsCounter((prev) => Math.min(30, prev + 1))
                }
              >
                +
              </button>
            </div>
          </div>
          <div
            className={`counter-item ${isActiveCounterAdults && isActiveCounterChildren ? "active" : ""}`}
          >
            <span className="counter-name">Children</span>
            <div className="counter-controls">
              <button
                className="counter-btn"
                onClick={() =>
                  setChildrenCounter((prev) => Math.max(0, prev - 1))
                }
              >
                -
              </button>
              <span className="counter-value">{childrenCounter}</span>
              <button
                className="counter-btn"
                onClick={() =>
                  setChildrenCounter((prev) => Math.min(30, prev + 1))
                }
              >
                +
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Step2;
