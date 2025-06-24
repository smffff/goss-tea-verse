import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import TeaCup from '@/components/TeaCup';
import Layout from '@/components/Layout';
import { Home, Coffee, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[80vh]">
        <Card className="bg-ctea-dark/30 border border-ctea-teal/20 max-w-md mx-auto text-center">
          <div className="p-8">
            {/* 404 Icon */}
            <div className="text-6xl mb-4">☕</div>
            
            {/* Error Message */}
            <h1 className="text-3xl font-bold text-white mb-2">404 - Page Not Found</h1>
            <p className="text-gray-300 mb-6">
              Looks like this tea got spilled somewhere else! The page you're looking for doesn't exist.
            </p>
            
            {/* Action Buttons */}
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

              <Button 
                onClick={() => navigate('/submit')}
                variant="outline"
                className="w-full border-ctea-pink text-ctea-pink hover:bg-ctea-pink/10"
              >
                <Plus className="w-4 h-4 mr-2" />
                Spill New Tea
              </Button>
            </div>
            
            {/* Footer Message */}
            <div className="mt-6 text-xs text-gray-500">
              Lost? Try spilling some fresh tea to get back in the game! 🚀
            </div>

            {/* Decorative Tea Cup */}
            <div className="mt-6 flex justify-center">
              <div className="animate-float">
                <TeaCup size="sm" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default NotFound;
