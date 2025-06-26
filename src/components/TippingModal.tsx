import React, { useState, useEffect } from 'react';
import { X, Copy, CheckCircle, ExternalLink, QrCode, Gift } from 'lucide-react';
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
      if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.error('Failed to copy: ', err);
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

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={handleBackdropClick}
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="bg-ctea-dark/95 backdrop-blur-md border border-[#00d1c1]/30 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="tipping-modal-title"
          aria-describedby="tipping-modal-description"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#00d1c1]/20">
            <div className="flex items-center gap-3">
              <Gift className="w-6 h-6 text-[#ff61a6]" />
              <div>
                <h2 id="tipping-modal-title" className="text-xl font-bold text-white">
                  Tip the Gatekeepers
                </h2>
                <p id="tipping-modal-description" className="text-sm text-gray-400">
                  Skip the queue with VIP access
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white hover:bg-ctea-dark/50"
              aria-label="Close tipping modal"
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
              <div className="bg-[#00d1c1]/10 border border-[#00d1c1]/30 rounded-lg p-4">
                <p className="text-[#00d1c1] text-sm font-medium">
                  💡 Any amount gets you VIP status. Higher tips = more exclusive perks.
                </p>
              </div>
            </div>

            {/* Wallet Addresses */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white mb-4">Send Tips To:</h3>
              
              {/* ETH Address */}
              <Card className="bg-ctea-dark/30 border border-[#00d1c1]/20">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#00d1c1] font-medium">Ethereum (ETH)</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs border-[#00d1c1] text-[#00d1c1] hover:bg-[#00d1c1]/10 transition-colors duration-200"
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
              <Card className="bg-ctea-dark/30 border border-[#00d1c1]/20">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#00d1c1] font-medium">Solana (SOL)</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs border-[#00d1c1] text-[#00d1c1] hover:bg-[#00d1c1]/10 transition-colors duration-200"
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
              <Card className="bg-ctea-dark/30 border border-[#00d1c1]/20">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#00d1c1] font-medium">Bitcoin (BTC)</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs border-[#00d1c1] text-[#00d1c1] hover:bg-[#00d1c1]/10 transition-colors duration-200"
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
              <Card className="bg-ctea-dark/30 border border-[#00d1c1]/20">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#00d1c1] font-medium">Phantom Handle</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs border-[#00d1c1] text-[#00d1c1] hover:bg-[#00d1c1]/10 transition-colors duration-200"
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
                      <QrCode className="w-16 h-16 text-gray-400" />
                    </div>
                    <code className="text-xs text-gray-300 bg-ctea-dark/50 p-2 rounded flex-1 break-all">
                      {walletAddresses.Phantom}
                    </code>
                  </div>
                </div>
              </Card>
            </div>

            {/* Instructions */}
            <div className="bg-[#f1c40f]/10 border border-[#f1c40f]/30 rounded-lg p-4 mt-6">
              <h4 className="text-[#f1c40f] font-bold mb-2">After Sending:</h4>
              <ol className="text-sm text-gray-300 space-y-1">
                <li>1. Copy your transaction hash</li>
                <li>2. Email it to <span className="text-[#00d1c1]">tips@ctea.news</span></li>
                <li>3. Get instant VIP access within 24 hours</li>
              </ol>
            </div>

            {/* VIP Benefits */}
            <div className="bg-[#ff61a6]/10 border border-[#ff61a6]/30 rounded-lg p-4 mt-4">
              <h4 className="text-[#ff61a6] font-bold mb-2">VIP Benefits:</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Priority access to new features</li>
                <li>• Exclusive community channels</li>
                <li>• Early access to alpha drops</li>
                <li>• Custom profile badges</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TippingModal; 