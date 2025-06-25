
import { track } from '@vercel/analytics';

interface AnalyticsEvent {
  page_title?: string;
  page_location?: string;
  custom_map?: Record<string, string>;
  event_category?: string;
  event_label?: string;
  custom_parameter_1?: string;
  custom_parameter_2?: string;
  custom_parameter_3?: string;
  value?: number;
  [key: string]: string | number | Record<string, string> | undefined;
}

export const trackEvent = (eventName: string, properties?: AnalyticsEvent) => {
  try {
    // Use Vercel Analytics track function
    track(eventName, properties);
    
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
    custom_parameter_1: hasEvidence ? 'with_evidence' : 'no_evidence'
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
    custom_parameter_1: submissionCategory
  });
};

export const trackShare = (platform: string, contentType: string) => {
  trackEvent('content_shared', {
    event_category: 'sharing',
    event_label: platform,
    custom_parameter_1: contentType
  });
};

export const trackError = (errorType: string, errorMessage: string) => {
  trackEvent('error_occurred', {
    event_category: 'error',
    event_label: errorType,
    custom_parameter_1: errorMessage.substring(0, 100)
  });
};
