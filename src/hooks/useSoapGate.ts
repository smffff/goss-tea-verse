
import { useState, useEffect } from 'react';
import { useWallet } from '@/components/WalletProvider';

interface SoapGateStatus {
  hasSoap: boolean;
  soapBalance: number;
  isLoading: boolean;
  canAccess: (requiredAmount?: number) => boolean;
}

export const useSoapGate = (requiredAmount: number = 1): SoapGateStatus => {
  const { wallet } = useWallet();
  const [isLoading, setIsLoading] = useState(false);

  // Get SOAP balance from wallet or fallback to demo override
  const getSoapBalance = (): number => {
    if (!wallet.isConnected) return 0;
    
    // Check for demo override
    const demoOverride = localStorage.getItem('ctea_demo_soap');
    if (demoOverride) return parseInt(demoOverride);
    
    // Get actual SOAP balance from wallet
    return parseInt(wallet.balance.soap) || 0;
  };

  const soapBalance = getSoapBalance();
  const hasSoap = soapBalance >= requiredAmount;

  const canAccess = (customRequiredAmount?: number) => {
    const required = customRequiredAmount || requiredAmount;
    return getSoapBalance() >= required;
  };

  return {
    hasSoap,
    soapBalance,
    isLoading,
    canAccess
  };
};
