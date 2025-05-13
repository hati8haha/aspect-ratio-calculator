# Environment Variables Setup Guide

This document explains how to set up environment variables for your GitHub Pages deployment.

## Setting up the Hotjar Site ID in GitHub Secrets

1. **Navigate to your GitHub repository**
   Go to your GitHub repository at `https://github.com/username/aspect-ratio-calculator`

2. **Go to the Settings tab**
   Click on the "Settings" tab in your repository.

3. **Go to Secrets and variables > Actions**
   In the left sidebar, click on "Secrets and variables" and then select "Actions".

4. **Add a new repository secret**
   Click on the "New repository secret" button.

5. **Create the HOTJAR_SITE_ID secret**
   - Name: `HOTJAR_SITE_ID`
   - Value: `3979881` (or your actual Hotjar Site ID)
   - Click "Add secret"

## How it works

1. The secret is stored securely in GitHub.
2. The GitHub Action workflow accesses this secret during the build process.
3. The secret is passed as an environment variable to the build step.
4. Vite uses this environment variable in your code via `import.meta.env.VITE_HOTJAR_SITE_ID`.

## Local Development

For local development, you can create a `.env.local` file in the root of your project with the following content:

```
VITE_HOTJAR_SITE_ID=3979881
```

This file should not be committed to your repository (it's in `.gitignore`).

## Troubleshooting

- If the Hotjar tracking isn't working after deployment, check that the secret is correctly set in your GitHub repository.
- You can verify the environment variable is correctly set by logging it to the console (for debugging only, remove afterwards):
  ```typescript
  console.log('Hotjar Site ID:', import.meta.env.VITE_HOTJAR_SITE_ID);
  ```
- Make sure your GitHub workflow file is correctly configured to use the secret.
