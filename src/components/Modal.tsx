import React, { useEffect } from 'react';
import { X } from 'lucide-react';
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
  onSubmit?: (data: { tea: string; email: string; wallet: string }) => void;
  submitButtonText?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  showForm = false,
  onSubmit,
  submitButtonText = "Submit"
}) => {
  const [formData, setFormData] = React.useState({
    tea: '',
    email: '',
    wallet: ''
  });

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