
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Coffee, Users, Shield, Coins } from 'lucide-react';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="text-6xl mb-4">🫖</div>
          <h1 className="text-5xl font-bold mb-4">CTea Newsroom</h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            The ultimate platform for anonymous crypto gossip and tea. Spill the tea, earn the rewards.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={() => navigate('/spill')}
              className="bg-gradient-to-r from-teal-500 to-purple-500 hover:from-teal-600 hover:to-purple-600 text-white px-8 py-3 text-lg"
            >
              <Coffee className="w-5 h-5 mr-2" />
              Spill Tea
            </Button>
            <Button 
              onClick={() => navigate('/feed')}
              variant="outline"
              className="border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white px-8 py-3 text-lg"
            >
              Read Tea
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-gray-800/50 rounded-lg">
            <Users className="w-12 h-12 text-teal-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Anonymous Sharing</h3>
            <p className="text-gray-300">Share crypto gossip while maintaining your privacy</p>
          </div>
          
          <div className="text-center p-6 bg-gray-800/50 rounded-lg">
            <Shield className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI Moderated</h3>
            <p className="text-gray-300">Quality content verified by AI moderation</p>
          </div>
          
          <div className="text-center p-6 bg-gray-800/50 rounded-lg">
            <Coins className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Earn $TEA</h3>
            <p className="text-gray-300">Get rewarded with tokens for quality submissions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
