
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lock, Eye, TrendingUp, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SubmissionModal from '@/components/SubmissionModal';
import AppBackground from './consolidated/AppBackground';
import AppHeader from './consolidated/AppHeader';
import BetaAccessForm from './consolidated/BetaAccessForm';
import PreviewContent from './consolidated/PreviewContent';
import TrendingContent from './consolidated/TrendingContent';
import CommunityContent from './consolidated/CommunityContent';

interface ConsolidatedAppProps {
  onAccessGranted: () => void;
}

const ConsolidatedApp: React.FC<ConsolidatedAppProps> = ({ onAccessGranted }) => {
  const [betaCode, setBetaCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('beta');
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [stats] = useState({
    totalSpills: 1247,
    activeUsers: 342,
    hotTopics: 23,
    dailyGrowth: 15.7
  });
  const { toast } = useToast();

  const validateBetaCode = async (code: string): Promise<boolean> => {
    try {
      const validCodes = ['CTEA2024', 'BETA-ACCESS', 'EARLY-BIRD'];
      return validCodes.includes(code.toUpperCase());
    } catch (error) {
      console.error('Beta code validation error:', error);
      return false;
    }
  };

  const handleBetaSubmit = async () => {
    if (!betaCode.trim()) {
      setError('Please enter a beta code');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      const isValid = await validateBetaCode(betaCode);
      
      if (isValid) {
        localStorage.setItem('ctea-beta-access', 'granted');
        toast({
          title: "Welcome to CTea! ☕",
          description: "You now have access to the hottest gossip platform.",
        });
        onAccessGranted();
      } else {
        setError('Invalid beta code. Please check your code and try again.');
      }
    } catch (error) {
      console.error('Beta verification error:', error);
      setError('Verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmissionSubmit = async (data: { content: string; wallet?: string; email?: string }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Spill Submitted! 🫖",
        description: "Your tea has been added to our review queue.",
      });
      
      setShowSubmissionModal(false);
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    }
  };

  const mockData = {
    hotSpills: [
      { id: 1, content: "Major crypto exchange might be planning surprise announcement...", heat: 94, comments: 127 },
      { id: 2, content: "Celebrity spotted at exclusive tech conference in stealth mode...", heat: 89, comments: 203 },
      { id: 3, content: "New AI startup raised $50M but keeping their product secret...", heat: 87, comments: 156 }
    ],
    trendingTopics: [
      { name: "DeFi Drama", count: 234, trend: "+15%" },
      { name: "AI Secrets", count: 187, trend: "+23%" },
      { name: "Celeb Tech", count: 156, trend: "+8%" },
      { name: "Startup Tea", count: 143, trend: "+31%" }
    ],
    recentSpills: [
      { id: 1, content: "Heard from a reliable source that...", author: "Anonymous", time: "2m ago", reactions: 23 },
      { id: 2, content: "Someone in the know told me...", author: "Insider", time: "5m ago", reactions: 41 },
      { id: 3, content: "Can't reveal my source but...", author: "Whistleblower", time: "8m ago", reactions: 67 },
      { id: 4, content: "Breaking: Industry insider says...", author: "DeepThroat", time: "12m ago", reactions: 89 }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black relative overflow-hidden">
      <AppBackground />

      <div className="relative z-10 p-4">
        <AppHeader />

        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-ctea-dark/50 border border-ctea-teal/30">
              <TabsTrigger value="beta" className="data-[state=active]:bg-ctea-teal data-[state=active]:text-black">
                <Lock className="w-4 h-4 mr-2" />
                Beta Access
              </TabsTrigger>
              <TabsTrigger value="preview" className="data-[state=active]:bg-ctea-teal data-[state=active]:text-black">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </TabsTrigger>
              <TabsTrigger value="trending" className="data-[state=active]:bg-ctea-teal data-[state=active]:text-black">
                <TrendingUp className="w-4 h-4 mr-2" />
                Trending
              </TabsTrigger>
              <TabsTrigger value="community" className="data-[state=active]:bg-ctea-teal data-[state=active]:text-black">
                <Users className="w-4 h-4 mr-2" />
                Community
              </TabsTrigger>
            </TabsList>

            <TabsContent value="beta" className="mt-6">
              <BetaAccessForm
                betaCode={betaCode}
                setBetaCode={setBetaCode}
                error={error}
                isVerifying={isVerifying}
                onSubmit={handleBetaSubmit}
              />
            </TabsContent>

            <TabsContent value="preview" className="mt-6">
              <PreviewContent
                mockData={mockData}
                stats={stats}
                onSubmissionModalOpen={() => setShowSubmissionModal(true)}
              />
            </TabsContent>

            <TabsContent value="trending" className="mt-6">
              <TrendingContent mockData={mockData} />
            </TabsContent>

            <TabsContent value="community" className="mt-6">
              <CommunityContent onBetaTabChange={() => setActiveTab('beta')} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <SubmissionModal
        isOpen={showSubmissionModal}
        onClose={() => setShowSubmissionModal(false)}
        onSubmit={handleSubmissionSubmit}
      />
    </div>
  );
};

export default ConsolidatedApp;
