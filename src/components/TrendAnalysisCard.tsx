import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, AlertTriangle, Clock, Target, Activity } from 'lucide-react';

interface TrendAnalysis {
  viralProbability: number;
  growthRate: number;
  peakTime: string;
  relatedTopics: string[];
  sentimentShift: 'positive' | 'negative' | 'stable';
  riskLevel: 'low' | 'medium' | 'high';
}

interface TrendAnalysisCardProps {
  analysis: TrendAnalysis;
  className?: string;
}

const TrendAnalysisCard: React.FC<TrendAnalysisCardProps> = ({ analysis, className = '' }) => {
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return '🟢';
      case 'medium': return '🟡';
      case 'high': return '🔴';
      default: return '⚪';
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-400';
      case 'negative': return 'text-red-400';
      case 'stable': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getViralProbabilityColor = (probability: number) => {
    if (probability >= 80) return 'text-ctea-pink';
    if (probability >= 60) return 'text-ctea-yellow';
    if (probability >= 40) return 'text-ctea-teal';
    return 'text-gray-400';
  };

  const getViralProbabilityBadge = (probability: number) => {
    if (probability >= 80) return '🔥 VIRAL';
    if (probability >= 60) return '📈 TRENDING';
    if (probability >= 40) return '📊 GROWING';
    return '📉 QUIET';
  };

  return (
    <Card className={`bg-gradient-to-br from-ctea-dark/80 to-ctea-darker/90 border-ctea-teal/30 neon-border ${className}`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-ctea-teal" />
            Trend Analysis
          </h3>
          <Badge className={`${getViralProbabilityColor(analysis.viralProbability)} bg-ctea-dark/50 border border-current`}>
            {getViralProbabilityBadge(analysis.viralProbability)}
          </Badge>
        </div>

        {/* Main Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Viral Probability */}
          <div className="text-center p-4 bg-ctea-dark/30 rounded-lg border border-ctea-teal/20">
            <div className={`text-2xl font-bold ${getViralProbabilityColor(analysis.viralProbability)}`}>
              {analysis.viralProbability}%
            </div>
            <div className="text-sm text-gray-400">Viral Probability</div>
          </div>

          {/* Growth Rate */}
          <div className="text-center p-4 bg-ctea-dark/30 rounded-lg border border-ctea-teal/20">
            <div className={`text-2xl font-bold ${analysis.growthRate >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {analysis.growthRate >= 0 ? '+' : ''}{analysis.growthRate.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-400">Growth Rate</div>
          </div>
        </div>

        {/* Secondary Metrics */}
        <div className="space-y-4 mb-6">
          {/* Peak Time */}
          <div className="flex items-center justify-between p-3 bg-ctea-dark/20 rounded-lg border border-ctea-teal/10">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-ctea-yellow" />
              <span className="text-gray-300 text-sm">Expected Peak</span>
            </div>
            <span className="text-white font-medium">{analysis.peakTime}</span>
          </div>

          {/* Risk Level */}
          <div className="flex items-center justify-between p-3 bg-ctea-dark/20 rounded-lg border border-ctea-teal/10">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-ctea-orange" />
              <span className="text-gray-300 text-sm">Risk Level</span>
            </div>
            <div className="flex items-center gap-2">
              <span>{getRiskIcon(analysis.riskLevel)}</span>
              <span className={`font-medium ${getRiskColor(analysis.riskLevel)}`}>
                {analysis.riskLevel.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Sentiment Shift */}
          <div className="flex items-center justify-between p-3 bg-ctea-dark/20 rounded-lg border border-ctea-teal/10">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-ctea-purple" />
              <span className="text-gray-300 text-sm">Sentiment</span>
            </div>
            <span className={`font-medium ${getSentimentColor(analysis.sentimentShift)}`}>
              {analysis.sentimentShift.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Related Topics */}
        {analysis.relatedTopics.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
              <Target className="w-4 h-4 text-ctea-teal" />
              Related Topics
            </h4>
            <div className="flex flex-wrap gap-2">
              {analysis.relatedTopics.map((topic, index) => (
                <Badge key={index} className="bg-ctea-teal/20 text-ctea-teal border-ctea-teal/30 text-xs">
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Insights */}
        <div className="p-4 bg-gradient-to-r from-ctea-purple/10 to-ctea-pink/10 rounded-lg border border-ctea-purple/20">
          <h4 className="text-sm font-medium text-white mb-2">AI Insights</h4>
          <div className="text-sm text-gray-300 space-y-1">
            {analysis.viralProbability > 80 && (
              <p>🚀 High viral potential detected. This content is likely to spread rapidly.</p>
            )}
            {analysis.riskLevel === 'high' && (
              <p>⚠️ High risk content. Monitor for potential community impact.</p>
            )}
            {analysis.growthRate > 20 && (
              <p>📈 Strong growth momentum. Consider boosting for maximum reach.</p>
            )}
            {analysis.sentimentShift === 'negative' && (
              <p>📉 Negative sentiment shift detected. Monitor community reaction.</p>
            )}
            {analysis.peakTime === '1-2h' && (
              <p>⚡ Fast-moving content. Act quickly to capitalize on momentum.</p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TrendAnalysisCard; 