import { useState } from 'react';
import { useDimensionToRatio } from '../../hooks/useDimensionToRatio';
import { useHeightToWidth } from '../../hooks/useHeightToWidth';
import { useWidthToHeight } from '../../hooks/useWidthToHeight';
import type { CalculatorMode } from '../../types';

import CssCodeDisplay from './CssCodeDisplay';
import ImageInput from './ImageInput.tsx'; // Ensure this path is correct and the file exists
import DimensionToRatioForm from './InputForms/DimensionToRatioForm';
import HeightToWidthForm from './InputForms/HeightToWidthForm';
import WidthToHeightForm from './InputForms/WidthToHeightForm';
import ModeSelector from './ModeSelector';
import ResultDisplay from './ResultDisplay';
import ThemeToggle from './ThemeToggle';
import UnitExplanation from './UnitExplanation';

export const AspectRatioCalculator = () => {
  // Mode state
  const [mode, setMode] = useState<CalculatorMode>('dimension-to-ratio');
  const [formKey, setFormKey] = useState(0); // For animation resets

  // Custom hooks for different calculation modes
  const dimensionToRatio = useDimensionToRatio();
  const widthToHeight = useWidthToHeight();
  const heightToWidth = useHeightToWidth();

  // Handle mode change
  const handleModeChange = (newMode: CalculatorMode) => {
    setMode(newMode);
    setFormKey((prevKey) => prevKey + 1); // Trigger animation on mode change
    // Reset inputs when mode changes to or from image-to-ratio
    if (newMode === 'image-to-ratio' || mode === 'image-to-ratio') {
      dimensionToRatio.setWidth('');
      dimensionToRatio.setHeight('');
    }
  };

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
          <div className="flex flex-col gap-6">
            {/* First row: Input Form (Full Width) */}
            <div className="w-full card bg-base-100 shadow-md border border-base-300 animate-fade-in">
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
                {mode === 'image-to-ratio' && (
                  <ImageInput
                    onImageLoad={(width: number, height: number) => {
                      dimensionToRatio.setWidth(width.toString());
                      dimensionToRatio.setHeight(height.toString());
                    }}
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
              </div>
            </div>

            {/* Second row: Results (RatioVisual on left, Result cards on right) */}
            <div
              key={`result-${formKey}`}
              className="w-full card bg-base-100 shadow-md border border-base-300 animate-fade-in"
            >
              <div className="card-body">
                <h2 className="card-title text-primary">Results</h2>
                <ResultDisplay
                  mode={mode}
                  aspectRatio={dimensionToRatio.aspectRatio}
                  fractionForm={dimensionToRatio.fractionForm}
                  decimalForm={dimensionToRatio.decimalForm}
                  calculatedHeight={widthToHeight.calculatedHeight}
                  calculatedWidth={heightToWidth.calculatedWidth}
                  ratioWidth={
                    mode === 'width-to-height'
                      ? widthToHeight.ratioWidth
                      : mode === 'height-to-width'
                        ? heightToWidth.ratioWidth
                        : undefined
                  }
                  ratioHeight={
                    mode === 'width-to-height'
                      ? widthToHeight.ratioHeight
                      : mode === 'height-to-width'
                        ? heightToWidth.ratioHeight
                        : undefined
                  }
                />
              </div>
            </div>

            {/* Third row: CSS Code Display and Unit Explanation */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left Column (CSS Code Display) */}
              <div
                key={`css-${formKey}`}
                className="w-full md:w-1/2 card bg-base-100 shadow-md border border-base-300 animate-fade-in"
              >
                <div className="card-body">
                  <CssCodeDisplay
                    mode={mode}
                    width={
                      mode === 'width-to-height'
                        ? widthToHeight.width
                        : dimensionToRatio.width
                    }
                    height={
                      mode === 'height-to-width'
                        ? heightToWidth.height
                        : dimensionToRatio.height
                    }
                    aspectRatio={dimensionToRatio.aspectRatio}
                    ratioWidth={
                      mode === 'width-to-height'
                        ? widthToHeight.ratioWidth
                        : heightToWidth.ratioWidth
                    }
                    ratioHeight={
                      mode === 'width-to-height'
                        ? widthToHeight.ratioHeight
                        : heightToWidth.ratioHeight
                    }
                    calculatedHeight={widthToHeight.calculatedHeight}
                    calculatedWidth={heightToWidth.calculatedWidth}
                  />
                </div>
              </div>

              {/* Right Column (Unit Explanation) */}
              <div className="w-full md:w-1/2 card bg-base-100 shadow-md border border-base-300 hover:shadow-lg transition-all">
                <div className="card-body">
                  <UnitExplanation />
                </div>
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
