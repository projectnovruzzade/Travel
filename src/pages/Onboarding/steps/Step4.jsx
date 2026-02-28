import { useEffect, useRef } from "react";
import { useOnboarding } from "../../../context/OnboardingContext";

const Step4 = () => {
  const { onboardingData, updateData } = useOnboarding();
  const budgetOption = onboardingData.budgetOption;
  const tripDays = onboardingData.tripDays;
  const tripDaysInputRef = useRef(null);

  const handleBudgetOptionClick = (option) => {
    updateData("budgetOption", option);
    setTimeout(() => {
      tripDaysInputRef.current?.focus();
    }, 0);
  };

  useEffect(() => {
    console.log(onboardingData);
  }, [onboardingData]);
  return (
    <div className="step-content">
      <div className="step-title">Define Your Trip Details:</div>
      <div className="travel-budget-content">
        <div className="budget-option-content">

          <div className={"option " + (budgetOption === "Basic" ? "active" : "")} onClick={() => handleBudgetOptionClick("Basic")}>
            <div className="option-title">Basic</div>
            <div className="option-price">100-200 $</div>
            <div className="option-description">(Per person / day)</div>
          </div>

          <div className={"option " + (budgetOption === "Standard" ? "active" : "")} onClick={() => handleBudgetOptionClick("Standard")}>
            <div className="option-title">Standard</div>
            <div className="option-price">200-400 $</div>
            <div className="option-description">(Per person / day)</div>
          </div>

          <div className={"option " + (budgetOption === "Luxury" ? "active" : "")} onClick={() => handleBudgetOptionClick("Luxury")}>
            <div className="option-title">Luxury</div>
            <div className="option-price">Over 400 $</div>
            <div className="option-description">(Per person / day)</div>
          </div>

        </div>
        <div className="input-content">
          <input
            ref={tripDaysInputRef}
            type="number"
            placeholder="How many days will you stay ?"
            value={tripDays || ""}
            onChange={(e) => updateData("tripDays", e.target.value ? Number(e.target.value) : null)}
          />
          <span className="icon"></span>
        </div>
      </div>
    </div>
  );
};

export default Step4;
