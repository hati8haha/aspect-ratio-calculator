# Website Visitor Recording Documentation

This document explains how the visitor recording feature is implemented in the Aspect Ratio Calculator application.

## Overview

The visitor recording feature uses Hotjar to record user sessions, providing insights into how users interact with the application. This helps identify usability issues and improve the user experience.

## Implementation

The feature consists of several components:

1. **Configuration** (`src/config/analytics.ts`): Central place for analytics-related settings
2. **Hotjar Hook** (`src/hooks/useHotjar.ts`): Custom hook that initializes Hotjar
3. **Analytics Hook** (`src/hooks/useAnalytics.ts`): Manages all analytics services
4. **Analytics Utilities** (`src/utils/analytics.ts`): Functions for tracking specific events
5. **Privacy Components**:
   - `PrivacyBanner`: Informs users about data collection
   - `PrivacySettings`: Allows users to manage their privacy preferences

## Usage

### Tracking Events

To track user interactions, import the appropriate tracking function from `utils/analytics.ts`:

```typescript
import { trackEvent, trackCalculation, trackCssCopy } from '../utils/analytics';

// Track a specific event
trackEvent('custom_event_name');

// Track a calculation
trackCalculation('width-to-height');

// Track when CSS is copied
trackCssCopy();
```

### Adding New Events

To add new tracking events:

1. Add the event name to the `EVENTS` object in `config/analytics.ts`
2. Create a tracking function in `utils/analytics.ts`
3. Import and use the tracking function in your component

## Privacy Considerations

The implementation respects user privacy preferences:

- Users are informed about data collection via the privacy banner
- Users can opt out of analytics and recording
- No personal information is collected
- Sensitive input data is not recorded

## Hotjar Dashboard

Access the Hotjar dashboard at [https://www.hotjar.com/](https://www.hotjar.com/) to view:

- Session recordings
- Heatmaps
- User feedback
- Conversion funnels

## Troubleshooting

If recordings are not appearing in the Hotjar dashboard:

1. Ensure the correct Hotjar Site ID is set in `config/analytics.ts`
2. Check that `process.env.NODE_ENV === 'production'` in production environment
3. Verify user has not disabled recording in privacy settings
4. Check browser console for any Hotjar-related errors

## Future Improvements

- Add more analytics services (Google Analytics, Mixpanel, etc.)
- Implement event sampling for high-traffic scenarios
- Add more detailed user flow tracking
- Implement A/B testing capabilities
