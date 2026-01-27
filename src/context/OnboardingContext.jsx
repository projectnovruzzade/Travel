import { createContext, useContext, useState } from "react";

const OnboardingContext = createContext();

export const OnboardingProvider = ({ children }) => {
  const [onboardingData, setOnboardingData] = useState({
    travelStyle: null,  // step 1
    step2: null,        // step 2
    step3: null,        // step 3
    step4: null,        // step 4
  });

  const updateData = (field, value) => {
    setOnboardingData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <OnboardingContext.Provider value={{ onboardingData, updateData }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => useContext(OnboardingContext);
