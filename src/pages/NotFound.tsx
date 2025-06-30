
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Coffee } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-background flex items-center justify-center">
      <div className="container mx-auto px-4">
        <Card className="bg-brand-neutral border-brand-primary/30 max-w-lg mx-auto">
          <CardContent className="p-8 text-center space-y-6">
            <div className="text-6xl mb-4">🫖</div>
            <h1 className="text-4xl font-anton text-brand-text">404</h1>
            <h2 className="text-xl text-brand-text">Page Not Found</h2>
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
              <Link to="/feed">
                <Button variant="outline" className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-brand-background">
                  <Coffee className="w-4 h-4 mr-2" />
                  View Tea Feed
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
