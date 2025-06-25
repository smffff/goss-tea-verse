import posthog from 'posthog-js';

// Only initialize PostHog on the client and only once
if (typeof window !== 'undefined' && !window.__posthog_initialized) {
  posthog.init('YOUR_POSTHOG_PROJECT_API_KEY', {
    api_host: 'https://app.posthog.com',
    capture_pageview: true,
  });
  window.__posthog_initialized = true;
}

export const track = (event: string, properties = {}) => {
  if (typeof window !== 'undefined') {
    posthog.capture(event, properties);
  }
};

export const identify = (userId: string) => {
  if (typeof window !== 'undefined') {
    posthog.identify(userId);
  }
};

// Event-specific wrappers (optional, for clarity)
export const trackTeaSpilled = (identity_mode: string) =>
  track('tea_spilled', { identity_mode });

export const trackToggleIdentityMode = (from: string, to: string) =>
  track('toggle_identity_mode', { from, to });

export const trackEnteredJoinFlow = () =>
  track('entered_join_flow');

export const trackConnectedWallet = () =>
  track('connected_wallet');

export const trackUpvotedTea = (post_id: string) =>
  track('upvoted_tea', { post_id });

export const trackBadgeEarned = (badge: string) =>
  track('badge_earned', { badge });

export const trackViewedLeaderboard = () =>
  track('viewed_leaderboard'); 