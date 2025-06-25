import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Coffee, 
  AlertCircle, 
  CheckCircle, 
  X, 
  Upload, 
  Link as LinkIcon,
  Sparkles,
  Flame,
  Zap,
  Crown
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { trackFormCompletion, trackTeaSpill } from '@/lib/analytics';

interface SubmissionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SubmissionData) => void;
}

interface SubmissionData {
  tea: string;
  email: string;
  wallet: string;
  category: string;
  evidence_urls: string[];
  isAnonymous: boolean;
}

const SubmissionForm: React.FC<SubmissionFormProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState<SubmissionData>({
    tea: '',
    email: '',
    wallet: '',
    category: 'general',
    evidence_urls: [],
    isAnonymous: true
  });
  
  const [errors, setErrors] = useState<Partial<SubmissionData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [newEvidenceUrl, setNewEvidenceUrl] = useState('');
  const { toast } = useToast();

  const categories = [
    { value: 'general', label: 'General Tea', icon: '☕' },
    { value: 'defi', label: 'DeFi Drama', icon: '🏦' },
    { value: 'nft', label: 'NFT Gossip', icon: '🖼️' },
    { value: 'memecoin', label: 'Memecoin Alpha', icon: '🚀' },
    { value: 'exchange', label: 'Exchange News', icon: '📊' },
    { value: 'protocol', label: 'Protocol Updates', icon: '⚡' },
    { value: 'celeb', label: 'Crypto Celebrities', icon: '👑' },
    { value: 'regulation', label: 'Regulatory News', icon: '⚖️' }
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<SubmissionData> = {};

    // Validate tea content
    if (!formData.tea.trim()) {
      newErrors.tea = 'Please share some tea!';
    } else if (formData.tea.length < 20) {
      newErrors.tea = 'Tea must be at least 20 characters long';
    } else if (formData.tea.length > 2000) {
      newErrors.tea = 'Tea must be less than 2000 characters';
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required for beta access';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate wallet (optional but if provided, should be valid format)
    if (formData.wallet.trim() && !/^[0-9a-zA-Z]{26,35}$|^0x[a-fA-F0-9]{40}$/.test(formData.wallet)) {
      newErrors.wallet = 'Please enter a valid wallet address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors above before submitting.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    trackFormCompletion('tea_submission');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      onSubmit(formData);
      trackTeaSpill();
      
      toast({
        title: "Tea Spilled Successfully! ☕",
        description: "Your submission has been received. Check your email for beta access!",
      });

      // Reset form
      setFormData({
        tea: '',
        email: '',
        wallet: '',
        category: 'general',
        evidence_urls: [],
        isAnonymous: true
      });
      setErrors({});
      setShowConfirmation(false);
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

  const addEvidenceUrl = () => {
    if (newEvidenceUrl.trim() && !formData.evidence_urls.includes(newEvidenceUrl.trim())) {
      setFormData(prev => ({
        ...prev,
        evidence_urls: [...prev.evidence_urls, newEvidenceUrl.trim()]
      }));
      setNewEvidenceUrl('');
    }
  };

  const removeEvidenceUrl = (index: number) => {
    setFormData(prev => ({
      ...prev,
      evidence_urls: prev.evidence_urls.filter((_, i) => i !== index)
    }));
  };

  const getCharacterCount = () => {
    const count = formData.tea.length;
    const max = 2000;
    const percentage = (count / max) * 100;
    
    if (percentage > 90) return 'text-red-500';
    if (percentage > 75) return 'text-yellow-500';
    return 'text-gray-400';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-ctea-dark/95 backdrop-blur-md border-ctea-teal/30 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2 text-xl">
            <Coffee className="w-6 h-6 text-accent" />
            Spill Your Tea ☕
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Selection */}
          <div>
            <Label className="text-gray-300 mb-3 block">Category</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {categories.map((category) => (
                <button
                  key={category.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, category: category.value }))}
                  className={`p-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-transparent ${
                    formData.category === category.value
                      ? 'bg-accent/20 border-accent text-accent'
                      : 'bg-ctea-dark/50 border-ctea-teal/20 text-gray-300 hover:bg-ctea-dark/70 hover:border-ctea-teal/30'
                  }`}
                >
                  <div className="text-lg mb-1">{category.icon}</div>
                  <div className="text-xs font-medium">{category.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Tea Content */}
          <div>
            <Label htmlFor="tea" className="text-gray-300 flex items-center gap-2">
              Your Tea (Anonymous)
              <Badge variant="outline" className="text-xs border-accent/30 text-accent">
                Required
              </Badge>
            </Label>
            <Textarea
              id="tea"
              placeholder="Share the hottest crypto gossip, alpha, or meme-fueled take... Be specific, be spicy! 🔥"
              value={formData.tea}
              onChange={(e) => setFormData({...formData, tea: e.target.value})}
              className={`min-h-[120px] bg-ctea-dark/50 border-ctea-teal/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-accent/50 focus:border-accent ${
                errors.tea ? 'border-red-500' : ''
              }`}
              required
            />
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center gap-2">
                {errors.tea && (
                  <div className="flex items-center gap-1 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors.tea}
                  </div>
                )}
              </div>
              <span className={`text-sm ${getCharacterCount()}`}>
                {formData.tea.length}/2000
              </span>
            </div>
          </div>

          {/* Evidence URLs */}
          <div>
            <Label className="text-gray-300 flex items-center gap-2">
              Evidence Links (Optional)
              <LinkIcon className="w-4 h-4" />
            </Label>
            <div className="space-y-2">
              {formData.evidence_urls.map((url, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-ctea-dark/30 rounded border border-ctea-teal/20">
                  <span className="text-xs text-gray-400 flex-1 truncate">{url}</span>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => removeEvidenceUrl(index)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
              <div className="flex gap-2">
                <Input
                  type="url"
                  placeholder="https://..."
                  value={newEvidenceUrl}
                  onChange={(e) => setNewEvidenceUrl(e.target.value)}
                  className="flex-1 bg-ctea-dark/50 border-ctea-teal/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-accent/50 focus:border-accent"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addEvidenceUrl();
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={addEvidenceUrl}
                  disabled={!newEvidenceUrl.trim()}
                  className="bg-accent/20 text-accent border border-accent/30 hover:bg-accent/30 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-transparent"
                >
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email" className="text-gray-300 flex items-center gap-2">
                Email
                <Badge variant="outline" className="text-xs border-accent/30 text-accent">
                  Required
                </Badge>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={`bg-ctea-dark/50 border-ctea-teal/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-accent/50 focus:border-accent ${
                  errors.email ? 'border-red-500' : ''
                }`}
                required
              />
              {errors.email && (
                <div className="flex items-center gap-1 text-red-400 text-sm mt-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </div>
              )}
            </div>
            
            <div>
              <Label htmlFor="wallet" className="text-gray-300">
                Wallet Address (Optional)
              </Label>
              <Input
                id="wallet"
                type="text"
                placeholder="0x... or Solana address"
                value={formData.wallet}
                onChange={(e) => setFormData({...formData, wallet: e.target.value})}
                className={`bg-ctea-dark/50 border-ctea-teal/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-accent/50 focus:border-accent ${
                  errors.wallet ? 'border-red-500' : ''
                }`}
              />
              {errors.wallet && (
                <div className="flex items-center gap-1 text-red-400 text-sm mt-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.wallet}
                </div>
              )}
            </div>
          </div>

          {/* Privacy Notice */}
          <Card className="bg-ctea-dark/30 border-ctea-teal/20 p-4">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-accent mt-0.5" />
              <div className="text-sm text-gray-300">
                <p className="font-medium mb-1">🔒 Your privacy is protected</p>
                <p>All submissions are anonymous by default. Your email is only used for beta access notifications.</p>
              </div>
            </div>
          </Card>

          {/* Submission Buttons */}
          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-accent to-accent2 hover:from-accent2 hover:to-accent text-white font-bold px-6 py-3 rounded-lg transition-all shadow hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-transparent active:scale-95"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Spilling Tea...
                </>
              ) : (
                <>
                  <Coffee className="w-4 h-4 mr-2" />
                  Spill Tea
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-ctea-teal/30 text-ctea-teal hover:bg-ctea-teal/10 px-6 py-3 rounded-lg transition-all shadow hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-transparent active:scale-95"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SubmissionForm;
