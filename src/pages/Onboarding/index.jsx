import { useEffect } from "react";
import "./style.scss";
import MagicIcon from "../../assets/icons/magic-icon.svg";
import toast from "react-hot-toast";

import { Link, useSearchParams } from "react-router-dom";

import bgImage3 from "../../assets/images/background-overlay_3.png";
import Button from "../../components/Button";
import Chevron from "../../assets/icons/chevron.png";

import { useOnboarding } from "../../context/OnboardingContext";
import usePageTitle from "../../hooks/usePageTitle";

import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";

const steps = [
  { label: "1", component: <Step1 /> },
  { label: "2", component: <Step2 /> },
  { label: "3", component: <Step3 /> },
  { label: "4", component: <Step4 /> },
];

const Onboarding = () => {
  usePageTitle("Onboarding");

  const { onboardingData, updateData } = useOnboarding();
  const [searchParams, setSearchParams] = useSearchParams();
  const stepParam = parseInt(searchParams.get("step"));
  const currentStep = stepParam >= 1 && stepParam <= 4 ? stepParam : 1;

  useEffect(() => {
    if (!searchParams.get("step")) {
      setSearchParams({ step: "1" }, { replace: true });
    }
  }, []);

  // Hər step üçün validasiya
  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return onboardingData.travelStyle !== null;
      case 2:
        return onboardingData.travelCompanion !== null;
      case 3:
        return (
          onboardingData.travelInterest &&
          onboardingData.travelInterest.length >= 1 &&
          onboardingData.travelInterest.length <= 3
        );
      case 4:
        return (
          onboardingData.budgetOption !== null &&
          onboardingData.tripDays !== null &&
          onboardingData.tripDays > 0
        );
      default:
        return true;
    }
  };

  // Hər step üçün xəta mesajları
  const getErrorMessage = () => {
    switch (currentStep) {
      case 1:
        return "Zəhmət olmasa səyahət stilinizi seçin!";
      case 2:
        return "Zəhmət olmasa seçim edin!";
      case 3:
        return "Zəhmət olmasa ən çox 3 maraq sahəsi seçin!";
      default:
        return "";
    }
  };

  const handleNext = () => {
    if (!isStepValid()) {
      toast.error(getErrorMessage());
    } else {
      setSearchParams({ step: String(currentStep + 1) });
    }
  };

  return (
    <>
      <section id="onboarding">
        <div
          className="onboarding-bg"
          style={{ backgroundImage: `url(${bgImage3})` }}
        />

        <div className="onboarding-content">
          <div className="back" onClick={() => updateData("travelStyle", null)}>
            <Link to="/">
              <img src={Chevron} alt="Chevron Left" />
              Back to Home
            </Link>
          </div>
          <div className="onboarding-container">
            <div className="step-progress">
              <div className="indicator-content">
                {steps.map((step, index) => (
                  <div className="step-indicator" key={index}>
                    <div
                      className={`step-bar ${index < currentStep ? "active" : ""}`}
                    />
                    <span
                      className={`step-label ${index < currentStep ? "active" : ""}`}
                    ></span>
                  </div>
                ))}
              </div>

              <span className="counter">
                step {currentStep} of {steps.length}
              </span>
            </div>

            {/* Current Step Content */}
            {steps[currentStep - 1].component}

            {/* Navigation Buttons */}
            <div className="step-navigation">
              {currentStep > 1 && (
                <div
                  className="prev-button-content"
                  onClick={() =>
                    setSearchParams({ step: String(currentStep - 1) })
                  }
                >
                  <Button
                    content="Back"
                    bg_color={"secondaryBtn"}
                    text_color={"#fff"}
                    is_active={true}
                  />
                </div>
              )}
              {currentStep < 4 ? (
                <div className="next-button-content" onClick={handleNext}>
                  <button
                    style={{
                      backgroundColor: isStepValid() ? "#d79a4d" : "#a0a0a0",
                      color: "#fff",
                      border: "none",
                      outline: "none",
                      padding: "10px 3rem",
                      borderRadius: "16px",
                      cursor: isStepValid() ? "pointer" : "not-allowed",
                      opacity: isStepValid() ? 1 : 0.6,
                    }}
                  >
                    Next
                  </button>
                </div>
              ) : (
                <div className="next-button-content finish-button">
                  <button
                    style={{
                      backgroundColor: isStepValid() ? "#d79a4d" : "#a0a0a0",
                      color: "#fff",
                      border: "none",
                      outline: "none",
                      padding: "10px 3rem",
                      borderRadius: "16px",
                      cursor: isStepValid() ? "pointer" : "not-allowed",
                      opacity: isStepValid() ? 1 : 0.6,
                    }}
                    disabled={!isStepValid()}
                    onClick={() => console.log("Onboarding Data:", onboardingData)}
                  >
                    <img src={MagicIcon} alt="" />
                    Get Your Plan
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Onboarding;
