import React from 'react';
import SubmissionForm from '@/components/SubmissionForm';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Coffee, TrendingUp, Award } from 'lucide-react';

const SubmitTea = () => {
  return (
    <div className="min-h-screen bg-gradient-dark retro-grid">
      {/* Header Section - Mobile First */}
      <section className="section-responsive">
        <div className="container-responsive">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 animate-glow">
              Spill the Tea ☕
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8">
              Share the juiciest crypto gossip, drama, and receipts. No names needed - be as anonymous as you want.
            </p>

            {/* Benefits Grid - Mobile responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="text-center card-responsive bg-ctea-dark/30 border border-ctea-teal/20 rounded-lg">
                <Coffee className="icon-responsive-lg text-ctea-teal mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Anonymous</h3>
                <p className="text-gray-300 text-sm">Share without revealing your identity</p>
              </div>
              <div className="text-center card-responsive bg-ctea-dark/30 border border-ctea-teal/20 rounded-lg">
                <TrendingUp className="icon-responsive-lg text-ctea-yellow mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Earn $TEA</h3>
                <p className="text-gray-300 text-sm">Get rewarded for viral content</p>
              </div>
              <div className="text-center card-responsive bg-ctea-dark/30 border border-ctea-teal/20 rounded-lg sm:col-span-3 lg:col-span-1">
                <Award className="icon-responsive-lg text-ctea-pink mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Build Rep</h3>
                <p className="text-gray-300 text-sm">Gain credibility in the community</p>
              </div>
            </div>

            {/* Guidelines - Mobile responsive */}
            <Card className="card-responsive bg-gradient-to-br from-ctea-purple/20 to-ctea-pink/20 border-ctea-purple/30 mb-6 sm:mb-8">
              <div className="text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 flex items-center justify-center sm:justify-start gap-2">
                  <Sparkles className="icon-responsive text-ctea-yellow" />
                  Submission Guidelines
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm sm:text-base">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 badge-responsive">✓</Badge>
                    <span className="text-gray-300">Crypto drama & gossip</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 badge-responsive">✓</Badge>
                    <span className="text-gray-300">Market insights & rumors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 badge-responsive">✓</Badge>
                    <span className="text-gray-300">Project updates & leaks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30 badge-responsive">✗</Badge>
                    <span className="text-gray-300">Personal attacks</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Form Section - Mobile First */}
      <section className="section-responsive">
        <div className="container-responsive">
          {/* Mobile: Single Column */}
          <div className="block lg:hidden">
            <SubmissionForm />
          </div>

          {/* Desktop: Two Column Layout */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-8">
            {/* Form - 2 columns */}
            <div className="lg:col-span-2">
              <SubmissionForm />
            </div>

            {/* Sidebar - 1 column */}
            <div className="space-y-6">
              {/* Recent Submissions */}
              <Card className="card-responsive bg-ctea-dark/30 border border-ctea-teal/20">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-ctea-teal" />
                  Recent Hot Takes
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-ctea-dark/20 border border-ctea-teal/10 rounded-lg">
                    <p className="text-white text-sm mb-2">"Solana just dropped another update and the devs are..."</p>
                    <div className="flex justify-between items-center">
                      <Badge className="bg-ctea-pink text-white text-xs">🔥 Hot</Badge>
                      <span className="text-gray-400 text-xs">2 min ago</span>
                    </div>
                  </div>
                  <div className="p-3 bg-ctea-dark/20 border border-ctea-teal/10 rounded-lg">
                    <p className="text-white text-sm mb-2">"Ethereum ETF approval rumors are heating up..."</p>
                    <div className="flex justify-between items-center">
                      <Badge className="bg-ctea-yellow text-ctea-dark text-xs">📈 Rising</Badge>
                      <span className="text-gray-400 text-xs">5 min ago</span>
                    </div>
                  </div>
                  <div className="p-3 bg-ctea-dark/20 border border-ctea-teal/10 rounded-lg">
                    <p className="text-white text-sm mb-2">"New meme coin launching on Base..."</p>
                    <div className="flex justify-between items-center">
                      <Badge className="bg-ctea-purple text-white text-xs">💎 Viral</Badge>
                      <span className="text-gray-400 text-xs">8 min ago</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Tips for Success */}
              <Card className="card-responsive bg-gradient-to-br from-ctea-yellow/20 to-ctea-orange/20 border-ctea-yellow/30">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-ctea-yellow" />
                  Tips for Success
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-ctea-yellow font-bold">1.</span>
                    <span className="text-gray-300">Be specific with details and timing</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-ctea-yellow font-bold">2.</span>
                    <span className="text-gray-300">Include evidence when possible</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-ctea-yellow font-bold">3.</span>
                    <span className="text-gray-300">Use engaging, spicy language</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-ctea-yellow font-bold">4.</span>
                    <span className="text-gray-300">Post during peak activity hours</span>
                  </div>
                </div>
              </Card>

              {/* Community Stats */}
              <Card className="card-responsive bg-ctea-dark/30 border border-ctea-teal/20">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Coffee className="w-5 h-5 text-ctea-pink" />
                  Submission Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Today's Submissions</span>
                    <span className="text-white font-bold">247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Approval Rate</span>
                    <span className="text-green-400 font-bold">94%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Avg. $TEA Earned</span>
                    <span className="text-ctea-yellow font-bold">15.7</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Viral Posts</span>
                    <span className="text-ctea-pink font-bold">12</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubmitTea;
