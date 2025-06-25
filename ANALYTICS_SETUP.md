# CTea Newsroom Analytics Setup

## Overview
CTea Newsroom uses Google Analytics 4 (GA4) to track user engagement, form completions, and key user interactions.

## Setup Instructions

### 1. Google Analytics Configuration
1. Create a Google Analytics 4 property at [analytics.google.com](https://analytics.google.com)
2. Get your Measurement ID (format: G-XXXXXXXXXX)
3. Replace `G-XXXXXXXXXX` in `index.html` with your actual Measurement ID

### 2. Tracking Implementation

#### Page Views
- Automatically tracked via GA4 configuration
- Custom page view events available via `trackPageView(pageName)`

#### Key Events Tracked

| Event | Category | Label | Description |
|-------|----------|-------|-------------|
| `cta_click` | engagement | cta_name | CTA button clicks |
| `form_completion` | engagement | form_name | Form submissions |
| `tea_spilled` | engagement | successful_submission | Successful tea submissions |
| `feedback_submitted` | engagement | source | Feedback form submissions |
| `feedback_button_clicked` | engagement | source | Feedback button clicks |
| `user_progression` | engagement | action | User progression events |
| `social_share` | engagement | platform | Social media shares |
| `error` | error | error_type | Error tracking |

#### Custom Parameters
- `custom_parameter_1`: CTA clicks counter
- `custom_parameter_2`: Form completions counter  
- `custom_parameter_3`: Tea spills counter

### 3. Analytics Functions

All analytics functions are centralized in `src/lib/analytics.ts`:

```typescript
// Track CTA clicks
trackCTAClick('spill_tea_cta');

// Track form completions
trackFormCompletion('tea_submission');

// Track successful tea spills
trackTeaSpill();

// Track feedback
trackFeedbackSubmission('footer_feedback');
trackFeedbackButtonClick('404_feedback');
```

### 4. Implementation Locations

#### Landing Page (`src/pages/Landing.tsx`)
- "Spill Tea for Beta Access" CTA
- "Tip Gatekeepers" CTA

#### Submission Form (`src/components/SubmissionForm.tsx`)
- Form completion tracking
- Successful tea spill tracking

#### Footer (`src/components/Footer.tsx`)
- Feedback button clicks
- Feedback form submissions

#### 404 Page (`src/pages/NotFound.tsx`)
- Issue reporting button clicks
- Feedback form submissions

### 5. Testing Analytics

1. Open browser developer tools
2. Go to Network tab
3. Filter by "google-analytics" or "collect"
4. Perform actions on the site
5. Verify events are being sent to GA4

### 6. GA4 Dashboard Setup

Recommended custom reports to create in GA4:

1. **Engagement Overview**
   - CTA click-through rates
   - Form completion rates
   - Tea spill success rates

2. **User Journey**
   - Landing page → CTA → Form → Success
   - Feedback submission funnel

3. **Content Performance**
   - Most engaging pages
   - Popular tea categories
   - Viral content tracking

### 7. Privacy Considerations

- No personal data is tracked
- All tracking is anonymous
- Users can opt-out via browser settings
- Compliant with GDPR and CCPA

### 8. Troubleshooting

#### Events Not Appearing
1. Check Measurement ID is correct
2. Verify gtag script is loading
3. Check browser console for errors
4. Ensure no ad blockers are interfering

#### Missing Custom Parameters
1. Verify parameter names match GA4 configuration
2. Check custom dimensions are set up in GA4
3. Allow 24-48 hours for data to appear

### 9. Future Enhancements

- A/B testing integration
- Conversion funnel optimization
- Real-time user behavior tracking
- Advanced segmentation
- Cohort analysis 