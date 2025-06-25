import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Coffee, Send, UserX, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { track } from '@/utils/analytics';
import Layout from '@/components/Layout';

const SpillTea = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [teaText, setTeaText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [username, setUsername] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!teaText.trim()) {
      toast({
        title: "Empty Cup!",
        description: "Please spill some tea before submitting.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission delay
    setTimeout(() => {
      toast({
        title: "Tea Spilled Successfully! 🫖",
        description: "Your gossip is brewing and will appear in the feed shortly!",
      });
      
      track('tea_spilled_fallback', {
        anonymous: isAnonymous,
        content_length: teaText.length
      });
      
      setTeaText('');
      setUsername('');
      setIsSubmitting(false);
      
      // Navigate to feed after submission
      navigate('/feed');
    }, 2000);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <img 
            src="/ctea-logo-icon.svg" 
            alt="CTea Newsroom" 
            className="w-16 h-16 mx-auto mb-4"
          />
          <h1 className="text-3xl md:text-5xl font-display font-bold text-tabloid-black mb-4">
            Quick Spill Station
          </h1>
          <Badge className="bg-vintage-red text-white font-bold px-4 py-2 mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            MAINTENANCE MODE: DROP YOUR TEA ANYWAY
          </Badge>
          <p className="text-lg text-tabloid-black/80 max-w-2xl mx-auto">
            The main newsroom is on a tea break, but we're always listening. 
            Drop your gossip here and we'll serve it up when we're back online.
          </p>
        </div>
        {/* Submission Form */}
        <div className="max-w-2xl mx-auto">
          <Card className="bg-pale-pink border-vintage-red/30 shadow-xl">
            <CardHeader>
              <CardTitle className="text-tabloid-black flex items-center gap-2 text-xl font-display">
                <Coffee className="w-6 h-6 text-vintage-red" />
                What's the tea? ☕
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Anonymous Toggle */}
                <div className="flex items-center justify-between p-4 bg-white/50 rounded-lg border border-vintage-red/20">
                  <div className="flex items-center gap-3">
                    <UserX className="w-5 h-5 text-tabloid-black" />
                    <span className="font-medium text-tabloid-black">
                      {isAnonymous ? '🕵️‍♂️ Going Incognito' : '👀 Saying It With Your Chest'}
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsAnonymous(!isAnonymous)}
                    className="border-vintage-red/30 text-vintage-red hover:bg-vintage-red hover:text-white"
                  >
                    {isAnonymous ? 'Reveal Yourself' : 'Go Anonymous'}
                  </Button>
                </div>
                {/* Username Field (if not anonymous) */}
                {!isAnonymous && (
                  <div>
                    <label className="block text-sm font-medium text-tabloid-black mb-2">
                      Your Username (optional)
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your handle..."
                      className="w-full px-4 py-2 border border-vintage-red/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-vintage-red"
                    />
                  </div>
                )}
                {/* Tea Content */}
                <div>
                  <label className="block text-sm font-medium text-tabloid-black mb-2">
                    Spill the Tea
                  </label>
                  <Textarea
                    value={teaText}
                    onChange={(e) => setTeaText(e.target.value)}
                    placeholder="What's the tea? Drop your crypto gossip, industry intel, or hot takes here..."
                    className="min-h-[120px] resize-none border-vintage-red/30 focus:border-vintage-red"
                    maxLength={2000}
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-tabloid-black/60">
                      {teaText.length}/2000 characters
                    </span>
                    <span className="text-xs text-tabloid-black/60">
                      Anonymous submissions are encouraged
                    </span>
                  </div>
                </div>
                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting || !teaText.trim()}
                  className="btn-pill btn-pill-red w-full text-white font-bold py-3 text-lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Brewing Your Tea...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Spill the Tea
                    </>
                  )}
                </Button>
                {/* Back to Main Site */}
                <div className="text-center pt-4 border-t border-vintage-red/20">
                  <p className="text-sm text-tabloid-black/70 mb-3">
                    Want the full experience?
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/')}
                    className="border-tabloid-black text-tabloid-black hover:bg-tabloid-black hover:text-white"
                  >
                    Back to CTea Newsroom
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        {/* How It Works */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-display font-bold text-tabloid-black text-center mb-8">
            How Quick Spill Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'DROP IT', desc: 'Share your crypto tea anonymously or with your chest out', icon: '📝' },
              { step: '2', title: 'WE BREW IT', desc: 'Your submission gets queued for when the newsroom returns', icon: '⏳' },
              { step: '3', title: 'WE SERVE IT', desc: 'Your gossip goes live with AI commentary and community votes', icon: '🚀' }
            ].map((item) => (
              <div key={item.step} className="text-center p-6 bg-white/80 rounded-lg border border-vintage-red/20 shadow-lg">
                <div className="text-4xl mb-3">{item.icon}</div>
                <div className="w-8 h-8 bg-vintage-red rounded-full flex items-center justify-center text-white font-bold mx-auto mb-3">
                  {item.step}
                </div>
                <div className="font-bold text-tabloid-black mb-2">{item.title}</div>
                <div className="text-tabloid-black/80 text-sm">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SpillTea;
