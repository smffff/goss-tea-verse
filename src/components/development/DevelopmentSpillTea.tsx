
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Coffee, Users, Zap } from 'lucide-react';

const DevelopmentSpillTea: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <Coffee className="w-8 h-8 text-ctea-teal" />
          Spill Your Tea
        </h1>
        <p className="text-gray-400">Share anonymous crypto gossip and earn SOAP tokens</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-ctea-dark/80 border-ctea-teal/30 text-center">
          <CardContent className="p-6">
            <Coffee className="w-12 h-12 text-ctea-teal mx-auto mb-4" />
            <h3 className="text-white font-bold text-lg mb-2">Anonymous Spills</h3>
            <p className="text-gray-400 text-sm">Share gossip without revealing identity</p>
          </CardContent>
        </Card>
        <Card className="bg-ctea-dark/80 border-pink-400/30 text-center">
          <CardContent className="p-6">
            <Users className="w-12 h-12 text-pink-400 mx-auto mb-4" />
            <h3 className="text-white font-bold text-lg mb-2">Community Driven</h3>
            <p className="text-gray-400 text-sm">Vote on credibility and quality</p>
          </CardContent>
        </Card>
        <Card className="bg-ctea-dark/80 border-yellow-400/30 text-center">
          <CardContent className="p-6">
            <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-white font-bold text-lg mb-2">Earn SOAP</h3>
            <p className="text-gray-400 text-sm">Get rewarded for quality content</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-ctea-dark/80 border-white/20 max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-white text-center">🚧 Coming Soon in Development</CardTitle>
        </CardHeader>
        <CardContent className="text-center p-8">
          <p className="text-gray-300 mb-4">
            The Spill Tea submission form is being built with advanced features:
          </p>
          <ul className="text-gray-400 space-y-2 text-left max-w-md mx-auto">
            <li>• Anonymous submission system</li>
            <li>• Evidence link verification</li>
            <li>• AI content analysis</li>
            <li>• SOAP reward calculation</li>
            <li>• Real-time credibility scoring</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default DevelopmentSpillTea;
