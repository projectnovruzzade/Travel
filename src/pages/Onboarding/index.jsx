import { useEffect, useState } from "react";
import "./style.scss";
import MagicIcon from "../../assets/icons/magic-icon.svg";
import toast from "react-hot-toast";

import { Link, useSearchParams, useNavigate } from "react-router-dom";

import bgImage3 from "../../assets/images/background-overlay_3.png";
import Button from "../../components/Button";
import LoadingScreen from "../../components/LoadingScreen";
import Chevron from "../../assets/icons/chevron.png";

import PopUpEmail from "../../components/PopUpEmail";

import api from "../../services/api";

import { useOnboarding } from "../../context/OnboardingContext";
import usePageTitle from "../../hooks/usePageTitle";

import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";

const Onboarding = () => {
  usePageTitle("Onboarding");

  const { onboardingData, updateData, resetData } = useOnboarding();
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleBackToHome = () => {
    resetData();
    navigate("/");
  };

  const stepParam = parseInt(searchParams.get("step"));
  const currentStep = stepParam >= 1 && stepParam <= 4 ? stepParam : 1;

  const goToNextStep = () => {
    if (currentStep < 4) {
      setSearchParams({ step: String(currentStep + 1) });
    }
  };

  const steps = [
    { label: "1", component: <Step1 onAdvance={goToNextStep} /> },
    { label: "2", component: <Step2 /> },
    { label: "3", component: <Step3 /> },
    { label: "4", component: <Step4 /> },
  ];

  // Hər step üçün əvvəlki steplərin tamamlanıb-tamamlanmadığını yoxla
  const getMaxAllowedStep = () => {
    if (onboardingData.travelStyle === null) return 1;
    if (onboardingData.travelCompanion === null) return 2;
    if (
      !onboardingData.travelInterest ||
      onboardingData.travelInterest.length === 0
    )
      return 3;
    return 4;
  };

  useEffect(() => {
    // Yalnız onboarding səhifəsindəykən step validasiyası et
    const isOnboardingPage = window.location.pathname.includes("onboarding");
    if (!isOnboardingPage) return;

    if (!searchParams.get("step")) {
      setSearchParams({ step: "1" }, { replace: true });
    } else {
      const maxAllowed = getMaxAllowedStep();
      if (currentStep > maxAllowed) {
        setSearchParams({ step: String(maxAllowed) }, { replace: true });
      }
    }
  }, [currentStep, onboardingData]);

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

  const handleNext = async () => {
    if (!isStepValid()) {
      toast.error(getErrorMessage());
    } else {
      if (currentStep === 1) {  // ! step 1
        try {
          const response = await api.put("/V1/journeys/step1", {
            journeyId: onboardingData.journeyId,
            travelStyle: onboardingData.travelStyle.toUpperCase(),
          });
          console.log("Response:", response);
        } catch (error) {
          console.error("Error creating journey:", error);
        }
      } else if (currentStep == 2) {  // ! step 2
        try {
          const travelWith = onboardingData.travelCompanion.type.toUpperCase();
          const adultsCount = onboardingData.travelCompanion.adults;
          const childrenCount =
            travelWith === "FAMILY"
              ? onboardingData.travelCompanion.children
              : 0;

          const response = await api.put("/V1/journeys/step2", {
            journeyId: onboardingData.journeyId,
            travelWith: travelWith,
            adultsCount: adultsCount,
            childrenCount: childrenCount,
          });
          console.log("Response:", response);
        } catch (error) {
          console.error("Error creating journey:", error);
        }
      } else if (currentStep == 3) { // ! step 3
        try {
          const response = await api.put("/V1/journeys/step3", {
            journeyId: onboardingData.journeyId,
            interests: onboardingData.travelInterest,
          });
          console.log("Response:", response);
        } catch (error) {
          console.error("Error creating journey:", error);
        }
      }

      setSearchParams({ step: String(currentStep + 1) });
    }
  };

  // ! LOADING
  const handlerFinish = async () => {
    try {
      const response = await api.put("/V1/journeys/step4", { // ! step 4 (end)
        journeyId: onboardingData.journeyId,
        budgetType: onboardingData.budgetOption.toUpperCase(),
        tripDays: onboardingData.tripDays,
      });

      const response2 = await api.post("/api/ai/get-plan", {
        adultsCount: onboardingData.travelCompanion.adults,
        budgetType: onboardingData.budgetOption.toUpperCase(),
        childrenCount:
          onboardingData.travelCompanion.type.toUpperCase() === "FAMILY"
            ? onboardingData.travelCompanion.children
            : 0,
        currentStep: currentStep,
        interests: onboardingData.travelInterest,
        travelStyle: onboardingData.travelStyle.toUpperCase(),
        travelWith: onboardingData.travelCompanion.type.toUpperCase(),
        tripDays: onboardingData.tripDays,
      });
      console.log("Journey Response:", response);
      console.log("AI Plan Response:", response2);
    } catch (error) {
      console.error("Error creating journey:", error);
    }
  };

  return (
    <>
      <section id="onboarding">
        <div
          className="onboarding-bg"
          style={{ backgroundImage: `url(${bgImage3})` }}
        />

        <PopUpEmail />

        <div className="onboarding-content">
          <div className="back" onClick={handleBackToHome}>
            <span>
              <img src={Chevron} alt="Chevron Left" />
              Back to Home
            </span>
          </div>
          {loading ? (
            <LoadingScreen />
          ) : (
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
                      onClick={handlerFinish}
                    >
                      <img src={MagicIcon} alt="" />
                      Get Your Plan
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Onboarding;
