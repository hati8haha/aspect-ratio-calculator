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
  },
  html: {
    title: 'Aspect Ratio Calculator', // Default title
  },
});
