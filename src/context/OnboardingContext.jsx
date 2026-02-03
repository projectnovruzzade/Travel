import { createContext, useContext, useState } from "react";

const OnboardingContext = createContext();

export const OnboardingProvider = ({ children }) => {
  const [onboardingData, setOnboardingData] = useState({
    travelStyle: null,       // step 1
    travelCompanion: null,   // step 2: example { type, adults, children }
    travelInterest: [],      // step 3
    budgetOption: null,      // step 4: "Basic" | "Standard" | "Luxury"
    tripDays: null,          // step 4: number of days
  });

  const updateData = (field, value) => {
    setOnboardingData((prev) => ({ ...prev, [field]: value }));
  };

  const resetData = () => {
    setOnboardingData({
      travelStyle: null,
      travelCompanion: null,
      travelInterest: [],
      budgetOption: null,
      tripDays: null,
    });
  };

  return (
    <OnboardingContext.Provider value={{ onboardingData, updateData, resetData }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => useContext(OnboardingContext);
