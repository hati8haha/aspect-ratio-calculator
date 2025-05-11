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
import ModeSelector from './ModeSelector';
import ResultDisplay from './ResultDisplay';
import ThemeToggle from './ThemeToggle';
import UnitExplanation from './UnitExplanation';
import UnitSelector from './UnitSelector';

export const AspectRatioCalculator = () => {
  // Mode state
  const [mode, setMode] = useState<CalculatorMode>('dimension-to-ratio');
  const [formKey, setFormKey] = useState(0); // For animation resets

  // CSS output unit
  const [outputUnit, setOutputUnit] = useState('px');

  // Custom hooks for different calculation modes
  const dimensionToRatio = useDimensionToRatio();
  const widthToHeight = useWidthToHeight();
  const heightToWidth = useHeightToWidth();

  // Handle mode change
  const handleModeChange = (newMode: CalculatorMode) => {
    setMode(newMode);
    setFormKey(prevKey => prevKey + 1); // Trigger animation on mode change
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
    <div className="p-4 md:p-8 max-w-6xl mx-auto transition-colors duration-300">
      <div className="flex flex-col items-center bg-base-200 rounded-lg shadow-lg overflow-hidden card border border-base-300">
        <div className="w-full flex justify-between items-center p-4 bg-gradient-to-r from-[#48CFCB] to-[#229799] text-[#F5F5F5] dark:text-[#F5F5F5]">
          <h1 className="text-2xl font-bold">Aspect Ratio Calculator</h1>
          <ThemeToggle />
        </div>

        {/* Mode Selector */}
        <ModeSelector mode={mode} onModeChange={handleModeChange} />

        {/* Main content - responsive layout */}
        <div className="card-body w-full p-5">
          <div className="flex flex-col md:flex-row md:flex-wrap gap-6">
            {/* Left Column (Form Inputs) */}
            <div key={formKey} className="w-full md:w-[calc(50%-0.75rem)] card bg-base-100 shadow-md border border-base-300 animate-fade-in">
              <div className="card-body">
                <h2 className="card-title text-primary">Enter Values</h2>
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
            </div>

            {/* Right Column (Results) */}
            <div className="w-full md:w-[calc(50%-0.75rem)] flex flex-col gap-6">
              {/* Results based on mode */}
              <div key={`result-${formKey}`} className="card bg-base-100 shadow-md border border-base-300 animate-fade-in">
                <div className="card-body">
                  <ResultDisplay
                    mode={mode}
                    aspectRatio={dimensionToRatio.aspectRatio}
                    fractionForm={dimensionToRatio.fractionForm}
                    decimalForm={dimensionToRatio.decimalForm}
                    calculatedHeight={widthToHeight.calculatedHeight}
                    calculatedWidth={heightToWidth.calculatedWidth}
                  />
                </div>
              </div>

              {/* CSS Code Display */}
              <div key={`css-${formKey}`} className="card bg-base-100 shadow-md border border-base-300 animate-fade-in">
                <div className="card-body">
                  <CssCodeDisplay cssCode={cssCode} />
                </div>
              </div>
            </div>

            {/* Full Width Footer (Unit Explanation) */}
            <div className="w-full card bg-base-100 shadow-md border border-base-300 hover:shadow-lg transition-all">
              <div className="card-body">
                <UnitExplanation />
              </div>
            </div>

            <div className="w-full text-center text-sm text-base-content opacity-70 mt-2 animate-pulse-once">
              <p>
                Select a mode to calculate different aspects of your dimensions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AspectRatioCalculator;
