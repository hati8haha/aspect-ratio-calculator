import { useEffect, useState } from 'react';
import { calculateWidthFromHeight } from '../utils/calculations';

/**
 * Custom hook for handling height to width calculations
 */
export const useHeightToWidth = (
  initialHeight = '90',
  initialRatioWidth = '4',
  initialRatioHeight = '3',
) => {
  const [height, setHeight] = useState(initialHeight);
  const [ratioWidth, setRatioWidth] = useState(initialRatioWidth);
  const [ratioHeight, setRatioHeight] = useState(initialRatioHeight);
  const [calculatedWidth, setCalculatedWidth] = useState('120');

  useEffect(() => {
    const h = Number.parseFloat(height);
    const rw = Number.parseFloat(ratioWidth);
    const rh = Number.parseFloat(ratioHeight);

    setCalculatedWidth(calculateWidthFromHeight(h, rw, rh));
  }, [height, ratioWidth, ratioHeight]);

  return {
    height,
    ratioWidth,
    ratioHeight,
    calculatedWidth,
    setHeight,
    setRatioWidth,
    setRatioHeight,
  };
};
