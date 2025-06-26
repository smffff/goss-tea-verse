
/// <reference types="vite/client" />

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[]; }) => Promise<any>;
      isMetaMask?: boolean;
      on?: (event: string, handler: (...args: any[]) => void) => void;
      removeListener?: (event: string, handler: (...args: any[]) => void) => void;
    };
    solana?: {
      isPhantom?: boolean;
      connect: () => Promise<void>;
      disconnect: () => Promise<void>;
      isConnected: boolean;
      publicKey: {
        toString: () => string;
      };
      on: (event: string, handler: (...args: any[]) => void) => void;
      removeListener: (event: string, handler: (...args: any[]) => void) => void;
    };
  }
}

export {};
