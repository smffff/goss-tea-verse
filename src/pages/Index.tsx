
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Only redirect if we're actually on /home or /index
    if (window.location.pathname === '/home' || window.location.pathname === '/index') {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  // If we're on the root path, don't redirect, just return null
  if (window.location.pathname === '/') {
    return null;
  }

  return null;
};

export default Index;
