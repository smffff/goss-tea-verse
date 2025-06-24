import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Home, Coffee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TeaCup from '@/components/TeaCup';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center px-4">
      <Card className="p-8 bg-gradient-to-br from-ctea-dark/80 to-ctea-darker/90 border-ctea-teal/30 neon-border max-w-md w-full text-center">
        <img src="/ctea-logo-icon.png" alt="CTEA Logo" className="w-20 h-20 mx-auto mb-6" />
        
        <h1 className="text-6xl font-bold text-ctea-teal mb-4 font-montserrat">404</h1>
        <h2 className="text-2xl font-bold text-white mb-4 font-montserrat">Tea Not Found ☕</h2>
        
        <p className="text-gray-300 mb-6">
          This page seems to have vanished like a rug pull. The tea you're looking for 
          doesn't exist in our newsroom.
        </p>
        
        <div className="space-y-3">
          <Button 
            onClick={() => navigate('/')}
            className="w-full bg-gradient-ctea text-white font-bold"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <Button 
            onClick={() => navigate('/feed')}
            variant="outline"
            className="w-full border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10"
          >
            <Coffee className="w-4 h-4 mr-2" />
            Browse Hot Takes
          </Button>
        </div>
        
        <div className="mt-6 text-xs text-gray-500">
          Lost? Try spilling some fresh tea to get back in the game! 🚀
        </div>
      </Card>
    </div>
  );
};

export default NotFound;
