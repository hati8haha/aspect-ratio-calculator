import { useState } from 'react';
import { useDimensionToRatio } from '../../hooks/useDimensionToRatio';
import { useHeightToWidth } from '../../hooks/useHeightToWidth';
import { useWidthToHeight } from '../../hooks/useWidthToHeight';
import type { CalculatorMode } from '../../types';
import { CSS_UNITS, generateCssCode } from '../../utils/calculations';

import CssCodeDisplay from './CssCodeDisplay';
import DimensionToRatioForm from './InputForms/DimensionToRatioForm';
import HeightToWidthForm from './InputForms/HeightToWidthForm';
import WidthToHeightForm from './InputForms/WidthToHeightForm';
// Import components
import ModeSelector from './ModeSelector';
import ResultDisplay from './ResultDisplay';
import UnitExplanation from './UnitExplanation';
import UnitSelector from './UnitSelector';

export const AspectRatioCalculator = () => {
  // Mode state
  const [mode, setMode] = useState<CalculatorMode>('dimension-to-ratio');

  // CSS output unit
  const [outputUnit, setOutputUnit] = useState('px');

  // Custom hooks for different calculation modes
  const dimensionToRatio = useDimensionToRatio();
  const widthToHeight = useWidthToHeight();
  const heightToWidth = useHeightToWidth();

  // Handle mode change
  const handleModeChange = (newMode: CalculatorMode) => {
    setMode(newMode);
  };

  // Generate CSS code based on the current mode and values
  const cssCode = generateCssCode(
    mode,
    mode === 'width-to-height' ? widthToHeight.width : dimensionToRatio.width,
    mode === 'height-to-width' ? heightToWidth.height : dimensionToRatio.height,
    dimensionToRatio.aspectRatio,
    outputUnit,
    mode === 'width-to-height'
      ? widthToHeight.ratioWidth
      : heightToWidth.ratioWidth,
    mode === 'width-to-height'
      ? widthToHeight.ratioHeight
      : heightToWidth.ratioHeight,
    widthToHeight.calculatedHeight,
    heightToWidth.calculatedWidth,
    heightToWidth.ratioWidth,
    heightToWidth.ratioHeight,
  );

  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto">
      <div className="flex flex-col items-center bg-white rounded-lg shadow-md overflow-hidden">
        <h1 className="text-2xl font-bold my-6 text-center w-full px-6">
          Aspect Ratio Calculator
        </h1>

        {/* Mode Selector */}
        <ModeSelector mode={mode} onModeChange={handleModeChange} />

        {/* Main content - responsive layout */}
        <div className="w-full flex flex-col md:flex-row md:flex-wrap px-6 pb-6">
          {/* Left Column (Form Inputs) */}
          <div className="w-full md:w-1/2 md:pr-4 mb-6 md:mb-0">
            {/* Render the appropriate form based on mode */}
            {mode === 'dimension-to-ratio' && (
              <DimensionToRatioForm
                width={dimensionToRatio.width}
                height={dimensionToRatio.height}
                onWidthChange={dimensionToRatio.setWidth}
                onHeightChange={dimensionToRatio.setHeight}
              />
            )}
            {mode === 'width-to-height' && (
              <WidthToHeightForm
                width={widthToHeight.width}
                ratioWidth={widthToHeight.ratioWidth}
                ratioHeight={widthToHeight.ratioHeight}
                onWidthChange={widthToHeight.setWidth}
                onRatioWidthChange={widthToHeight.setRatioWidth}
                onRatioHeightChange={widthToHeight.setRatioHeight}
              />
            )}
            {mode === 'height-to-width' && (
              <HeightToWidthForm
                height={heightToWidth.height}
                ratioWidth={heightToWidth.ratioWidth}
                ratioHeight={heightToWidth.ratioHeight}
                onHeightChange={heightToWidth.setHeight}
                onRatioWidthChange={heightToWidth.setRatioWidth}
                onRatioHeightChange={heightToWidth.setRatioHeight}
              />
            )}

            {/* CSS Output Unit Selection */}
            <UnitSelector
              selectedUnit={outputUnit}
              units={CSS_UNITS}
              onUnitChange={setOutputUnit}
            />
          </div>

          {/* Right Column (Results) */}
          <div className="w-full md:w-1/2 md:pl-4">
            {/* Results based on mode */}
            <ResultDisplay
              mode={mode}
              aspectRatio={dimensionToRatio.aspectRatio}
              fractionForm={dimensionToRatio.fractionForm}
              decimalForm={dimensionToRatio.decimalForm}
              calculatedHeight={widthToHeight.calculatedHeight}
              calculatedWidth={heightToWidth.calculatedWidth}
            />

            {/* CSS Code Display */}
            <CssCodeDisplay cssCode={cssCode} />
          </div>

          {/* Full Width Footer (Unit Explanation) */}
          <div className="w-full mt-6 p-4 border border-gray-200 rounded-md">
            <UnitExplanation />
          </div>

          <div className="w-full mt-6 text-sm text-gray-600">
            <p className="text-center">
              Select a mode to calculate different aspects of your dimensions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AspectRatioCalculator;
