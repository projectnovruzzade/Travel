import { useEffect } from "react";
import { useOnboarding } from "../../../context/OnboardingContext";

const Step4 = () => {
  const { onboardingData, updateData } = useOnboarding();
  const budgetOption = onboardingData.budgetOption;
  const tripDays = onboardingData.tripDays;

  useEffect(() => {
    console.log(onboardingData);
  }, [onboardingData]);
  return (
    <div className="step-content">
      <div className="step-title">Define Your Trip Details:</div>
      <div className="travel-budget-content">
        <div className="budget-option-content">

          <div className={"option " + (budgetOption === "Basic" ? "active" : "")} onClick={() => updateData("budgetOption", "Basic")}>
            <div className="option-title">Basic</div>
            <div className="option-price">100-200 $</div>
            <div className="option-description">(Per person / day)</div>
          </div>

          <div className={"option " + (budgetOption === "Standard" ? "active" : "")} onClick={() => updateData("budgetOption", "Standard")}>
            <div className="option-title">Standard</div>
            <div className="option-price">200-400 $</div>
            <div className="option-description">(Per person / day)</div>
          </div>

          <div className={"option " + (budgetOption === "Luxury" ? "active" : "")} onClick={() => updateData("budgetOption", "Luxury")}>
            <div className="option-title">Luxury</div>
            <div className="option-price">Over 400 $</div>
            <div className="option-description">(Per person / day)</div>
          </div>

        </div>
        <div className="input-content">
          <input
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
