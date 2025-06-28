
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Coins, 
  CheckCircle, 
  XCircle, 
  Clock, 
  ExternalLink,
  Mail,
  Wallet,
  Image as ImageIcon,
  Hash
} from 'lucide-react';
import { useTipVerification } from '@/hooks/useTipVerification';
import { formatDistanceToNow } from 'date-fns';

const TipVerificationDashboard: React.FC = () => {
  const { pendingTips, loading, verifying, verifyTip, loadPendingTips } = useTipVerification();
  const [rejectionReason, setRejectionReason] = useState('');
  const [selectedTipId, setSelectedTipId] = useState<string | null>(null);

  const handleVerify = async (tipId: string) => {
    await verifyTip(tipId, 'verified');
  };

  const handleReject = async (tipId: string) => {
    if (!rejectionReason.trim()) {
      return;
    }
    await verifyTip(tipId, 'rejected', rejectionReason);
    setRejectionReason('');
    setSelectedTipId(null);
  };

  const getNetworkBadgeColor = (network: string) => {
    const colors: Record<string, string> = {
      ethereum: 'bg-blue-500/20 text-blue-400',
      bitcoin: 'bg-orange-500/20 text-orange-400',
      solana: 'bg-purple-500/20 text-purple-400',
      avax: 'bg-red-500/20 text-red-400',
      polygon: 'bg-violet-500/20 text-violet-400',
      tron: 'bg-green-500/20 text-green-400',
      sui: 'bg-cyan-500/20 text-cyan-400',
      base: 'bg-blue-600/20 text-blue-300'
    };
    return colors[network.toLowerCase()] || 'bg-gray-500/20 text-gray-400';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Coins className="w-6 h-6 text-ctea-teal" />
            Tip Verification Dashboard
          </h2>
          <p className="text-gray-400 mt-1">
            Review and verify tip submissions from users
          </p>
        </div>
        <Button
          onClick={loadPendingTips}
          disabled={loading}
          className="bg-ctea-teal hover:bg-ctea-teal/80"
        >
          {loading ? 'Loading...' : 'Refresh'}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-ctea-dark/50 border-ctea-teal/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-400">Pending</span>
            </div>
            <div className="text-2xl font-bold text-white mt-1">
              {pendingTips.length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-ctea-dark/50 border-ctea-teal/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-400">Verified Today</span>
            </div>
            <div className="text-2xl font-bold text-white mt-1">
              {/* TODO: Add actual count */}
              0
            </div>
          </CardContent>
        </Card>

        <Card className="bg-ctea-dark/50 border-ctea-teal/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-400" />
              <span className="text-sm text-gray-400">Rejected Today</span>
            </div>
            <div className="text-2xl font-bold text-white mt-1">
              {/* TODO: Add actual count */}
              0
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Tips List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="text-gray-400">Loading pending tips...</div>
          </div>
        ) : pendingTips.length === 0 ? (
          <Card className="bg-ctea-dark/50 border-ctea-teal/20">
            <CardContent className="p-8 text-center">
              <Coins className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                No Pending Tips
              </h3>
              <p className="text-gray-400">
                All tip submissions have been processed!
              </p>
            </CardContent>
          </Card>
        ) : (
          pendingTips.map((tip) => (
            <Card key={tip.id} className="bg-ctea-dark/50 border-ctea-teal/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge className={getNetworkBadgeColor(tip.network)}>
                      {tip.network.toUpperCase()}
                    </Badge>
                    <span className="text-sm text-gray-400">
                      {formatDistanceToNow(new Date(tip.created_at), { addSuffix: true })}
                    </span>
                  </div>
                  <Badge variant="outline" className="border-yellow-500/50 text-yellow-400">
                    <Clock className="w-3 h-3 mr-1" />
                    Pending
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* User Info */}
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-white font-mono text-sm">{tip.user_email}</span>
                </div>

                {/* Wallet Address */}
                <div className="flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300 font-mono text-sm">
                    {tip.wallet_address}
                  </span>
                </div>

                {/* Amount */}
                {tip.amount && (
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-gray-400" />
                    <span className="text-white">
                      {tip.amount} {tip.network.toUpperCase()}
                    </span>
                  </div>
                )}

                {/* Transaction Hash */}
                {tip.transaction_hash && (
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300 font-mono text-sm">
                      {tip.transaction_hash}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                )}

                {/* Proof Image */}
                {tip.proof_image_url && (
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-gray-400" />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-ctea-teal hover:text-ctea-teal/80"
                      onClick={() => window.open(tip.proof_image_url, '_blank')}
                    >
                      View Proof Image
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-700">
                  <Button
                    onClick={() => handleVerify(tip.id)}
                    disabled={verifying === tip.id}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {verifying === tip.id ? 'Verifying...' : 'Verify'}
                  </Button>
                  
                  <Button
                    onClick={() => setSelectedTipId(tip.id)}
                    disabled={verifying === tip.id}
                    variant="outline"
                    className="border-red-500 text-red-400 hover:bg-red-500/10"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                </div>

                {/* Rejection Reason Input */}
                {selectedTipId === tip.id && (
                  <div className="space-y-3 pt-4 border-t border-gray-700">
                    <Label htmlFor="rejection-reason" className="text-white">
                      Rejection Reason
                    </Label>
                    <Textarea
                      id="rejection-reason"
                      placeholder="Please provide a reason for rejection..."
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      className="bg-ctea-darker border-gray-600 text-white"
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleReject(tip.id)}
                        disabled={!rejectionReason.trim() || verifying === tip.id}
                        variant="destructive"
                        size="sm"
                      >
                        Confirm Rejection
                      </Button>
                      <Button
                        onClick={() => {
                          setSelectedTipId(null);
                          setRejectionReason('');
                        }}
                        variant="outline"
                        size="sm"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default TipVerificationDashboard;
