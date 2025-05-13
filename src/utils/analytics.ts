import { 
  ANALYTICS_ENABLED_KEY, 
  EVENTS 
} from '../config/analytics';

// Hotjar window type
interface HotjarWindow extends Window {
  hj?: (event: string, name: string) => void;
}

/**
 * Check if analytics are enabled by user preference
 */
const isAnalyticsEnabled = (): boolean => {
  // In development, always log to console
  if (process.env.NODE_ENV !== 'production') {
    return true;
  }
  
  // Check user preference
  const analyticsEnabled = localStorage.getItem(ANALYTICS_ENABLED_KEY);
  // If not explicitly disabled, assume it's enabled
  return analyticsEnabled !== 'false';
};

/**
 * Track a specific event in Hotjar
 * 
 * @param eventName - The name of the event to track
 */
export const trackEvent = (eventName: string) => {
  if (!isAnalyticsEnabled()) {
    return;
  }
  
  if (typeof window !== 'undefined') {
    // Get the Hotjar API from the window object
    const hotjarWindow = window as HotjarWindow;
    
    if (hotjarWindow.hj) {
      hotjarWindow.hj('event', eventName);
    } else if (process.env.NODE_ENV !== 'production') {
      console.log(`[Analytics] Tracked event: ${eventName}`);
    }
  }
};

/**
 * Track when users complete a calculation
 * 
 * @param mode - The calculator mode used
 */
export const trackCalculation = (mode: string) => {
  trackEvent(`${EVENTS.CALCULATION_COMPLETE}_${mode}`);
};

/**
 * Track when users copy CSS code
 */
export const trackCssCopy = () => {
  trackEvent(EVENTS.CSS_CODE_COPIED);
};

/**
 * Track when users toggle theme
 * 
 * @param theme - The new theme ('light' or 'dark')
 */
export const trackThemeToggle = (theme: string) => {
  trackEvent(`${EVENTS.THEME_TOGGLED}_${theme}`);
};

/**
 * Track when users change calculator mode
 * 
 * @param mode - The new calculator mode
 */
export const trackModeChange = (mode: string) => {
  trackEvent(`${EVENTS.MODE_CHANGED}_${mode}`);
};
