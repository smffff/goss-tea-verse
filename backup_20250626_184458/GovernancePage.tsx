import React from 'react';
import Layout from '@/components/Layout';
import DAOGovernance from '@/components/DAOGovernance';
import { Vote, Users, TrendingUp, Award, Shield, Zap } from 'lucide-react';

const GovernancePage = () => {
  return (
    <Layout>
      {/* Header Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-ctea-teal/20 to-ctea-blue/20 rounded-full border border-ctea-teal/30">
                <Vote className="w-8 h-8 text-ctea-teal" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 animate-glow">
              DAO Governance
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Shape the future of CTea through decentralized governance. Your voice matters, 
              your vote counts, your community thrives.
            </p>
            
            {/* Governance Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
              <div className="p-4 bg-gradient-to-br from-ctea-teal/10 to-ctea-blue/10 rounded-lg border border-ctea-teal/20">
                <div className="text-2xl font-bold text-ctea-teal">156</div>
                <div className="text-sm text-gray-400">Active Proposals</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-ctea-purple/10 to-ctea-pink/10 rounded-lg border border-ctea-purple/20">
                <div className="text-2xl font-bold text-ctea-purple">8.2K</div>
                <div className="text-sm text-gray-400">Voters</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-lg border border-green-500/20">
                <div className="text-2xl font-bold text-green-400">89%</div>
                <div className="text-sm text-gray-400">Participation</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-ctea-yellow/10 to-ctea-orange/10 rounded-lg border border-ctea-yellow/20">
                <div className="text-2xl font-bold text-ctea-yellow">42</div>
                <div className="text-sm text-gray-400">Executed</div>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 bg-gradient-to-br from-ctea-teal/10 to-ctea-blue/10 rounded-lg border border-ctea-teal/20">
              <div className="flex items-center gap-3 mb-4">
                <Vote className="w-6 h-6 text-ctea-teal" />
                <h3 className="text-lg font-bold text-white">Propose & Vote</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Create proposals and vote on platform changes, feature updates, and community initiatives.
              </p>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-ctea-purple/10 to-ctea-pink/10 rounded-lg border border-ctea-purple/20">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-ctea-purple" />
                <h3 className="text-lg font-bold text-white">Transparent Process</h3>
              </div>
              <p className="text-gray-300 text-sm">
                All proposals, votes, and executions are recorded on-chain for complete transparency.
              </p>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-ctea-yellow/10 to-ctea-orange/10 rounded-lg border border-ctea-yellow/20">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-6 h-6 text-ctea-yellow" />
                <h3 className="text-lg font-bold text-white">Rewards for Participation</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Earn $TEA rewards for active participation in governance and proposal creation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DAO Governance Component */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <DAOGovernance />
        </div>
      </section>

      {/* Governance Process Section */}
      <section className="py-16 bg-gradient-to-br from-ctea-dark/50 to-ctea-darker/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              How Governance Works
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our decentralized governance process ensures that every community member has a voice 
              in shaping the future of CTea.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-ctea-yellow/20 to-ctea-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-ctea-yellow font-bold text-lg">1</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Create Proposal</h3>
              <p className="text-gray-400 text-sm">
                Submit a proposal with detailed description and implementation plan.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-ctea-purple/20 to-ctea-pink/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-ctea-purple font-bold text-lg">2</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Community Discussion</h3>
              <p className="text-gray-400 text-sm">
                Engage in open discussion and feedback from the community.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-ctea-teal/20 to-ctea-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-ctea-teal font-bold text-lg">3</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Vote</h3>
              <p className="text-gray-400 text-sm">
                Cast your vote using your $TEA tokens as voting power.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-400 font-bold text-lg">4</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Execute</h3>
              <p className="text-gray-400 text-sm">
                Successful proposals are automatically executed on-chain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Governance Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Benefits of DAO Governance
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Decentralized governance ensures the platform evolves according to community needs 
              and maintains true decentralization.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-gradient-to-br from-ctea-teal/20 to-ctea-blue/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Vote className="w-4 h-4 text-ctea-teal" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Community-Driven</h3>
                  <p className="text-gray-400 text-sm">
                    All major decisions are made by the community, ensuring the platform serves user needs.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-gradient-to-br from-ctea-purple/20 to-ctea-pink/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Shield className="w-4 h-4 text-ctea-purple" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Transparent & Secure</h3>
                  <p className="text-gray-400 text-sm">
                    All governance actions are recorded on-chain with full transparency and security.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-gradient-to-br from-ctea-yellow/20 to-ctea-orange/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <TrendingUp className="w-4 h-4 text-ctea-yellow" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Incentivized Participation</h3>
                  <p className="text-gray-400 text-sm">
                    Earn rewards for active participation in governance and proposal creation.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Users className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Inclusive Decision Making</h3>
                  <p className="text-gray-400 text-sm">
                    Every token holder has a voice proportional to their stake in the platform.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-gradient-to-br from-ctea-teal/20 to-ctea-blue/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Zap className="w-4 h-4 text-ctea-teal" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Rapid Innovation</h3>
                  <p className="text-gray-400 text-sm">
                    Quick decision-making process enables rapid platform evolution and feature updates.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-gradient-to-br from-ctea-purple/20 to-ctea-pink/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Award className="w-4 h-4 text-ctea-purple" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Aligned Incentives</h3>
                  <p className="text-gray-400 text-sm">
                    Token holders are incentivized to make decisions that benefit the entire ecosystem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GovernancePage; 