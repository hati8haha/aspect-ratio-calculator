import { useState, useEffect, type ChangeEvent } from 'react';

// Calculate GCD (Greatest Common Divisor) using Euclidean algorithm
const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};

// Approximate equality for floating point numbers
const approxEqual = (a: number, b: number, epsilon = 0.0001): boolean => {
  return Math.abs(a - b) < epsilon;
};

export default function AspectRatioCalculator() {
  const [mode, setMode] = useState('dimension-to-ratio'); // 'dimension-to-ratio', 'width-to-height', 'height-to-width'

  // CSS units
  const cssUnits = [
    'px',
    'rem',
    'em',
    '%',
    'vw',
    'vh',
    'vmin',
    'vmax',
    'cm',
    'mm',
    'in',
    'pt',
    'pc',
  ];

  // Dimension to Ratio mode
  const [width, setWidth] = useState('120');
  const [height, setHeight] = useState('90');
  const [aspectRatio, setAspectRatio] = useState('4:3');
  const [fractionForm, setFractionForm] = useState('4/3');
  const [decimalForm, setDecimalForm] = useState('1.333');

  // Width to Height mode
  const [widthInput, setWidthInput] = useState('120');
  const [ratioWidth, setRatioWidth] = useState('4');
  const [ratioHeight, setRatioHeight] = useState('3');
  const [calculatedHeight, setCalculatedHeight] = useState('90');

  // Height to Width mode
  const [heightInput, setHeightInput] = useState('90');
  const [ratioWidthAlt, setRatioWidthAlt] = useState('4');
  const [ratioHeightAlt, setRatioHeightAlt] = useState('3');
  const [calculatedWidth, setCalculatedWidth] = useState('120');

  // CSS output unit
  const [outputUnit, setOutputUnit] = useState('px');

  // Calculate aspect ratio when width or height changes
  useEffect(() => {
    const calculateAspectRatio = () => {
      const w = Number.parseFloat(width);
      const h = Number.parseFloat(height);

      if (Number.isNaN(w) || Number.isNaN(h) || w <= 0 || h <= 0) {
        setAspectRatio('Invalid input');
        setFractionForm('Invalid input');
        setDecimalForm('Invalid input');
        return;
      }

      // Scale numbers to avoid floating point precision issues
      const scaleFactor = 10000;
      const scaledW = Math.round(w * scaleFactor);
      const scaledH = Math.round(h * scaleFactor);

      const divisor = gcd(scaledW, scaledH);
      const simplifiedW = scaledW / divisor;
      const simplifiedH = scaledH / divisor;

      // Only show whole numbers if they're integers
      const formattedW = approxEqual(simplifiedW, Math.round(simplifiedW))
        ? Math.round(simplifiedW)
        : simplifiedW.toFixed(2);
      const formattedH = approxEqual(simplifiedH, Math.round(simplifiedH))
        ? Math.round(simplifiedH)
        : simplifiedH.toFixed(2);

      setAspectRatio(`${formattedW}:${formattedH}`);
      setFractionForm(`${formattedW}/${formattedH}`);
      setDecimalForm((w / h).toFixed(3));
    };

    calculateAspectRatio();
  }, [width, height]);

  // Calculate height from width and aspect ratio
  useEffect(() => {
    const calculateHeight = () => {
      const w = Number.parseFloat(widthInput);
      const rw = Number.parseFloat(ratioWidth);
      const rh = Number.parseFloat(ratioHeight);

      if (
        Number.isNaN(w) ||
        Number.isNaN(rw) ||
        Number.isNaN(rh) ||
        w <= 0 ||
        rw <= 0 ||
        rh <= 0
      ) {
        setCalculatedHeight('Invalid input');
        return;
      }

      const h = (w * rh) / rw;

      // Format result to 2 decimal places or whole number if it's an integer
      const formattedH = approxEqual(h, Math.round(h))
        ? Math.round(h).toString()
        : h.toFixed(2);
      setCalculatedHeight(formattedH);
    };

    calculateHeight();
  }, [widthInput, ratioWidth, ratioHeight]);

  // Calculate width from height and aspect ratio
  useEffect(() => {
    const calculateWidth = () => {
      const h = Number.parseFloat(heightInput);
      const rw = Number.parseFloat(ratioWidthAlt);
      const rh = Number.parseFloat(ratioHeightAlt);

      if (
        Number.isNaN(h) ||
        Number.isNaN(rw) ||
        Number.isNaN(rh) ||
        h <= 0 ||
        rw <= 0 ||
        rh <= 0
      ) {
        setCalculatedWidth('Invalid input');
        return;
      }

      const w = (h * rw) / rh;

      // Format result to 2 decimal places or whole number if it's an integer
      const formattedW = approxEqual(w, Math.round(w))
        ? Math.round(w).toString()
        : w.toFixed(2);
      setCalculatedWidth(formattedW);
    };

    calculateWidth();
  }, [heightInput, ratioWidthAlt, ratioHeightAlt]);

  const handleWidthChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWidth(e.target.value);
  };

  const handleHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHeight(e.target.value);
  };

  const handleModeChange = (newMode: string) => {
    setMode(newMode);
  };

  // Generate CSS code for the calculated aspect ratio
  const generateCssCode = () => {
    if (
      (mode === 'dimension-to-ratio' && aspectRatio === 'Invalid input') ||
      (mode === 'width-to-height' && calculatedHeight === 'Invalid input') ||
      (mode === 'height-to-width' && calculatedWidth === 'Invalid input')
    ) {
      return '/* Invalid input */';
    }

    // For dimension to ratio mode
    if (mode === 'dimension-to-ratio') {
      return `.element {\n  width: ${width}${outputUnit};\n  height: ${height}${outputUnit};\n  /* Modern browsers */\n  aspect-ratio: ${aspectRatio.replace(':', '/')};\n}`;
    }
    // For width to height mode
    if (mode === 'width-to-height') {
      return `.element {\n  width: ${widthInput}${outputUnit};\n  height: ${calculatedHeight}${outputUnit};\n  /* Modern browsers */\n  aspect-ratio: ${ratioWidth}/${ratioHeight};\n}`;
    }
    // For height to width mode

    return `.element {\n  width: ${calculatedWidth}${outputUnit};\n  height: ${heightInput}${outputUnit};\n  /* Modern browsers */\n  aspect-ratio: ${ratioWidthAlt}/${ratioHeightAlt};\n}`;
  };

  // Generate unit explanation
  const getUnitExplanation = () => {
    return (
      <div className="mt-4 text-xs text-gray-500">
        <p className="font-semibold">About CSS Units:</p>
        <ul className="list-disc pl-5 mt-1">
          <li>
            <span className="font-medium">px</span> - Pixels, absolute units for
            screens
          </li>
          <li>
            <span className="font-medium">rem</span> - Relative to root font
            size (html element)
          </li>
          <li>
            <span className="font-medium">em</span> - Relative to parent font
            size
          </li>
          <li>
            <span className="font-medium">%</span> - Percentage relative to
            parent element
          </li>
          <li>
            <span className="font-medium">vw, vh</span> - Relative to viewport
            width/height (100vw = 100% of viewport width)
          </li>
          <li>
            <span className="font-medium">cm, mm, in, pt, pc</span> - Physical
            measurements (rarely used in web design)
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Aspect Ratio Calculator
      </h1>

      {/* Mode Selector */}
      <div className="w-full mb-6">
        <div className="flex justify-center space-x-2 mb-4">
          <button
            type="button"
            className={`px-4 py-2 rounded-md ${mode === 'dimension-to-ratio' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleModeChange('dimension-to-ratio')}
          >
            Get Ratio
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-md ${mode === 'width-to-height' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleModeChange('width-to-height')}
          >
            Get Height
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-md ${mode === 'height-to-width' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleModeChange('height-to-width')}
          >
            Get Width
          </button>
        </div>
      </div>

      {/* Dimension to Ratio Mode */}
      {mode === 'dimension-to-ratio' && (
        <>
          <div className="flex flex-col w-full mb-6">
            <div className="flex flex-row mb-4">
              <div className="w-1/2 pr-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="width"
                >
                  Width:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="width"
                  type="number"
                  value={width}
                  onChange={handleWidthChange}
                  min="0.01"
                  step="0.01"
                />
              </div>
              <div className="w-1/2 pl-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="height"
                >
                  Height:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="height"
                  type="number"
                  value={height}
                  onChange={handleHeightChange}
                  min="0.01"
                  step="0.01"
                />
              </div>
            </div>
          </div>

          <div className="w-full bg-gray-100 p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-4 text-center">Result</h2>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex justify-between">
                <span className="font-medium">Aspect Ratio:</span>
                <span className="font-bold text-blue-600">{aspectRatio}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Fraction Form:</span>
                <span className="font-bold text-blue-600">{fractionForm}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Decimal Form:</span>
                <span className="font-bold text-blue-600">{decimalForm}</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Width to Height Mode */}
      {mode === 'width-to-height' && (
        <>
          <div className="flex flex-col w-full mb-6">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="widthInput"
              >
                Width:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="widthInput"
                type="number"
                value={widthInput}
                onChange={(e) => setWidthInput(e.target.value)}
                min="0.01"
                step="0.01"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="ratio-width-input"
              >
                Aspect Ratio:
              </label>
              <div className="flex items-center">
                <input
                  id="ratio-width-input"
                  className="shadow appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  value={ratioWidth}
                  onChange={(e) => setRatioWidth(e.target.value)}
                  min="0.01"
                  step="0.01"
                />
                <span className="mx-2">:</span>
                <input
                  className="shadow appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  value={ratioHeight}
                  onChange={(e) => setRatioHeight(e.target.value)}
                  min="0.01"
                  step="0.01"
                  aria-label="Ratio height"
                />
              </div>
            </div>
          </div>

          <div className="w-full bg-gray-100 p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-4 text-center">Result</h2>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex justify-between">
                <span className="font-medium">Calculated Height:</span>
                <span className="font-bold text-blue-600">
                  {calculatedHeight}
                </span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Height to Width Mode */}
      {mode === 'height-to-width' && (
        <>
          <div className="flex flex-col w-full mb-6">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="heightInput"
              >
                Height:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="heightInput"
                type="number"
                value={heightInput}
                onChange={(e) => setHeightInput(e.target.value)}
                min="0.01"
                step="0.01"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="ratio-width-alt-input"
              >
                Aspect Ratio:
              </label>
              <div className="flex items-center">
                <input
                  id="ratio-width-alt-input"
                  className="shadow appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  value={ratioWidthAlt}
                  onChange={(e) => setRatioWidthAlt(e.target.value)}
                  min="0.01"
                  step="0.01"
                />
                <span className="mx-2">:</span>
                <input
                  className="shadow appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  value={ratioHeightAlt}
                  onChange={(e) => setRatioHeightAlt(e.target.value)}
                  min="0.01"
                  step="0.01"
                  aria-label="Ratio height alternative"
                />
              </div>
            </div>
          </div>

          <div className="w-full bg-gray-100 p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-4 text-center">Result</h2>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex justify-between">
                <span className="font-medium">Calculated Width:</span>
                <span className="font-bold text-blue-600">
                  {calculatedWidth}
                </span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* CSS Output Unit Selection */}
      <div className="w-full mt-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="outputUnit"
        >
          CSS Output Unit:
        </label>
        <select
          id="outputUnit"
          className="shadow border rounded w-full py-2 px-3 text-gray-700 bg-gray-100"
          value={outputUnit}
          onChange={(e) => setOutputUnit(e.target.value)}
        >
          {cssUnits.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </div>

      {/* CSS Code Display */}
      <div className="w-full mt-6">
        <h3 className="text-lg font-semibold mb-2">CSS Code:</h3>
        <div className="w-full bg-gray-800 rounded-md p-4 text-white font-mono text-sm">
          <pre>{generateCssCode()}</pre>
        </div>
      </div>

      {/* Unit Explanation */}
      <div className="w-full mt-6 p-4 border border-gray-200 rounded-md">
        {getUnitExplanation()}
      </div>

      <div className="mt-6 text-sm text-gray-600">
        <p className="text-center">
          Select a mode to calculate different aspects of your dimensions.
        </p>
      </div>
    </div>
  );
}
