import './App.css';
import { useEffect } from 'react';
import AspectRatioCalculator from './components/AspectRatioCalculator';

function App() {
  useEffect(() => {
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
    </div>
  );
}

export default App;
