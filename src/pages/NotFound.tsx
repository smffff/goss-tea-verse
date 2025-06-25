
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Coffee, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4">
      <Card className="bg-ctea-dark/80 backdrop-blur-md border-white/10 max-w-lg w-full">
        <CardContent className="text-center p-8">
          {/* Logo */}
          <img 
            src="/ctea-logo-icon.svg" 
            alt="CTea Newsroom Logo" 
            className="w-16 h-16 mx-auto mb-6 opacity-80"
          />
          
          {/* 404 Message */}
          <h1 className="text-6xl font-bold text-[#00d1c1] mb-4">404</h1>
          <h2 className="text-2xl font-bold text-white mb-4">
            Oops — the kettle's empty! ☕
          </h2>
          <p className="text-gray-300 mb-8">
            Looks like this page doesn't exist. The tea you're looking for might have been spilled elsewhere.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/')}
              className="bg-gradient-ctea hover:opacity-90 text-white font-bold"
            >
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
            
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="border-white/20 text-gray-300 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
            
            <Button
              onClick={() => navigate('/spill')}
              variant="outline"
              className="border-[#ff61a6]/50 text-[#ff61a6] hover:bg-[#ff61a6]/10"
            >
              <Coffee className="w-4 h-4 mr-2" />
              Spill Some Tea
            </Button>
          </div>
          
          {/* Additional Help */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-sm text-gray-400 mb-2">Need help?</p>
            <a 
              href="mailto:help@cteanews.com"
              className="text-[#00d1c1] hover:underline text-sm"
            >
              Contact Support
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
