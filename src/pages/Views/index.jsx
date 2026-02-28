import { createElement, useEffect, useMemo, useState } from "react";
import "./style.scss";

import UsersIcon from "../../assets/icons/icons8-users.svg?react";
import PrizeIcon from "../../assets/icons/icons8-prize.svg?react";
import MapIcon from "../../assets/icons/icons8-map.svg?react";
import IncreaseIcon from "../../assets/icons/icons8-increase.svg?react";

import api from "../../services/api";
import UsersInfoContent from "./UsersInfoContent";
import InterestStatsContent from "./InterestStatsContent";
import TravelerTypesContent from "./TravelerTypesContent";
import OnboardingGuideContent from "./OnboardingGuideContent";
import OptionalServicesContent from "./OptionalServicesContent";
import GuideSelectionStatsContent from "./GuideSelectionStatsContent";

const toFiniteNumber = (value) => {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : null;
};

const dashboardCardConfig = [
  {
    id: "users",
    title: "Umumi istifadeciler",
    fallbackValue: "2,543",
    change: "+12% artim",
    icon: UsersIcon,
    variant: "blue",
    key: "totalUsers",
    format: (value) => {
      const numericValue = toFiniteNumber(value);
      return numericValue === null ? null : numericValue.toLocaleString("en-US");
    },
  },
  {
    id: "travel",
    title: "Seyahetler",
    fallbackValue: "1,834",
    change: "+15% artim",
    icon: MapIcon,
    variant: "purple",
    key: "onboardedUsers",
    format: (value) => {
      const numericValue = toFiniteNumber(value);
      return numericValue === null ? null : numericValue.toLocaleString("en-US");
    },
  },
  {
    id: "activity",
    title: "Aktivlik",
    fallbackValue: "89%",
    change: "+5% artim",
    icon: PrizeIcon,
    variant: "pink",
    key: "activeUsersPercentage",
    format: (value) => {
      const numericValue = toFiniteNumber(value);
      return numericValue === null ? null : `${numericValue}%`;
    },
  },
];

const Views = () => {
  const [stats, setStats] = useState(null);
  const [budgets, setBudgets] = useState([]);
  const [durations, setDurations] = useState([]);
  const [interest, setInterest] = useState([]);
  const [travelerTypes, setTravelerTypes] = useState([]);
  const [isDarkTheme, setIsDarkTheme] = useState(() =>
    typeof document !== "undefined"
      ? document.body.classList.contains("dashboard-dark")
      : false,
  );

  useEffect(() => {
    if (typeof document === "undefined") {
      return undefined;
    }

    const syncTheme = () => {
      setIsDarkTheme(document.body.classList.contains("dashboard-dark"));
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchDashboardData = async () => {
      try {
        const [statsResult, budgetsResult, durationsResult, interestResult, travelerTypesResult] =
          await Promise.all([
            api.get("/stats"),
            api.get("/budgets"),
            api.get("/durations"),
            api.get("/interest"),
            api.get("/travelerTypes"),
          ]);

        if (isMounted) {
          setStats(statsResult);
          setBudgets(Array.isArray(budgetsResult) ? budgetsResult : []);
          setDurations(Array.isArray(durationsResult) ? durationsResult : []);
          setInterest(Array.isArray(interestResult) ? interestResult : []);
          setTravelerTypes(Array.isArray(travelerTypesResult) ? travelerTypesResult : []);
        }
      } catch (error) {
        console.error("Melumat alinarken xeta bas verdi:", error);
      }
    };

    fetchDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  const cards = useMemo(() => {
    return dashboardCardConfig.map((card) => {
      const rawValue = stats?.[card.key];
      const hasValue = rawValue !== undefined && rawValue !== null && rawValue !== "";
      const formattedValue = hasValue ? card.format(rawValue) : null;
      const value = formattedValue ?? card.fallbackValue;

      return { ...card, value };
    });
  }, [stats]);

  return (
    <section id="views">
      <div className="section-title">
        <h2 className={`content-title ${isDarkTheme ? "light-theme" : ""}`}>Umumi Baxis</h2>
        <p>Seyahet planlamasi statistikasi</p>
      </div>

      <div className="dashboard-cart-content">
        {cards.map(({ id, title, value, change, icon, variant }) => (
          <article key={id} className={`dashboard-card ${variant}`}>
            <div className="dashboard-card-top">
              <div className="dashboard-card-icon-box">
                {createElement(icon, { className: "dashboard-card-icon" })}
              </div>
              <IncreaseIcon className="dashboard-card-trend-icon" />
            </div>

            <p className="dashboard-card-title">{title}</p>
            <p className="dashboard-card-value">{value}</p>
            <p className="dashboard-card-change">{change}</p>
          </article>
        ))}
      </div>

      <UsersInfoContent budgets={budgets} durations={durations} />
      <InterestStatsContent interests={interest} />
      <TravelerTypesContent travelerTypes={travelerTypes} stats={stats} />
      <OnboardingGuideContent stats={stats} />
      <OptionalServicesContent stats={stats} />
      <GuideSelectionStatsContent stats={stats} />
    </section>
  );
};

export default Views;

