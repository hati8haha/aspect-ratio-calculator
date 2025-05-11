import type { CalculatorMode, ModeSelectorProps } from '../../types';
import { useState } from 'react';

export const ModeSelector = ({ mode, onModeChange }: ModeSelectorProps) => {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  
  return (
    <div className="w-full px-6 py-4 bg-transparent backdrop-blur-sm border-b border-base-300/30 transition-all duration-300">
      <div role="tablist" className="tabs-container tabs tabs-boxed flex justify-center p-2 rounded-xl">
        <button 
          type="button"
          role="tab"
          className={`tab transition-all duration-300 font-medium ${
            mode === 'dimension-to-ratio' 
              ? 'tab-active bg-primary text-primary-content' 
              : hoveredTab === 'dimension-to-ratio'
                ? 'bg-primary/10'
                : 'bg-white/70 dark:bg-base-200/70'
          }`}
          onClick={() => onModeChange('dimension-to-ratio')}
          onMouseEnter={() => setHoveredTab('dimension-to-ratio')}
          onMouseLeave={() => setHoveredTab(null)}
          aria-selected={mode === 'dimension-to-ratio'}
        >
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <title>Dimension to Ratio Icon</title>
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Get Ratio
          </span>
        </button>
        <button 
          type="button"
          role="tab"
          className={`tab transition-all duration-300 font-medium ${
            mode === 'width-to-height' 
              ? 'tab-active bg-secondary text-secondary-content' 
              : hoveredTab === 'width-to-height'
                ? 'bg-secondary/10'
                : 'bg-white/70 dark:bg-base-200/70'
          }`}
          onClick={() => onModeChange('width-to-height')}
          onMouseEnter={() => setHoveredTab('width-to-height')}
          onMouseLeave={() => setHoveredTab(null)}
          aria-selected={mode === 'width-to-height'}
        >
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <title>Width to Height Icon</title>
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l7.293 7.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4z" clipRule="evenodd" />
            </svg>
            Get Height
          </span>
        </button>
        <button 
          type="button"
          role="tab"
          className={`tab transition-all duration-300 font-medium ${
            mode === 'height-to-width' 
              ? 'tab-active bg-accent text-accent-content' 
              : hoveredTab === 'height-to-width'
                ? 'bg-accent/10'
                : 'bg-white/70 dark:bg-base-200/70'
          }`}
          onClick={() => onModeChange('height-to-width')}
          onMouseEnter={() => setHoveredTab('height-to-width')}
          onMouseLeave={() => setHoveredTab(null)}
          aria-selected={mode === 'height-to-width'}
        >
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <title>Height to Width Icon</title>
              <path fillRule="evenodd" d="M17 4a1 1 0 00-1-1h-4a1 1 0 000 2h1.586l-7.293 7.293a1 1 0 001.414 1.414L15 6.414V8a1 1 0 002 0V4z" clipRule="evenodd" />
            </svg>
            Get Width
          </span>
        </button>
      </div>
    </div>
  );
};

export default ModeSelector;
