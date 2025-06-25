/// <reference types="vite/client" />

// Google Analytics gtag function
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string,
      config?: {
        page_title?: string;
        page_location?: string;
        custom_map?: Record<string, string>;
        event_category?: string;
        event_label?: string;
        custom_parameter_1?: string;
        custom_parameter_2?: string;
        custom_parameter_3?: string;
        value?: number;
      }
    ) => void;
  }
}

export {};
