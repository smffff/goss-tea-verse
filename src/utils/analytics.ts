
// Analytics utility for revenue tracking
export const track = (eventName: string, properties?: Record<string, any>) => {
  console.log(`📊 Analytics Event: ${eventName}`, properties);
  
  // In production, you'd integrate with your analytics service
  // Examples: Google Analytics, PostHog, Mixpanel, etc.
  
  try {
    // PostHog integration example (if installed)
    if (typeof window !== 'undefined' && (window as any).posthog) {
      (window as any).posthog.capture(eventName, properties);
    }
    
    // You can also send to your own analytics endpoint
    // fetch('/api/analytics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ event: eventName, properties })
    // });
  } catch (error) {
    console.error('Analytics tracking failed:', error);
  }
};
