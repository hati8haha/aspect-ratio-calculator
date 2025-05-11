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
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="heightInput"
        >
          Height:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            value={ratioWidth}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onRatioWidthChange(e.target.value)
            }
            min="0.01"
            step="0.01"
            aria-label="Ratio width alternative"
          />
          <span className="mx-2">:</span>
          <input
            className="shadow appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            value={ratioHeight}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onRatioHeightChange(e.target.value)
            }
            min="0.01"
            step="0.01"
            aria-label="Ratio height alternative"
          />
        </div>
      </div>
    </div>
  );
};

export default HeightToWidthForm;
