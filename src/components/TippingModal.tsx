import React, { useState, useEffect } from 'react';
import { X, Copy, CheckCircle, ExternalLink, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface TippingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TippingModal: React.FC<TippingModalProps> = ({ isOpen, onClose }) => {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const { toast } = useToast();

  const walletAddresses = {
    ETH: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
    SOL: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
    BTC: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    Phantom: "@ctea_newsroom"
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAddress(type);
      toast({
        title: "Address Copied! 📋",
        description: `${type} address copied to clipboard`,
      });
      setTimeout(() => setCopiedAddress(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      toast({
        title: "Copy Failed",
        description: "Couldn't copy address. Please try again.",
        variant: "destructive"
      });
    }
  };

  const generateQRCode = (text: string) => {
    // Simple QR code generation using a service
    return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(text)}`;
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
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <QrCode className="w-5 h-5 text-accent" />
              Tip the Gatekeepers
            </h2>
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
                      className="text-xs border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10 transition-colors duration-200"
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
                      <img 
                        src={generateQRCode(walletAddresses.ETH)} 
                        alt="ETH QR Code"
                        className="w-16 h-16"
                      />
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
                      className="text-xs border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10 transition-colors duration-200"
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
                      <img 
                        src={generateQRCode(walletAddresses.SOL)} 
                        alt="SOL QR Code"
                        className="w-16 h-16"
                      />
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
                      className="text-xs border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10 transition-colors duration-200"
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
                      <img 
                        src={generateQRCode(walletAddresses.BTC)} 
                        alt="BTC QR Code"
                        className="w-16 h-16"
                      />
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
                      className="text-xs border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10 transition-colors duration-200"
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
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs">
                        PH
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
            <div className="mt-6 p-4 bg-gradient-to-r from-accent/10 to-accent2/10 border border-accent/20 rounded-lg">
              <h4 className="text-white font-semibold mb-2">How to get VIP access:</h4>
              <ol className="text-sm text-gray-300 space-y-1">
                <li>1. Send any amount to one of the addresses above</li>
                <li>2. Take a screenshot of your transaction</li>
                <li>3. DM us on Twitter with the screenshot</li>
                <li>4. Get instant VIP access to exclusive features!</li>
              </ol>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Button
                onClick={() => window.open('https://twitter.com/ctea_newsroom', '_blank')}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 transition-colors duration-200"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                DM on Twitter
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10 py-3 transition-colors duration-200"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TippingModal; 