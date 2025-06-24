import React from 'react';
import SubmissionForm from '@/components/SubmissionForm';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import { Sparkles, Coffee, TrendingUp, Award } from 'lucide-react';

const SubmitTea = () => {
  return (
    <Layout>
      {/* Header Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 animate-glow">
              Spill the Tea ☕
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8">
              Share the juiciest crypto gossip, drama, and receipts. No names needed - be as anonymous as you want.
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="text-center bg-ctea-dark/30 border border-ctea-teal/20 rounded-lg p-6">
                <Coffee className="w-8 h-8 text-ctea-teal mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Anonymous</h3>
                <p className="text-gray-300 text-sm">Share without revealing your identity</p>
              </div>
              <div className="text-center bg-ctea-dark/30 border border-ctea-teal/20 rounded-lg p-6">
                <TrendingUp className="w-8 h-8 text-ctea-yellow mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Earn $TEA</h3>
                <p className="text-gray-300 text-sm">Get rewarded for viral content</p>
              </div>
              <div className="text-center bg-ctea-dark/30 border border-ctea-teal/20 rounded-lg p-6">
                <Award className="w-8 h-8 text-ctea-pink mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Build Rep</h3>
                <p className="text-gray-300 text-sm">Gain credibility in the community</p>
              </div>
            </div>

            {/* Guidelines */}
            <Card className="bg-gradient-to-br from-ctea-teal/20 to-ctea-purple/20 border-ctea-teal/30 max-w-2xl mx-auto">
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-ctea-teal" />
                  Submission Guidelines
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">✅</Badge>
                      <span className="text-gray-300">Include receipts/evidence</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">✅</Badge>
                      <span className="text-gray-300">Be respectful & factual</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">✅</Badge>
                      <span className="text-gray-300">Add relevant tags</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/30">❌</Badge>
                      <span className="text-gray-300">No personal attacks</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/30">❌</Badge>
                      <span className="text-gray-300">No fake news/FUD</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/30">❌</Badge>
                      <span className="text-gray-300">No spam or ads</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
              <Card className="bg-ctea-dark/30 border border-ctea-teal/20">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-ctea-teal" />
                    Recent Hot Takes
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-ctea-dark/20 border border-ctea-teal/10 rounded-lg">
                      <div className="text-sm text-gray-300 mb-1">"Solana just pulled the biggest rug of 2024..."</div>
                      <div className="flex items-center gap-2 text-xs">
                        <Badge className="bg-ctea-pink/20 text-ctea-pink border-ctea-pink/30">🔥 Hot</Badge>
                        <span className="text-gray-400">2 hours ago</span>
                      </div>
                    </div>
                    <div className="p-3 bg-ctea-dark/20 border border-ctea-teal/10 rounded-lg">
                      <div className="text-sm text-gray-300 mb-1">"Ethereum ETF approval rumors heating up..."</div>
                      <div className="flex items-center gap-2 text-xs">
                        <Badge className="bg-ctea-yellow/20 text-ctea-yellow border-ctea-yellow/30">📈 Rising</Badge>
                        <span className="text-gray-400">4 hours ago</span>
                      </div>
                    </div>
                    <div className="p-3 bg-ctea-dark/20 border border-ctea-teal/10 rounded-lg">
                      <div className="text-sm text-gray-300 mb-1">"New meme coin launching with suspicious timing..."</div>
                      <div className="flex items-center gap-2 text-xs">
                        <Badge className="bg-ctea-purple/20 text-ctea-purple border-ctea-purple/30">💎 Viral</Badge>
                        <span className="text-gray-400">6 hours ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Tips & Tricks */}
              <Card className="bg-gradient-to-br from-ctea-purple/20 to-ctea-pink/20 border-ctea-purple/30">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-ctea-yellow" />
                    Pro Tips
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-ctea-teal">💡</span>
                      <span className="text-gray-300">Use relevant hashtags to increase visibility</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-ctea-teal">💡</span>
                      <span className="text-gray-300">Include screenshots or links as evidence</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-ctea-teal">💡</span>
                      <span className="text-gray-300">Engage with the community to earn more $TEA</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-ctea-teal">💡</span>
                      <span className="text-gray-300">Quality over quantity - focus on accuracy</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SubmitTea;
