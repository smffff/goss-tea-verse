
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Coffee } from 'lucide-react';
import { useSubmissionForm } from '@/hooks/useSubmissionForm';

interface SubmissionFormProps {
  onClose: () => void;
  onSubmit: (data: {
    tea: string;
    email: string;
    wallet: string;
    category: string;
    evidence_urls: string[];
    isAnonymous: boolean;
  }) => Promise<void>;
  isLoading?: boolean;
}

const SubmissionForm: React.FC<SubmissionFormProps> = ({
  onClose,
  onSubmit,
  isLoading = false
}) => {
  const {
    formData,
    errors,
    handleSubmit,
    clearError,
    updateFormData,
    isFormValid
  } = useSubmissionForm(onSubmit, isLoading);

  return (
    <Card className="bg-newsprint border-vintage-red/30 shadow-xl">
      <CardHeader>
        <CardTitle className="text-tabloid-black flex items-center gap-2 text-xl font-display">
          <Coffee className="w-6 h-6 text-vintage-red" />
          Spill Your Tea ☕
        </CardTitle>
        <p className="text-tabloid-black/70 text-sm">
          Share the latest crypto gossip anonymously
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tea Content */}
          <div>
            <label className="block text-sm font-medium text-tabloid-black mb-2">
              What's the tea? *
            </label>
            <Textarea
              value={formData.tea}
              onChange={(e) => {
                updateFormData({ tea: e.target.value });
                if (errors.tea) clearError('tea');
              }}
              placeholder="Spill the gossip... What's really happening in crypto?"
              className="min-h-[120px] bg-white border-vintage-red/30 text-tabloid-black placeholder:text-tabloid-black/50 focus:border-vintage-red resize-none"
              maxLength={2000}
              required
            />
            {errors.tea && (
              <p className="text-vintage-red text-sm mt-1">{errors.tea}</p>
            )}
            <div className="text-xs text-tabloid-black/60 mt-1">
              {formData.tea.length}/2000 characters
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-tabloid-black mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => updateFormData({ category: e.target.value })}
              className="w-full p-3 bg-white border border-vintage-red/30 rounded-md text-tabloid-black focus:border-vintage-red focus:ring-1 focus:ring-vintage-red"
            >
              <option value="general">General Gossip</option>
              <option value="defi">DeFi Drama</option>
              <option value="nft">NFT News</option>
              <option value="exchanges">Exchange Exposé</option>
              <option value="influencers">Influencer Intel</option>
              <option value="projects">Project Predictions</option>
            </select>
          </div>

          {/* Evidence URLs */}
          <div>
            <label className="block text-sm font-medium text-tabloid-black mb-2">
              Evidence Links (Optional)
            </label>
            {formData.evidence_urls.map((url, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  type="url"
                  value={url}
                  onChange={(e) => {
                    const newUrls = [...formData.evidence_urls];
                    newUrls[index] = e.target.value;
                    updateFormData({ evidence_urls: newUrls });
                  }}
                  placeholder="https://twitter.com/..."
                  className="bg-white border-vintage-red/30 text-tabloid-black focus:border-vintage-red"
                />
                {index === formData.evidence_urls.length - 1 && formData.evidence_urls.length < 3 && (
                  <Button
                    type="button"
                    onClick={() => updateFormData({ 
                      evidence_urls: [...formData.evidence_urls, ''] 
                    })}
                    className="px-3 bg-vintage-red hover:bg-vintage-red/90 text-white"
                  >
                    +
                  </Button>
                )}
              </div>
            ))}
            <div className="text-xs text-tabloid-black/60">
              Add links to Twitter, articles, or other sources
            </div>
          </div>

          {/* Anonymous Toggle */}
          <div className="bg-pale-pink p-4 rounded-lg border border-vintage-red/20">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isAnonymous}
                onChange={(e) => updateFormData({ isAnonymous: e.target.checked })}
                className="w-4 h-4 text-vintage-red border-vintage-red/30 rounded focus:ring-vintage-red"
              />
              <div>
                <span className="text-tabloid-black font-medium">Submit Anonymously</span>
                <p className="text-tabloid-black/70 text-sm">Your identity will be protected</p>
              </div>
            </label>
          </div>

          {/* Contact Fields (only if not anonymous) */}
          {!formData.isAnonymous && (
            <div className="space-y-4 bg-pale-pink p-4 rounded-lg border border-vintage-red/20">
              <h4 className="text-tabloid-black font-medium">Contact Information (Optional)</h4>
              
              <div>
                <label className="block text-sm font-medium text-tabloid-black mb-1">
                  Email
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    updateFormData({ email: e.target.value });
                    if (errors.email) clearError('email');
                  }}
                  placeholder="your@email.com"
                  className="bg-white border-vintage-red/30 text-tabloid-black focus:border-vintage-red"
                />
                {errors.email && (
                  <p className="text-vintage-red text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-tabloid-black mb-1">
                  Wallet Address
                </label>
                <Input
                  type="text"
                  value={formData.wallet}
                  onChange={(e) => {
                    updateFormData({ wallet: e.target.value });
                    if (errors.wallet) clearError('wallet');
                  }}
                  placeholder="0x..."
                  className="bg-white border-vintage-red/30 text-tabloid-black focus:border-vintage-red"
                />
                {errors.wallet && (
                  <p className="text-vintage-red text-sm mt-1">{errors.wallet}</p>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-tabloid-black text-tabloid-black hover:bg-tabloid-black hover:text-white btn-pill"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !isFormValid}
              className="flex-1 btn-pill btn-pill-red shadow-lg btn-tabloid-hover"
            >
              {isLoading ? 'Brewing...' : 'Spill the Tea'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SubmissionForm;
