
// Simple analytics tracking
export const track = (eventName: string, properties?: Record<string, any>) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics Event:', eventName, properties);
  }
  // In production, this would send to your analytics service
};
