// DEPRECATED: Use src/utils/analytics.ts (PostHog) for all analytics tracking going forward.
import { secureLog } from '@/utils/secureLog';

export const track = (event: string, properties?: Record<string, any>) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      secureLog.info(`Track: ${event}`, properties);
    }
    // Add your analytics provider here (PostHog, Google Analytics, etc.)
    secureLog.info('Analytics event tracked', { event, properties });
  } catch (error) {
    secureLog.error('Analytics tracking failed', error);
  }
};

export const identify = (userId: string, traits?: Record<string, any>) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      secureLog.info(`Identify: ${userId}`, traits);
    }
    // Add your analytics provider here
    secureLog.info('User identified', { userId, traits });
  } catch (error) {
    secureLog.error('User identification failed', error);
  }
};
