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
            aria-label="Width"
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
            aria-label="Height"
          />
        </div>
      </div>
    </div>
  );
};

export default DimensionToRatioForm;
