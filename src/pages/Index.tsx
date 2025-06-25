
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Landing from './Landing';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Only redirect if we're on specific legacy paths
    const pathname = window.location.pathname;
    if (pathname === '/home' || pathname === '/index') {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  // For root path, show Landing page directly
  if (window.location.pathname === '/') {
    return <Landing />;
  }

  return null;
};

export default Index;
