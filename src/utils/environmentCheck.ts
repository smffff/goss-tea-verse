
import React from 'react';
import ReactDOM from 'react-dom/client';

// Environment check utility
export const environmentCheck = {
  // Check if all required environment variables are set
  checkEnvironment: () => {
    const checks = {
      nodeEnv: process.env.NODE_ENV || 'development',
      supabaseUrl: process.env.SUPABASE_URL || 'https://luubdvuuxvtkheyhzepm.supabase.co',
      supabaseKey: process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1dWJkdnV1eHZ0a2hleWh6ZXBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxMzc4MTksImV4cCI6MjA2NDcxMzgxOX0.aS-if_zvAmLYW7Y3ySPYpU71zbB3ycV0pBDJpznkb5c',
      databaseUrl: process.env.DATABASE_URL,
      stripeKey: process.env.STRIPE_PUBLISHABLE_KEY,
      posthogKey: process.env.POSTHOG_KEY,
      vercelAnalytics: process.env.VERCEL_ANALYTICS_ID
    };

    const missing = Object.entries(checks)
      .filter(([key, value]) => !value && key !== 'databaseUrl' && key !== 'stripeKey' && key !== 'posthogKey' && key !== 'vercelAnalytics')
      .map(([key]) => key);

    if (missing.length > 0) {
      console.warn('Missing environment variables:', missing);
    }

    return {
      checks,
      missing,
      isValid: missing.length === 0
    };
  },

  // Check browser compatibility
  checkBrowserCompatibility: () => {
    const checks = {
      localStorage: typeof localStorage !== 'undefined',
      sessionStorage: typeof sessionStorage !== 'undefined',
      fetch: typeof fetch !== 'undefined',
      webGL: (() => {
        try {
          const canvas = document.createElement('canvas');
          return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch (e) {
          return false;
        }
      })(),
      serviceWorker: 'serviceWorker' in navigator,
      pushManager: 'PushManager' in window,
      notifications: 'Notification' in window
    };

    const unsupported = Object.entries(checks)
      .filter(([key, value]) => !value)
      .map(([key]) => key);

    return {
      checks,
      unsupported,
      isCompatible: unsupported.length === 0
    };
  },

  // Check if all required dependencies are loaded
  checkDependencies: () => {
    const checks = {
      react: typeof React !== 'undefined',
      reactDOM: typeof ReactDOM !== 'undefined',
      supabase: typeof window !== 'undefined' && 'supabase' in window,
      ethereum: typeof window !== 'undefined' && 'ethereum' in window,
      web3: typeof window !== 'undefined' && 'Web3' in window
    };

    const missing = Object.entries(checks)
      .filter(([key, value]) => !value)
      .map(([key]) => key);

    return {
      checks,
      missing,
      isValid: missing.length === 0
    };
  },

  // Run all checks
  runAllChecks: () => {
    console.group('CTea Environment Check');
    
    const envCheck = environmentCheck.checkEnvironment();
    console.log('Environment:', envCheck);
    
    const browserCheck = environmentCheck.checkBrowserCompatibility();
    console.log('Browser Compatibility:', browserCheck);
    
    const depCheck = environmentCheck.checkDependencies();
    console.log('Dependencies:', depCheck);
    
    console.groupEnd();
    
    return {
      environment: envCheck,
      browser: browserCheck,
      dependencies: depCheck,
      allValid: envCheck.isValid && browserCheck.isCompatible && depCheck.isValid
    };
  }
};

// Auto-run checks in development
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    setTimeout(() => {
      environmentCheck.runAllChecks();
    }, 1000);
  });
}

export default environmentCheck;
