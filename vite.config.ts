
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Get the WS token and ensure it's safely handled
  const rawToken = process.env.VITE_WS_TOKEN;
  const wsToken = rawToken || 'development-fallback';
  
  console.log('Raw WS Token:', rawToken);
  console.log('Final WS Token:', wsToken);
  
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
      // Ensure the token is properly stringified as a string literal
      '__WS_TOKEN__': `"${wsToken.replace(/"/g, '\\"')}"`,
    },
  };
});
