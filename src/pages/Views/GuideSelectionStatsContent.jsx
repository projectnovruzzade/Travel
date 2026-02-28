import { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import StarIcon from "../../assets/icons/icons8-star.svg?react";
import LocationIcon from "../../assets/icons/icons8-location.svg?react";
import IncreaseIcon from "../../assets/icons/icons8-increase.svg?react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FALLBACK_GUIDES = [
  {
    id: "rashad",
    name: "Rashad Aliyev",
    shortName: "Rashad",
    initials: "RA",
    price: "$70/day",
    rating: 5.0,
    locationCount: 450,
    reservations: 285,
    selectionPercent: 25,
    languages: ["English", "Arabic", "Persian"],
    colorClass: "green",
  },
  {
    id: "tural",
    name: "Tural Ibrahimov",
    shortName: "Tural",
    initials: "TI",
    price: "$65/day",
    rating: 4.9,
    locationCount: 380,
    reservations: 228,
    selectionPercent: 20,
    languages: ["English", "Russian", "German"],
    colorClass: "blue",
  },
  {
    id: "elvin",
    name: "Elvin Mammadov",
    shortName: "Elvin",
    initials: "EM",
    price: "$60/day",
    rating: 4.9,
    locationCount: 400,
    reservations: 205,
    selectionPercent: 18,
    languages: ["English", "Russian", "Turkish"],
    colorClass: "purple",
  },
  {
    id: "nigar",
    name: "Nigar Mammadova",
    shortName: "Nigar",
    initials: "NM",
    price: "$58/day",
    rating: 4.6,
    locationCount: 185,
    reservations: 182,
    selectionPercent: 16,
    languages: ["English", "French", "Turkish"],
    colorClass: "pink",
  },
  {
    id: "aysel",
    name: "Aysel Hasanova",
    shortName: "Aysel",
    initials: "AH",
    price: "$55/day",
    rating: 4.8,
    locationCount: 320,
    reservations: 137,
    selectionPercent: 12,
    languages: ["English", "German", "French"],
    colorClass: "orange",
  },
  {
    id: "leyla",
    name: "Leyla Aliyeva",
    shortName: "Leyla",
    initials: "LA",
    price: "$50/day",
    rating: 4.7,
    locationCount: 280,
    reservations: 103,
    selectionPercent: 9,
    languages: ["English", "Italian", "Spanish"],
    colorClass: "teal",
  },
];

const CHART_MAX = 300;
const CHART_TICKS = [0, 75, 150, 225, 300];

const COLOR_CLASS_ORDER = ["green", "blue", "purple", "pink", "orange", "teal"];

const COLOR_MAP = {
  green: "#18b886",
  blue: "#3f7be6",
  purple: "#7d5ce8",
  pink: "#e34b95",
  orange: "#f59f00",
  teal: "#19aecd",
};

const toSafeNumber = (value, fallback = 0) => {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue) || numericValue < 0) {
    return fallback;
  }
  return numericValue;
};

const clampPercent = (value) => Math.max(0, Math.min(100, Math.round(toSafeNumber(value, 0))));

const formatCompactNumber = (value) => Math.round(toSafeNumber(value, 0)).toLocaleString("en-US");

const getInitials = (name) => {
  if (!name || typeof name !== "string") {
    return "GD";
  }
  const words = name.trim().split(/\s+/).filter(Boolean);
  return words
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
};

const getSafeGuideSource = (stats) => {
  if (Array.isArray(stats?.guideSelectionStats) && stats.guideSelectionStats.length > 0) {
    return stats.guideSelectionStats;
  }
  if (Array.isArray(stats?.guideSelections) && stats.guideSelections.length > 0) {
    return stats.guideSelections;
  }
  if (Array.isArray(stats?.guides) && stats.guides.length > 0) {
    return stats.guides;
  }
  return null;
};

const normalizeGuides = (stats) => {
  const source = getSafeGuideSource(stats);
  if (!source) {
    return FALLBACK_GUIDES;
  }

  return source.slice(0, 6).map((guide, index) => {
    const fallback = FALLBACK_GUIDES[index] ?? FALLBACK_GUIDES[FALLBACK_GUIDES.length - 1];
    const name = guide?.name ?? guide?.fullName ?? fallback.name;

    return {
      id: guide?.id ?? fallback.id,
      name,
      shortName: guide?.shortName ?? String(name).split(" ")[0] ?? fallback.shortName,
      initials: guide?.initials ?? getInitials(name) ?? fallback.initials,
      price: guide?.price ?? fallback.price,
      rating: toSafeNumber(guide?.rating ?? fallback.rating, fallback.rating),
      locationCount: toSafeNumber(
        guide?.locationCount ?? guide?.locations ?? guide?.tours ?? fallback.locationCount,
        fallback.locationCount,
      ),
      reservations: toSafeNumber(
        guide?.reservations ?? guide?.reservationCount ?? guide?.selectedCount ?? fallback.reservations,
        fallback.reservations,
      ),
      selectionPercent: clampPercent(
        guide?.selectionPercent ?? guide?.percentage ?? guide?.selectedPercent ?? fallback.selectionPercent,
      ),
      languages: Array.isArray(guide?.languages) && guide.languages.length > 0
        ? guide.languages
        : fallback.languages,
      colorClass: COLOR_CLASS_ORDER[index % COLOR_CLASS_ORDER.length],
    };
  });
};

const GuideSelectionStatsContent = ({ stats }) => {
  const guides = useMemo(() => normalizeGuides(stats), [stats]);

  const chartData = useMemo(() => ({
    labels: guides.map((g) => g.shortName),
    datasets: [
      {
        data: guides.map((g) => g.reservations),
        backgroundColor: guides.map((g) => COLOR_MAP[g.colorClass] ?? "#18b886"),
        borderRadius: 6,
        borderSkipped: false,
        barPercentage: 0.55,
        categoryPercentage: 0.7,
      },
    ],
  }), [guides]);

  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.parsed.y} rezervasiya`,
        },
        backgroundColor: "#fff",
        titleColor: "#1a1d2e",
        bodyColor: "#1a1d2e",
        borderColor: "rgba(0,0,0,0.08)",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#8a94ad",
          font: { size: 13, family: "inherit" },
        },
        border: { display: false },
      },
      y: {
        min: 0,
        max: CHART_MAX,
        ticks: {
          stepSize: 75,
          color: "#8a94ad",
          font: { size: 12, family: "inherit" },
        },
        grid: {
          color: "rgba(0,0,0,0.06)",
          borderDash: [4, 4],
        },
        border: { display: false },
        title: {
          display: true,
          text: "Rezervasiyalar",
          color: "#8a94ad",
          font: { size: 12, family: "inherit" },
        },
      },
    },
  }), []);

  return (
    <section className="dashboard-guide-content">
      <article className="dashboard-guide-section">
        <div className="dashboard-guide-header">
          <h3>Bələdçi Seçimi Statistikası</h3>
          <p>Bələdçilərin rezervasiya göstəriciləri və populyarlıq səviyyəsi</p>
        </div>

        <div className="dashboard-guide-chart" style={{ position: "relative", height: "260px" }}>
          <Bar data={chartData} options={chartOptions} />
        </div>

        <div className="dashboard-guide-list">
          {guides.map((guide) => (
            <article key={guide.id} className="dashboard-guide-item">
              <div className="dashboard-guide-item-top">
                <div className={`dashboard-guide-avatar ${guide.colorClass}`}>{guide.initials}</div>

                <div className="dashboard-guide-item-main">
                  <div className="dashboard-guide-name-row">
                    <h4>{guide.name}</h4>
                    <span className="dashboard-guide-rating">
                      <StarIcon className="dashboard-guide-rating-icon" />
                      {guide.rating.toFixed(1)}
                    </span>
                  </div>

                  <div className="dashboard-guide-meta-row">
                    <span className="dashboard-guide-meta price">{guide.price}</span>
                    <span className="dashboard-guide-meta">
                      <LocationIcon className="dashboard-guide-meta-icon location" />
                      {formatCompactNumber(guide.locationCount)}
                    </span>
                    <span className="dashboard-guide-meta">
                      <IncreaseIcon className="dashboard-guide-meta-icon increase" />
                      {formatCompactNumber(guide.reservations)}
                    </span>
                  </div>
                </div>

                <div className="dashboard-guide-selection-info">
                  <p className={`dashboard-guide-selection-percent ${guide.colorClass}`}>
                    {guide.selectionPercent}%
                  </p>
                  <span>Seçim</span>
                </div>
              </div>

              <div className="dashboard-guide-selection-track">
                <span
                  className={`dashboard-guide-selection-progress ${guide.colorClass}`}
                  style={{ width: `${Math.min(100, guide.selectionPercent)}%` }}
                />
              </div>

              <div className="dashboard-guide-languages">
                <span className="dashboard-guide-languages-label">Diller:</span>
                {guide.languages.map((language) => (
                  <span key={`${guide.id}-${language}`} className="dashboard-guide-language-tag">
                    {language}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </article>
    </section>
  );
};

export default GuideSelectionStatsContent;
