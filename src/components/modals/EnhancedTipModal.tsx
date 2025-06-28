
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Copy, 
  Check, 
  Heart, 
  Wallet, 
  Mail, 
  Upload,
  ExternalLink,
  Coins
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTipVerification } from '@/hooks/useTipVerification';

interface EnhancedTipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EnhancedTipModal: React.FC<EnhancedTipModalProps> = ({
  isOpen,
  onClose
}) => {
  const [selectedNetwork, setSelectedNetwork] = useState('ethereum');
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState<'copy' | 'proof'>('copy');
  const [proofData, setProofData] = useState({
    userEmail: '',
    amount: '',
    transactionHash: '',
    proofImageUrl: ''
  });
  const [submitting, setSubmitting] = useState(false);
  
  const { toast } = useToast();
  const { submitTipProof } = useTipVerification();

  // Real wallet addresses from your screenshots
  const walletAddresses = {
    ethereum: '0x223Ea393d1c83338ee1E81C298924eA2A28c656d',
    avax: '0x223Ea393d1c83338ee1E81C298924eA2A28c656d',
    polygon: '0xCB9f62...6b77c9',
    base: '0xCB9f62...6b77c9',
    tron: 'TYqMDoQaqoAm6ttKbSKKVmbC2yt4YHq2nu',
    solana: 'CCazM2Rx6p1KfZawjckUVr1wQTJY87swyo1yN52GAQqa',
    bitcoin: 'bc1qej...tgazdc',
    sui: '0x161bc8...a40d44'
  };

  const walletAddress = walletAddresses[selectedNetwork as keyof typeof walletAddresses];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      toast({
        title: "Address Copied! 📋",
        description: `${selectedNetwork.toUpperCase()} address copied. Send your tip and submit proof below!`,
      });
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Please copy the address manually",
        variant: "destructive"
      });
    }
  };

  const handleSubmitProof = async () => {
    if (!proofData.userEmail || !proofData.amount) {
      toast({
        title: "Missing Information",
        description: "Please provide your email and tip amount",
        variant: "destructive"
      });
      return;
    }

    setSubmitting(true);
    try {
      const result = await submitTipProof({
        userEmail: proofData.userEmail,
        network: selectedNetwork,
        walletAddress: walletAddress,
        amount: parseFloat(proofData.amount),
        transactionHash: proofData.transactionHash || undefined,
        proofImageUrl: proofData.proofImageUrl || undefined
      });

      if (result.success) {
        setStep('copy');
        setProofData({
          userEmail: '',
          amount: '',
          transactionHash: '',
          proofImageUrl: ''
        });
        onClose();
      }
    } catch (error) {
      // Error handling is done in the hook
    } finally {
      setSubmitting(false);
    }
  };

  const resetModal = () => {
    setStep('copy');
    setProofData({
      userEmail: '',
      amount: '',
      transactionHash: '',
      proofImageUrl: ''
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        resetModal();
        onClose();
      }
    }}>
      <DialogContent className="bg-ctea-dark border-ctea-teal/30 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-white">
            <Heart className="w-6 h-6 text-ctea-teal" />
            Support Development
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Network Selection */}
          <div className="space-y-2">
            <Label className="text-white">Select Network</Label>
            <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
              <SelectTrigger className="bg-ctea-darker border-ctea-teal/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ethereum">Ethereum (ETH)</SelectItem>
                <SelectItem value="bitcoin">Bitcoin (BTC)</SelectItem>
                <SelectItem value="solana">Solana (SOL)</SelectItem>
                <SelectItem value="avax">Avalanche (AVAX)</SelectItem>
                <SelectItem value="polygon">Polygon (MATIC)</SelectItem>
                <SelectItem value="tron">Tron (TRX)</SelectItem>
                <SelectItem value="sui">Sui (SUI)</SelectItem>
                <SelectItem value="base">Base (ETH)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {step === 'copy' && (
            <div className="space-y-4">
              {/* Wallet Address */}
              <div className="bg-ctea-darker/50 border border-ctea-purple/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Wallet className="w-4 h-4 text-ctea-teal" />
                  <span className="text-sm font-medium text-white">Wallet Address</span>
                  <Badge className="bg-ctea-purple/20 text-ctea-purple border-ctea-purple/30">
                    {selectedNetwork.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs mb-3">
                  <code className="text-gray-300 font-mono text-sm bg-gray-800/50 px-3 py-2 rounded flex-1">
                    {walletAddress}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyToClipboard}
                    className="h-8 w-8 p-0"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400 hover:text-ctea-teal" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded p-4">
                <div className="flex items-center gap-2 text-sm text-green-400 mb-2">
                  <Coins className="w-4 h-4" />
                  <span className="font-medium">How to get VIP access:</span>
                </div>
                <ol className="text-sm text-gray-300 space-y-1 list-decimal list-inside">
                  <li>Copy the wallet address above</li>
                  <li>Send any amount of {selectedNetwork.toUpperCase()} to this address</li>
                  <li>Click "Submit Proof" below to verify your tip</li>
                  <li>Get instant VIP access once verified! ☕</li>
                </ol>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setStep('proof')}
                  className="flex-1 bg-gradient-to-r from-ctea-teal to-pink-400 hover:from-ctea-teal/80 hover:to-pink-400/80 text-white"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Submit Proof
                </Button>
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Close
                </Button>
              </div>
            </div>
          )}

          {step === 'proof' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Your Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={proofData.userEmail}
                  onChange={(e) => setProofData({...proofData, userEmail: e.target.value})}
                  className="bg-ctea-darker border-ctea-teal/30 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount" className="text-white">Amount Sent *</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.000001"
                  placeholder="0.01"
                  value={proofData.amount}
                  onChange={(e) => setProofData({...proofData, amount: e.target.value})}
                  className="bg-ctea-darker border-ctea-teal/30 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="txHash" className="text-white">Transaction Hash (Optional)</Label>
                <Input
                  id="txHash"
                  placeholder="0x..."
                  value={proofData.transactionHash}
                  onChange={(e) => setProofData({...proofData, transactionHash: e.target.value})}
                  className="bg-ctea-darker border-ctea-teal/30 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="proofUrl" className="text-white">Screenshot URL (Optional)</Label>
                <Input
                  id="proofUrl"
                  type="url"
                  placeholder="https://imgur.com/..."
                  value={proofData.proofImageUrl}
                  onChange={(e) => setProofData({...proofData, proofImageUrl: e.target.value})}
                  className="bg-ctea-darker border-ctea-teal/30 text-white"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleSubmitProof}
                  disabled={submitting}
                  className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
                >
                  {submitting ? 'Submitting...' : 'Submit Proof'}
                </Button>
                <Button
                  onClick={() => setStep('copy')}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Back
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedTipModal;
