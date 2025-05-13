/**
 * Utility for debugging environment variables
 * This file helps diagnose issues with environment variables in development and production
 */

/**
 * Log environment variables to the console in a safe way
 * Useful for debugging env variable issues in production builds
 */
export const logEnvironmentInfo = () => {
  // Only log in development or when explicitly requested
  if (
    process.env.NODE_ENV !== 'development' &&
    !import.meta.env.PUBLIC_DEBUG_MODE
  ) {
    return;
  }

  console.group('Environment Variables Debug Info');

  console.log('NODE_ENV:', process.env.NODE_ENV);

  // Create a safe representation of the env object
  const safeEnv = {
    // List specific variables you want to debug
    PUBLIC_HOTJAR_SITE_ID: import.meta.env.PUBLIC_HOTJAR_SITE_ID || '(not set)',

    // Add any other environment variables here
    // VITE_SOME_OTHER_VAR: import.meta.env.VITE_SOME_OTHER_VAR || '(not set)',

    // Add information about whether the import.meta.env object exists
    'import.meta.env exists':
      typeof import.meta.env !== 'undefined' ? 'Yes' : 'No',

    // Mode information
    MODE: import.meta.env.MODE,
    PROD: import.meta.env.PROD,
    DEV: import.meta.env.DEV,

    // Add browser/platform info
    userAgent: navigator.userAgent,
  };

  console.table(safeEnv);
  console.groupEnd();
};
