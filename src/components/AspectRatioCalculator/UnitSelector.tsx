import type { UnitSelectorProps } from '../../types';

export const UnitSelector = ({
  selectedUnit,
  units,
  onUnitChange,
}: UnitSelectorProps) => {
  return (
    <div className="w-full mt-6">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="outputUnit"
      >
        CSS Output Unit:
      </label>
      <select
        id="outputUnit"
        className="shadow border rounded w-full py-2 px-3 text-gray-700 bg-gray-100"
        value={selectedUnit}
        onChange={(e) => onUnitChange(e.target.value)}
      >
        {units.map((unit) => (
          <option key={unit} value={unit}>
            {unit}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UnitSelector;
