
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Coffee } from 'lucide-react';

export interface SpillTeaFormProps {
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  isLoading?: boolean;
  walletAddress?: string;
  userId?: string;
}

const SpillTeaForm: React.FC<SpillTeaFormProps> = ({
  onClose,
  onSubmit,
  isLoading = false
}) => {
  const [teaText, setTeaText] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teaText.trim()) return;
    
    await onSubmit({
      teaText,
      topic: 'general',
      mediaUrl: null
    });
  };

  return (
    <Card className="bg-pale-pink border-vintage-red/30 shadow-xl">
      <CardHeader>
        <CardTitle className="text-tabloid-black flex items-center gap-2 text-xl font-display">
          <Coffee className="w-6 h-6 text-vintage-red" />
          Spill Your Tea ☕
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Textarea
              placeholder="What's the tea? Spill it here..."
              value={teaText}
              onChange={(e) => setTeaText(e.target.value)}
              className="min-h-[120px]"
              maxLength={500}
            />
            <div className="text-sm text-gray-500 mt-1">
              {teaText.length}/500 characters
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
              disabled={isLoading}
            >
              Cancel
            </Button>
            
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-ctea-teal to-ctea-purple hover:from-ctea-purple hover:to-ctea-teal text-white font-bold"
              disabled={!teaText.trim() || isLoading}
            >
              {isLoading ? 'Spilling Tea...' : 'Spill Tea ☕'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SpillTeaForm;
