import type { UnitSelectorProps } from '../../types';

export const UnitSelector = ({
  selectedUnit,
  units,
  onUnitChange,
}: UnitSelectorProps) => {
  return (
    <div className="w-full mt-6 group">
      <label
        className="label"
        htmlFor="outputUnit"
      >
        <span className="label-text font-medium text-sm flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <title>CSS Unit Icon</title>
            <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          CSS Output Unit:
        </span>
      </label>
      <div className="relative">
        <select
          id="outputUnit"
          className="select select-bordered w-full focus:select-primary hover:border-primary/50 transition-all duration-300 appearance-none pr-10"
          value={selectedUnit}
          onChange={(e) => onUnitChange(e.target.value)}
        >
          {units.map((unit) => (
            <option key={unit} value={unit} className="py-2">
              {unit}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-base-content">
          <svg className="fill-current h-4 w-4 group-hover:text-primary transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <title>Dropdown Icon</title>
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default UnitSelector;
