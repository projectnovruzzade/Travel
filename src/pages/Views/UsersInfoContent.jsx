import { useMemo } from "react";

import WorkIcon from "../../assets/icons/icons8-work.svg?react";
import GlobeIcon from "../../assets/icons/icons8-globe.svg?react";

const COLORS = ["teal", "purple", "pink", "orange"];

const BUDGET_LABELS = {
  Basic: "Basic (100-200$)",
  Standard: "Standard (200-400$)",
  Luxury: "Luxury (400$+)",
};

const DURATION_LABELS = {
  "1-3 days": "1-3 gün",
  "4-7 days": "4-7 gün",
  "8-14 days": "8-14 gün",
  "14+ days": "14+ gün",
};

const toCount = (value) => {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue) || numericValue < 0) {
    return 0;
  }
  return numericValue;
};

const prepareItems = (items, labelMap) => {
  if (!Array.isArray(items) || items.length === 0) {
    return [];
  }

  const safeItems = items.map((item) => ({
    label: item?.label ?? "",
    count: toCount(item?.count),
  }));

  const total = safeItems.reduce((sum, item) => sum + item.count, 0);

  return safeItems.map((item, index) => ({
    ...item,
    displayLabel: labelMap[item.label] ?? item.label,
    percentage: total > 0 ? Math.round((item.count / total) * 100) : 0,
    colorClass: COLORS[index % COLORS.length],
  }));
};

const UsersInfoCard = ({ title, description, Icon, items }) => {
  return (
    <article className="dashboard-users-info-card">
      <div className="dashboard-users-info-header">
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <Icon className="dashboard-users-info-icon" />
      </div>

      <div className="dashboard-users-info-list">
        {items.map((item) => (
          <div key={`${title}-${item.label}`} className="dashboard-users-info-row">
            <div className="dashboard-users-info-row-top">
              <span className={`dashboard-users-info-percentage ${item.colorClass}`}>
                {item.percentage}%
              </span>
              <p className="dashboard-users-info-label">{item.displayLabel}</p>
              <p className="dashboard-users-info-count">
                {item.count.toLocaleString("en-US")} <span>istifadəçi</span>
              </p>
            </div>

            <div className="dashboard-users-info-track">
              <span
                className={`dashboard-users-info-progress ${item.colorClass}`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};

const UsersInfoContent = ({ budgets, durations }) => {
  const budgetItems = useMemo(() => prepareItems(budgets, BUDGET_LABELS), [budgets]);
  const durationItems = useMemo(() => prepareItems(durations, DURATION_LABELS), [durations]);

  return (
    <div className="dashboard-users-info-content">
      <UsersInfoCard
        title="Büdcə Bölgüsü"
        description="İstifadəçinin büdcə seçimi"
        Icon={WorkIcon}
        items={budgetItems}
      />
      <UsersInfoCard
        title="Səyahət Müddəti"
        description="Səyahət müddəti seçimi"
        Icon={GlobeIcon}
        items={durationItems}
      />
    </div>
  );
};

export default UsersInfoContent;
