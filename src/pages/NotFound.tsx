import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 8000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-ctea-darker text-center px-4">
      <h1 className="text-5xl font-display font-bold mb-4 text-ctea-pink animate-glow">This tea's gone cold.</h1>
      <p className="text-xl text-gray-300 mb-2">The page you're looking for has disappeared into the blockchain.</p>
      <p className="text-md text-gray-400 mb-8">Redirecting you home in 8 seconds…</p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-2 rounded-lg bg-ctea-teal text-white font-semibold shadow btn-hover-glow"
      >
        Go Home Now
      </button>
    </div>
  );
};

export default NotFound; 