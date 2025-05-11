import type { CssToken } from '../types/cssTokens';

// Token styling map
export const TOKEN_STYLES: Record<string, string> = {
  property: 'text-[#A5D6FF] dark:text-[#88DDFF]',
  separator: 'text-[#E1E1E1] dark:text-[#E1E1E1]',
  value: 'text-[#FFAB70] dark:text-[#FFCC95]',
  punctuation: 'text-[#F97583] dark:text-[#FF7B93]',
  normal: ''
};

/**
 * Parses CSS code into tokens for syntax highlighting
 */
export const parseCssToTokens = (code: string): CssToken[] => {
  const tokens: CssToken[] = [];
  const lines = code.split('\n');
  
  lines.forEach((line, lineIndex) => {
    // Add line break for non-first lines
    if (lineIndex > 0) {
      tokens.push({ text: '\n', type: 'normal' });
    }
    
    // Skip empty lines
    if (!line.trim()) {
      return;
    }
    
    // CSS property pattern: property: value;
    const propertyRegex = /([a-zA-Z-]+)(\s*:\s*)([^;]+)(;?)/g;
    // CSS punctuation and at-rules
    const punctuationRegex = /(@[a-zA-Z-]+|\{|\}|,|\(|\))/g;
    
    const propertyMatch = propertyRegex.exec(line);
    
    if (propertyMatch) {
      // Property name
      tokens.push({ text: propertyMatch[1], type: 'property' });
      // Separator (:)
      tokens.push({ text: propertyMatch[2], type: 'separator' });
      // Value
      tokens.push({ text: propertyMatch[3], type: 'value' });
      // Semicolon
      if (propertyMatch[4]) {
        tokens.push({ text: propertyMatch[4], type: 'punctuation' });
      }
    } else {
      // Handle punctuation and other syntax
      let lastIndex = 0;
      let punctuationMatch: RegExpExecArray | null = null;
      
      punctuationRegex.lastIndex = 0; 
      // Use a different pattern to avoid assignment in loop condition
      while (true) {
        punctuationMatch = punctuationRegex.exec(line);
        if (punctuationMatch === null) break;
        
        // Text before punctuation
        if (punctuationMatch.index > lastIndex) {
          tokens.push({
            text: line.substring(lastIndex, punctuationMatch.index),
            type: 'normal'
          });
        }
        
        // Punctuation token
        tokens.push({
          text: punctuationMatch[0],
          type: 'punctuation'
        });
        
        lastIndex = punctuationRegex.lastIndex;
      }
      
      // Any remaining text
      if (lastIndex < line.length) {
        tokens.push({
          text: line.substring(lastIndex),
          type: 'normal'
        });
      }
    }
  });
  
  return tokens;
};