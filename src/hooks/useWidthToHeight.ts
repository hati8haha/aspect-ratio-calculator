import { useEffect, useState } from 'react';
import { calculateHeightFromWidth } from '../utils/calculations';

/**
 * Custom hook for handling width to height calculations
 */
export const useWidthToHeight = (
  initialWidth = '120',
  initialRatioWidth = '4',
  initialRatioHeight = '3',
) => {
  const [width, setWidth] = useState(initialWidth);
  const [ratioWidth, setRatioWidth] = useState(initialRatioWidth);
  const [ratioHeight, setRatioHeight] = useState(initialRatioHeight);
  const [calculatedHeight, setCalculatedHeight] = useState('90');

  useEffect(() => {
    const w = Number.parseFloat(width);
    const rw = Number.parseFloat(ratioWidth);
    const rh = Number.parseFloat(ratioHeight);

    setCalculatedHeight(calculateHeightFromWidth(w, rw, rh));
  }, [width, ratioWidth, ratioHeight]);

  return {
    width,
    ratioWidth,
    ratioHeight,
    calculatedHeight,
    setWidth,
    setRatioWidth,
    setRatioHeight,
  };
};
