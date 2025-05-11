import { useState } from 'react';
import type { CssCodeDisplayProps } from '../../types';

type CssToken = {
  text: string;
  type: 'property' | 'separator' | 'value' | 'punctuation' | 'normal';
};

export const CssCodeDisplay = ({ cssCode }: CssCodeDisplayProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Parse CSS code into tokens for safe rendering
  const parseCssToTokens = (code: string): CssToken[] => {
    const tokens: CssToken[] = [];
    
    // Split the CSS code into lines for processing
    const lines = code.split('\n');
    
    lines.forEach((line, lineIndex) => {
      // Add a line break token if not the first line
      if (lineIndex > 0) {
        tokens.push({ text: '\n', type: 'normal' });
      }
      
      // Skip empty lines
      if (!line.trim()) {
        return;
      }
      
      // Match CSS properties, values, and punctuation
      const propertyRegex = /([a-zA-Z-]+)(\s*:\s*)([^;]+)(;?)/g;
      const punctuationRegex = /(@[a-zA-Z-]+|\{|\}|,|\(|\))/g;
      
      // Try to match a CSS property pattern
      const propertyMatch = propertyRegex.exec(line);
      
      if (propertyMatch) {
        // Property name
        tokens.push({ text: propertyMatch[1], type: 'property' });
        
        // Separator (:)
        tokens.push({ text: propertyMatch[2], type: 'separator' });
        
        // Value
        tokens.push({ text: propertyMatch[3], type: 'value' });
        
        // Semicolon (;)
        if (propertyMatch[4]) {
          tokens.push({ text: propertyMatch[4], type: 'punctuation' });
        }
      } else {
        // Check for punctuation
        const fullText = line;
        let lastIndex = 0;
        
        punctuationRegex.lastIndex = 0;
        let punctuationMatch: RegExpExecArray | null;
        
        // Process matches one at a time
        punctuationMatch = punctuationRegex.exec(fullText);
        while (punctuationMatch !== null) {
          // Add text before the punctuation
          if (punctuationMatch.index > lastIndex) {
            tokens.push({
              text: fullText.substring(lastIndex, punctuationMatch.index),
              type: 'normal'
            });
          }
          
          // Add the punctuation token
          tokens.push({
            text: punctuationMatch[0],
            type: 'punctuation'
          });
          
          lastIndex = punctuationRegex.lastIndex;
          
          // Get next match
          punctuationMatch = punctuationRegex.exec(fullText);
        }
      }
    });
    
    return tokens;
  };

  // Render a token with appropriate styling
  const renderToken = (token: CssToken, index: number) => {
    const tokenStyles: Record<string, string> = {
      property: 'text-[#A5D6FF] dark:text-[#88DDFF]',
      separator: 'text-[#E1E1E1] dark:text-[#E1E1E1]',
      value: 'text-[#FFAB70] dark:text-[#FFCC95]',
      punctuation: 'text-[#F97583] dark:text-[#FF7B93]',
      normal: ''
    };
    
    return (
      <span 
        key={`token-${index}`} 
        className={tokenStyles[token.type]}
      >
        {token.text}
      </span>
    );
  };

  // Parse CSS code into tokens and map to React elements
  const renderHighlightedCss = (cssCode: string) => {
    const tokens = parseCssToTokens(cssCode);
    return tokens.map((token, index) => renderToken(token, index));
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <h3 className="card-title text-lg flex items-center text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <title>CSS Code Icon</title>
            <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          CSS Code
        </h3>
        <button 
          type="button"
          className={`btn btn-sm shadow-md transition-all duration-300 ${
            copied 
              ? 'bg-[#1B5E20] text-white hover:bg-[#2E7D32]' 
              : 'bg-primary text-primary-content hover:bg-primary-focus'
          }`}
          onClick={copyToClipboard}
          aria-label="Copy CSS to clipboard"
        >
          {copied ? (
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <title>Copied Icon</title>
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Copied!
            </span>
          ) : (
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <title>Copy Icon</title>
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
              Copy
            </span>
          )}
        </button>
      </div>
      <div className="code-display mockup-code bg-[#1A1A1A] text-[#FFFFFF] dark:bg-[#0D1117] dark:text-[#F0F6FC] rounded-md p-4 font-mono text-sm overflow-x-auto relative group">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#48CFCB]/5 to-[#229799]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <pre className="relative z-10 whitespace-pre-wrap break-all">
          {renderHighlightedCss(cssCode)}
        </pre>
      </div>
    </div>
  );
};

export default CssCodeDisplay;
