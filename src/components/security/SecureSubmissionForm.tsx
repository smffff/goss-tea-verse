
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  validateContentSecurity, 
  sanitizeUrls, 
  getOrCreateSecureToken,
  checkClientRateLimit,
  validateHoneypot
} from '@/utils/securityEnhanced';

interface SecureSubmissionFormProps {
  onSubmit: (data: {
    tea: string;
    category: string;
    evidence_urls: string[];
    isAnonymous: boolean;
  }) => void;
  isLoading?: boolean;
}

const SecureSubmissionForm: React.FC<SecureSubmissionFormProps> = ({ 
  onSubmit, 
  isLoading = false 
}) => {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('general');
  const [evidenceUrls, setEvidenceUrls] = useState<string[]>(['']);
  const [honeypot, setHoneypot] = useState(''); // Hidden honeypot field
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot validation
    if (!validateHoneypot(honeypot)) {
      console.warn('Honeypot triggered - potential bot submission');
      return;
    }
    
    // Client-side rate limiting
    if (!checkClientRateLimit('submission', 3, 60)) {
      toast({
        title: "Rate Limit Exceeded",
        description: "Please wait before submitting again.",
        variant: "destructive"
      });
      return;
    }
    
    // Content validation
    const validation = validateContentSecurity(content);
    
    if (!validation.isValid) {
      toast({
        title: "Content Validation Failed",
        description: `Issues detected: ${validation.threats.join(', ')}`,
        variant: "destructive"
      });
      return;
    }
    
    // Sanitize evidence URLs
    const sanitizedUrls = sanitizeUrls(evidenceUrls.filter(url => url.trim()));
    
    // Generate secure token
    const token = getOrCreateSecureToken();
    
    onSubmit({
      tea: validation.sanitized,
      category,
      evidence_urls: sanitizedUrls,
      isAnonymous: true
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot field - hidden from users */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
      />
      
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Content *
        </label>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your tea..."
          className="min-h-[120px] bg-ctea-dark/50 border-ctea-teal/30 text-white"
          maxLength={2000}
          required
        />
        <div className="text-xs text-gray-400 mt-1">
          {content.length}/2000 characters
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 bg-ctea-dark/50 border border-ctea-teal/30 rounded-md text-white"
        >
          <option value="general">General</option>
          <option value="tech">Tech</option>
          <option value="entertainment">Entertainment</option>
          <option value="sports">Sports</option>
          <option value="politics">Politics</option>
          <option value="business">Business</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Evidence URLs (Optional)
        </label>
        {evidenceUrls.map((url, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <Input
              type="url"
              value={url}
              onChange={(e) => {
                const newUrls = [...evidenceUrls];
                newUrls[index] = e.target.value;
                setEvidenceUrls(newUrls);
              }}
              placeholder="https://..."
              className="bg-ctea-dark/50 border-ctea-teal/30 text-white"
            />
            {index === evidenceUrls.length - 1 && evidenceUrls.length < 3 && (
              <Button
                type="button"
                onClick={() => setEvidenceUrls([...evidenceUrls, ''])}
                className="px-3"
              >
                +
              </Button>
            )}
          </div>
        ))}
        <div className="text-xs text-gray-400">
          Only URLs from trusted domains are allowed
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading || content.trim().length < 3}
        className="w-full bg-gradient-to-r from-ctea-teal to-ctea-purple hover:from-ctea-teal/80 hover:to-ctea-purple/80"
      >
        {isLoading ? 'Submitting...' : 'Submit Tea'}
      </Button>
    </form>
  );
};

export default SecureSubmissionForm;
