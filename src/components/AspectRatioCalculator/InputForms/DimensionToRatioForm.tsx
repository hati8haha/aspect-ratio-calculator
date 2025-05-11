import type { ChangeEvent } from 'react';
import type { DimensionToRatioFormProps } from '../../../types';

export const DimensionToRatioForm = ({
  width,
  height,
  onWidthChange,
  onHeightChange,
}: DimensionToRatioFormProps) => {
  const handleWidthChange = (e: ChangeEvent<HTMLInputElement>) => {
    onWidthChange(e.target.value);
  };

  const handleHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    onHeightChange(e.target.value);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row mb-4 gap-4">
        <div className="w-1/2">
          <label
            className="label"
            htmlFor="width"
          >
            <span className="label-text font-medium text-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-secondary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <title>Width Icon</title>
                <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8z" />
                <path d="M12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
              </svg>
              Width:
            </span>
          </label>
          <input
            className="input input-bordered w-full focus:input-primary transition-all duration-300 hover:border-primary/50"
            id="width"
            type="number"
            value={width}
            onChange={handleWidthChange}
            min="0.01"
            step="0.01"
            aria-label="Width"
          />
        </div>
        <div className="w-1/2">
          <label
            className="label"
            htmlFor="height"
          >
            <span className="label-text font-medium text-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-accent" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <title>Height Icon</title>
                <path d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12z" />
                <path d="M15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
              </svg>
              Height:
            </span>
          </label>
          <input
            className="input input-bordered w-full focus:input-primary transition-all duration-300 hover:border-primary/50"
            id="height"
            type="number"
            value={height}
            onChange={handleHeightChange}
            min="0.01"
            step="0.01"
            aria-label="Height"
          />
        </div>
      </div>
    </div>
  );
};

export default DimensionToRatioForm;
