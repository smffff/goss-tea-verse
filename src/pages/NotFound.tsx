
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-background via-brand-neutral to-brand-darker flex items-center justify-center">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-brand-neutral/50 border-brand-primary/30 max-w-lg mx-auto backdrop-blur-lg">
            <CardContent className="p-8 text-center space-y-6">
              <motion.img 
                src="/lovable-uploads/58c00175-9395-4c1a-b741-60b32e37b93e.png" 
                alt="CTea News Logo" 
                className="w-16 h-16 mx-auto mb-4 object-contain"
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <h1 className="text-4xl font-anton text-brand-text">404</h1>
              <h2 className="text-xl text-brand-text font-bold">Page Not Found</h2>
              <p className="text-brand-text-secondary">
                Looks like this tea has gone cold. The page you're looking for doesn't exist.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/">
                  <Button className="btn-brand-primary">
                    <Home className="w-4 h-4 mr-2" />
                    Go Home
                  </Button>
                </Link>
                <Link to="/home">
                  <Button variant="outline" className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-brand-background">
                    <img 
                      src="/lovable-uploads/58c00175-9395-4c1a-b741-60b32e37b93e.png" 
                      alt="CTea News Logo" 
                      className="w-4 h-4 mr-2 object-contain"
                    />
                    Dashboard
                  </Button>
                </Link>
              </div>

              <div className="pt-4">
                <button 
                  onClick={() => window.history.back()}
                  className="text-brand-text-secondary hover:text-brand-text transition-colors flex items-center mx-auto"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go Back
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
