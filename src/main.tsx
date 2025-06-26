
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { AuthProvider } from '@/hooks/useAuth'
import App from '@/App'
import './index.css'
import '@/utils/analytics' // Initialize analytics
import { inject } from '@vercel/analytics'
import FallbackPage from '@/pages/FallbackPage'

console.log('🚀 Starting CTea App...');

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error('❌ Root element not found');
  document.body.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; background: linear-gradient(135deg, #1b1b1b 0%, #2a1a2a 50%, #1a2a2a 100%); color: white; font-family: system-ui;">
      <div style="text-align: center; padding: 2rem;">
        <h1 style="font-size: 2rem; margin-bottom: 1rem;">🫖 CTea Newsroom</h1>
        <p>Failed to initialize app - missing root element</p>
        <button onclick="window.location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #00D8A4; color: white; border: none; border-radius: 0.5rem; cursor: pointer;">Refresh</button>
      </div>
    </div>
  `;
  throw new Error("Root element not found");
}

console.log('✅ Root element found, creating app...');

// Debug: Check if AuthProvider exists
console.log('🔐 AuthProvider available:', typeof AuthProvider);

// Wrap everything in a try-catch for initialization errors
try {
  createRoot(rootElement).render(
    <HelmetProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </HelmetProvider>
  );
  console.log('🎯 App rendered successfully');
} catch (error) {
  console.error('❌ Failed to render app:', error);
  
  // Fallback rendering
  createRoot(rootElement).render(
    <FallbackPage 
      error={`Initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`}
      onRetry={() => window.location.reload()}
    />
  );
}

// Register service worker for PWA only in production
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Call Vercel Analytics inject
inject();

console.log('🎯 Main.tsx execution complete');
