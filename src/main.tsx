import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Simple test component
const TestApp = () => {
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#1a0d26', 
      color: 'white', 
      minHeight: '100vh',
      fontSize: '24px'
    }}>
      <h1>CTea Newsroom Test</h1>
      <p>If you can see this, React is working!</p>
      <p>Background should be dark purple</p>
    </div>
  );
};

// Try the main App component
createRoot(document.getElementById("root")!).render(<App />);
