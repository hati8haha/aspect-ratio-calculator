// This file extends the Window interface to include Hotjar types
interface HotjarWindow extends Window {
  hj?: (command: string, ...parameters: unknown[]) => void;
  _hjSettings?: {
    hjid: number;
    hjsv: number;
  };
}

declare global {
  interface Window extends HotjarWindow {}
}

export {};
