import React, { useEffect } from 'react';
import { X, Copy, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
  showForm?: boolean;
  showTipping?: boolean;
  onSubmit?: (data: { tea: string; email: string; wallet: string }) => void;
  submitButtonText?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  showForm = false,
  showTipping = false,
  onSubmit,
  submitButtonText = "Submit"
}) => {
  const [formData, setFormData] = React.useState({
    tea: '',
    email: '',
    wallet: ''
  });
  const [copiedAddress, setCopiedAddress] = React.useState<string | null>(null);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
      setFormData({ tea: '', email: '', wallet: '' });
    }
    onClose();
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
        <div className="bg-ctea-dark/95 backdrop-blur-md border border-ctea-teal/30 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-ctea-teal/20">
            <h2 className="text-xl font-bold text-white">{title}</h2>
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
            {showForm ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="tea" className="text-gray-300">Your Tea (Anonymous)</Label>
                  <Textarea
                    id="tea"
                    placeholder="Share the hottest crypto gossip, alpha, or meme-fueled take..."
                    value={formData.tea}
                    onChange={(e) => setFormData({...formData, tea: e.target.value})}
                    className="min-h-[100px] bg-ctea-dark/50 border-ctea-teal/30 text-white placeholder-gray-400"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-300">Email (for beta access)</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="bg-ctea-dark/50 border-ctea-teal/30 text-white placeholder-gray-400"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="wallet" className="text-gray-300">Wallet Address (optional)</Label>
                  <Input
                    id="wallet"
                    type="text"
                    placeholder="0x..."
                    value={formData.wallet}
                    onChange={(e) => setFormData({...formData, wallet: e.target.value})}
                    className="bg-ctea-dark/50 border-ctea-teal/30 text-white placeholder-gray-400"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-ctea text-white font-bold hover:opacity-90 transition-all duration-300"
                >
                  {submitButtonText}
                </Button>
              </form>
            ) : showTipping ? (
              <div className="space-y-6">
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
                  <div className="bg-ctea-dark/30 border border-ctea-teal/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-ctea-teal font-medium">Ethereum (ETH)</span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10"
                        onClick={() => copyToClipboard("0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6", "ETH")}
                      >
                        Copy
                      </Button>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-white p-2 rounded">
                        <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                          QR Code
                        </div>
                      </div>
                      <code className="text-xs text-gray-300 bg-ctea-dark/50 p-2 rounded flex-1 break-all">
                        0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6
                      </code>
                    </div>
                  </div>

                  {/* SOL Address */}
                  <div className="bg-ctea-dark/30 border border-ctea-teal/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-ctea-teal font-medium">Solana (SOL)</span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10"
                        onClick={() => copyToClipboard("9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM", "SOL")}
                      >
                        Copy
                      </Button>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-white p-2 rounded">
                        <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                          QR Code
                        </div>
                      </div>
                      <code className="text-xs text-gray-300 bg-ctea-dark/50 p-2 rounded flex-1 break-all">
                        9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM
                      </code>
                    </div>
                  </div>

                  {/* Phantom Handle */}
                  <div className="bg-ctea-dark/30 border border-ctea-teal/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-ctea-teal font-medium">Phantom Handle</span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10"
                        onClick={() => copyToClipboard("@ctea_newsroom", "Phantom")}
                      >
                        Copy
                      </Button>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-white p-2 rounded">
                        <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                          QR Code
                        </div>
                      </div>
                      <code className="text-xs text-gray-300 bg-ctea-dark/50 p-2 rounded flex-1">
                        @ctea_newsroom
                      </code>
                    </div>
                  </div>
                </div>

                <div className="bg-ctea-pink/10 border border-ctea-pink/30 rounded-lg p-4">
                  <p className="text-ctea-pink text-sm">
                    🚀 After sending, DM us your transaction hash on Twitter for instant VIP access!
                  </p>
                </div>
              </div>
            ) : (
              children
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal; 