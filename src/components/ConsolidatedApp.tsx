
import React, { useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import SubmissionModal from '@/components/SubmissionModal';
import AppBackground from './consolidated/AppBackground';
import AppHeader from './consolidated/AppHeader';
import AppTabs from './consolidated/AppTabs';
import BetaAccessForm from './consolidated/BetaAccessForm';
import PreviewContent from './consolidated/PreviewContent';
import TrendingContent from './consolidated/TrendingContent';
import CommunityContent from './consolidated/CommunityContent';
import { useBetaAccess } from '@/hooks/useBetaAccess';
import { useSubmissionModal } from '@/hooks/useSubmissionModal';
import { mockData, appStats } from '@/data/mockData';

interface ConsolidatedAppProps {
  onAccessGranted: () => void;
}

const ConsolidatedApp: React.FC<ConsolidatedAppProps> = ({ onAccessGranted }) => {
  const [activeTab, setActiveTab] = useState('beta');
  
  const {
    betaCode,
    setBetaCode,
    error,
    isVerifying,
    handleBetaSubmit
  } = useBetaAccess(onAccessGranted);

  const {
    showSubmissionModal,
    setShowSubmissionModal,
    handleSubmissionSubmit
  } = useSubmissionModal();

  return (
    <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black relative overflow-hidden">
      <AppBackground />

      <div className="relative z-10 p-4">
        <AppHeader />

        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <AppTabs activeTab={activeTab} onTabChange={setActiveTab} />

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
                stats={appStats}
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
