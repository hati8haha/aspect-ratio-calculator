import type { ResultDisplayProps } from '../../types';

export const ResultDisplay = ({
  mode,
  aspectRatio,
  fractionForm,
  decimalForm,
  calculatedHeight,
  calculatedWidth,
}: ResultDisplayProps) => {
  if (mode === 'dimension-to-ratio') {
    return (
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
    );
  }

  if (mode === 'width-to-height') {
    return (
      <div className="w-full bg-gray-100 p-4 rounded-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Result</h2>
        <div className="grid grid-cols-1 gap-2">
          <div className="flex justify-between">
            <span className="font-medium">Calculated Height:</span>
            <span className="font-bold text-blue-600">{calculatedHeight}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-100 p-4 rounded-md">
      <h2 className="text-xl font-semibold mb-4 text-center">Result</h2>
      <div className="grid grid-cols-1 gap-2">
        <div className="flex justify-between">
          <span className="font-medium">Calculated Width:</span>
          <span className="font-bold text-blue-600">{calculatedWidth}</span>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
