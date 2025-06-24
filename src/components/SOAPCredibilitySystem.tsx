import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, Award, TrendingUp, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { useUserProgression } from '@/hooks/useUserProgression';
import { supabase } from '@/integrations/supabase/client';

interface SOAPCredibilitySystemProps {
  userId?: string;
}

interface CredibilityMetrics {
  total_verifications: number;
  successful_verifications: number;
  failed_verifications: number;
  moderation_actions: number;
  community_trust_score: number;
  soap_tokens: number;
  verification_accuracy: number;
  last_verification_date?: string;
}

const SOAPCredibilitySystem: React.FC<SOAPCredibilitySystemProps> = ({ userId }) => {
  const [metrics, setMetrics] = useState<CredibilityMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { userProgression } = useUserProgression();

  useEffect(() => {
    fetchCredibilityMetrics();
  }, [userId]);

  const fetchCredibilityMetrics = async () => {
    try {
      const anonymousToken = userProgression?.anonymous_token || userId;
      if (!anonymousToken) return;

      // Fetch credibility metrics from database
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('anonymous_token', anonymousToken)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setMetrics({
          total_verifications: data.total_verifications || 0,
          successful_verifications: data.successful_verifications || 0,
          failed_verifications: data.failed_verifications || 0,
          moderation_actions: data.moderation_actions || 0,
          community_trust_score: data.community_trust_score || 0,
          soap_tokens: data.soap_tokens || 0,
          verification_accuracy: data.verification_accuracy || 0,
          last_verification_date: data.last_verification_date
        });
      } else {
        // Initialize new user metrics
        setMetrics({
          total_verifications: 0,
          successful_verifications: 0,
          failed_verifications: 0,
          moderation_actions: 0,
          community_trust_score: 50, // Starting trust score
          soap_tokens: 0,
          verification_accuracy: 0
        });
      }
    } catch (error) {
      console.error('Error fetching credibility metrics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTrustLevel = (score: number) => {
    if (score >= 90) return { level: 'Legendary', color: 'text-ctea-yellow', icon: '👑' };
    if (score >= 80) return { level: 'Trusted', color: 'text-ctea-teal', icon: '🛡️' };
    if (score >= 70) return { level: 'Reliable', color: 'text-ctea-purple', icon: '✅' };
    if (score >= 60) return { level: 'Verified', color: 'text-ctea-pink', icon: '🔍' };
    if (score >= 50) return { level: 'Neutral', color: 'text-gray-400', icon: '⚖️' };
    if (score >= 40) return { level: 'Suspicious', color: 'text-ctea-orange', icon: '⚠️' };
    return { level: 'Untrusted', color: 'text-red-500', icon: '🚫' };
  };

  const getSOAPRewards = (accuracy: number) => {
    if (accuracy >= 95) return 10;
    if (accuracy >= 90) return 8;
    if (accuracy >= 85) return 6;
    if (accuracy >= 80) return 4;
    if (accuracy >= 75) return 2;
    return 1;
  };

  const trustLevel = metrics ? getTrustLevel(metrics.community_trust_score) : null;
  const soapRewards = metrics ? getSOAPRewards(metrics.verification_accuracy) : 0;

  if (isLoading) {
    return (
      <Card className="p-6 bg-gradient-to-br from-ctea-dark/80 to-ctea-darker/90 border-ctea-teal/30">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-ctea-teal/20 rounded w-1/3"></div>
          <div className="h-8 bg-ctea-teal/20 rounded"></div>
          <div className="space-y-2">
            <div className="h-3 bg-ctea-teal/20 rounded"></div>
            <div className="h-3 bg-ctea-teal/20 rounded w-2/3"></div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-ctea-dark/80 to-ctea-darker/90 border-ctea-teal/30">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-ctea-teal" />
            <div>
              <h3 className="text-xl font-bold text-white">$SOAP Credibility</h3>
              <p className="text-sm text-gray-400">Truth verification & reputation system</p>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-ctea-teal to-ctea-purple text-white font-bold">
            {metrics?.soap_tokens || 0} $SOAP
          </Badge>
        </div>

        {/* Trust Score */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-white font-medium">Community Trust Score</span>
            <div className="flex items-center gap-2">
              <span className={`font-bold ${trustLevel?.color}`}>
                {trustLevel?.icon} {trustLevel?.level}
              </span>
              <span className="text-ctea-teal font-bold">
                {metrics?.community_trust_score || 0}/100
              </span>
            </div>
          </div>
          <Progress 
            value={metrics?.community_trust_score || 0} 
            className="h-2 bg-ctea-dark/50"
          />
        </div>

        {/* Verification Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-ctea-dark/50 rounded-lg border border-ctea-teal/20">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-white font-medium">Successful</span>
            </div>
            <div className="text-2xl font-bold text-green-500">
              {metrics?.successful_verifications || 0}
            </div>
            <div className="text-xs text-gray-400">Verifications</div>
          </div>

          <div className="p-3 bg-ctea-dark/50 rounded-lg border border-ctea-teal/20">
            <div className="flex items-center gap-2 mb-1">
              <XCircle className="w-4 h-4 text-red-500" />
              <span className="text-white font-medium">Failed</span>
            </div>
            <div className="text-2xl font-bold text-red-500">
              {metrics?.failed_verifications || 0}
            </div>
            <div className="text-xs text-gray-400">Verifications</div>
          </div>
        </div>

        {/* Accuracy & Rewards */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-white font-medium">Verification Accuracy</span>
            <span className="text-ctea-yellow font-bold">
              {metrics?.verification_accuracy || 0}%
            </span>
          </div>
          
          <div className="p-3 bg-ctea-yellow/10 rounded-lg border border-ctea-yellow/30">
            <div className="flex items-center gap-2 mb-1">
              <Award className="w-4 h-4 text-ctea-yellow" />
              <span className="text-white font-medium">$SOAP Rewards</span>
            </div>
            <div className="text-sm text-gray-300">
              Earn {soapRewards} $SOAP tokens per successful verification
            </div>
          </div>
        </div>

        {/* Moderation Actions */}
        <div className="p-3 bg-ctea-purple/10 rounded-lg border border-ctea-purple/30">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-4 h-4 text-ctea-purple" />
            <span className="text-white font-medium">Moderation Actions</span>
          </div>
          <div className="text-2xl font-bold text-ctea-purple">
            {metrics?.moderation_actions || 0}
          </div>
          <div className="text-xs text-gray-400">
            Community moderation contributions
          </div>
        </div>

        {/* Recent Activity */}
        {metrics?.last_verification_date && (
          <div className="text-xs text-gray-400">
            Last verification: {new Date(metrics.last_verification_date).toLocaleDateString()}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 border-ctea-teal/30 text-ctea-teal hover:bg-ctea-teal/10"
          >
            <TrendingUp className="w-4 h-4 mr-1" />
            View History
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1 border-ctea-purple/30 text-ctea-purple hover:bg-ctea-purple/10"
          >
            <Shield className="w-4 h-4 mr-1" />
            Moderate
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SOAPCredibilitySystem; 