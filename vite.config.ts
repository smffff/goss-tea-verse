
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Get the WS token and ensure it's safely handled
  const rawToken = process.env.VITE_WS_TOKEN;
  
  // Sanitize the token to ensure it's safe for JavaScript injection
  let wsToken = 'development-fallback';
  if (rawToken && typeof rawToken === 'string') {
    // Remove any potentially problematic characters and validate
    const sanitized = rawToken.trim().replace(/[^\w\-]/g, '');
    if (sanitized.length > 0) {
      wsToken = sanitized;
    }
  }
  
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
      // Ensure safe string literal injection with validated token
      '__WS_TOKEN__': JSON.stringify(wsToken),
    },
  };
});
