import React, { useRef, useState, useEffect } from 'react';
import './style.scss';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { FiUsers, FiTarget, FiCalendar, FiTrendingUp } from 'react-icons/fi';
import { RxSlider } from "react-icons/rx";
import { FaSquare } from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Statistics = () => {
  const chartRef = useRef(null);
  const chartRefSection3 = useRef(null);
  const [visibleDatasets, setVisibleDatasets] = useState({ 0: true, 1: true });
  const [visibleDatasetsSection3, setVisibleDatasetsSection3] = useState({ 0: true, 1: true, 2: true });
  const [isDarkMode, setIsDarkMode] = useState(document.body.classList.contains('dashboard-dark'));

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDarkMode(document.body.classList.contains('dashboard-dark'));
        }
      });
    });

    observer.observe(document.body, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const chartTextColor = isDarkMode ? '#94a3b8' : '#64748b';
  const chartGridColor = isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#f1f5f9';
  const chartBorderDashColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0';

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

  const toggleDatasetSection3 = (index) => {
    const chart = chartRefSection3.current;
    if (!chart) return;

    const isVisible = chart.isDatasetVisible(index);
    if (isVisible) {
      chart.hide(index);
      setVisibleDatasetsSection3(prev => ({ ...prev, [index]: false }));
    } else {
      chart.show(index);
      setVisibleDatasetsSection3(prev => ({ ...prev, [index]: true }));
    }
  };

  // --- Section 1 Data (Image 1) ---
  const monthlyGrowthData = {
    labels: ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'İyun'],
    datasets: [
      {
        type: 'line',
        label: 'Ümumi İstifadəçilər',
        data: [180, 240, 280, 320, 380, 450],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointStyle: 'crossRot', // RxSlider resembles a slider/cross pattern in legend point styles often
      },
      {
        type: 'bar',
        label: 'Tamamlanmış',
        data: [140, 165, 185, 220, 260, 310],
        backgroundColor: '#22c55e',
        borderRadius: 8,
        barThickness: 80,
        pointStyle: 'rect', // Square icon for completed
      },
    ],
  };

  // --- Section 2 Data (Image 2) ---
  const budgetDurationData = {
    labels: ['1-3 gün', '4-7 gün', '8-14 gün', '14+ gün'],
    datasets: [
      {
        label: 'Basic',
        data: [45, 35, 25, 15],
        backgroundColor: '#3b82f6',
        borderRadius: 4,
      },
      {
        label: 'Standard',
        data: [35, 48, 52, 35],
        backgroundColor: '#10b981',
        borderRadius: 4,
      },
      {
        label: 'Luxury',
        data: [15, 25, 38, 65],
        backgroundColor: '#f59e0b',
        borderRadius: 4,
      },
    ],
  };

  const interests = [
    { name: 'Təbiət', percentage: 68, color: '#22c55e', count: 1729, bgColor: 'rgba(34, 197, 94, 0.05)' },
    { name: 'Macara', percentage: 55, color: '#ef4444', count: 1399, bgColor: 'rgba(239, 68, 68, 0.05)' },
    { name: 'Şəhər', percentage: 52, color: '#3b82f6', count: 1322, bgColor: 'rgba(59, 130, 246, 0.05)' },
    { name: 'Tarix', percentage: 45, color: '#8b5cf6', count: 1144, bgColor: 'rgba(139, 92, 246, 0.05)' },
    { name: 'Mədəniyyət', percentage: 42, color: '#f59e0b', count: 1088, bgColor: 'rgba(245, 158, 11, 0.05)' },
    { name: 'Qastronomiya', percentage: 38, color: '#ec4899', count: 968, bgColor: 'rgba(236, 72, 153, 0.05)' },
  ];

  const conversionSteps = [
    { label: 'Onboarding Addım 1', value: 2543, percentage: 100 },
    { label: 'Onboarding Addım 2', value: 2350, percentage: 92 },
    { label: 'Onboarding Addım 3', value: 2180, percentage: 86 },
    { label: 'Onboarding Addım 4', value: 2050, percentage: 81 },
    { label: 'Tamamlanmış', value: 1834, percentage: 72 },
  ];

  // --- Section 3 Data (Image 3) ---
  const serviceUsageData = {
    labels: ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'İyun'],
    datasets: [
      {
        label: 'Airport Pickup',
        data: [42, 45, 48, 52, 55, 59],
        borderColor: '#3b82f6',
        backgroundColor: '#3b82f6',
        tension: 0,
        pointRadius: 4,
      },
      {
        label: 'Guide Support',
        data: [35, 38, 40, 42, 44, 45],
        borderColor: '#10b981',
        backgroundColor: '#10b981',
        tension: 0,
        pointRadius: 4,
      },
      {
        label: 'Hər İkisi',
        data: [28, 30, 32, 35, 38, 40],
        borderColor: '#f59e0b',
        backgroundColor: '#f59e0b',
        tension: 0,
        pointRadius: 4,
      },
    ],
  };

  const companionInterestData = {
    labels: ['Solo', 'Couple', 'Family', 'Friends'],
    datasets: [
      { label: 'Təbiət', data: [72, 65, 58, 78], backgroundColor: '#10b981', borderRadius: 4 },
      { label: 'Şəhər', data: [58, 48, 65, 42], backgroundColor: '#3b82f6', borderRadius: 4 },
      { label: 'Tarix', data: [65, 42, 38, 35], backgroundColor: '#8b5cf6', borderRadius: 4 },
      { label: 'Qastronomiya', data: [45, 55, 48, 38], backgroundColor: '#ec4899', borderRadius: 4 },
      { label: 'Mədəniyyət', data: [52, 48, 52, 35], backgroundColor: '#f59e0b', borderRadius: 4 },
      { label: 'Macara', data: [68, 38, 42, 75], backgroundColor: '#ef4444', borderRadius: 4 },
    ],
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: { size: 12 },
        },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart',
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: chartGridColor,
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

  const section1Options = {
    ...commonOptions,
    animation: {
      duration: 1000,
      easing: 'easeOutQuart',
    },
    plugins: {
      ...commonOptions.plugins,
      legend: {
        display: false, // Custom legend below
      },
    },
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
          color: chartBorderDashColor,
          borderDash: [5, 5],
          drawBorder: false,
        },
        title: {
          display: true,
          text: 'İstifadəçi sayı',
          color: chartTextColor,
          font: {
            size: 14,
          },
        },
      },
      x: {
        grid: {
          display: true,
          borderDash: [5, 5],
          color: chartBorderDashColor,
        },
        ticks: { color: chartTextColor },
      },
    },
  };

  return (
    <div className="statistics-container">
      <div className="statistics-header">
        <h2>Ətraflı Statistika və Analiz</h2>
        <p>Detallı məlumat analizi və performans göstəriciləri</p>
      </div>

      {/* Section 1 summary cards */}
      <div className="summary-cards">
        <div className="card card-blue">
          <div className="card-icon-wrapper">
            <FiUsers className="card-icon" />
            <FiTrendingUp className="card-trend" />
          </div>
          <div className="card-content">
            <h3>Aylıq Artım</h3>
            <div className="value">+27%</div>
            <div className="subtitle">Əvvəlki aya nisbətən</div>
          </div>
        </div>
        <div className="card card-green">
          <div className="card-icon-wrapper">
            <FiTarget className="card-icon" />
            <FiTrendingUp className="card-trend" />
          </div>
          <div className="card-content">
            <h3>Konversiya Dərəcəsi</h3>
            <div className="value">72%</div>
            <div className="subtitle">Tamamlanma göstəricisi</div>
          </div>
        </div>
        <div className="card card-orange">
          <div className="card-icon-wrapper">
            <FiCalendar className="card-icon" />
            <FiTrendingUp className="card-trend" />
          </div>
          <div className="card-content">
            <h3>Orta Müddət</h3>
            <div className="value">5-8 gün</div>
            <div className="subtitle">Səyahət müddəti</div>
          </div>
        </div>
      </div>

      <div className="sections-grid">
        {/* Section 1 Chart */}
        <div className="section-box">
          <div className="section-head">
            <h2>Aylıq Artım Trendi</h2>
            <p>İstifadəçi qeydiyyatı və tamamlanma statistikası</p>
          </div>
          <div style={{ height: '350px' }}>
            <Bar ref={chartRef} data={monthlyGrowthData} options={section1Options} />
          </div>
          <div className="custom-legend-section1">
            <div
              className={`legend-item ${!visibleDatasets[0] ? 'is-hidden' : ''}`}
              onClick={() => toggleDataset(0)}
            >
              <RxSlider className="legend-icon" style={{ color: '#3b82f6' }} />
              <span>Ümumi İstifadəçilər</span>
            </div>
            <div
              className={`legend-item ${!visibleDatasets[1] ? 'is-hidden' : ''}`}
              onClick={() => toggleDataset(1)}
            >
              <FaSquare className="legend-icon" style={{ color: '#22c55e' }} />
              <span>Tamamlanmış</span>
            </div>
          </div>
        </div>

        {/* Section 2 Grid */}
        <div className="middle-grid">
          <div className="section-box">
            <div className="section-head">
              <h2>Büdcə və Müddət</h2>
              <p>Səyahət müddətinə görə büdcə seçimləri</p>
            </div>
            <div style={{ height: '350px' }}>
              <Bar data={budgetDurationData} options={{
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
                      color: chartBorderDashColor,
                      borderDash: [5, 5],
                      drawBorder: false,
                    },
                    title: {
                      display: true,
                      text: 'Faiz (%)',
                      color: chartTextColor,
                    }
                  },
                  x: {
                    grid: {
                      display: true,
                      borderDash: [5, 5],
                      color: chartBorderDashColor,
                    },
                    ticks: { color: chartTextColor },
                  }
                }
              }} />
            </div>
          </div>

          <div className="section-box">
            <div className="section-head">
              <h2>Konversiya</h2>
              <p>Onboarding prosesində istifadəçi saxlanması</p>
            </div>
            <div className="conversion-list">
              {conversionSteps.map((step, index) => (
                <div key={index} className="conversion-item">
                  <div className="conversion-info">
                    <span className="conversion-label">{step.label}</span>
                    <span className="conversion-value">{step.value} <span>({step.percentage}%)</span></span>
                  </div>
                  <div className="progress-bar-bg">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${step.percentage}%`, background: '#22c55e' }}
                    >
                      {step.percentage}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2 Bottom: Interest Profile */}
        <div className="section-box">
          <div className="section-head">
            <h2>İstifadəçi Maraq Profili</h2>
            <p>Ən çox seçilən maraq sahələri və populyarlıq göstəriciləri</p>
          </div>
          <div className="interest-grid">
            {interests.map((interest, index) => (
              <div key={index} className="interest-card" style={{ backgroundColor: interest.bgColor }}>
                <div className="interest-header">
                  <span className="interest-name" style={{ color: interest.color }}>{interest.name}</span>
                  <span className="interest-percentage" style={{ color: interest.color }}>{interest.percentage}%</span>
                </div>
                <div className="mini-progress-bg">
                  <div
                    className="mini-progress-fill"
                    style={{ width: `${interest.percentage}%`, backgroundColor: interest.color }}
                  ></div>
                </div>
                <div className="interest-footer">
                  {interest.count} istifadəçi seçib
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3 Charts */}
        <div className="section-box">
          <div className="section-head">
            <h2>Xidmət İstifadə Trendi</h2>
            <p>İxtiyari xidmətlərin zaman üzrə istifadə göstəriciləri</p>
          </div>
          <div style={{ height: '350px' }}>
            <Line ref={chartRefSection3} data={serviceUsageData} options={{
              ...commonOptions,
              animation: {
                duration: 800,
                easing: 'easeInOutSine',
              },
              plugins: {
                ...commonOptions.plugins,
                legend: { display: false }
              },
              scales: {
                ...commonOptions.scales,
                y: {
                  min: 0,
                  max: 60,
                  ticks: {
                    stepSize: 15,
                    color: chartTextColor,
                  },
                  grid: {
                    color: chartBorderDashColor,
                    borderDash: [5, 5],
                    drawBorder: false,
                  },
                  title: {
                    display: true,
                    text: 'İstifadə Faizi (%)',
                    color: chartTextColor,
                  }
                },
                x: {
                  grid: {
                    display: true,
                    borderDash: [5, 5],
                    color: chartBorderDashColor,
                  },
                  ticks: { color: chartTextColor },
                }
              }
            }} />
          </div>
          <div className="custom-legend-section3">
            <div
              className={`legend-item pickup ${!visibleDatasetsSection3[0] ? 'is-hidden' : ''}`}
              onClick={() => toggleDatasetSection3(0)}
            >
              <RxSlider className="legend-icon" />
              <span>Airport Pickup</span>
            </div>
            <div
              className={`legend-item guide ${!visibleDatasetsSection3[1] ? 'is-hidden' : ''}`}
              onClick={() => toggleDatasetSection3(1)}
            >
              <RxSlider className="legend-icon" />
              <span>Guide Support</span>
            </div>
            <div
              className={`legend-item both ${!visibleDatasetsSection3[2] ? 'is-hidden' : ''}`}
              onClick={() => toggleDatasetSection3(2)}
            >
              <RxSlider className="legend-icon" />
              <span>Hər İkisi</span>
            </div>
          </div>
        </div>

        <div className="section-box">
          <div className="section-head">
            <h2>Yoldaş Tipinə Görə Maraq Sahələri</h2>
            <p>Müxtəlif yoldaş qruplarının maraq sahələri üzrə fərqləri</p>
          </div>
          <div style={{ height: '400px' }}>
            <Bar data={companionInterestData} options={{
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
                    color: chartBorderDashColor,
                    borderDash: [5, 5],
                    drawBorder: false,
                  },
                  title: {
                    display: true,
                    text: 'Seçilmə Faizi (%)',
                    color: chartTextColor,
                  }
                },
                x: {
                  grid: {
                    display: true,
                    borderDash: [5, 5],
                    color: chartBorderDashColor,
                  },
                  ticks: { color: chartTextColor },
                }
              }
            }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;