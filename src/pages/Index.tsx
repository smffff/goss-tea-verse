
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Landing from './Landing';

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only redirect if we're on specific legacy paths
    if (location.pathname === '/home' || location.pathname === '/index') {
      navigate('/', { replace: true });
    }
  }, [navigate, location.pathname]);

  // For root path, show Landing page directly
  if (location.pathname === '/') {
    return <Landing />;
  }

  return null;
};

export default Index;
