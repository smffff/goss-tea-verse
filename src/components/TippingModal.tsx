import React, { useState } from 'react';
import { X, Copy, CheckCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface TippingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TippingModal: React.FC<TippingModalProps> = ({ isOpen, onClose }) => {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const walletAddresses = {
    ETH: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
    SOL: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
    BTC: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    Phantom: "@ctea_newsroom"
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAddress(type);
      setTimeout(() => setCopiedAddress(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-ctea-dark/95 backdrop-blur-md border border-ctea-teal/30 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-ctea-teal/20">
            <h2 className="text-xl font-bold text-white">Tip the Gatekeepers</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white hover:bg-ctea-dark/50"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="text-center mb-6">
              <p className="text-gray-300 mb-4">
                Tip the gatekeepers to skip the queue and get instant VIP access.
              </p>
              <div className="bg-ctea-teal/10 border border-ctea-teal/30 rounded-lg p-4">
                <p className="text-ctea-teal text-sm font-medium">
                  💡 Any amount gets you VIP status. Higher tips = more exclusive perks.
                </p>
              </div>
            </div>

            {/* Wallet Addresses */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white mb-4">Send Tips To:</h3>
              
              {/* ETH Address */}
              <Card className="bg-ctea-dark/30 border border-ctea-teal/20">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-ctea-teal font-medium">Ethereum (ETH)</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10"
                      onClick={() => copyToClipboard(walletAddresses.ETH, "ETH")}
                    >
                      {copiedAddress === "ETH" ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 mr-1" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded">
                      <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                        QR Code
                      </div>
                    </div>
                    <code className="text-xs text-gray-300 bg-ctea-dark/50 p-2 rounded flex-1 break-all">
                      {walletAddresses.ETH}
                    </code>
                  </div>
                </div>
              </Card>

              {/* SOL Address */}
              <Card className="bg-ctea-dark/30 border border-ctea-teal/20">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-ctea-teal font-medium">Solana (SOL)</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10"
                      onClick={() => copyToClipboard(walletAddresses.SOL, "SOL")}
                    >
                      {copiedAddress === "SOL" ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 mr-1" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded">
                      <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                        QR Code
                      </div>
                    </div>
                    <code className="text-xs text-gray-300 bg-ctea-dark/50 p-2 rounded flex-1 break-all">
                      {walletAddresses.SOL}
                    </code>
                  </div>
                </div>
              </Card>

              {/* BTC Address */}
              <Card className="bg-ctea-dark/30 border border-ctea-teal/20">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-ctea-teal font-medium">Bitcoin (BTC)</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10"
                      onClick={() => copyToClipboard(walletAddresses.BTC, "BTC")}
                    >
                      {copiedAddress === "BTC" ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 mr-1" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded">
                      <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                        QR Code
                      </div>
                    </div>
                    <code className="text-xs text-gray-300 bg-ctea-dark/50 p-2 rounded flex-1 break-all">
                      {walletAddresses.BTC}
                    </code>
                  </div>
                </div>
              </Card>

              {/* Phantom Handle */}
              <Card className="bg-ctea-dark/30 border border-ctea-teal/20">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-ctea-teal font-medium">Phantom Handle</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10"
                      onClick={() => copyToClipboard(walletAddresses.Phantom, "Phantom")}
                    >
                      {copiedAddress === "Phantom" ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 mr-1" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded">
                      <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                        QR Code
                      </div>
                    </div>
                    <code className="text-xs text-gray-300 bg-ctea-dark/50 p-2 rounded flex-1 break-all">
                      {walletAddresses.Phantom}
                    </code>
                  </div>
                </div>
              </Card>
            </div>

            {/* Instructions */}
            <div className="mt-6 bg-ctea-yellow/10 border border-ctea-yellow/30 rounded-lg p-4">
              <h4 className="text-ctea-yellow font-bold mb-2">After Sending Your Tip:</h4>
              <ol className="text-sm text-gray-300 space-y-1">
                <li>1. Copy your transaction hash</li>
                <li>2. DM us on Twitter <a href="https://twitter.com/ctea_newsroom" target="_blank" rel="noopener" className="text-ctea-teal hover:underline">@ctea_newsroom</a></li>
                <li>3. Include your transaction hash for instant VIP access</li>
              </ol>
            </div>

            {/* Close Button */}
            <div className="mt-6">
              <Button
                onClick={onClose}
                className="w-full bg-gradient-ctea text-white font-bold hover:opacity-90 transition-all duration-300"
              >
                Got it!
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TippingModal; 