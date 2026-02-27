import React, { useEffect, useState } from "react";
import "./components.scss";
import LanguageIcon from "../assets/icons/icons8-language.svg?react";

const LANGUAGE_STORAGE_KEY = "dashboard-language";
const THEME_STORAGE_KEY = "dashboard-theme";

import DarkIcon from "../assets/icons/icons8-dark.svg?react";
import LightIcon from "../assets/icons/icons8-light.svg?react";

const DashboardHeader = ({ title = "Umumi Baxis" }) => {
  const [language, setLanguage] = useState(() => {
    if (typeof window === "undefined") {
      return "az";
    }

    return localStorage.getItem(LANGUAGE_STORAGE_KEY) || "az";
  });

  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") {
      return "light";
    }

    return localStorage.getItem(THEME_STORAGE_KEY) || "light";
  });

  useEffect(() => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    document.body.classList.toggle("dashboard-dark", theme === "dark");

    return () => {
      document.body.classList.remove("dashboard-dark");
    };
  }, [theme]);

  const handleLanguageChange = (nextLanguage) => {
    setLanguage(nextLanguage);
  };

  const handleThemeToggle = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <div className="dashboard-header">
      <div className="wrapper">
        <div className="content-title">{title}</div>
        <div className="features">
          <LanguageIcon className="language-icon" width="24" height="24" />
          <div className="language-toggle" role="group" aria-label="Select language">
            <button
              type="button"
              className={language === "az" ? "active" : ""}
              onClick={() => handleLanguageChange("az")}
              aria-pressed={language === "az"}
            >
              AZ
            </button>
            <button
              type="button"
              className={language === "en" ? "active" : ""}
              onClick={() => handleLanguageChange("en")}
              aria-pressed={language === "en"}
            >
              EN
            </button>
          </div>
          <button
            type="button"
            className={`theme-toggle ${theme === "dark" ? "active" : ""}`}
            onClick={handleThemeToggle}
            aria-label="Toggle dark mode"
          >
            {theme !== "dark" ? <DarkIcon width="24" height="24" /> : <LightIcon width="22" height="22" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
