
import posthog from 'posthog-js';

// Initialize PostHog with proper configuration
if (typeof window !== 'undefined' && !window.__posthog_initialized) {
  posthog.init(import.meta.env.VITE_POSTHOG_PROJECT_API_KEY || 'phc_demo_key', {
    api_host: 'https://app.posthog.com',
    capture_pageview: true,
    loaded: (posthog) => {
      if (import.meta.env.DEV) {
        console.log('PostHog loaded successfully');
      }
    }
  });
  window.__posthog_initialized = true;
}

export const track = (event: string, properties = {}) => {
  if (typeof window !== 'undefined') {
    posthog.capture(event, properties);
    console.log(`[Analytics] ${event}:`, properties);
  }
};

export const identify = (userId: string, properties = {}) => {
  if (typeof window !== 'undefined') {
    posthog.identify(userId, properties);
    console.log(`[Analytics] Identified user: ${userId}`, properties);
  }
};

// Enhanced event tracking functions
export const trackTeaSpilled = (identity_mode: string, category?: string) => {
  track('tea_spilled', { 
    identity_mode, 
    category,
    timestamp: new Date().toISOString()
  });
};

export const trackEnteredJoinFlow = (source: string = 'unknown') => {
  track('entered_join_flow', { source });
};

export const trackConnectedWallet = (wallet_type?: string) => {
  track('connected_wallet', { wallet_type });
};

export const trackBadgeEarned = (badge: string, user_id?: string) => {
  track('badge_earned', { badge, user_id });
};

export const trackViewedLeaderboard = (source: string = 'navigation') => {
  track('viewed_leaderboard', { source });
};

export const trackToggleIdentityMode = (from: string, to: string) => {
  track('toggle_identity_mode', { from, to });
};

export const trackUpvotedTea = (post_id: string, reaction_type: string) => {
  track('upvoted_tea', { post_id, reaction_type });
};

// Funnel tracking
export const trackFunnelStep = (step: string, funnel: string = 'main') => {
  track('funnel_step', { step, funnel });
};
