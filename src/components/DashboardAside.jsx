import React from "react";
import "./components.scss";
import { NavLink, useLocation } from "react-router-dom";

import HomeIcon from "../assets/icons/icons8-home.svg?react";
import StatisticsIcon  from "../assets/icons/icons8-statistics.svg?react";
import UsersIcon  from "../assets/icons/icons8-users.svg?react";
import TrendsIcon  from "../assets/icons/icons8-trend.svg?react";
import SettingsIcon  from "../assets/icons/icons8-setting.svg?react";

const navItems = [
  { to: "/admin", label: "Ümumi Baxış", end: true, icon: <HomeIcon className="icon" /> },
  { to: "/admin/statistics", label: "Statistika", icon: <StatisticsIcon className="icon" /> },
  { to: "/admin/users", label: "İstifadəçilər", icon: <UsersIcon className="icon" /> },
  { to: "/admin/trends", label: "Trendlər", icon: <TrendsIcon className="icon" /> },
  { to: "/admin/settings", label: "Parametrlər", icon: <SettingsIcon className="icon" /> }
];

const DashboardAside = () => {
  const { pathname } = useLocation();

  const isRouteActive = (to, end = false) => {
    if (end) {
      return pathname === to || pathname === `${to}/`;
    }

    return pathname === to || pathname.startsWith(`${to}/`);
  };

  return (
    <div className="dashboard-aside">
      <div className="aside-content">
        <div className="content-title">Travelia</div>
        <div className="content-desc">İdarəetmə Paneli</div>
      </div>
      <div className="aside-nav">
        <nav>
          <ul>
            {navItems.map(({ to, label, end, icon: Icon }) => (
              <li key={to} className={isRouteActive(to, end) ? "active" : ""}>
                <NavLink to={to} end={end}>
                  {Icon}
                  <span className="text">{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default DashboardAside;
