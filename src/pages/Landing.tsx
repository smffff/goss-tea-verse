
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Sparkles, Coffee, Heart, TrendingUp, Users, MessageCircle } from 'lucide-react';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import SubmissionModal from '@/components/modals/SubmissionModal';
import TipModal from '@/components/modals/TipModal';
import { useScrollLock } from '@/hooks/useScrollLock';
import { useToast } from '@/hooks/use-toast';

const Landing = () => {
  const navigate = useNavigate();
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [showTipModal, setShowTipModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Lock scroll when modals are open
  useScrollLock(showSubmissionModal || showTipModal);

  const handleSubmission = async (data: { content: string; wallet?: string; email?: string }) => {
    setIsSubmitting(true);
    
    // Simulate API call
    console.log('Submission data:', data);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSubmissionModal(false);
      
      toast({
        title: "Tea Spilled Successfully! ☕",
        description: "Your submission has been added to the feed. Thank you for contributing!",
      });
      
      // Navigate to feed to show the new submission
      navigate('/feed');
    }, 2000);
  };

  const stats = [
    { label: 'Active Tea Spillers', value: '2,420', icon: Users },
    { label: 'Total Tea Spilled', value: '15,742', icon: Coffee },
    { label: 'Community Reactions', value: '89,324', icon: MessageCircle },
    { label: 'Trending Topics', value: '156', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#ff61a6] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#00d1c1] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          {/* Beta Badge */}
          <div className="mb-6">
            <Badge className="bg-gradient-to-r from-[#ff61a6] to-[#00d1c1] text-white font-bold px-4 py-2 text-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              PUBLIC BETA LIVE
            </Badge>
          </div>

          {/* Logo */}
          <div className="mb-6">
            <img 
              src="/ctea-logo-icon.svg" 
              alt="CTea Newsroom" 
              className="w-24 h-24 mx-auto mb-4"
            />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-[#ff61a6] via-white to-[#00d1c1] bg-clip-text text-transparent mb-6 font-display">
            CTea Newsroom
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-3xl text-gray-300 mb-4 font-medium">
            Where Memes, Gossip, and Crypto Collide
          </p>
          <p className="text-lg md:text-2xl text-[#ff61a6] mb-12 font-bold">
            Spill Tea. Get Paid.
          </p>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Anonymous crypto gossip meets AI-powered reactions. Share alpha, earn credibility, 
            and watch the community decide what's hot or cold.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              size="lg"
              onClick={() => setShowSubmissionModal(true)}
              className="bg-gradient-to-r from-[#ff61a6] to-[#00d1c1] hover:opacity-90 text-white font-bold px-8 py-4 text-lg border-0"
            >
              <Coffee className="w-5 h-5 mr-2" />
              Spill Tea
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/feed')}
              className="border-[#00d1c1] text-[#00d1c1] hover:bg-[#00d1c1] hover:text-black font-bold px-8 py-4 text-lg"
            >
              View the Tea
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => setShowTipModal(true)}
              className="border-[#ff61a6] text-[#ff61a6] hover:bg-[#ff61a6] hover:text-black font-bold px-8 py-4 text-lg"
            >
              <Heart className="w-5 h-5 mr-2" />
              Tip Gatekeepers
            </Button>
          </div>

          {/* How It Works */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { step: '1', title: 'Submit Tea', desc: 'Share anonymous crypto gossip' },
              { step: '2', title: 'AI Reacts', desc: 'CTeaBot adds spicy commentary' },
              { step: '3', title: 'Community Reacts', desc: 'Users vote hot, cold, or spicy' },
              { step: '4', title: 'Earn Credibility', desc: 'Build reputation & future rewards' }
            ].map((item) => (
              <div key={item.step} className="text-center p-6 bg-black/50 rounded-lg border border-gray-800 hover:border-[#00d1c1]/50 transition-colors">
                <div className="w-12 h-12 bg-gradient-to-r from-[#ff61a6] to-[#00d1c1] rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-white font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-ctea-dark/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Community Stats
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map(({ label, value, icon: Icon }) => (
              <Card key={label} className="bg-ctea-darker/50 border-[#00d1c1]/30 text-center">
                <CardContent className="p-6">
                  <Icon className="w-8 h-8 mx-auto mb-3 text-[#00d1c1]" />
                  <div className="text-2xl font-bold text-white mb-1">{value}</div>
                  <div className="text-sm text-gray-400">{label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            What the Community Says
          </h2>
          <TestimonialCarousel />
        </div>
      </section>

      {/* Modals */}
      <SubmissionModal
        isOpen={showSubmissionModal}
        onClose={() => setShowSubmissionModal(false)}
        onSubmit={handleSubmission}
        isLoading={isSubmitting}
      />

      <TipModal
        isOpen={showTipModal}
        onClose={() => setShowTipModal(false)}
      />
    </div>
  );
};

export default Landing;
