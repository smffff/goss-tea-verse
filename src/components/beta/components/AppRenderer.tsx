
import React from 'react';
import { AccessLevel } from '@/types/auth';

export interface AppRendererProps {
  accessLevel: AccessLevel;
  onAccessGranted: (level: AccessLevel) => void;
  onLogout: () => void;
  onTimeExpired: () => void;
}

const AppRenderer: React.FC<AppRendererProps> = ({
  accessLevel,
  onAccessGranted,
  onLogout,
  onTimeExpired
}) => {
  return (
    <div className="min-h-screen bg-ctea-dark">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-white mb-4">
          CTea Application - {accessLevel} Access
        </h1>
        
        <div className="space-y-4">
          <p className="text-white/70">
            Application is running with {accessLevel} level access.
          </p>
          
          <div className="flex gap-2">
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30"
            >
              Logout
            </button>
            
            <button
              onClick={onTimeExpired}
              className="px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded hover:bg-yellow-500/30"
            >
              Simulate Time Expired
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppRenderer;
