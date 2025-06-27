
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useSubmissionForm } from '@/hooks/useSubmissionForm';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { content: string; wallet?: string; email?: string }) => Promise<void>;
  isLoading?: boolean;
}

const SubmissionModal: React.FC<SubmissionModalProps> = ({ isOpen, onClose, onSubmit, isLoading = false }) => {
  const {
    formData,
    errors,
    handleSubmit,
    clearError,
    updateFormData,
    isFormValid
  } = useSubmissionForm(async (data) => {
    await onSubmit({
      content: data.tea,
      wallet: data.wallet || undefined,
      email: data.email || undefined
    });
  }, isLoading);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Submit Tea</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="tea">Your Tea</Label>
              <Textarea
                id="tea"
                value={formData.tea}
                onChange={(e) => {
                  updateFormData({ tea: e.target.value });
                  clearError('tea');
                }}
                placeholder="Spill your tea here..."
                rows={4}
                className={errors.tea ? 'border-red-500' : ''}
              />
              {errors.tea && <p className="text-red-500 text-sm mt-1">{errors.tea}</p>}
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => updateFormData({ category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="tech">Tech</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="politics">Politics</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="anonymous"
                checked={formData.isAnonymous}
                onCheckedChange={(checked) => updateFormData({ isAnonymous: checked })}
              />
              <Label htmlFor="anonymous">Submit anonymously</Label>
            </div>

            {!formData.isAnonymous && (
              <>
                <div>
                  <Label htmlFor="email">Email (optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      updateFormData({ email: e.target.value });
                      clearError('email');
                    }}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="wallet">Wallet Address (optional)</Label>
                  <Input
                    id="wallet"
                    value={formData.wallet}
                    onChange={(e) => {
                      updateFormData({ wallet: e.target.value });
                      clearError('wallet');
                    }}
                    className={errors.wallet ? 'border-red-500' : ''}
                  />
                  {errors.wallet && <p className="text-red-500 text-sm mt-1">{errors.wallet}</p>}
                </div>
              </>
            )}

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={!isFormValid || isLoading}>
                {isLoading ? 'Submitting...' : 'Submit Tea'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmissionModal;
