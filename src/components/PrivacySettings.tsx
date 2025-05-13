import { useState, useEffect } from 'react';
import {
  PRIVACY_ACCEPTED_KEY,
  ANALYTICS_ENABLED_KEY,
  RECORDING_ENABLED_KEY,
  EVENTS,
} from '../config/analytics';
import { trackEvent } from '../utils/analytics';

// Hotjar window type
interface HotjarWindow extends Window {
  hj?: (method: string, ...args: unknown[]) => void;
}

export const PrivacySettings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState<boolean>(true);
  const [recordingEnabled, setRecordingEnabled] = useState<boolean>(true);

  useEffect(() => {
    // Load saved preferences
    const savedAnalytics = localStorage.getItem(ANALYTICS_ENABLED_KEY);
    const savedRecording = localStorage.getItem(RECORDING_ENABLED_KEY);

    if (savedAnalytics !== null) {
      setAnalyticsEnabled(savedAnalytics === 'true');
    }

    if (savedRecording !== null) {
      setRecordingEnabled(savedRecording === 'true');
    }
  }, []);

  const savePreferences = () => {
    localStorage.setItem(ANALYTICS_ENABLED_KEY, analyticsEnabled.toString());
    localStorage.setItem(RECORDING_ENABLED_KEY, recordingEnabled.toString());
    localStorage.setItem(PRIVACY_ACCEPTED_KEY, 'true');

    // Track privacy settings changes
    trackEvent(
      `${EVENTS.PRIVACY_SETTINGS_CHANGED}_analytics_${analyticsEnabled}`,
    );
    trackEvent(
      `${EVENTS.PRIVACY_SETTINGS_CHANGED}_recording_${recordingEnabled}`,
    );

    // Apply preferences to Hotjar
    try {
      const hotjarWindow = window as HotjarWindow;

      if (hotjarWindow.hj) {
        if (!recordingEnabled) {
          // This tells Hotjar to stop recording this user
          hotjarWindow.hj('consent', 'no');
        } else {
          hotjarWindow.hj('consent', 'yes');
        }
      }
    } catch (e) {
      console.error('Error setting Hotjar consent', e);
    }

    setIsOpen(false);

    // Reload the page to ensure settings take effect if recording was disabled or enabled
    if (window.location) {
      window.location.reload();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-primary text-white rounded-full h-10 w-10 shadow-lg flex items-center justify-center hover:bg-primary-focus transition-colors z-50"
        aria-label="Privacy Settings"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <title>Privacy Settings</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"
          />
        </svg>
      </button>
    );
  }
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-base-100 rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold text-primary mb-4">
          Privacy Settings
        </h2>

        <div className="space-y-4">
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Enable Analytics</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={analyticsEnabled}
                onChange={(e) => setAnalyticsEnabled(e.target.checked)}
              />
            </label>
            <p className="text-xs text-base-content/70 mt-1">
              Collects anonymous data about how you use the calculator to help
              us improve it.
            </p>
          </div>

          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Enable Session Recording</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={recordingEnabled}
                onChange={(e) => setRecordingEnabled(e.target.checked)}
              />
            </label>
            <p className="text-xs text-base-content/70 mt-1">
              Records your interactions with the calculator to help us
              understand how you use it. Personal information is automatically
              masked.
            </p>
          </div>

          <div className="form-control mt-6">
            <a
              href="./privacy-policy.html"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-primary text-sm"
            >
              Learn more in our Privacy Policy
            </a>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={() => setIsOpen(false)}
            className="btn btn-outline btn-sm"
            type="button"
          >
            Cancel
          </button>
          <button
            onClick={savePreferences}
            className="btn btn-primary btn-sm"
            type="button"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;
