import React, { createContext, useContext, useEffect, useState } from 'react';
import { AgencySettings } from '../types';
import { dataService } from '../services/store';

interface SettingsContextType {
  settings: AgencySettings;
  updateSettings: (newSettings: AgencySettings) => Promise<{ success: boolean; error?: string }>;
  refreshSettings: () => Promise<void>;
  isLoading: boolean;
}

const defaultSettings: AgencySettings = {
  name: 'VyapaarPro',
  tagline: 'High-Performance Digital Engineering for Modern Businesses',
  email: 'kumarsrijal732@gmail.com',
  phone: '+91 98765 43210',
  whatsapp: '+91 98765 43210',
  address: 'Indiranagar 100ft Road, Bangalore, Karnataka 560038',
  description:
    'VyapaarPro is an elite digital engineering & creative agency. We build bespoke business websites, custom web applications, mobile apps, e-commerce systems, and full-spectrum digital branding to help enterprises scale sustainably.',
  footer_text:
    '© 2026 VyapaarPro Digital Agency. All rights reserved. Every client solution is custom-engineered and deployed independently.',
  social: {
    twitter: 'https://twitter.com/vyapaarpro',
    linkedin: 'https://linkedin.com/company/vyapaarpro',
    github: 'https://github.com/vyapaarpro',
    instagram: 'https://instagram.com/vyapaarpro',
  },
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AgencySettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  const loadSettings = async () => {
    setIsLoading(true);
    try {
      const data = await dataService.getSettings();
      if (data) {
        setSettings(data);
      }
    } catch (err) {
      console.error('Failed to load agency settings:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();

    // Listen for custom settings update events across the app
    const handleSettingsUpdate = (e: any) => {
      if (e.detail) {
        setSettings(e.detail);
      }
    };
    window.addEventListener('vp_settings_updated', handleSettingsUpdate);
    return () => window.removeEventListener('vp_settings_updated', handleSettingsUpdate);
  }, []);

  const updateSettings = async (newSettings: AgencySettings): Promise<{ success: boolean; error?: string }> => {
    setSettings(newSettings);
    const result = await dataService.saveSettings(newSettings);
    if (!result.success && result.error) {
      console.error('Settings save failure in database:', result.error);
    }
    return result;
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings,
        refreshSettings: loadSettings,
        isLoading,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
