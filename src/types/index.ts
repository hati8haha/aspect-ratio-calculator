// Types used in the aspect ratio calculator components

export type CalculatorMode =
  | 'dimension-to-ratio'
  | 'width-to-height'
  | 'height-to-width';

export interface AspectRatioResult {
  aspectRatio: string;
  fractionForm: string;
  decimalForm: string;
}

export interface DimensionToRatioFormProps {
  width: string;
  height: string;
  onWidthChange: (value: string) => void;
  onHeightChange: (value: string) => void;
}

export interface WidthToHeightFormProps {
  width: string;
  ratioWidth: string;
  ratioHeight: string;
  onWidthChange: (value: string) => void;
  onRatioWidthChange: (value: string) => void;
  onRatioHeightChange: (value: string) => void;
}

export interface HeightToWidthFormProps {
  height: string;
  ratioWidth: string;
  ratioHeight: string;
  onHeightChange: (value: string) => void;
  onRatioWidthChange: (value: string) => void;
  onRatioHeightChange: (value: string) => void;
}

export interface ModeSelectorProps {
  mode: CalculatorMode;
  onModeChange: (mode: CalculatorMode) => void;
}

export interface UnitSelectorProps {
  selectedUnit: string;
  units: string[];
  onUnitChange: (unit: string) => void;
}

export interface ResultDisplayProps {
  mode: CalculatorMode;
  aspectRatio?: string;
  fractionForm?: string;
  decimalForm?: string;
  calculatedHeight?: string;
  calculatedWidth?: string;
}

export interface CssCodeDisplayProps {
  cssCode: string;
}

// Using Record<never, never> instead of empty interface
export type AspectRatioCalculatorProps = Record<never, never>;
