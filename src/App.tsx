import './App.css';
import { useEffect } from 'react';
import AspectRatioCalculator from './components/AspectRatioCalculator';
import PrivacyBanner from './components/PrivacyBanner';
import PrivacySettings from './components/PrivacySettings';
import { useAnalytics } from './hooks/useAnalytics';
import { logEnvironmentInfo } from './utils/debug';

function App() {
  // Initialize website visitor recording and analytics
  useAnalytics();

  useEffect(() => {
    // Log environment variables to help debug issues
    logEnvironmentInfo();

    // Initialize theme from localStorage or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <div className="min-h-screen bg-base-100 transition-colors duration-300">
      {/* React 19 native metadata tags */}
      <title>Aspect Ratio Calculator - Calculate Ratios and Dimensions</title>
      <meta
        name="description"
        content="Easily calculate aspect ratios, convert dimensions (width to height or height to width), and generate CSS code for your projects. Ideal for web designers and developers."
      />
      <meta
        name="keywords"
        content="aspect ratio, calculator, dimensions, CSS, web design, responsive design, width, height"
      />
      <link
        rel="canonical"
        href="https://hati8haha.github.io/aspect-ratio-calculator/"
      />
      <AspectRatioCalculator />
      <PrivacyBanner />
      <PrivacySettings />
    </div>
  );
}

export default App;
