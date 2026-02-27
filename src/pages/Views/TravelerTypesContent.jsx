import { useMemo } from "react";

import UsersIcon from "../../assets/icons/icons8-users.svg?react";
import CoupleIcon from "../../assets/icons/icons8-couple.svg?react";
import FriendsIcon from "../../assets/icons/icons8-friends.svg?react";
import HomeIcon from "../../assets/icons/icons8-home.svg?react";
import TrendIcon from "../../assets/icons/icons8-trend.svg?react";

const COMPANION_ORDER = ["Solo", "Couple", "Family", "Friends"];
const STYLE_ORDER = ["Active", "Passive"];

const COMPANION_META = {
  Solo: { colorClass: "purple", iconType: "svg", icon: UsersIcon },
  Couple: { colorClass: "pink", iconType: "svg", icon: CoupleIcon },
  Family: { colorClass: "green", iconType: "svg", icon: HomeIcon },
  Friends: { colorClass: "orange", iconType: "svg", icon: FriendsIcon },
};

const STYLE_META = {
  Active: { colorClass: "teal", iconType: "svg", icon: TrendIcon },
  Passive: { colorClass: "violet", iconType: "svg", icon: UsersIcon },
};

const toNumber = (value) => {
  const numberValue = Number(value);
  if (!Number.isFinite(numberValue) || numberValue < 0) {
    return 0;
  }
  return numberValue;
};

const buildCardData = (source, order, metaMap) => {
  return order
    .map((name) => {
      const found = source.find((item) => item.travelerType === name);
      if (!found) {
        return null;
      }

      return {
        title: name,
        userCount: toNumber(found.userCount),
        percentage: Math.round(toNumber(found.percentage)),
        ...metaMap[name],
      };
    })
    .filter(Boolean);
};

const getStyleFallback = (stats) => {
  const totalUsers = toNumber(stats?.totalUsers);
  const activePercent = Math.min(100, Math.round(toNumber(stats?.activeUsersPercentage)));
  const passivePercent = 100 - activePercent;
  const activeCount = Math.round((totalUsers * activePercent) / 100);
  const passiveCount = Math.max(0, totalUsers - activeCount);

  return [
    {
      travelerType: "Active",
      userCount: activeCount,
      percentage: activePercent,
    },
    {
      travelerType: "Passive",
      userCount: passiveCount,
      percentage: passivePercent,
    },
  ];
};

const TravelerTypeCard = ({ item }) => {
  return (
    <div className="dashboard-traveler-item">
      <div className={`dashboard-traveler-icon-box ${item.colorClass}`}>
        {item.iconType === "image" ? (
          <img src={item.icon} alt={item.title} className="dashboard-traveler-icon-image" />
        ) : (
          <item.icon className="dashboard-traveler-icon-svg" />
        )}
      </div>

      <p className="dashboard-traveler-item-title">{item.title}</p>
      <p className={`dashboard-traveler-item-percent ${item.colorClass}`}>{item.percentage}%</p>
      <p className="dashboard-traveler-item-count">{item.userCount.toLocaleString("en-US")} nefer</p>

      <div className="dashboard-traveler-track">
        <span
          className={`dashboard-traveler-progress ${item.colorClass}`}
          style={{ width: `${Math.min(100, item.percentage)}%` }}
        />
      </div>
    </div>
  );
};

const TravelerTypesContent = ({ travelerTypes, stats }) => {
  const normalizedData = useMemo(
    () => (Array.isArray(travelerTypes) ? travelerTypes : []),
    [travelerTypes],
  );

  const companionCards = useMemo(
    () => buildCardData(normalizedData, COMPANION_ORDER, COMPANION_META),
    [normalizedData],
  );

  const styleSource = useMemo(() => {
    const hasStyleData = normalizedData.some(
      (item) => item?.travelerType === "Active" || item?.travelerType === "Passive",
    );

    if (hasStyleData) {
      return normalizedData;
    }

    return getStyleFallback(stats);
  }, [normalizedData, stats]);

  const styleCards = useMemo(() => buildCardData(styleSource, STYLE_ORDER, STYLE_META), [styleSource]);

  return (
    <section className="dashboard-traveler-content">
      <article className="dashboard-traveler-section">
        <h3 className="dashboard-traveler-section-title">Seyahet Yoldaslari</h3>
        <div className="dashboard-traveler-grid companions">
          {companionCards.map((item) => (
            <TravelerTypeCard key={`companion-${item.title}`} item={item} />
          ))}
        </div>
      </article>

      <article className="dashboard-traveler-section">
        <h3 className="dashboard-traveler-section-title">Seyahet Uslubu</h3>
        <div className="dashboard-traveler-grid styles">
          {styleCards.map((item) => (
            <TravelerTypeCard key={`style-${item.title}`} item={item} />
          ))}
        </div>
      </article>
    </section>
  );
};

export default TravelerTypesContent;
