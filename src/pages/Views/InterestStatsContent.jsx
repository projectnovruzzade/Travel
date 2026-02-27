import { useMemo } from "react";

const ROW_COLORS = ["green", "blue", "purple", "pink", "orange", "red"];

const INTEREST_LABELS = {
  Nature: "Təbiət",
  City: "Şəhər",
  History: "Tarix",
  Gastronomy: "Qastronomiya",
  Culture: "Mədəniyyət",
  Adventure: "Macera",
};

const toSafeNumber = (value) => {
  const numberValue = Number(value);
  if (!Number.isFinite(numberValue) || numberValue < 0) {
    return 0;
  }
  return numberValue;
};

const normalizeInterests = (items) => {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.map((item, index) => ({
    key: item?.name ?? `interest-${index}`,
    label: INTEREST_LABELS[item?.name] ?? item?.name ?? "Unknown",
    userCount: toSafeNumber(item?.userCount),
    percentage: Math.round(toSafeNumber(item?.percentage)),
    colorClass: ROW_COLORS[index % ROW_COLORS.length],
  }));
};

const InterestStatsContent = ({ interests }) => {
  const rows = useMemo(() => normalizeInterests(interests), [interests]);

  return (
    <section className="dashboard-interest-content">
      <article className="dashboard-interest-card">
        <div className="dashboard-interest-header">
          <h3>Maraq Saheleri Statistikasi</h3>
          <p>Istifadecilerin secdiyi maraq sahelerinin faiz payi</p>
        </div>

        <div className="dashboard-interest-list">
          {rows.map((item) => (
            <div key={item.key} className="dashboard-interest-row">
              <div className="dashboard-interest-row-top">
                <div className="dashboard-interest-name-wrap">
                  <span className={`dashboard-interest-dot ${item.colorClass}`} />
                  <p className="dashboard-interest-name">{item.label}</p>
                </div>

                <div className="dashboard-interest-meta">
                  <span className="dashboard-interest-count">
                    {item.userCount.toLocaleString("en-US")} nəfər
                  </span>
                  <span className={`dashboard-interest-percent ${item.colorClass}`}>
                    {item.percentage}%
                  </span>
                </div>
              </div>

              <div className="dashboard-interest-track">
                <span
                  className={`dashboard-interest-progress ${item.colorClass}`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
};

export default InterestStatsContent;
