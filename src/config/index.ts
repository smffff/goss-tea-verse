
// CTea Newsroom - Centralized Configuration
// Created: 2025-01-26 - Consolidating scattered app configuration

import { APP_CONFIG } from './app';
import { AI_CONFIG, CTEABOT_PROMPTS } from './aiConfig';

// Main app configuration
export const config = {
  app: APP_CONFIG,
  ai: {
    ...AI_CONFIG,
    prompts: CTEABOT_PROMPTS
  },
  
  // API Configuration
  api: {
    supabase: {
      url: 'https://luubdvuuxvtkheyhzepm.supabase.co',
      anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1dWJkdnV1eHZ0a2hleWh6ZXBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxMzc4MTksImV4cCI6MjA2NDcxMzgxOX0.aS-if_zvAmLYW7Y3ySPYpU71zbB3ycV0pBDJpznkb5c'
    }
  },

  // Feature flags for beta launch
  features: {
    ...APP_CONFIG.features,
    betaAccess: true,
    advancedModeration: true,
    enhancedSecurity: true
  },

  // Rate limiting configuration
  rateLimits: APP_CONFIG.rateLimits,

  // Security configuration
  security: {
    tokenLength: 32,
    sessionTimeout: 30 * 60 * 1000, // 30 minutes
    maxContentLength: 2000,
    allowedProtocols: ['http:', 'https:']
  }
};

// Export individual configs for backward compatibility
export { APP_CONFIG } from './app';
export { AI_CONFIG, CTEABOT_PROMPTS } from './aiConfig';
export { BRAND_COLORS } from './app';

// Environment utilities
export const isDevelopment = () => import.meta.env.DEV;
export const isProduction = () => import.meta.env.PROD;

// Feature flag utilities
export const isFeatureEnabled = (feature: keyof typeof config.features): boolean => {
  return config.features[feature] === true;
};
