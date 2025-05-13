# Environment Variables for GitHub Pages Deployment

This document explains how to properly set up environment variables for deploying your React application to GitHub Pages, particularly when using RSbuild.

## Issue: Environment Variables in GitHub Pages Deployments

When deploying to GitHub Pages, you might encounter this error:
```
Uncaught TypeError: Cannot read properties of undefined (reading 'PUBLIC_HOTJAR_SITE_ID')
```

This happens because environment variables in RSbuild are handled differently in production builds than in development.

## Solution

There are several parts to the solution:

### 1. Define Environment Variables in RSbuild Config

In your `rsbuild.config.ts`, ensure your environment variables are properly defined for production:

```typescript
export default defineConfig({
  // ... other config options

  source: {
    define: {
      // Explicitly define environment variables that should be available in production
      'import.meta.env.PUBLIC_HOTJAR_SITE_ID': JSON.stringify(process.env.PUBLIC_HOTJAR_SITE_ID || '3979881'),
    },
  ```

### 2. Set Up GitHub Environment Variables

1. Go to your GitHub repository
2. Navigate to Settings > Environments
3. Create a new environment (e.g., "github-pages") or edit an existing one
4. Add an environment variable named `PUBLIC_HOTJAR_SITE_ID` with your Hotjar ID value

### 3. Configure GitHub Actions Workflow

Make sure your `.github/workflows/deploy.yml` passes the environment variables to the build step:

```yaml
- name: Build project
  run: pnpm build
  env:
    PUBLIC_HOTJAR_SITE_ID: 3979881  # Non-sensitive public variable
```

### 4. Handle Environment Variables Safely in Code

Ensure your code handles missing environment variables gracefully:

```typescript
// Use String(value) || fallback pattern
export const HOTJAR_SITE_ID = Number(import.meta.env.PUBLIC_HOTJAR_SITE_ID || '3979881');
```

### 5. Type Definitions (Optional)

Add type definitions for your environment variables in `env.d.ts`:

```typescript
interface ImportMetaEnv {
  readonly PUBLIC_HOTJAR_SITE_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

## RSbuild Environment Variables

RSbuild follows these rules for environment variables:

1. Variables with the `PUBLIC_` prefix are embedded in the client bundle and can be accessed via `import.meta.env.PUBLIC_*`
2. Variables without the `PUBLIC_` prefix are only available on the server side or during build time

For more information, see the [RSbuild documentation on environment variables](https://rsbuild.dev/guide/advanced/env-vars).

## Local Development

For local development, create a `.env.local` file with:

```
PUBLIC_HOTJAR_SITE_ID=your_hotjar_id
```

## Troubleshooting

- Use `logEnvironmentInfo()` from `src/utils/debug.ts` to debug environment variable issues
- Check browser console for any errors related to environment variables
- Verify that client-side environment variables begin with `PUBLIC_` in RSbuild
- Make sure GitHub environment variables are properly configured
