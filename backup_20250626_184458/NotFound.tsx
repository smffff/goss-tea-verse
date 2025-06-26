
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Coffee } from 'lucide-react';
import Layout from '@/components/Layout';

const NotFound = () => {
  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center px-4">
          {/* Large 404 */}
          <h1 className="text-8xl md:text-9xl font-display font-bold text-vintage-red mb-4 animate-pulse">
            404
          </h1>
          
          {/* Tabloid Headline */}
          <h2 className="text-2xl md:text-4xl font-display font-bold text-tabloid-black mb-4">
            BREAKING: TEA SPILLED OFF THE TABLE!
          </h2>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-tabloid-black/70 mb-8 max-w-md mx-auto">
            Oops, looks like the gossip you're looking for has vanished into the crypto void.
          </p>
          
          {/* Tea cup illustration */}
          <div className="text-6xl mb-8">☕</div>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              className="btn-pill btn-pill-red text-white font-bold px-6 py-3"
            >
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Back to The Teahouse
              </Link>
            </Button>
            
            <Button
              asChild
              variant="outline"
              className="btn-pill border-tabloid-black text-tabloid-black hover:bg-tabloid-black hover:text-white font-bold px-6 py-3"
            >
              <Link to="/spill">
                <Coffee className="w-4 h-4 mr-2" />
                Spill Some Tea
              </Link>
            </Button>
          </div>
          
          {/* Fun message */}
          <p className="text-sm text-tabloid-black/60 mt-8">
            Don't worry, there's plenty more tea to spill in the newsroom! 🫖
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
