# Environment Variables Setup Guide

This document explains how to set up environment variables for your GitHub Pages deployment.

## Setting up the Hotjar Site ID in GitHub Environment Variables

1. **Navigate to your GitHub repository**
   Go to your GitHub repository at `https://github.com/username/aspect-ratio-calculator`

2. **Go to the Settings tab**
   Click on the "Settings" tab in your repository.

3. **Go to Environments**
   In the left sidebar, click on "Environments".

4. **Create a new environment or select an existing one**
   Click on "New environment" if you don't have one already and name it (e.g., "github-pages").

5. **Add environment variables**
   - Click "Add variable"
   - Name: `PUBLIC_HOTJAR_SITE_ID`
   - Value: `3979881` (or your actual Hotjar Site ID)
   - Click "Add variable"

## How it works

1. The environment variable is stored in your GitHub environment.
2. The GitHub Action workflow accesses this variable during the build process.
3. The environment variable is passed to the build step.
4. RSbuild uses this environment variable in your code via `import.meta.env.PUBLIC_HOTJAR_SITE_ID`.

## Local Development

For local development, you can create a `.env.local` file in the root of your project with the following content:

```
PUBLIC_HOTJAR_SITE_ID=3979881
```

This file should not be committed to your repository (it's in `.gitignore`).

## RSbuild Environment Variables

RSbuild follows these rules for environment variables:

1. Variables with the `PUBLIC_` prefix are embedded in the client bundle and can be accessed via `import.meta.env.PUBLIC_*`
2. Variables without the `PUBLIC_` prefix are only available on the server side or during build time

For more information, see the [RSbuild documentation on environment variables](https://rsbuild.dev/guide/advanced/env-vars).

## Troubleshooting

- If the Hotjar tracking isn't working after deployment, check that the environment variable is correctly set in your GitHub repository environment.
- You can verify the environment variable is correctly set by using the debug utility in development:
  ```typescript
  import { logEnvironmentInfo } from './utils/debug';
  logEnvironmentInfo();
  ```
- Make sure your GitHub workflow file is correctly configured to use the environment variable.
