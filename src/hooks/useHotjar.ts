import { useEffect } from 'react';
import { RECORDING_ENABLED_KEY } from '../config/analytics';

/**
 * Hotjar integration hook
 *
 * @param siteId - Your Hotjar site ID
 * @param version - Hotjar snippet version (default: 6)
 */
export const useHotjar = (siteId: number, version = 6) => {
  useEffect(() => {
    try {
      // Skip Hotjar in development environment
      if (process.env.NODE_ENV !== 'production') {
        console.log('Hotjar disabled in development mode');
        return;
      } // Validate site ID
      if (!siteId || Number.isNaN(siteId) || siteId <= 0) {
        console.warn('Invalid Hotjar site ID, skipping initialization', {
          siteId,
        });
        return;
      }

      // Check if recording is disabled by user preference
      const recordingEnabled = localStorage.getItem(RECORDING_ENABLED_KEY);
      if (recordingEnabled === 'false') {
        console.log('Hotjar recording disabled by user preference');
        return;
      }

      // Initialize Hotjar
      const initHotjar = () => {
        const script = document.createElement('script');
        script.innerHTML = `
          (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:${siteId},hjsv:${version}};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `;
        document.head.appendChild(script);
      };

      // Initialize Hotjar
      initHotjar();
      console.log('Hotjar initialized successfully with site ID:', siteId);

      // Clean up function (optional)
      return () => {
        // Hotjar doesn't provide an official cleanup method
        // If needed in the future, you could remove the script here
      };
    } catch (error) {
      console.error('Error initializing Hotjar:', error);
    }
  }, [siteId, version]);
};
