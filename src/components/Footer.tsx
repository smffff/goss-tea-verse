import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Coffee, ExternalLink, Twitter, MessageCircle, Users, ArrowRight, Sparkles, MessageSquare, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { trackFeedbackSubmission, trackFeedbackButtonClick } from '@/lib/analytics';

const Footer = () => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const footerLinks = [
    { path: '/about', label: 'About' },
    { path: '/privacy', label: 'Privacy' },
    { path: '/terms', label: 'Terms' }
  ];

  const socialLinks = [
    { href: 'https://twitter.com/ctea_newsroom', label: 'Twitter', icon: <Twitter className="w-4 h-4" /> },
    { href: 'https://arena.ctea.news', label: 'Arena', icon: <MessageCircle className="w-4 h-4" /> },
    { href: 'https://discord.gg/ctea', label: 'Discord', icon: <Users className="w-4 h-4" /> }
  ];

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
    <>
      <footer className="py-16 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <img 
                    src="/ctea-logo-icon.svg" 
                    alt="CTea Newsroom Logo" 
                    className="w-12 h-12 text-accent animate-float" 
                  />
                  <div className="absolute -top-1 -right-1">
                    <Sparkles className="w-4 h-4 text-accent2 animate-pulse" />
                  </div>
                </div>
              </div>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                Where Crypto Twitter Comes to Spill. Submit, track, and score the latest gossip & alpha—anonymous, algorithmic, and spicy.
              </p>
              <p className="text-sm text-gray-400 italic">
                Beta open. VIPs welcome. ☕️
              </p>
            </div>
            
            {/* Get Started Button */}
            <div className="mb-8">
              <Link to="/feed">
                <Button className="bg-gradient-to-r from-accent to-accent2 hover:from-accent2 hover:to-accent text-white font-bold uppercase tracking-wide px-8 py-4 text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Enter the Newsroom
                </Button>
              </Link>
            </div>
            
            {/* Footer Links */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <a 
                href="https://cteanews.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-accent hover:text-accent2 transition-all duration-300 hover:scale-110 group hover:bg-accent/10 px-2 py-1 rounded"
              >
                <ExternalLink className="w-4 h-4 group-hover:animate-pulse" />
                <span className="font-medium">cteanews.com</span>
              </a>
              
              {/* Social Links */}
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-accent hover:text-accent2 transition-all duration-300 hover:scale-110 group hover:bg-accent/10 px-2 py-1 rounded"
                >
                  {link.icon}
                  <span className="font-medium">{link.label}</span>
                </a>
              ))}
            </div>

            {/* Navigation Links */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {footerLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="text-accent hover:text-accent2 transition-all duration-300 hover:scale-110 font-medium hover:bg-accent/10 px-2 py-1 rounded"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Feedback and Contact Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Dialog open={showFeedback} onOpenChange={setShowFeedback}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="border-accent text-accent hover:bg-accent/10 hover:text-accent2 transition-all duration-300 uppercase font-semibold px-6 py-3 rounded-lg shadow hover:scale-105"
                    onClick={() => {
                      trackFeedbackButtonClick();
                    }}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send Feedback
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 border-accent/30">
                  <DialogHeader>
                    <DialogTitle className="text-white flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-accent" />
                      Help Us Improve CTea
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="feedback" className="text-gray-300">
                        What's on your mind? 💭
                      </Label>
                      <Textarea
                        id="feedback"
                        placeholder="Share your thoughts, suggestions, or report issues..."
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        className="min-h-[120px] bg-gray-800 border-accent/30 text-white placeholder-gray-400"
                        required
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button
                        type="submit"
                        disabled={isSubmitting || !feedbackText.trim()}
                        className="flex-1 bg-gradient-to-r from-accent to-accent2 hover:from-accent2 hover:to-accent text-white font-bold uppercase px-6 py-3 rounded-lg transition-all shadow hover:scale-105"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Send Feedback
                          </>
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowFeedback(false)}
                        className="border-accent/30 text-accent hover:bg-accent/10 uppercase font-semibold px-6 py-3 rounded-lg transition-all shadow hover:scale-105"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>

              <a 
                href="mailto:hello@cteanews.com"
                className="flex items-center gap-2 border-accent text-accent hover:bg-accent/10 hover:text-accent2 transition-all duration-300 uppercase font-semibold px-6 py-3 rounded-lg shadow hover:scale-105 border"
              >
                <Mail className="w-4 h-4" />
                Contact
              </a>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-700 pt-8">
              <p className="text-sm text-gray-400">
                © 2024 CTea Newsroom. All rights reserved. Built with ☕ and chaos.
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Beta v1.0 • Managed Chaos, Served Hot
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer; 