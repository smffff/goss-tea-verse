
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Eye, Users, Shield, Zap } from 'lucide-react';
import { BrandHeader } from '@/components/brand/BrandElements';
import { useToast } from '@/hooks/use-toast';

interface CTEANewsroomLandingProps {
  onAccessGranted: () => void;
}

const CTEANewsroomLanding: React.FC<CTEANewsroomLandingProps> = ({ onAccessGranted }) => {
  const [betaCode, setBetaCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const { toast } = useToast();

  const handleBetaAccess = async () => {
    if (!betaCode.trim()) {
      toast({
        title: "Beta Code Required",
        description: "Please enter a valid beta code to continue.",
        variant: "destructive"
      });
      return;
    }

    setIsValidating(true);
    
    // Simulate validation
    setTimeout(() => {
      if (betaCode.toLowerCase() === 'spill' || betaCode.toLowerCase() === 'beta') {
        localStorage.setItem('ctea-beta-access', 'true');
        localStorage.setItem('ctea-beta-code', betaCode);
        toast({
          title: "Welcome to CTea! 🫖",
          description: "Beta access granted. Time to spill some tea!",
        });
        onAccessGranted();
      } else {
        toast({
          title: "Invalid Beta Code",
          description: "Please check your code and try again.",
          variant: "destructive"
        });
      }
      setIsValidating(false);
    }, 1500);
  };

  const handleDemoAccess = () => {
    localStorage.setItem('ctea-demo-mode', 'true');
    toast({
      title: "Demo Access Granted! ✨",
      description: "Welcome to the CTea experience!",
    });
    onAccessGranted();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <BrandHeader showLogo showTagline logoSize="xl" />
          
          <div className="space-y-4">
            <Badge className="bg-ctea-teal/20 text-ctea-teal border-ctea-teal/30 px-4 py-2 text-sm font-medium">
              🚀 Beta Launch - Exclusive Access
            </Badge>
            
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              The ultimate platform for anonymous news sharing and community-driven journalism. 
              Spill the tea on what really matters.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card className="bg-ctea-dark/50 border-ctea-teal/20 hover:border-ctea-teal/40 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Shield className="w-8 h-8 text-ctea-teal mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Anonymous & Secure</h3>
                <p className="text-gray-400 text-sm">Share news safely with military-grade security</p>
              </CardContent>
            </Card>

            <Card className="bg-ctea-dark/50 border-ctea-purple/20 hover:border-ctea-purple/40 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-ctea-purple mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Community Driven</h3>
                <p className="text-gray-400 text-sm">Vote, verify, and validate news together</p>
              </CardContent>
            </Card>

            <Card className="bg-ctea-dark/50 border-ctea-orange/20 hover:border-ctea-orange/40 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Zap className="w-8 h-8 text-ctea-orange mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Real-time Updates</h3>
                <p className="text-gray-400 text-sm">Breaking news as it happens</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Access Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto space-y-6">
          <Card className="bg-ctea-dark/80 border-ctea-teal/30 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-white flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-ctea-teal" />
                Beta Access
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Enter beta code"
                  value={betaCode}
                  onChange={(e) => setBetaCode(e.target.value)}
                  className="bg-ctea-dark/50 border-gray-600 text-white placeholder-gray-400 focus:border-ctea-teal"
                  onKeyPress={(e) => e.key === 'Enter' && handleBetaAccess()}
                />
                <p className="text-xs text-gray-400 text-center">
                  Have a beta code? Enter it above to get full access
                </p>
              </div>
              
              <Button
                onClick={handleBetaAccess}
                disabled={isValidating}
                className="w-full bg-ctea-teal hover:bg-ctea-teal/80 text-black font-bold"
              >
                {isValidating ? 'Validating...' : 'Access Beta'}
              </Button>
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="text-gray-400 text-sm mb-4">Don't have a beta code?</p>
            <Button
              onClick={handleDemoAccess}
              variant="outline"
              className="border-ctea-purple/30 text-ctea-purple hover:bg-ctea-purple/10 font-medium"
            >
              <Eye className="w-4 h-4 mr-2" />
              Try Demo Mode
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <p className="text-gray-400 text-sm">
              © 2024 CTea Newsroom. Brewing truth, one story at a time.
            </p>
            <div className="flex justify-center space-x-6 text-xs text-gray-500">
              <span>Privacy First</span>
              <span>•</span>
              <span>Community Driven</span>
              <span>•</span>
              <span>Truth Matters</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTEANewsroomLanding;
