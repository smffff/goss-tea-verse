import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import TeaCup from '@/components/TeaCup';
import Layout from '@/components/Layout';
import { Home, Coffee, Plus, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { trackFeedbackSubmission, trackFeedbackButtonClick } from '@/lib/analytics';

const NotFound = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;

    setIsSubmitting(true);
    try {
      // Track feedback submission
      trackFeedbackSubmission();

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Feedback Submitted! 🫖",
        description: "Thanks for helping us improve CTea Newsroom!",
      });

      setFeedbackText('');
      setShowFeedback(false);
    } catch (error) {
      toast({
        title: "Feedback Failed",
        description: "Couldn't submit feedback. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[80vh]">
        <Card className="bg-ctea-dark/30 border border-ctea-teal/20 max-w-md mx-auto text-center">
          <div className="p-8">
            {/* 404 Icon */}
            <div className="text-6xl mb-4">☕</div>
            
            {/* Error Message */}
            <h1 className="text-3xl font-bold text-white mb-2">404 - Page Not Found</h1>
            <p className="text-gray-300 mb-6">
              Looks like this tea got spilled somewhere else! The page you're looking for doesn't exist.
            </p>
            
            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                onClick={() => navigate('/')}
                className="w-full bg-gradient-ctea text-white font-bold"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              
              <Button 
                onClick={() => navigate('/feed')}
                variant="outline"
                className="w-full border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10"
              >
                <Coffee className="w-4 h-4 mr-2" />
                Browse Hot Takes
              </Button>

              <Button 
                onClick={() => navigate('/submit')}
                variant="outline"
                className="w-full border-ctea-pink text-ctea-pink hover:bg-ctea-pink/10"
              >
                <Plus className="w-4 h-4 mr-2" />
                Spill New Tea
              </Button>

              {/* Feedback Button */}
              <Dialog open={showFeedback} onOpenChange={setShowFeedback}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline"
                    className="w-full border-ctea-purple text-ctea-purple hover:bg-ctea-purple/10"
                    onClick={() => {
                      trackFeedbackButtonClick();
                    }}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Report Issue
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-ctea-darker/95 border-ctea-purple/30">
                  <DialogHeader>
                    <DialogTitle className="text-white flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-ctea-purple" />
                      Report This Issue
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="feedback" className="text-gray-300">
                        Help us fix this broken link! 🔧
                      </Label>
                      <Textarea
                        id="feedback"
                        placeholder="What page were you trying to reach? Any other details that might help..."
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        className="min-h-[120px] bg-ctea-dark/50 border-ctea-purple/30 text-white placeholder-gray-400"
                        required
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button
                        type="submit"
                        disabled={isSubmitting || !feedbackText.trim()}
                        className="flex-1 bg-gradient-to-r from-ctea-purple to-ctea-pink text-white font-bold"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Send Report
                          </>
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowFeedback(false)}
                        className="border-ctea-purple/30 text-ctea-purple hover:bg-ctea-purple/10"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            
            {/* Footer Message */}
            <div className="mt-6 text-xs text-gray-500">
              Lost? Try spilling some fresh tea to get back in the game! 🚀
            </div>

            {/* Decorative Tea Cup */}
            <div className="mt-6 flex justify-center">
              <div className="animate-float">
                <TeaCup size="sm" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default NotFound;
