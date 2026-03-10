import React, { useState } from 'react';
import { FiGlobe, FiSettings } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Input from '../../components/Input';
import './style.css';

const INITIAL_SETTINGS = {
  siteName: 'Travelia',
  siteUrl: 'travelia.az',
  contactEmail: '',
  supportWhatsapp: '',
  maintenanceMode: false,
  debugMode: false,
  dataRetentionDays: ''
};

const Setting = () => {
  const [settings, setSettings] = useState(INITIAL_SETTINGS);

  const handleChange = (field, value) => {
    // Validation: Support WhatsApp allows numbers and '+', Data Retention only numbers
    if (field === 'supportWhatsapp') {
      const filteredValue = value.replace(/[^0-9+]/g, '');
      setSettings(prev => ({ ...prev, [field]: filteredValue }));
    } else if (field === 'dataRetentionDays') {
      const numericValue = value.replace(/[^0-9]/g, '');
      setSettings(prev => ({ ...prev, [field]: numericValue }));
    } else {
      setSettings(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleReset = () => {
    setSettings(INITIAL_SETTINGS);
  };

  const handleSave = () => {
    const { siteName, siteUrl, contactEmail, supportWhatsapp, dataRetentionDays } = settings;

    if (
      !siteName.trim() ||
      !siteUrl.trim() ||
      !contactEmail.trim() ||
      !supportWhatsapp.trim() ||
      !dataRetentionDays.toString().trim()
    ) {
      toast.error("Boş xanaları doldurun");
      return;
    }

    const phoneDigits = supportWhatsapp.replace(/[^0-9]/g, '');
    if (phoneDigits.length < 7 || phoneDigits.length > 20) {
      toast.error("Nömrə 7-20 rəqəmdən ibarət olmalıdır");
      return;
    }

    toast.success("Uğurla yadda saxlanıldı");
    // Reset everything back to initial state after saving
    setSettings(INITIAL_SETTINGS);
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <div className="header-left">
          <h1>Sistem Parametrləri</h1>
          <p>Sistem konfiqurasiyaları və parametrlər</p>
        </div>
        <div className="header-actions">
          <button className="btn-reset" onClick={handleReset}>Sıfırla</button>
          <button className="btn-save" onClick={handleSave}>Yadda Saxla</button>
        </div>
      </div>

      <div className="settings-content">
        <div className="settings-card settings-card--compact">
          <div className="card-header">
            <div className="icon-box blue">
              <FiGlobe />
            </div>
            <h2>Ümumi Parametrlər</h2>
          </div>
          <div className="card-body">
            <Input
              label="Sayt Adı"
              value={settings.siteName}
              onChange={(e) => handleChange('siteName', e.target.value)}
              placeholder="Travelia"
            />
            <Input
              label="Sayt URL"
              value={settings.siteUrl}
              onChange={(e) => handleChange('siteUrl', e.target.value)}
              placeholder="travelia.az"
            />
            <Input
              label="Əlaqə Email"
              value={settings.contactEmail}
              onChange={(e) => handleChange('contactEmail', e.target.value)}
              placeholder="email@example.com"
            />
            {settings.contactEmail && !settings.contactEmail.includes('@') && (
              <span className="input-error-text">Email ünvanında '@' işarəsi mütləqdir</span>
            )}
            <Input
              label="Dəstək WhatsApp"
              value={settings.supportWhatsapp}
              onChange={(e) => handleChange('supportWhatsapp', e.target.value)}
              placeholder="+994XXXXXXXXX"
            />
          </div>
        </div>

        <div className="settings-card">
          <div className="card-header">
            <div className="icon-box red">
              <FiSettings />
            </div>
            <h2>Sistem Parametrləri</h2>
          </div>
          <div className="card-body">
            <div className="settings-row">
              <div className="row-info">
                <h3>Texniki İşlər Rejimi</h3>
                <p>Saytı texniki işlər rejiminə sal</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) => handleChange('maintenanceMode', e.target.checked)}
                />
                <span className="slider round"></span>
              </label>
            </div>

            <div className="settings-row">
              <div className="row-info">
                <h3>Debug Rejimi</h3>
                <p>Xəta mesajlarını göstər</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.debugMode}
                  onChange={(e) => handleChange('debugMode', e.target.checked)}
                />
                <span className="slider round"></span>
              </label>
            </div>

            <Input
              label="Data Saxlama Müddəti (gün)"
              value={settings.dataRetentionDays}
              onChange={(e) => handleChange('dataRetentionDays', e.target.value)}
              placeholder="Yalnız rəqəmlər daxil edin"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;