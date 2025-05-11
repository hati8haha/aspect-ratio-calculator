// Math utility functions for aspect ratio calculations

/**
 * Calculate Greatest Common Divisor (GCD) using Euclidean algorithm
 */
export const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};

/**
 * Check if two floating point numbers are approximately equal
 */
export const approxEqual = (
  a: number,
  b: number,
  epsilon = 0.0001,
): boolean => {
  return Math.abs(a - b) < epsilon;
};

/**
 * Calculate aspect ratio from width and height
 * Returns an object with different representations of the aspect ratio
 */
export const calculateAspectRatio = (width: number, height: number) => {
  if (
    Number.isNaN(width) ||
    Number.isNaN(height) ||
    width <= 0 ||
    height <= 0
  ) {
    return {
      aspectRatio: 'Invalid input',
      fractionForm: 'Invalid input',
      decimalForm: 'Invalid input',
    };
  }

  // Scale numbers to avoid floating point precision issues
  const scaleFactor = 10000;
  const scaledW = Math.round(width * scaleFactor);
  const scaledH = Math.round(height * scaleFactor);

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

  return {
    aspectRatio: `${formattedW}:${formattedH}`,
    fractionForm: `${formattedW}/${formattedH}`,
    decimalForm: (width / height).toFixed(3),
  };
};

/**
 * Calculate height from width and aspect ratio
 */
export const calculateHeightFromWidth = (
  width: number,
  ratioWidth: number,
  ratioHeight: number,
) => {
  if (
    Number.isNaN(width) ||
    Number.isNaN(ratioWidth) ||
    Number.isNaN(ratioHeight) ||
    width <= 0 ||
    ratioWidth <= 0 ||
    ratioHeight <= 0
  ) {
    return 'Invalid input';
  }

  const height = (width * ratioHeight) / ratioWidth;

  // Format result to 2 decimal places or whole number if it's an integer
  return approxEqual(height, Math.round(height))
    ? Math.round(height).toString()
    : height.toFixed(2);
};

/**
 * Calculate width from height and aspect ratio
 */
export const calculateWidthFromHeight = (
  height: number,
  ratioWidth: number,
  ratioHeight: number,
) => {
  if (
    Number.isNaN(height) ||
    Number.isNaN(ratioWidth) ||
    Number.isNaN(ratioHeight) ||
    height <= 0 ||
    ratioWidth <= 0 ||
    ratioHeight <= 0
  ) {
    return 'Invalid input';
  }

  const width = (height * ratioWidth) / ratioHeight;

  // Format result to 2 decimal places or whole number if it's an integer
  return approxEqual(width, Math.round(width))
    ? Math.round(width).toString()
    : width.toFixed(2);
};

/**
 * Generate CSS code for the calculated aspect ratio
 */
export const generateCssCode = (
  mode: string,
  width: string,
  height: string,
  aspectRatio: string,
  outputUnit: string,
  ratioWidth: string,
  ratioHeight: string,
  calculatedHeight: string,
  calculatedWidth: string,
  ratioWidthAlt: string,
  ratioHeightAlt: string,
) => {
  if (
    (mode === 'dimension-to-ratio' && aspectRatio === 'Invalid input') ||
    (mode === 'width-to-height' && calculatedHeight === 'Invalid input') ||
    (mode === 'height-to-width' && calculatedWidth === 'Invalid input')
  ) {
    return '/* Invalid input */';
  }

  // For dimension to ratio mode
  if (mode === 'dimension-to-ratio') {
    return `.element {
  width: ${width}${outputUnit};
  height: ${height}${outputUnit};
  /* Modern browsers */
  aspect-ratio: ${aspectRatio.replace(':', '/')};
}`;
  }

  // For width to height mode
  if (mode === 'width-to-height') {
    return `.element {
  width: ${width}${outputUnit};
  height: ${calculatedHeight}${outputUnit};
  /* Modern browsers */
  aspect-ratio: ${ratioWidth}/${ratioHeight};
}`;
  }

  // For height to width mode
  return `.element {
  width: ${calculatedWidth}${outputUnit};
  height: ${height}${outputUnit};
  /* Modern browsers */
  aspect-ratio: ${ratioWidthAlt}/${ratioHeightAlt};
}`;
};

// CSS units list
export const CSS_UNITS = [
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
