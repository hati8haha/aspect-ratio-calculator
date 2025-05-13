import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  output: {
    // Ensure static assets from the public folder are copied to the dist folder
    copy: {
      patterns: [
        {
          from: './public',
          to: './',
        },
      ],
    },
    // Set the correct base path for GitHub Pages project site
    // This ensures assets are loaded from /aspect-ratio-calculator/ instead of /
    assetPrefix: '/aspect-ratio-calculator/',
  },
  html: {
    title: 'Aspect Ratio Calculator', // Default title
  },
  source: {
    define: {
      // Explicitly define environment variables that should be available in production
      'import.meta.env.PUBLIC_HOTJAR_SITE_ID': JSON.stringify(
        process.env.PUBLIC_HOTJAR_SITE_ID || '3979881',
      ),
    },
  },
});
