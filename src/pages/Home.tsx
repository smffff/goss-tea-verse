
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Coffee, TrendingUp } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <Layout 
      pageTitle="Home"
      pageDescription="Welcome to CTea News - Your crypto gossip hub"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-anton text-brand-text mb-6">
            Welcome to CTea News
          </h1>
          
          <p className="text-xl text-brand-text-secondary mb-8 max-w-2xl mx-auto">
            The ultimate platform for anonymous crypto gossip and tea spilling.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/feed">
              <Button 
                size="lg"
                className="btn-brand-primary text-lg px-8 py-4"
              >
                <TrendingUp className="mr-2 w-5 h-5" />
                View Tea Feed
              </Button>
            </Link>
            
            <Link to="/spill">
              <Button 
                size="lg"
                variant="outline"
                className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-brand-background text-lg px-8 py-4"
              >
                <Coffee className="mr-2 w-5 h-5" />
                Spill Some Tea
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
