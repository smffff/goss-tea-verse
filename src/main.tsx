
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Clear any error flags on startup
localStorage.removeItem('ctea_critical_error');
sessionStorage.removeItem('ctea_critical_error');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
