import React, { useState, useEffect, useRef } from 'react';
import { RxSlider } from "react-icons/rx";
import './style.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { FiTrendingUp, FiClock } from 'react-icons/fi';
import { LuTrendingUp } from "react-icons/lu";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Trends = () => {
  const chartRef = useRef(null);
  const weeklyChartRef = useRef(null);
  const seasonalChartRef = useRef(null);
  const [visibleDatasets, setVisibleDatasets] = useState({ 0: true, 1: true });
  const [visibleWeeklyDatasets, setVisibleWeeklyDatasets] = useState({ 0: true, 1: true });
  const [visibleSeasonalDataset, setVisibleSeasonalDataset] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(document.body.classList.contains('dashboard-dark'));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.body.classList.contains('dashboard-dark'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const toggleDataset = (index) => {
    const chart = chartRef.current;
    if (!chart) return;

    const isVisible = chart.isDatasetVisible(index);
    if (isVisible) {
      chart.hide(index);
      setVisibleDatasets(prev => ({ ...prev, [index]: false }));
    } else {
      chart.show(index);
      setVisibleDatasets(prev => ({ ...prev, [index]: true }));
    }
  };

  const toggleWeeklyDataset = (index) => {
    const chart = weeklyChartRef.current;
    if (!chart) return;

    const isVisible = chart.isDatasetVisible(index);
    if (isVisible) {
      chart.hide(index);
      setVisibleWeeklyDatasets(prev => ({ ...prev, [index]: false }));
    } else {
      chart.show(index);
      setVisibleWeeklyDatasets(prev => ({ ...prev, [index]: true }));
    }
  };

  const toggleSeasonalDataset = () => {
    const chart = seasonalChartRef.current;
    if (!chart) return;

    const isVisible = chart.isDatasetVisible(0);
    if (isVisible) {
      chart.hide(0);
      setVisibleSeasonalDataset(false);
    } else {
      chart.show(0);
      setVisibleSeasonalDataset(true);
    }
  };

  const chartTextColor = isDarkMode ? '#e2e8f0' : '#64748b';
  const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.08)' : '#f1f5f9';

  // --- 30 Day Activity Data ---
  const activityData = {
    labels: [
      'M01 13', '', '', '',
      'M01 18', '', '', '',
      'M01 23', '', '', '',
      'M01 28', '', '', '',
      'M02 2', '', '', '',
      'M02 7', '', ''
    ],
    datasets: [
      {
        label: 'Qeydiyyatlar',
        data: [
          50, 63, 48, 70, 43,
          75, 50, 52, 48, 55,
          43, 75, 73, 38, 50,
          78, 58, 63, 56, 77,
          50, 65, 55, 75, 68,
          75, 75
        ],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        fill: true,
        tension: 0.5,
        pointRadius: 0,
        borderWidth: 3,
      },
      {
        label: 'Tamamlanmalar',
        data: [
          30, 57, 22, 52, 50,
          58, 24, 53, 58, 28,
          45, 52, 38, 43, 37,
          55, 55, 22, 58, 22,
          25, 42, 40, 20, 55,
          38, 20
        ],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 3,
      },
    ],
  };

  // --- Weekly Comparison Data ---
  const weeklyData = {
    labels: ['Həftə 1', 'Həftə 2', 'Həftə 3', 'Həftə 4'],
    datasets: [
      {
        label: 'Əvvəlki ay',
        data: [240, 260, 290, 330],
        backgroundColor: '#94a3b8',
        borderRadius: 6,
      },
      {
        label: 'Cari ay',
        data: [280, 310, 350, 410],
        backgroundColor: '#f59e0b',
        borderRadius: 6,
      },
    ],
  };

  // --- Hourly Distribution Data ---
  const hourlyData = {
    labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '', '21:00'],
    datasets: [
      {
        label: 'Aktivlik',
        data: [45, 30, 55, 205, 260, 312, 360, 280],
        borderColor: '#a855f7',
        backgroundColor: 'rgba(168, 85, 247, 0.4)',
        fill: true,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  // --- Seasonal Trends Data ---
  const seasonalData = {
    labels: ['2025 İyul', 'Avq', 'Sen', 'Okt', 'Noy', 'Dek', '2026 Yan', 'Fev', 'Mar', 'Apr', 'May', 'İyn'],
    datasets: [
      {
        label: 'İstifadəçi sayı',
        data: [285, 315, 395, 425, 350, 300, 185, 215, 245, 300, 350, 450],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        pointBackgroundColor: 'white',
        pointBorderColor: '#3b82f6',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0.4,
        borderWidth: 3,
        fill: false,
      },
    ],
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        grid: {
          color: gridColor,
          drawBorder: false,
        },
        ticks: { color: chartTextColor },
      },
      x: {
        grid: { display: false },
        ticks: { color: chartTextColor },
      },
    },
  };

  const activityOptions = {
    ...commonOptions,
    scales: {
      ...commonOptions.scales,
      y: {
        min: 0,
        max: 80,
        ticks: {
          stepSize: 20,
          color: chartTextColor,
        },
        grid: {
          color: gridColor,
          drawBorder: false,
          borderDash: [5, 5],
        },
        title: {
          display: true,
          text: 'users.label',
          color: chartTextColor,
          font: { size: 12 }
        }
      },
      x: {
        ...commonOptions.scales.x,
        grid: {
          display: true,
          color: gridColor,
          borderDash: [5, 5],
        }
      }
    },
  };

  const weeklyOptions = {
    ...commonOptions,
    scales: {
      ...commonOptions.scales,
      y: {
        min: 0,
        max: 400,
        ticks: {
          stepSize: 100,
          color: chartTextColor,
        },
        grid: {
          color: gridColor,
          drawBorder: false,
          borderDash: [5, 5],
        },
        title: {
          display: true,
          text: 'İstifadəçi sayı',
          color: chartTextColor,
          font: { size: 12 }
        }
      },
      x: {
        ...commonOptions.scales.x,
        grid: {
          display: true,
          color: gridColor,
          borderDash: [5, 5],
        }
      }
    },
  };

  const hourlyOptions = {
    ...commonOptions,
    scales: {
      ...commonOptions.scales,
      y: {
        min: 0,
        max: 360,
        ticks: {
          stepSize: 90,
          color: chartTextColor,
        },
        grid: {
          color: gridColor,
          drawBorder: false,
          borderDash: [5, 5],
        },
        title: {
          display: true,
          text: 'İstifadəçi sayı',
          color: chartTextColor,
          font: { size: 12 }
        }
      },
      x: {
        ...commonOptions.scales.x,
        grid: {
          display: true,
          color: gridColor,
          borderDash: [5, 5],
        }
      }
    },
  };

  const seasonalOptions = {
    ...commonOptions,
    scales: {
      ...commonOptions.scales,
      y: {
        min: 0,
        max: 600,
        ticks: {
          stepSize: 150,
          color: chartTextColor,
        },
        grid: {
          color: gridColor,
          drawBorder: false,
          borderDash: [5, 5],
        },
        title: {
          display: true,
          text: 'İstifadəçi sayı',
          color: chartTextColor,
          font: { size: 12 }
        }
      },
      x: {
        ...commonOptions.scales.x,
        ticks: {
          ...commonOptions.scales.x.ticks,
          maxRotation: 45,
          minRotation: 45,
          color: chartTextColor,
        },
        grid: {
          display: true,
          color: gridColor,
          borderDash: [5, 5],
        }
      }
    },
  };

  return (
    <div className="trends-container">
      <div className="trends-header">
        <h1>Trend Təhlili</h1>
        <p>Zaman üzrə məlumat trendləri və proqnozlar</p>
      </div>

      <div className="trends-summary-grid">
        <div className="trend-stat-card">
          <div className="trend-stat-info">
            <h3>Orta Həftəlik Artım</h3>
            <div className="trend-stat-value">+18.5%</div>
            <div className="trend-stat-sub positive">
              <FiTrendingUp /> Son 4 həftə
            </div>
          </div>
          <div className="trend-icon-box green">
            <FiTrendingUp />
          </div>
        </div>

        <div className="trend-stat-card">
          <div className="trend-stat-info">
            <h3>Pik Aktivlik Saatı</h3>
            <div className="trend-stat-value">18:00</div>
            <div className="trend-stat-sub blue">
              <FiTrendingUp /> 352 istifadəçi
            </div>
          </div>
          <div className="trend-icon-box blue">
            <FiClock />
          </div>
        </div>
      </div>

      <div className="trends-sections">
        {/* Section 1: 30-Day Activity Trend */}
        <div className="trend-box">
          <div className="trend-box-head">
            <h2>30 Günlük Aktivlik Trendi</h2>
            <p>Gündəlik qeydiyyat və tamamlanma statistikası</p>
          </div>
          <div style={{ height: '350px' }}>
            <Line ref={chartRef} data={activityData} options={activityOptions} />
          </div>
          <div className="custom-chart-legend">
            <div
              className={`legend-item ${!visibleDatasets[0] ? 'is-hidden' : ''}`}
              onClick={() => toggleDataset(0)}
            >
              <svg width="18" height="12" viewBox="0 0 18 12" className="legend-icon">
                <line x1="0" y1="6" x2="18" y2="6" stroke="#3b82f6" strokeWidth="2" />
                <circle cx="9" cy="6" r="3" fill="white" stroke="#3b82f6" strokeWidth="2" />
              </svg>
              <span style={{ color: visibleDatasets[0] ? '#3b82f6' : chartTextColor }}>Qeydiyyatlar</span>
            </div>
            <div
              className={`legend-item ${!visibleDatasets[1] ? 'is-hidden' : ''}`}
              onClick={() => toggleDataset(1)}
            >
              <svg width="18" height="12" viewBox="0 0 18 12" className="legend-icon">
                <line x1="0" y1="6" x2="18" y2="6" stroke="#10b981" strokeWidth="2" />
                <circle cx="9" cy="6" r="3" fill="white" stroke="#10b981" strokeWidth="2" />
              </svg>
              <span style={{ color: visibleDatasets[1] ? '#10b981' : chartTextColor }}>Tamamlanmalar</span>
            </div>
          </div>
        </div>

        {/* Section 2: Weekly & Hourly Comparison Grid */}
        <div className="trends-grid">
          <div className="trend-box">
            <div className="trend-box-head">
              <h2>Həftəlik Müqayisə</h2>
              <p>Cari və əvvəlki ay müqayisəsi</p>
            </div>
            <div style={{ height: '300px' }}>
              <Bar ref={weeklyChartRef} data={weeklyData} options={weeklyOptions} />
            </div>
            <div className="custom-chart-legend">
              <div
                className={`legend-item ${!visibleWeeklyDatasets[0] ? 'is-hidden' : ''}`}
                onClick={() => toggleWeeklyDataset(0)}
              >
                <div className="legend-dot" style={{ backgroundColor: '#94a3b8' }}></div>
                <span style={{ color: chartTextColor }}>Əvvəlki ay</span>
              </div>
              <div
                className={`legend-item ${!visibleWeeklyDatasets[1] ? 'is-hidden' : ''}`}
                onClick={() => toggleWeeklyDataset(1)}
              >
                <div className="legend-dot" style={{ backgroundColor: '#f59e0b' }}></div>
                <span style={{ color: visibleWeeklyDatasets[1] ? '#f59e0b' : chartTextColor }}>Cari ay</span>
              </div>
            </div>
          </div>

          <div className="trend-box">
            <div className="trend-box-head">
              <h2>Saatlıq Aktivlik Paylanması</h2>
              <p>Gün ərzində istifadəçi aktivliyi</p>
            </div>
            <div style={{ height: '300px' }}>
              <Line data={hourlyData} options={hourlyOptions} />
            </div>
          </div>
        </div>

        {/* Section 3: Seasonal Trends */}
        <div className="trend-box">
          <div className="trend-box-head">
            <h2>Mövsümi Trendlər (Son 12 ay)</h2>
            <p>Mövsüm üzrə istifadəçi sayı trendləri</p>
          </div>
          <div style={{ height: '350px' }}>
            <Line
              ref={seasonalChartRef}
              data={seasonalData}
              options={seasonalOptions}
            />
          </div>
          <div className="custom-chart-legend">
            <div
              className={`legend-item ${!visibleSeasonalDataset ? 'is-hidden' : ''}`}
              onClick={toggleSeasonalDataset}
            >
              <svg width="18" height="12" viewBox="0 0 18 12" className="legend-icon">
                <line x1="0" y1="6" x2="18" y2="6" stroke="#3b82f6" strokeWidth="2" />
                <circle cx="9" cy="6" r="3" fill="white" stroke="#3b82f6" strokeWidth="2" />
              </svg>
              <span style={{ color: visibleSeasonalDataset ? '#3b82f6' : chartTextColor }}>users.label</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trends;