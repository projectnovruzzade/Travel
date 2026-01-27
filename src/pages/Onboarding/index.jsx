import React, { useEffect } from "react";
import "./style.scss";

import { Link, useSearchParams, useNavigate } from "react-router-dom";

import bgImage3 from "../../assets/images/background-overlay_3.png";
import Button from "../../components/Button";
import Chevron from "../../assets/icons/chevron.png";

import { OnboardingProvider } from "../../context/OnboardingContext";
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

  const navigate = useNavigate();  
  const [searchParams, setSearchParams] = useSearchParams();
  const stepParam = parseInt(searchParams.get("step"));
  const currentStep = stepParam >= 1 && stepParam <= 4 ? stepParam : 1;

  useEffect(() => {
    if (!searchParams.get("step")) {
      setSearchParams({ step: "1" }, { replace: true });
    }
  }, []);

  return (
    <OnboardingProvider>
      <section id="onboarding">
        <div
          className="onboarding-bg"
          style={{ backgroundImage: `url(${bgImage3})` }}
        />

        <div className="onboarding-content">
            <div className="back">
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
                  />
                </div>
              )}
              {currentStep < 4 && (
                <div
                className="next-button-content"
                  onClick={() =>
                    setSearchParams({ step: String(currentStep + 1) })
                  }
                >
                  <Button
                    content="Next"
                    bg_color={"yellowMain"}
                    text_color={"#fff"}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </OnboardingProvider>
  );
};

export default Onboarding;
