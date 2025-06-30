import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Coffee, Send, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const SpillTea: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    isAnonymous: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'DeFi Drama',
    'NFT Gossip',
    'Exchange News',
    'Protocol Updates',
    'Celebrity Crypto',
    'Regulatory Tea',
    'VC Moves',
    'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim() || !formData.category) {
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: Implement actual submission logic
      console.log('Submitting tea:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form
      setFormData({
        title: '',
        content: '',
        category: '',
        isAnonymous: false
      });
      
      alert('Tea spilled successfully! 🫖');
    } catch (error) {
      console.error('Error submitting tea:', error);
      alert('Failed to spill tea. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Layout 
      pageTitle="Spill Tea"
      pageDescription="Share anonymous crypto gossip and tips"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-brand-neutral border-brand-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl font-anton text-brand-text text-center flex items-center justify-center gap-2">
                <Coffee className="w-6 h-6" />
                Spill the Tea ☕
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!user ? (
                <div className="text-center py-8">
                  <Shield className="w-12 h-12 text-brand-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-brand-text mb-2">
                    Connect Your Wallet
                  </h3>
                  <p className="text-brand-text-secondary mb-4">
                    You need to connect your wallet to spill tea and earn rewards.
                  </p>
                  <Button className="btn-brand-primary">
                    Connect Wallet
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-brand-text">
                      Tea Title *
                    </Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="What's the hot gossip?"
                      className="bg-brand-background border-brand-primary/30 text-brand-text"
                      maxLength={100}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-brand-text">
                      Category *
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => handleInputChange('category', value)}
                    >
                      <SelectTrigger className="bg-brand-background border-brand-primary/30 text-brand-text">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent className="bg-brand-background border-brand-primary/30">
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content" className="text-brand-text">
                      Spill the Details *
                    </Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => handleInputChange('content', e.target.value)}
                      placeholder="Share the juicy details... (be respectful and factual)"
                      className="bg-brand-background border-brand-primary/30 text-brand-text min-h-[120px]"
                      maxLength={1000}
                      required
                    />
                    <p className="text-xs text-brand-text-secondary">
                      {formData.content.length}/1000 characters
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="anonymous"
                      checked={formData.isAnonymous}
                      onCheckedChange={(checked) => handleInputChange('isAnonymous', checked as boolean)}
                    />
                    <Label htmlFor="anonymous" className="text-brand-text text-sm">
                      Post anonymously (recommended for sensitive tea)
                    </Label>
                  </div>

                  <div className="bg-brand-background/50 p-4 rounded-lg border border-brand-primary/20">
                    <h4 className="font-semibold text-brand-text mb-2">Rewards</h4>
                    <p className="text-sm text-brand-text-secondary">
                      Quality tea submissions earn $TEA tokens. Verified sources get bonus rewards!
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || !formData.title.trim() || !formData.content.trim() || !formData.category}
                    className="w-full btn-brand-primary"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Spilling Tea...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Spill the Tea
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SpillTea;
