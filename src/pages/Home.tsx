
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { TrendingUp, User } from 'lucide-react';
import { useUnifiedAuth } from '@/hooks/useUnifiedAuth';

const Home: React.FC = () => {
  const { user } = useUnifiedAuth();

  return (
    <Layout 
      pageTitle="Dashboard"
      pageDescription="Your CTea News dashboard"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {user ? (
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-anton text-brand-text mb-6">
                Welcome back, {user.username || 'Tea Spiller'}! ☕
              </h1>
              
              <p className="text-xl text-brand-text-secondary mb-8 max-w-2xl mx-auto">
                Ready to spill some tea or catch up on the latest crypto gossip?
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <div className="bg-brand-neutral/50 p-6 rounded-lg border border-brand-primary/20">
                  <TrendingUp className="w-8 h-8 text-brand-primary mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-brand-text mb-2">Tea Feed</h3>
                  <p className="text-brand-text-secondary mb-4">
                    Catch up on the latest crypto gossip and hot takes
                  </p>
                  <Button 
                    className="w-full btn-brand-primary"
                    onClick={() => alert('Tea Feed coming soon!')}
                  >
                    View Feed
                  </Button>
                </div>
                
                <div className="bg-brand-neutral/50 p-6 rounded-lg border border-brand-primary/20">
                  <img 
                    src="/lovable-uploads/788113f9-894c-4f0e-bb24-90b5f436f86f.png" 
                    alt="CTea News Logo" 
                    className="w-8 h-8 mx-auto mb-4 object-contain"
                  />
                  <h3 className="text-lg font-bold text-brand-text mb-2">Spill Tea</h3>
                  <p className="text-brand-text-secondary mb-4">
                    Share the latest crypto drama anonymously
                  </p>
                  <Button 
                    variant="outline"
                    className="w-full border-brand-accent-yellow text-brand-accent-yellow hover:bg-brand-accent-yellow hover:text-brand-background"
                    onClick={() => alert('Spill Tea feature coming soon!')}
                  >
                    Spill Some Tea
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-anton text-brand-text mb-6">
                Welcome to CTea News
              </h1>
              
              <p className="text-xl text-brand-text-secondary mb-8 max-w-2xl mx-auto">
                The ultimate platform for anonymous crypto gossip and tea spilling.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/auth">
                  <Button 
                    size="lg"
                    className="btn-brand-primary text-lg px-8 py-4"
                  >
                    <User className="mr-2 w-5 h-5" />
                    Join the Community
                  </Button>
                </Link>
                
                <Link to="/">
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-brand-background text-lg px-8 py-4"
                  >
                    <img 
                      src="/lovable-uploads/788113f9-894c-4f0e-bb24-90b5f436f86f.png" 
                      alt="CTea News Logo" 
                      className="mr-2 w-5 h-5 object-contain"
                    />
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
