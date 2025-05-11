import type { ResultDisplayProps } from '../../types';

export const ResultDisplay = ({
  mode,
  aspectRatio,
  fractionForm,
  decimalForm,
  calculatedHeight,
  calculatedWidth,
}: ResultDisplayProps) => {
  if (mode === 'dimension-to-ratio' || mode === 'image-to-ratio') {
    return (
      <div className="w-full result-display">
        <h2 className="card-title text-center text-primary mb-4 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <title>Result Icon</title>
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          Result
        </h2>
        <div className="grid grid-cols-1 gap-3">
          <div className="flex justify-between items-center p-3 rounded-lg bg-white/40 dark:bg-base-200/40 backdrop-blur-sm border border-base-300/30 hover:border-primary/30 transition-all duration-200">
            <span className="text-base-content font-medium">Aspect Ratio:</span>
            <span className="badge badge-primary font-bold px-3 py-3 animate-fade-in shadow-sm">
              {aspectRatio}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 rounded-lg bg-white/40 dark:bg-base-200/40 backdrop-blur-sm border border-base-300/30 hover:border-secondary/30 transition-all duration-200">
            <span className="text-base-content font-medium">
              Fraction Form:
            </span>
            <span className="badge badge-secondary font-bold px-3 py-3 animate-fade-in shadow-sm">
              {fractionForm}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 rounded-lg bg-white/40 dark:bg-base-200/40 backdrop-blur-sm border border-base-300/30 hover:border-accent/30 transition-all duration-200">
            <span className="text-base-content font-medium">Decimal Form:</span>
            <span className="badge badge-accent font-bold px-3 py-3 animate-fade-in shadow-sm">
              {decimalForm}
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'width-to-height') {
    return (
      <div className="w-full result-display">
        <h2 className="card-title text-center text-primary mb-4 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <title>Result Icon</title>
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          Result
        </h2>
        <div className="grid grid-cols-1 gap-3">
          <div className="flex justify-between items-center p-4 rounded-lg bg-white/40 dark:bg-base-200/40 backdrop-blur-sm border border-base-300/30 hover:border-accent/30 hover:shadow-md transition-all duration-200">
            <span className="text-base-content font-medium flex items-center">
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
              Calculated Height:
            </span>
            <span className="badge badge-accent badge-lg font-bold animate-fade-in shadow-sm">
              {calculatedHeight}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full result-display">
      <h2 className="card-title text-center text-primary mb-4 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <title>Result Icon</title>
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
        Result
      </h2>
      <div className="grid grid-cols-1 gap-3">
        <div className="flex justify-between items-center p-4 rounded-lg bg-white/40 dark:bg-base-200/40 backdrop-blur-sm border border-base-300/30 hover:border-secondary/30 hover:shadow-md transition-all duration-200">
          <span className="text-base-content font-medium flex items-center">
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
            Calculated Width:
          </span>
          <span className="badge badge-secondary badge-lg font-bold animate-fade-in shadow-sm">
            {calculatedWidth}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
