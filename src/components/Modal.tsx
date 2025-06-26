import React, { useEffect, useState } from 'react';
import { X, Copy, CheckCircle, Coffee, QrCode, ExternalLink, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

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
  const [formData, setFormData] = useState({
    tea: '',
    email: '',
    wallet: ''
  });
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  const { toast } = useToast();

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

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.tea.trim()) {
      errors.tea = 'Please share some tea!';
    } else if (formData.tea.trim().length < 20) {
      errors.tea = 'Tea must be at least 20 characters long';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required for beta access';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (formData.wallet.trim() && !/^0x[a-fA-F0-9]{40}$/.test(formData.wallet.trim())) {
      errors.wallet = 'Please enter a valid Ethereum wallet address';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      if (onSubmit) {
        await onSubmit(formData);
      }
      
      toast({
        title: "Tea Submitted! ☕",
        description: "Your submission is being reviewed. Check back soon!",
      });
      
      setFormData({ tea: '', email: '', wallet: '' });
      setValidationErrors({});
      onClose();
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Couldn't submit your tea. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              {showForm && <Coffee className="w-5 h-5 text-accent" />}
              {title}
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
            {showForm ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="tea" className="text-gray-300 flex items-center gap-2">
                    Your Tea (Anonymous) ☕
                    <span className="text-red-400">*</span>
                  </Label>
                  <Textarea
                    id="tea"
                    placeholder="Share the hottest crypto gossip, alpha, or meme-fueled take... (min 20 characters)"
                    value={formData.tea}
                    onChange={(e) => {
                      setFormData({...formData, tea: e.target.value});
                      if (validationErrors.tea) {
                        setValidationErrors({...validationErrors, tea: ''});
                      }
                    }}
                    className={`min-h-[120px] bg-ctea-dark/50 border-ctea-teal/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-accent/50 focus:border-accent ${
                      validationErrors.tea ? 'border-red-400' : ''
                    }`}
                    required
                  />
                  {validationErrors.tea && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {validationErrors.tea}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    {formData.tea.length}/500 characters
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-gray-300 flex items-center gap-2">
                    Email (for beta access)
                    <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({...formData, email: e.target.value});
                      if (validationErrors.email) {
                        setValidationErrors({...validationErrors, email: ''});
                      }
                    }}
                    className={`bg-ctea-dark/50 border-ctea-teal/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-accent/50 focus:border-accent ${
                      validationErrors.email ? 'border-red-400' : ''
                    }`}
                    required
                  />
                  {validationErrors.email && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {validationErrors.email}
                    </p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="wallet" className="text-gray-300">
                    Wallet Address (optional)
                  </Label>
                  <Input
                    id="wallet"
                    type="text"
                    placeholder="0x..."
                    value={formData.wallet}
                    onChange={(e) => {
                      setFormData({...formData, wallet: e.target.value});
                      if (validationErrors.wallet) {
                        setValidationErrors({...validationErrors, wallet: ''});
                      }
                    }}
                    className={`bg-ctea-dark/50 border-ctea-teal/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-accent/50 focus:border-accent ${
                      validationErrors.wallet ? 'border-red-400' : ''
                    }`}
                  />
                  {validationErrors.wallet && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {validationErrors.wallet}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    Connect your wallet to earn $TEA rewards
                  </p>
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-accent to-accent2 hover:from-accent2 hover:to-accent text-white font-bold hover:opacity-90 transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    submitButtonText
                  )}
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
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-ctea-teal font-medium">Ethereum (ETH)</span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10"
                        onClick={() => copyToClipboard("0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6", "ETH")}
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
                      <div className="bg-white p-2 rounded flex-shrink-0">
                        <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                          <QrCode className="w-8 h-8" />
                        </div>
                      </div>
                      <code className="text-xs text-gray-300 bg-ctea-dark/50 p-2 rounded flex-1 break-all">
                        0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6
                      </code>
                    </div>
                  </div>

                  {/* SOL Address */}
                  <div className="bg-ctea-dark/30 border border-ctea-teal/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-ctea-teal font-medium">Solana (SOL)</span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10"
                        onClick={() => copyToClipboard("9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM", "SOL")}
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
                      <div className="bg-white p-2 rounded flex-shrink-0">
                        <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                          <QrCode className="w-8 h-8" />
                        </div>
                      </div>
                      <code className="text-xs text-gray-300 bg-ctea-dark/50 p-2 rounded flex-1 break-all">
                        9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM
                      </code>
                    </div>
                  </div>

                  {/* BTC Address */}
                  <div className="bg-ctea-dark/30 border border-ctea-teal/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-ctea-teal font-medium">Bitcoin (BTC)</span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10"
                        onClick={() => copyToClipboard("bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", "BTC")}
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
                      <div className="bg-white p-2 rounded flex-shrink-0">
                        <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                          <QrCode className="w-8 h-8" />
                        </div>
                      </div>
                      <code className="text-xs text-gray-300 bg-ctea-dark/50 p-2 rounded flex-1 break-all">
                        bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                      </code>
                    </div>
                  </div>
                </div>

                {/* Instructions */}
                <div className="bg-ctea-yellow/10 border border-ctea-yellow/30 rounded-lg p-4">
                  <h4 className="text-ctea-yellow font-bold mb-2">After Sending:</h4>
                  <ol className="text-sm text-gray-300 space-y-1">
                    <li>1. Copy your transaction hash</li>
                    <li>2. Email it to <span className="text-accent">tips@ctea.news</span></li>
                    <li>3. Get instant VIP access within 24 hours</li>
                  </ol>
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