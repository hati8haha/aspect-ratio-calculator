import { useEffect, useState } from 'react';
import type { AspectRatioResult } from '../types';
import { calculateAspectRatio } from '../utils/calculations';

/**
 * Custom hook for handling dimension to ratio calculations
 */
export const useDimensionToRatio = (
  initialWidth = '120',
  initialHeight = '90',
) => {
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [result, setResult] = useState<AspectRatioResult>({
    aspectRatio: '4:3',
    fractionForm: '4/3',
    decimalForm: '1.333',
  });

  useEffect(() => {
    const w = Number.parseFloat(width);
    const h = Number.parseFloat(height);
    setResult(calculateAspectRatio(w, h));
  }, [width, height]);

  return {
    width,
    height,
    setWidth,
    setHeight,
    ...result,
  };
};
