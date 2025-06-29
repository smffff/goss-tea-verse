
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Coffee, Sparkles, Users, TrendingUp } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-6">
            <img src="/ctea-logo-icon.svg" alt="CTea" className="w-full h-full" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Welcome to CTea
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Where crypto gossip meets intelligence. Share your tea, earn tokens, and stay in the loop.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/spill')}
              className="bg-gradient-to-r from-ctea-teal to-ctea-purple text-white px-8 py-3"
            >
              <Coffee className="w-5 h-5 mr-2" />
              Spill Some Tea
            </Button>
            <Button
              onClick={() => navigate('/feed')}
              variant="outline"
              className="border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10 px-8 py-3"
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              Browse Feed
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="bg-ctea-dark/50 border-ctea-teal/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Coffee className="w-6 h-6 text-ctea-teal" />
                Spill Tea
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Share your crypto insights and industry gossip anonymously.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-ctea-dark/50 border-ctea-purple/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-ctea-purple" />
                Earn Tokens
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Get rewarded with $TEA tokens for quality submissions.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-ctea-dark/50 border-ctea-pink/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="w-6 h-6 text-ctea-pink" />
                Community
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Join a vibrant community of crypto enthusiasts and insiders.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
