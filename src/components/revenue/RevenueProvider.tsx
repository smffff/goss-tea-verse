
import React, { createContext, useContext, useState, useEffect } from 'react';

interface RevenueContextType {
  showAffiliateLinks: boolean;
  sponsoredContentEnabled: boolean;
  premiumContentEnabled: boolean;
  tipJarEnabled: boolean;
  revenueSettings: RevenueSettings;
  updateRevenueSettings: (settings: Partial<RevenueSettings>) => void;
}

interface RevenueSettings {
  affiliateCommissionRate: number;
  sponsoredContentRate: number;
  premiumSubscriptionPrice: number;
  tipPercentage: number;
}

const defaultSettings: RevenueSettings = {
  affiliateCommissionRate: 0.05, // 5%
  sponsoredContentRate: 0.10, // 10%
  premiumSubscriptionPrice: 9.99,
  tipPercentage: 0.15 // 15%
};

const RevenueContext = createContext<RevenueContextType | undefined>(undefined);

export const useRevenue = () => {
  const context = useContext(RevenueContext);
  if (!context) {
    throw new Error('useRevenue must be used within a RevenueProvider');
  }
  return context;
};

interface RevenueProviderProps {
  children: React.ReactNode;
}

export const RevenueProvider: React.FC<RevenueProviderProps> = ({ children }) => {
  const [showAffiliateLinks, setShowAffiliateLinks] = useState(true);
  const [sponsoredContentEnabled, setSponsoredContentEnabled] = useState(true);
  const [premiumContentEnabled, setPremiumContentEnabled] = useState(true);
  const [tipJarEnabled, setTipJarEnabled] = useState(true);
  const [revenueSettings, setRevenueSettings] = useState<RevenueSettings>(defaultSettings);

  const updateRevenueSettings = (settings: Partial<RevenueSettings>) => {
    setRevenueSettings(prev => ({ ...prev, ...settings }));
    localStorage.setItem('ctea_revenue_settings', JSON.stringify({ ...revenueSettings, ...settings }));
  };

  useEffect(() => {
    const stored = localStorage.getItem('ctea_revenue_settings');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setRevenueSettings(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Failed to parse revenue settings:', error);
      }
    }
  }, []);

  const value = {
    showAffiliateLinks,
    sponsoredContentEnabled,
    premiumContentEnabled,
    tipJarEnabled,
    revenueSettings,
    updateRevenueSettings
  };

  return (
    <RevenueContext.Provider value={value}>
      {children}
    </RevenueContext.Provider>
  );
};
