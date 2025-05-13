import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { ResultDisplayProps } from '../../types';
import { trackCalculation } from '../../utils/analytics';

export const ResultDisplay = ({
  mode,
  aspectRatio,
  fractionForm,
  decimalForm,
  calculatedHeight,
  calculatedWidth,
  ratioWidth,
  ratioHeight,
}: ResultDisplayProps) => {
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  
  // Track successful calculations
  useEffect(() => {
    // Check if we have a valid calculation based on mode
    const hasValidResult = 
      (mode === 'dimension-to-ratio' && aspectRatio && aspectRatio !== 'Invalid input') ||
      (mode === 'width-to-height' && calculatedHeight && calculatedHeight !== 'Invalid input') ||
      (mode === 'height-to-width' && calculatedWidth && calculatedWidth !== 'Invalid input');
    
    if (hasValidResult) {
      trackCalculation(mode);
    }
  }, [mode, aspectRatio, calculatedHeight, calculatedWidth]);

  const copyToClipboard = (value: string, label: string) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopiedValue(label);
      setTimeout(() => setCopiedValue(null), 2000);
    });
  };

  // Visual representation of the aspect ratio
  const RatioVisual = ({ ratio }: { ratio: string }) => {
    if (ratio === 'Invalid input') return null;

    const [width, height] = ratio.split(':').map(Number);
    const scaleFactor = Math.min(180 / width, 120 / height);
    const visualWidth = width * scaleFactor;
    const visualHeight = height * scaleFactor;

    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div
          className="bg-primary/20 border-2 border-primary rounded-md flex items-center justify-center mb-4"
          style={{
            width: `${visualWidth}px`,
            height: `${visualHeight}px`,
            minWidth: '80px',
            minHeight: '60px',
          }}
        >
          <span className="text-sm text-primary-focus font-medium">
            {ratio}
          </span>
        </div>
        <div className="text-center text-sm text-base-content/70">
          <p>Visual representation</p>
          <p>of the aspect ratio</p>
        </div>
      </div>
    );
  };

  interface ResultCardProps {
    label: string;
    value: string;
    color?: string;
    icon?: ReactNode;
    onClick?: (value: string, label: string) => void;
  }

  const ResultCard = ({
    label,
    value,
    color = 'primary',
    icon,
    onClick,
  }: ResultCardProps) => (
    <div
      className={`flex flex-col p-4 rounded-xl bg-white/40 dark:bg-base-200/40 backdrop-blur-sm 
      border border-base-300/30 hover:border-${color}/30 hover:shadow-md transition-all duration-200
      ${onClick ? 'cursor-pointer active:scale-95' : ''}`}
      onClick={onClick ? () => onClick(value, label) : undefined}
      onKeyUp={
        onClick ? (e) => e.key === 'Enter' && onClick(value, label) : undefined
      }
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="flex justify-between items-center">
        <span className="text-base-content font-medium flex items-center text-sm">
          {icon}
          {label}
          {onClick && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 ml-1 text-base-content/50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <title>Click to copy</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          )}
        </span>
        {copiedValue === label && (
          <span className="text-xs bg-success/20 text-success px-2 py-1 rounded-full animate-fade-in">
            Copied!
          </span>
        )}
      </div>
      <div className={`mt-2 text-2xl font-bold text-${color} text-center py-2`}>
        {value}
      </div>
    </div>
  );

  if (mode === 'dimension-to-ratio' || mode === 'image-to-ratio') {
    return (
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column - RatioVisual */}
        <div className="w-full md:w-1/3 flex items-center justify-center">
          {aspectRatio && aspectRatio !== 'Invalid input' ? (
            <RatioVisual ratio={aspectRatio} />
          ) : (
            <div className="flex items-center justify-center h-full text-base-content/50 text-center">
              <p>Enter valid dimensions to see visual representation</p>
            </div>
          )}
        </div>

        {/* Right Column - Result Cards */}
        <div className="w-full md:w-2/3 grid grid-cols-1 gap-4">
          {aspectRatio && (
            <ResultCard
              label="Aspect Ratio"
              value={aspectRatio}
              color="primary"
              onClick={copyToClipboard}
            />
          )}

          {fractionForm && (
            <ResultCard
              label="Fraction Form"
              value={fractionForm}
              color="secondary"
              onClick={copyToClipboard}
            />
          )}

          {decimalForm && (
            <ResultCard
              label="Decimal Form"
              value={decimalForm}
              color="accent"
              onClick={copyToClipboard}
            />
          )}
        </div>
      </div>
    );
  }

  // Icon for height
  const heightIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 mr-2 text-accent"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <title>Height Icon</title>
      <path d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12z" />
      <path d="M15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
    </svg>
  );

  // Icon for width
  const widthIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 mr-2 text-secondary"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <title>Width Icon</title>
      <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8z" />
      <path d="M12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
    </svg>
  );

  // For width-to-height and height-to-width modes
  // Create a simple schematic visual of the dimension being calculated
  interface DimensionVisualProps {
    isHeight?: boolean;
    ratioWidth?: string;
    ratioHeight?: string;
  }

  const DimensionVisual = ({
    isHeight = false,
    ratioWidth,
    ratioHeight,
  }: DimensionVisualProps) => {
    // Skip if we don't have valid ratio values
    if (
      !ratioWidth ||
      !ratioHeight ||
      ratioWidth === 'Invalid input' ||
      ratioHeight === 'Invalid input'
    ) {
      return (
        <div className="flex items-center justify-center h-full text-base-content/50 text-center">
          <p>Enter valid dimensions to see visual representation</p>
        </div>
      );
    }

    // Calculate dimensions for the visual representation
    const rWidth = Number.parseFloat(ratioWidth);
    const rHeight = Number.parseFloat(ratioHeight);
    const scaleFactor = Math.min(180 / rWidth, 120 / rHeight);
    const visualWidth = rWidth * scaleFactor;
    const visualHeight = rHeight * scaleFactor;

    return (
      <div className="flex flex-col items-center justify-center h-full">
        {/* Aspect ratio visual box */}
        <div
          className={`bg-${isHeight ? 'accent' : 'secondary'}/20 border-2 border-${isHeight ? 'accent' : 'secondary'} rounded-md flex items-center justify-center mb-6`}
          style={{
            width: `${visualWidth}px`,
            height: `${visualHeight}px`,
            minWidth: '60px',
            minHeight: '40px',
          }}
        >
          <span
            className={`text-sm text-${isHeight ? 'accent' : 'secondary'}-focus font-medium`}
          >
            {ratioWidth}:{ratioHeight}
          </span>
        </div>

        <div className="text-center text-sm text-base-content/70 mt-1">
          <p>
            Aspect ratio: {ratioWidth}:{ratioHeight}
          </p>
        </div>
      </div>
    );
  };

  if (mode === 'width-to-height') {
    return (
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column - Dimension Visual */}
        <div className="w-full md:w-1/3 flex items-center justify-center">
          <DimensionVisual
            isHeight={true}
            ratioWidth={ratioWidth}
            ratioHeight={ratioHeight}
          />
        </div>

        {/* Right Column - Result Card */}
        <div className="w-full md:w-2/3">
          {calculatedHeight && (
            <ResultCard
              label="Calculated Height"
              value={calculatedHeight}
              color="accent"
              icon={heightIcon}
              onClick={copyToClipboard}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Left Column - Dimension Visual */}
      <div className="w-full md:w-1/3 flex items-center justify-center">
        <DimensionVisual
          isHeight={false}
          ratioWidth={ratioWidth}
          ratioHeight={ratioHeight}
        />
      </div>

      {/* Right Column - Result Card */}
      <div className="w-full md:w-2/3">
        {calculatedWidth && (
          <ResultCard
            label="Calculated Width"
            value={calculatedWidth}
            color="secondary"
            icon={widthIcon}
            onClick={copyToClipboard}
          />
        )}
      </div>
    </div>
  );
};

export default ResultDisplay;
