import { useMemo } from "react";

const toSafeNumber = (value) => {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue) || numericValue < 0) {
    return null;
  }
  return numericValue;
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

const clampPercent = (value) => {
  const safeValue = toSafeNumber(value);
  if (safeValue === null) {
    return null;
  }
  return Math.max(0, Math.min(100, Math.round(safeValue)));
};

const formatCount = (value) => {
  const safeValue = toSafeNumber(value) ?? 0;
  return Math.round(safeValue).toLocaleString("en-US");
};

const buildServiceItems = (stats) => {
  const airportCount =
    firstAvailableNumber(
      stats?.airportPickupSelectedUsers,
      stats?.airportPickupUsers,
      stats?.airportTransferUsers,
      stats?.optionalServices?.airportPickup?.selectedUsers,
    ) ?? 1475;
  const localGuideCount =
    firstAvailableNumber(
      stats?.localGuideSupportSelectedUsers,
      stats?.localGuideSelectedUsers,
      stats?.localGuideUsers,
      stats?.optionalServices?.localGuide?.selectedUsers,
    ) ?? 1144;

  const airportPercent =
    clampPercent(
      firstAvailableNumber(
        stats?.airportPickupPercentage,
        stats?.airportTransferPercentage,
        stats?.optionalServices?.airportPickup?.percentage,
      ),
    ) ?? 58;
  const localGuidePercent =
    clampPercent(
      firstAvailableNumber(
        stats?.localGuideSupportPercentage,
        stats?.localGuidePercentage,
        stats?.optionalServices?.localGuide?.percentage,
      ),
    ) ?? 45;

  return [
    {
      id: "airport-pickup",
      title: "Airport Pickup Service",
      description: "Hava limanından otele transfer xidməti",
      priceText: "Qiymət: $45",
      count: airportCount,
      percentage: airportPercent,
      colorClass: "green",
      priceClass: "green",
    },
    {
      id: "local-guide",
      title: "Local Tour Guide Support",
      description: "Yerli bələdçi dəstəyi - tarix, mədəniyyət və macəri",
      priceText: "Qiymət: $50-70/day",
      count: localGuideCount,
      percentage: localGuidePercent,
      colorClass: "amber",
      priceClass: "amber",
    },
  ];
};

const OptionalServicesContent = ({ stats }) => {
  const serviceItems = useMemo(() => buildServiceItems(stats), [stats]);

  return (
    <section className="dashboard-services-content">
      <article className="dashboard-services-wrap">
        <h3 className="dashboard-services-title">İxtiyarı Xidmətlər</h3>

        <div className="dashboard-services-grid">
          {serviceItems.map((item) => (
            <article key={item.id} className="dashboard-services-card">
              <div className="dashboard-services-card-top">
                <div>
                  <h4 className="dashboard-services-card-title">{item.title}</h4>
                  <p className="dashboard-services-card-description">{item.description}</p>
                  <p className={`dashboard-services-price ${item.priceClass}`}>{item.priceText}</p>
                </div>
                <span className={`dashboard-services-badge ${item.colorClass}`}>{item.percentage}%</span>
              </div>

              <div className="dashboard-services-row-top">
                <p className="dashboard-services-select-label">Seçib</p>
                <p className="dashboard-services-count">{formatCount(item.count)} nəfər</p>
              </div>

              <div className="dashboard-services-track">
                <span
                  className={`dashboard-services-progress ${item.colorClass}`}
                  style={{ width: `${Math.min(100, item.percentage)}%` }}
                />
              </div>
            </article>
          ))}
        </div>
      </article>
    </section>
  );
};

export default OptionalServicesContent;
