import type { UnitSelectorProps } from '../../types';

export const UnitSelector = ({
  selectedUnit,
  units,
  onUnitChange,
}: UnitSelectorProps) => {
  return (
    <div className="w-full mt-6 group">
      <div className="flex items-center">
        <label
          className="label-text font-medium text-sm flex items-center whitespace-nowrap mr-2"
          htmlFor="outputUnit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1 text-primary"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <title>CSS Unit Icon</title>
            <path
              fillRule="evenodd"
              d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          CSS Output Unit:
        </label>
        <div className="relative flex-1">
          <select
            id="outputUnit"
            className="select select-bordered w-full focus:select-primary hover:border-primary/50 transition-all duration-300"
            value={selectedUnit}
            onChange={(e) => onUnitChange(e.target.value)}
          >
            {units.map((unit) => (
              <option key={unit} value={unit} className="py-2">
                {unit}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default UnitSelector;
