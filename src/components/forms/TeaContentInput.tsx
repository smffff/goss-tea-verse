
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { AlertCircle, Shield } from 'lucide-react';
import { EnhancedContentValidationService } from '@/services/security/enhancedContentValidation';
import { RateLimitService } from '@/services/security/rateLimitService';
import { SecureTokenService } from '@/services/security/tokenService';

interface TeaContentInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  onClearError: () => void;
}

const TeaContentInput: React.FC<TeaContentInputProps> = ({
  value,
  onChange,
  error,
  onClearError
}) => {
  const [isValidating, setIsValidating] = useState(false);
  const [securityWarning, setSecurityWarning] = useState<string | null>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onClearError();
    setSecurityWarning(null);

    // Rate limiting check
    const token = SecureTokenService.getOrCreateToken();
    const rateLimitCheck = RateLimitService.checkRateLimit(token, 'content_input', 50, 5);
    
    if (!rateLimitCheck.allowed) {
      setSecurityWarning('Too many changes. Please slow down.');
      return;
    }

    // Real-time validation for suspicious content
    if (newValue.length > 100) { // Only validate longer content to avoid spam
      setIsValidating(true);
      
      try {
        const validation = EnhancedContentValidationService.validateContent(newValue);
        
        if (validation.blocked) {
          setSecurityWarning('Content contains potentially harmful elements and has been blocked.');
          setIsValidating(false);
          return;
        }
        
        if (validation.riskLevel === 'high') {
          setSecurityWarning('Content flagged for review. Please avoid suspicious patterns.');
        }
      } catch (error) {
        console.warn('Validation error:', error);
      } finally {
        setIsValidating(false);
      }
    }

    onChange(newValue);
  };

  const getCharacterCount = () => {
    const count = value.length;
    const max = 2000;
    const percentage = (count / max) * 100;
    
    if (percentage > 90) return 'text-red-500';
    if (percentage > 75) return 'text-yellow-500';
    return 'text-gray-400';
  };

  return (
    <div>
      <Label htmlFor="tea" className="text-gray-300 flex items-center gap-2">
        Your Tea ☕
        <span className="text-red-400">*</span>
        {isValidating && (
          <div className="flex items-center gap-1 text-blue-400">
            <Shield className="w-3 h-3 animate-pulse" />
            <span className="text-xs">Validating...</span>
          </div>
        )}
      </Label>
      
      <Textarea
        id="tea"
        placeholder="Share the hottest crypto gossip, alpha, or meme-fueled take... (minimum 3 characters)"
        value={value}
        onChange={handleChange}
        className={`min-h-[120px] bg-ctea-dark/50 border-ctea-teal/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-accent/50 focus:border-accent resize-none ${
          error || securityWarning ? 'border-red-400' : ''
        }`}
        required
        maxLength={2000}
      />
      
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          {error && (
            <div className="flex items-center gap-1 text-red-400 text-sm">
              <AlertCircle className="w-3 h-3" />
              {error}
            </div>
          )}
          {securityWarning && (
            <div className="flex items-center gap-1 text-orange-400 text-sm">
              <Shield className="w-3 h-3" />
              {securityWarning}
            </div>
          )}
        </div>
        <div className={`text-xs ${getCharacterCount()}`}>
          {value.length}/2000
        </div>
      </div>
    </div>
  );
};

export default TeaContentInput;
