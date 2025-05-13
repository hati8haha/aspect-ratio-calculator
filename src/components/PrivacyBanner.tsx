import { useState, useEffect } from 'react';
import {
  PRIVACY_ACCEPTED_KEY,
  ANALYTICS_ENABLED_KEY,
  RECORDING_ENABLED_KEY,
  ENABLE_ANALYTICS_BY_DEFAULT,
  ENABLE_RECORDING_BY_DEFAULT,
} from '../config/analytics';

export const PrivacyBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already accepted the privacy notice
    const hasAccepted = localStorage.getItem(PRIVACY_ACCEPTED_KEY) === 'true';

    if (!hasAccepted) {
      // Show banner after a short delay to avoid immediate popup
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  const acceptPrivacy = () => {
    // Set default privacy preferences (opt-in by default)
    localStorage.setItem(PRIVACY_ACCEPTED_KEY, 'true');
    localStorage.setItem(
      ANALYTICS_ENABLED_KEY,
      ENABLE_ANALYTICS_BY_DEFAULT.toString(),
    );
    localStorage.setItem(
      RECORDING_ENABLED_KEY,
      ENABLE_RECORDING_BY_DEFAULT.toString(),
    );
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-primary text-white p-4 shadow-lg z-50 animate-slideUp">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm md:text-base">
          <p>
            This website uses cookies and visitor recording technologies to
            improve your experience and help us understand how visitors use our
            application. By continuing to use this site, you agree to our use of
            these technologies.
          </p>
        </div>
        <div className="flex gap-2">
          <a
            href="./privacy-policy.html"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-outline border-white text-white hover:bg-white hover:text-primary"
          >
            Privacy Policy
          </a>
          <button
            onClick={acceptPrivacy}
            className="btn btn-sm bg-white text-primary hover:bg-primary-content"
            type="button"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyBanner;
