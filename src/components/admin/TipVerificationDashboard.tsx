
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Mail, 
  Check, 
  X, 
  Eye, 
  Search, 
  Filter,
  Clock,
  Crown,
  DollarSign,
  Copy
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TipSubmission {
  id: string;
  email: string;
  network: string;
  amount: string;
  txHash: string;
  walletAddress: string;
  screenshot?: string;
  message: string;
  timestamp: Date;
  status: 'pending' | 'approved' | 'rejected';
  verifiedBy?: string;
  notes?: string;
}

const TipVerificationDashboard: React.FC = () => {
  const [submissions, setSubmissions] = useState<TipSubmission[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  // Mock data - replace with real API calls
  useEffect(() => {
    const mockSubmissions: TipSubmission[] = [
      {
        id: '1',
        email: 'alice@example.com',
        network: 'ETH',
        amount: '0.01',
        txHash: '0x742d35Cc6634C0532925a3b8D020d6bb55aAc',
        walletAddress: '0x123...456',
        message: 'Love the app! Keep up the great work.',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        status: 'pending'
      },
      {
        id: '2', 
        email: 'bob@example.com',
        network: 'SOL',
        amount: '1.5',
        txHash: 'CCazM2Rx6p1KfZawjckUVr1wQTJY87swyo1',
        walletAddress: 'ABC...XYZ',
        message: 'Here\'s some SOL for the devs!',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        status: 'approved',
        verifiedBy: 'admin',
        notes: 'Verified transaction on Solscan'
      }
    ];
    setSubmissions(mockSubmissions);
  }, []);

  const handleApprove = async (submissionId: string) => {
    // In real implementation, this would:
    // 1. Grant VIP access to the user
    // 2. Send confirmation email
    // 3. Update database
    
    const submission = submissions.find(s => s.id === submissionId);
    if (!submission) return;

    setSubmissions(prev => prev.map(s => 
      s.id === submissionId 
        ? { ...s, status: 'approved', verifiedBy: 'admin', notes: 'VIP access granted' }
        : s
    ));

    toast({
      title: "Tip Approved! ✅",
      description: `VIP access granted to ${submission.email}`,
    });
  };

  const handleReject = async (submissionId: string) => {
    const submission = submissions.find(s => s.id === submissionId);
    if (!submission) return;

    setSubmissions(prev => prev.map(s => 
      s.id === submissionId 
        ? { ...s, status: 'rejected', verifiedBy: 'admin' }
        : s
    ));

    toast({
      title: "Tip Rejected",
      description: `Submission from ${submission.email} has been rejected`,
      variant: "destructive"
    });
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: `${label} copied to clipboard`,
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Could not copy to clipboard",
        variant: "destructive"
      });
    }
  };

  const filteredSubmissions = submissions
    .filter(s => filter === 'all' || s.status === filter)
    .filter(s => 
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.network.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.txHash.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const stats = {
    total: submissions.length,
    pending: submissions.filter(s => s.status === 'pending').length,
    approved: submissions.filter(s => s.status === 'approved').length,
    rejected: submissions.filter(s => s.status === 'rejected').length
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Tip Verification Dashboard</h1>
          <p className="text-gray-400">Manage tip submissions and grant VIP access</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-white">
            Admin Panel
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-ctea-darker border-ctea-teal/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-400">Total</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-ctea-darker border-yellow-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-sm text-gray-400">Pending</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-ctea-darker border-green-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-sm text-gray-400">Approved</p>
                <p className="text-2xl font-bold text-green-400">{stats.approved}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-ctea-darker border-red-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <X className="w-5 h-5 text-red-400" />
              <div>
                <p className="text-sm text-gray-400">Rejected</p>
                <p className="text-2xl font-bold text-red-400">{stats.rejected}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-ctea-darker border-ctea-teal/30">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by email, network, or transaction hash..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-ctea-dark border-ctea-teal/30 text-white"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
                <Button
                  key={status}
                  variant={filter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(status)}
                  className={filter === status ? 
                    "bg-ctea-teal text-white" : 
                    "border-ctea-teal/30 text-gray-300 hover:bg-ctea-teal/10"
                  }
                >
                  <Filter className="w-4 h-4 mr-1" />
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submissions List */}
      <div className="space-y-4">
        {filteredSubmissions.map((submission) => (
          <Card key={submission.id} className="bg-ctea-darker border-ctea-teal/30">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  {submission.email}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge 
                    className={
                      submission.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      submission.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                      'bg-red-500/20 text-red-400'
                    }
                  >
                    {submission.status.toUpperCase()}
                  </Badge>
                  <span className="text-sm text-gray-400">
                    {submission.timestamp.toLocaleString()}
                  </span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Network & Amount</p>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-ctea-purple/20 text-ctea-purple">
                      {submission.network}
                    </Badge>
                    <span className="text-white font-mono">
                      {submission.amount} {submission.network}
                    </span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-400 mb-1">Transaction Hash</p>
                  <div className="flex items-center gap-2">
                    <code className="text-white font-mono text-sm bg-ctea-dark px-2 py-1 rounded">
                      {submission.txHash.slice(0, 8)}...{submission.txHash.slice(-6)}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(submission.txHash, 'Transaction hash')}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-400 mb-1">Sender Wallet</p>
                  <div className="flex items-center gap-2">
                    <code className="text-white font-mono text-sm bg-ctea-dark px-2 py-1 rounded">
                      {submission.walletAddress}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(submission.walletAddress, 'Wallet address')}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {submission.message && (
                <div>
                  <p className="text-sm text-gray-400 mb-1">Message</p>
                  <p className="text-white text-sm bg-ctea-dark p-3 rounded">
                    {submission.message}
                  </p>
                </div>
              )}
              
              {submission.notes && (
                <div>
                  <p className="text-sm text-gray-400 mb-1">Admin Notes</p>
                  <p className="text-green-400 text-sm">
                    {submission.notes}
                  </p>
                </div>
              )}
              
              {submission.status === 'pending' && (
                <div className="flex gap-3 pt-3 border-t border-ctea-teal/20">
                  <Button
                    onClick={() => handleApprove(submission.id)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Approve & Grant VIP
                  </Button>
                  <Button
                    onClick={() => handleReject(submission.id)}
                    variant="outline"
                    className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                  <Button
                    variant="outline"
                    className="border-ctea-teal/30 text-gray-300"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Transaction
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        
        {filteredSubmissions.length === 0 && (
          <Card className="bg-ctea-darker border-ctea-teal/30">
            <CardContent className="p-8 text-center">
              <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No Submissions Found</h3>
              <p className="text-gray-400">
                {filter === 'all' ? 'No tip submissions yet.' : `No ${filter} submissions found.`}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TipVerificationDashboard;
