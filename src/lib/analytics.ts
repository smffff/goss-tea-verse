// Analytics utility for CTea Newsroom
// Tracks page views, CTA clicks, form completions, and tea spills

export const trackPageView = (pageName: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: pageName,
      page_location: window.location.href,
      event_category: 'navigation'
    });
  }
};

export const trackCTAClick = (ctaName: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'cta_click', {
      event_category: 'engagement',
      event_label: ctaName,
      custom_parameter_1: 'cta_clicks'
    });
  }
};

export const trackFormCompletion = (formName: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_completion', {
      event_category: 'engagement',
      event_label: formName,
      custom_parameter_2: 'form_completions'
    });
  }
};

export const trackTeaSpill = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'tea_spilled', {
      event_category: 'engagement',
      event_label: 'successful_submission',
      custom_parameter_3: 'tea_spills',
      value: 1
    });
  }
};

export const trackFeedbackSubmission = (source: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'feedback_submitted', {
      event_category: 'engagement',
      event_label: source
    });
  }
};

export const trackFeedbackButtonClick = (source: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'feedback_button_clicked', {
      event_category: 'engagement',
      event_label: source
    });
  }
};

// Track user progression events
export const trackUserProgression = (action: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'user_progression', {
      event_category: 'engagement',
      event_label: action,
      value: value || 1
    });
  }
};

// Track social sharing
export const trackSocialShare = (platform: string, content: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'social_share', {
      event_category: 'engagement',
      event_label: platform,
      content_type: content
    });
  }
};

// Track error events
export const trackError = (errorType: string, errorMessage: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'error', {
      event_category: 'error',
      event_label: errorType,
      error_message: errorMessage
    });
  }
}; 