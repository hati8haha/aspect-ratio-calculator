# Aspect Ratio Calculator

A responsive React-based web application for calculating aspect ratios, dimensions, and generating CSS code. Built with TypeScript, TailwindCSS, and modern development tools like Biome and RSBuild.

## Features

- **Aspect Ratio Calculation**: Calculate aspect ratios from dimensions.
- **Dimension Conversion**: Convert width to height or height to width based on aspect ratios.
- **CSS Code Generation**: Generate CSS code for the calculated dimensions and aspect ratios.
- **Responsive Design**: Fully responsive layout for all devices.
- **Modern Tooling**: Built with TypeScript, TailwindCSS, and RSBuild.
- **User Analytics**: Includes visitor recording and event tracking to improve user experience.
- **Privacy Controls**: Users can manage their privacy preferences and opt out of analytics.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/hati8haha/aspect-ratio-calculator.git
   ```

2. Navigate to the project directory:
   ```bash
   cd aspect-ratio-calculator
   ```

3. Install dependencies:
   ```bash
   pnpm install
   ```

## Development

Start the development server:
```bash
pnpm dev
```

## Build

Build the project for production:
```bash
pnpm build
```

## Preview

Preview the production build:
```bash
pnpm preview
```

## Deployment

This project is automatically deployed to GitHub Pages using GitHub Actions. Any push to the `main` branch triggers a deployment.

## Analytics and Visitor Recording

This project includes analytics and visitor recording via Hotjar to help improve the user experience:

1. Configure analytics by updating the Hotjar Site ID in `.env`:
   ```
    PUBLIC_HOTJAR_SITE_ID=3979881  // replace with your hotjar site id
   ```

2. Analytics features only run in production mode (`process.env.NODE_ENV === 'production'`).

3. Users can opt out of analytics and recording via the privacy settings.

For more details, see the [visitor recording documentation](./docs/visitor-recording.md).

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
