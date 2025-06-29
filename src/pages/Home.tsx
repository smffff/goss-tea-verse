import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Coffee, Sparkles, Users, TrendingUp } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-ctea-darker via-ctea-dark to-black text-white">
      <Card className="w-full max-w-xl bg-ctea-dark/80 border-ctea-teal/30 mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-ctea-teal" />
            Welcome to CTea
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-lg text-gray-200">
            Where crypto gossip meets intelligence. Share your tea, earn tokens, and stay in the loop.
          </p>
          <div className="flex gap-4 mb-4">
            <Button
              onClick={() => navigate('/spill')}
              className="bg-gradient-to-r from-ctea-teal to-ctea-purple text-white px-8 py-3"
            >
              Spill Some Tea
            </Button>
            <Button
              onClick={() => navigate('/feed')}
              variant="outline"
              className="border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10 px-8 py-3"
            >
              Browse Feed
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <div className="bg-ctea-darker p-6 rounded-lg flex flex-col items-center">
          <Coffee className="w-8 h-8 text-ctea-teal mb-2" />
          <h3 className="font-bold mb-1">Spill Tea</h3>
          <p className="text-gray-400 text-center">Share your crypto insights and industry gossip anonymously.</p>
        </div>
        <div className="bg-ctea-darker p-6 rounded-lg flex flex-col items-center">
          <TrendingUp className="w-8 h-8 text-ctea-purple mb-2" />
          <h3 className="font-bold mb-1">Earn Tokens</h3>
          <p className="text-gray-400 text-center">Get rewarded with $TEA tokens for quality submissions.</p>
        </div>
        <div className="bg-ctea-darker p-6 rounded-lg flex flex-col items-center">
          <Users className="w-8 h-8 text-ctea-pink mb-2" />
          <h3 className="font-bold mb-1">Community</h3>
          <p className="text-gray-400 text-center">Join a vibrant community of crypto enthusiasts and insiders.</p>
        </div>
      </div>
    </div>
  );
};

export default Home; 