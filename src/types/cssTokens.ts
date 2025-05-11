export type CssToken = {
  text: string;
  type: 'property' | 'separator' | 'value' | 'punctuation' | 'normal';
};