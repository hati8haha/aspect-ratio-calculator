/**
 * Analytics configuration for the application
 * Update these values with your actual API keys and settings
 */

// Analytics service IDs
export const HOTJAR_SITE_ID = Number(
  process.env.PUBLIC_HOTJAR_SITE_ID || '3979881',
); // Use env var or fallback
export const HOTJAR_VERSION = 6; // Hotjar script version

// Feature flags
export const ENABLE_ANALYTICS_BY_DEFAULT = true;
export const ENABLE_RECORDING_BY_DEFAULT = true;

// Privacy settings
export const PRIVACY_SETTINGS_KEY = 'privacy-settings';
export const PRIVACY_ACCEPTED_KEY = 'privacy-accepted';
export const ANALYTICS_ENABLED_KEY = 'analytics-enabled';
export const RECORDING_ENABLED_KEY = 'recording-enabled';

// Events to track
export const EVENTS = {
  // Calculation events
  CALCULATION_COMPLETE: 'calculation_complete',

  // UI interaction events
  CSS_CODE_COPIED: 'css_code_copied',
  THEME_TOGGLED: 'theme_toggled',
  MODE_CHANGED: 'mode_changed',

  // Form interaction events
  INPUT_CHANGED: 'input_changed',

  // User engagement events
  PRIVACY_SETTINGS_CHANGED: 'privacy_settings_changed',
};
