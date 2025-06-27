
import React from 'react';

interface AppRendererProps {
  children: React.ReactNode;
}

const AppRenderer: React.FC<AppRendererProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {children}
    </div>
  );
};

export default AppRenderer;
