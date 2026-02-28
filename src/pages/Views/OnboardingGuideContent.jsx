import { useMemo } from "react";

const toSafeNumber = (value) => {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue) || numericValue < 0) {
    return null;
  }
  return numericValue;
};

const clampPercent = (value) => {
  const safeValue = toSafeNumber(value);
  if (safeValue === null) {
    return null;
  }
  return Math.max(0, Math.min(100, Math.round(safeValue)));
};

const firstAvailableNumber = (...values) => {
  for (const value of values) {
    const safeValue = toSafeNumber(value);
    if (safeValue !== null) {
      return safeValue;
    }
  }
  return null;
};

const formatCount = (value) => {
  const safeValue = toSafeNumber(value) ?? 0;
  return Math.round(safeValue).toLocaleString("en-US");
};

const buildOnboardingRows = (stats) => {
  const completedCount =
    firstAvailableNumber(
      stats?.completedOnboardingUsers,
      stats?.onboardingCompletedUsers,
      stats?.onboardedUsers,
    ) ?? 1834;

  const explicitInProgressCount = firstAvailableNumber(
    stats?.inProgressOnboardingUsers,
    stats?.onboardingInProgressUsers,
  );

  const totalUsers = firstAvailableNumber(stats?.totalUsers);
  const inProgressCount =
    explicitInProgressCount ??
    (totalUsers !== null && totalUsers >= completedCount ? totalUsers - completedCount : 709);

  const completedPercentFromStats = clampPercent(
    firstAvailableNumber(stats?.completedOnboardingPercentage, stats?.onboardingCompletedPercentage),
  );
  const inProgressPercentFromStats = clampPercent(
    firstAvailableNumber(stats?.inProgressOnboardingPercentage, stats?.onboardingInProgressPercentage),
  );

  let completedPercentage = completedPercentFromStats;
  let inProgressPercentage = inProgressPercentFromStats;

  if (completedPercentage === null || inProgressPercentage === null) {
    const sum = completedCount + inProgressCount;
    if (sum > 0) {
      completedPercentage = Math.round((completedCount / sum) * 100);
      inProgressPercentage = 100 - completedPercentage;
    } else {
      completedPercentage = 72;
      inProgressPercentage = 28;
    }
  }

  return [
    {
      key: "completed",
      label: "Completed",
      count: completedCount,
      percentage: completedPercentage,
      colorClass: "green",
    },
    {
      key: "in-progress",
      label: "In Progress",
      count: inProgressCount,
      percentage: inProgressPercentage,
      colorClass: "amber",
    },
  ];
};

const buildGuideRows = (stats) => {
  const withGuideCount =
    firstAvailableNumber(stats?.withGuideUsers, stats?.guideWithUsers, stats?.guidedUsers) ?? 1399;
  const withoutGuideCount =
    firstAvailableNumber(stats?.withoutGuideUsers, stats?.guideWithoutUsers, stats?.unguidedUsers) ??
    1144;

  const withGuidePercentFromStats = clampPercent(
    firstAvailableNumber(stats?.withGuidePercentage, stats?.guideWithPercentage),
  );
  const withoutGuidePercentFromStats = clampPercent(
    firstAvailableNumber(stats?.withoutGuidePercentage, stats?.guideWithoutPercentage),
  );

  let withGuidePercentage = withGuidePercentFromStats;
  let withoutGuidePercentage = withoutGuidePercentFromStats;

  if (withGuidePercentage === null || withoutGuidePercentage === null) {
    const sum = withGuideCount + withoutGuideCount;
    if (sum > 0) {
      withGuidePercentage = Math.round((withGuideCount / sum) * 100);
      withoutGuidePercentage = 100 - withGuidePercentage;
    } else {
      withGuidePercentage = 55;
      withoutGuidePercentage = 45;
    }
  }

  return [
    {
      key: "with-guide",
      label: "Beledci ile",
      count: withGuideCount,
      percentage: withGuidePercentage,
      colorClass: "green",
    },
    {
      key: "without-guide",
      label: "Beledcisiz",
      count: withoutGuideCount,
      percentage: withoutGuidePercentage,
      colorClass: "pink",
    },
  ];
};

const OnboardingGuideContent = ({ stats }) => {
  const onboardingRows = useMemo(() => buildOnboardingRows(stats), [stats]);
  const guideRows = useMemo(() => buildGuideRows(stats), [stats]);

  return (
    <section className="dashboard-status-content">
      <article className="dashboard-status-card">
        <h3 className="dashboard-status-title">Onboarding Status</h3>

        <div className="dashboard-status-list">
          {onboardingRows.map((row) => (
            <div key={row.key} className="dashboard-status-row">
              <div className="dashboard-status-row-top onboarding">
                <p className="dashboard-status-label">{row.label}</p>
                <p className="dashboard-status-value">{formatCount(row.count)}</p>
                <span className={`dashboard-status-badge ${row.colorClass}`}>{row.percentage}%</span>
              </div>

              <div className="dashboard-status-track">
                <span
                  className={`dashboard-status-progress ${row.colorClass}`}
                  style={{ width: `${Math.min(100, row.percentage)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="dashboard-status-card">
        <h3 className="dashboard-status-title">Bələdçi Seçimi</h3>

        <div className="dashboard-status-list">
          {guideRows.map((row) => (
            <div key={row.key} className="dashboard-status-row">
              <div className="dashboard-status-row-top guide">
                <span className={`dashboard-status-badge ${row.colorClass}`}>{row.percentage}%</span>
                <p className="dashboard-status-label">{row.label}</p>
                <p className="dashboard-status-count">
                  {formatCount(row.count)} <span>İstifadəçi</span>
                </p>
              </div>

              <div className="dashboard-status-track">
                <span
                  className={`dashboard-status-progress ${row.colorClass}`}
                  style={{ width: `${Math.min(100, row.percentage)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
};

export default OnboardingGuideContent;
