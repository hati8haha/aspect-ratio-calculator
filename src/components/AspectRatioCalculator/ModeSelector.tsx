import type { CalculatorMode, ModeSelectorProps } from '../../types';

export const ModeSelector = ({ mode, onModeChange }: ModeSelectorProps) => {
  return (
    <div className="w-full px-6 mb-6">
      <div className="flex justify-center space-x-2 mb-4">
        <button
          type="button"
          className={`px-4 py-2 rounded-md ${mode === 'dimension-to-ratio' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => onModeChange('dimension-to-ratio')}
        >
          Get Ratio
        </button>
        <button
          type="button"
          className={`px-4 py-2 rounded-md ${mode === 'width-to-height' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => onModeChange('width-to-height')}
        >
          Get Height
        </button>
        <button
          type="button"
          className={`px-4 py-2 rounded-md ${mode === 'height-to-width' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => onModeChange('height-to-width')}
        >
          Get Width
        </button>
      </div>
    </div>
  );
};

export default ModeSelector;
