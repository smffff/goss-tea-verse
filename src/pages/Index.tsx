
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Landing from './Landing';

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log('[Index] Component rendered, pathname:', location.pathname);

  useEffect(() => {
    console.log('[Index] Effect running, current pathname:', location.pathname);
    
    // Only redirect if we're on specific legacy paths
    if (location.pathname === '/home' || location.pathname === '/index') {
      console.log('[Index] Redirecting legacy path to root');
      navigate('/', { replace: true });
    }
  }, [navigate, location.pathname]);

  // For root path, show Landing page directly
  if (location.pathname === '/') {
    console.log('[Index] Rendering Landing page for root path');
    return <Landing />;
  }

  console.log('[Index] Not rendering anything for path:', location.pathname);
  return null;
};

export default Index;
