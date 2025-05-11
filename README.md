# Aspect Ratio Calculator

## Overview

The Aspect Ratio Calculator is a React-based web application that helps users calculate aspect ratios and generate corresponding CSS code. It supports three modes:

1. **Dimension to Ratio**: Calculate the aspect ratio from width and height.
2. **Width to Height**: Calculate the height based on a given width and aspect ratio.
3. **Height to Width**: Calculate the width based on a given height and aspect ratio.

The app also provides CSS code snippets for the calculated dimensions and aspect ratios, with support for various CSS units.

## Features

- Calculate aspect ratios in three different modes.
- Generate CSS code for the calculated dimensions and aspect ratios.
- Support for multiple CSS units (e.g., px, rem, em, %, vw, vh, etc.).
- User-friendly interface with real-time updates.

## Setup

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16 or later)
- [pnpm](https://pnpm.io/) (v7 or later)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd aspect-ratio-calculator
   ```

2. Install the dependencies:

   ```bash
   pnpm install
   ```

## Usage

### Start the Development Server

To start the development server and open the app in your default browser:

```bash
pnpm dev
```

### Build for Production

To build the app for production:

```bash
pnpm build
```

The production-ready files will be available in the `dist` directory.

### Preview the Production Build

To preview the production build locally:

```bash
pnpm preview
```

## Project Structure

```
.
├── src/
│   ├── App.css                # Global styles
│   ├── App.tsx                # Main app component
│   ├── AspectRatioCalculator.tsx # Aspect Ratio Calculator component
│   ├── env.d.ts               # TypeScript environment definitions
│   ├── index.tsx              # Entry point
├── package.json               # Project metadata and scripts
├── tsconfig.json              # TypeScript configuration
├── postcss.config.mjs         # PostCSS configuration
├── rsbuild.config.ts          # Rsbuild configuration
├── README.md                  # Project documentation
```

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **TypeScript**: Strongly typed programming language for JavaScript.
- **Rsbuild**: Build tool for modern web applications.
- **Tailwind CSS**: Utility-first CSS framework.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
