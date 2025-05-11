import type { CssCodeDisplayProps } from '../../types';

export const CssCodeDisplay = ({ cssCode }: CssCodeDisplayProps) => {
  return (
    <div className="w-full mt-6">
      <h3 className="text-lg font-semibold mb-2">CSS Code:</h3>
      <div className="w-full bg-gray-800 rounded-md p-4 text-white font-mono text-sm">
        <pre>{cssCode}</pre>
      </div>
    </div>
  );
};

export default CssCodeDisplay;
