import type { ChangeEvent } from 'react';
import type { HeightToWidthFormProps } from '../../../types';

export const HeightToWidthForm = ({
  height,
  ratioWidth,
  ratioHeight,
  onHeightChange,
  onRatioWidthChange,
  onRatioHeightChange,
}: HeightToWidthFormProps) => {
  return (
    <div className="flex flex-col w-full">
      <div className="mb-4">
        <label
          className="label"
          htmlFor="heightInput"
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
          id="heightInput"
          type="number"
          value={height}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onHeightChange(e.target.value)
          }
          min="0.01"
          step="0.01"
          aria-label="Height input"
        />
      </div>
      <div className="mb-4">
        <label
          className="label"
          htmlFor="ratio-width-alt-input"
        >
          <span className="label-text font-medium text-sm flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <title>Aspect Ratio Icon</title>
              <path fillRule="evenodd" d="M5 4a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V5a1 1 0 00-1-1H5zm0 2h10v7H5V6z" clipRule="evenodd" />
            </svg>
            Aspect Ratio:
          </span>
        </label>
        <div className="flex items-center gap-2">
          <div className="relative w-1/3 group">
            <input
              id="ratio-width-alt-input"
              className="input input-bordered w-full focus:input-secondary transition-all duration-300 hover:border-secondary/50 pr-1"
              type="number"
              value={ratioWidth}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                onRatioWidthChange(e.target.value)
              }
              min="0.01"
              step="0.01"
              aria-label="Ratio width alternative"
            />
            <span className="absolute text-xs text-base-content/60 top-1 right-3 group-hover:text-secondary transition-colors duration-200">W</span>
          </div>
          <span className="text-base-content font-bold">:</span>
          <div className="relative w-1/3 group">
            <input
              className="input input-bordered w-full focus:input-accent transition-all duration-300 hover:border-accent/50 pr-1"
              type="number"
              value={ratioHeight}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                onRatioHeightChange(e.target.value)
              }
              min="0.01"
              step="0.01"
              aria-label="Ratio height alternative"
            />
            <span className="absolute text-xs text-base-content/60 top-1 right-3 group-hover:text-accent transition-colors duration-200">H</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeightToWidthForm;
