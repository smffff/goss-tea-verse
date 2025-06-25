
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Safely get the WS token with proper fallback and validation
  const wsToken = process.env.VITE_WS_TOKEN || 'development-fallback';
  
  console.log('Vite WS Token:', wsToken); // Debug log to see what we're working with
  
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
      // Ensure the token is always a valid string
      __WS_TOKEN__: JSON.stringify(String(wsToken)),
    },
  };
});
