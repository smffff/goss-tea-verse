import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useWallet } from '@/contexts/WalletContext';
import { secureLog } from '@/utils/secureLogging';

// Lazy load pages for better performance
const Home = React.lazy(() => import('@/pages/Home'));
const SpillTea = React.lazy(() => import('@/pages/SpillTea'));
const Feed = React.lazy(() => import('@/pages/Feed'));
const Profile = React.lazy(() => import('@/pages/Profile'));
const Admin = React.lazy(() => import('@/pages/Admin'));
const NotFound = React.lazy(() => import('@/pages/NotFound'));

const ConsolidatedApp: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const { isConnected } = useWallet();

  React.useEffect(() => {
    secureLog.info('ConsolidatedApp mounted', { 
      userAuthenticated: !!user, 
      walletConnected: isConnected 
    });
  }, [user, isConnected]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🫖</div>
          <div className="text-white text-lg">Loading CTea...</div>
          <div className="mt-4 w-8 h-8 border-4 border-ctea-teal border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-bounce">🫖</div>
            <div className="text-white text-lg">Loading...</div>
          </div>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spill" element={<SpillTea />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Suspense>
  );
};

export default ConsolidatedApp; 