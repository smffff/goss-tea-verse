
import { track } from '@vercel/analytics';

interface AnalyticsEvent {
  [key: string]: string | number;
}

export const trackEvent = (eventName: string, properties?: AnalyticsEvent) => {
  try {
    // Use Vercel Analytics track function with proper typing
    track(eventName, properties as Record<string, string | number>);
    
    // Also log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', eventName, properties);
    }
  } catch (error) {
    console.error('Analytics tracking error:', error);
  }
};

export const trackPageView = (pageName: string, properties?: AnalyticsEvent) => {
  trackEvent('page_view', {
    page_title: pageName,
    page_location: window.location.href,
    ...properties
  });
};

export const trackUserAction = (action: string, properties?: AnalyticsEvent) => {
  trackEvent('user_action', {
    event_category: 'engagement',
    event_label: action,
    ...properties
  });
};

export const trackTeaSubmission = (category: string, hasEvidence: boolean) => {
  trackEvent('tea_submission', {
    event_category: 'content',
    event_label: category,
    has_evidence: hasEvidence ? 'true' : 'false'
  });
};

export const trackFormCompletion = (formType: string) => {
  trackEvent('form_completion', {
    event_category: 'engagement',
    event_label: formType
  });
};

export const trackTeaSpill = (category: string) => {
  trackEvent('tea_spill', {
    event_category: 'content',
    event_label: category
  });
};

export const trackReaction = (reactionType: string, submissionCategory: string) => {
  trackEvent('reaction_given', {
    event_category: 'engagement',
    event_label: reactionType,
    submission_category: submissionCategory
  });
};

export const trackShare = (platform: string, contentType: string) => {
  trackEvent('content_shared', {
    event_category: 'sharing',
    event_label: platform,
    content_type: contentType
  });
};

export const trackError = (errorType: string, errorMessage: string) => {
  trackEvent('error_occurred', {
    event_category: 'error',
    event_label: errorType,
    error_message: errorMessage.substring(0, 100)
  });
};
