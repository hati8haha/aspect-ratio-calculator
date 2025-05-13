import { useEffect } from 'react';
import {
  HOTJAR_SITE_ID,
  HOTJAR_VERSION,
  ANALYTICS_ENABLED_KEY,
  RECORDING_ENABLED_KEY,
} from '../config/analytics';
import { useHotjar } from './useHotjar';

/**
 * Hook to initialize and manage all analytics services
 */
export const useAnalytics = () => {
  // Initialize Hotjar for visitor recording only if enabled
  useHotjar(HOTJAR_SITE_ID, HOTJAR_VERSION);

  // Set default values for analytics preferences if they don't exist
  useEffect(() => {
    if (localStorage.getItem(ANALYTICS_ENABLED_KEY) === null) {
      localStorage.setItem(ANALYTICS_ENABLED_KEY, 'true');
    }

    if (localStorage.getItem(RECORDING_ENABLED_KEY) === null) {
      localStorage.setItem(RECORDING_ENABLED_KEY, 'true');
    }
  }, []);

  // You can add more analytics services here in the future
  // For example: Google Analytics, Mixpanel, etc.
};
