
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Get the WS token and ensure it's safely handled
  const rawToken = process.env.VITE_WS_TOKEN;
  
  // Use a safe fallback token for development
  const wsToken = rawToken && typeof rawToken === 'string' && rawToken.trim() 
    ? rawToken.trim() 
    : 'development-fallback-token';
  
  console.log('Raw WS Token:', rawToken ? '[PRESENT]' : '[MISSING]');
  console.log('Final WS Token:', wsToken ? '[SET]' : '[EMPTY]');
  
  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        port: 8080,
      },
    },
    plugins: [
      react(),
      mode === 'development' &&
      componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      // Use JSON.stringify to properly escape the token as a string literal
      '__WS_TOKEN__': JSON.stringify(wsToken),
    },
  };
});
