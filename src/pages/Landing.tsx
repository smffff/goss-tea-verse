import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import Footer from '@/components/Footer';
import Modal from '@/components/Modal';
import TippingModal from '@/components/TippingModal';
import { trackCTAClick } from '@/lib/analytics';
import { 
  Coffee, 
  TrendingUp, 
  Users, 
  Star, 
  Zap, 
  Gift, 
  Crown, 
  MessageCircle,
  Twitter,
  ExternalLink,
  Copy,
  CheckCircle,
  ArrowRight,
  Flame,
  Clock,
  Sparkles,
  Home,
  Trophy,
  Activity,
  Plus
} from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showSpillForm, setShowSpillForm] = useState(false);
  const [showTippingModal, setShowTippingModal] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successType, setSuccessType] = useState<'spill' | 'vip'>('spill');

  // Check for ?ref= parameter on component mount
  useEffect(() => {
    const refParam = searchParams.get('ref');
    if (refParam) {
      // Automatically trigger the spill modal
      setShowSpillForm(true);
      // Clean up the URL without the ref parameter
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete('ref');
      const newUrl = newSearchParams.toString() ? `?${newSearchParams.toString()}` : '';
      navigate(`/${newUrl}`, { replace: true });
    }
  }, [searchParams, navigate]);

  // Mock data
  const leaderboardData = [
    { rank: 1, username: "SpillMaster3000", score: 15420, badge: "OG", isRising: true },
    { rank: 2, username: "MemeLordSupreme", score: 12350, badge: "Meme Lord", isRising: true },
    { rank: 3, username: "DramaQueenCT", score: 11200, badge: "Viral Queen" },
    { rank: 4, username: "ChaosAgent", score: 9800, badge: "Chaos Agent" },
    { rank: 5, username: "TeaSpiller", score: 8500, badge: "Drama King" }
  ];

  const testimonials = [
    { text: "Got the alpha first on CTea.", author: "@anonape" },
    { text: "The meme-to-signal ratio is perfect.", author: "@defidegen" },
    { text: "Spilled, got tipped. Iconic.", author: "@cteaqueen" },
    { text: "This queue is boiling 🫖", author: "@teaspiller" }
  ];

  const trendingTopics = [
    "🚀 New DeFi protocol launching next week",
    "🔥 Major exchange listing rumors",
    "💎 NFT collection floor price manipulation",
    "⚡ Layer 2 scaling solution alpha",
    "🎯 Memecoin pump incoming"
  ];

  const walletAddresses = {
    ETH: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
    SOL: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
    BTC: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    Phantom: "@ctea_newsroom"
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAddress(type);
      setTimeout(() => setCopiedAddress(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleSpillSubmit = (data: { tea: string; email: string; wallet: string }) => {
    // TODO: Implement submission logic
    console.log('Tea spilled:', data);
    setShowSpillForm(false);
    setSuccessType('spill');
    setShowSuccessModal(true);
  };

  const handleVipTip = () => {
    setShowTippingModal(false);
    setSuccessType('vip');
    setShowSuccessModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50">
      {/* Simple Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-purple-200/50 sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <img 
                src="/ctea-logo-icon.svg" 
                alt="CTea Newsroom Logo" 
                className="w-8 h-8"
              />
              <span className="font-bold text-gray-900">CTea Newsroom</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="#leaderboard" className="text-gray-600 hover:text-purple-600 font-medium">Leaderboard</a>
              <a href="#about" className="text-gray-600 hover:text-purple-600 font-medium">About</a>
              <a href="#submit" className="text-gray-600 hover:text-purple-600 font-medium">Submit</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Trending Ticker */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white py-2 overflow-hidden">
        <div className="flex items-center justify-center space-x-8 animate-marquee">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-yellow-300" />
            <span className="text-sm font-medium">TRENDING NOW:</span>
          </div>
          {trendingTopics.map((topic, index) => (
            <span key={index} className="text-sm whitespace-nowrap">{topic}</span>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200/30 via-orange-200/20 to-teal-200/30"></div>
        <div className="absolute inset-0 bg-gradient-ctea-pastel opacity-20"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <img 
                  src="/ctea-logo-icon.svg" 
                  alt="CTea Newsroom Logo - Anonymous Crypto Gossip Platform" 
                  className="w-20 h-20 sm:w-24 sm:h-24 animate-float"
                  onError={(e) => {
                    // Fallback to Coffee icon if image fails to load
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling!.style.display = 'block';
                  }}
                />
                <Coffee className="w-20 h-20 sm:w-24 sm:h-24 text-purple-600 animate-float hidden" />
                <div className="absolute -top-2 -right-2">
                  <Zap className="w-6 h-6 text-yellow-500 animate-pulse" />
                </div>
                <div className="absolute -bottom-2 -left-2">
                  <Sparkles className="w-5 h-5 text-pink-500 animate-pulse" />
                </div>
              </div>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Where Crypto Twitter
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent">
                Comes to Spill.
              </span>
            </h1>
            
            {/* Enhanced Value Proposition */}
            <div className="max-w-3xl mx-auto mb-12">
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-6 font-medium">
                Beta access now open. Managed chaos, served hot.
              </p>
              <p className="text-base sm:text-lg text-gray-600">
                Submit your story or tip the gatekeepers to join the beta.
              </p>
            </div>
            
            {/* Enhanced CTA Buttons with Microcopy */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <div className="text-center">
                <Button 
                  onClick={() => {
                    trackCTAClick('spill_tea_cta');
                    setShowSpillForm(true);
                  }}
                  className="uppercase font-semibold px-6 py-3 rounded-lg bg-accent hover:bg-accent2 transition-all shadow-md text-white w-full sm:w-auto"
                >
                  <Coffee className="w-5 h-5 mr-2" />
                  Spill Tea for Beta Access
                </Button>
                <p className="text-sm text-gray-600 mt-2 max-w-xs">
                  Submit your first rumor or alpha to unlock the beta.
                </p>
              </div>
              
              <div className="text-center">
                <Button 
                  onClick={() => {
                    trackCTAClick('tip_gatekeepers_cta');
                    setShowTippingModal(true);
                  }}
                  variant="outline"
                  className="uppercase font-semibold px-6 py-3 rounded-lg bg-accent hover:bg-accent2 transition-all shadow-md text-white w-full sm:w-auto"
                >
                  <Gift className="w-5 h-5 mr-2" />
                  Tip the Gatekeepers
                </Button>
                <p className="text-sm text-gray-600 mt-2 max-w-xs">
                  Tip the gatekeepers and skip the line—instant VIP entry.
                </p>
              </div>
            </div>

            {/* Enhanced Urgency Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-100 to-orange-100 text-red-800 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wide animate-pulse border border-red-200">
              <Clock className="w-4 h-4" />
              This queue is boiling 🫖 - Limited beta slots!
            </div>
          </div>
        </div>
      </section>

      {/* Spill Tea Modal */}
      <Modal
        isOpen={showSpillForm}
        onClose={() => setShowSpillForm(false)}
        title="Spill Your Tea ☕"
        showForm={true}
        onSubmit={handleSpillSubmit}
        submitButtonText="Spill Tea"
      />

      {/* Tipping Modal */}
      <TippingModal
        isOpen={showTippingModal}
        onClose={() => setShowTippingModal(false)}
      />

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title={successType === 'spill' ? "Tea Spilled! ☕" : "VIP Access Granted! 👑"}
      >
        <div className="text-center space-y-4">
          {successType === 'spill' ? (
            <>
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              <h3 className="text-xl font-bold text-white">Thanks for spilling!</h3>
              <p className="text-gray-300">
                Check your inbox for beta access. We'll review your submission and get back to you within 24 hours.
              </p>
              <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-4 mt-4">
                <p className="text-sm text-green-300">
                  💡 Pro tip: Follow us on Twitter for real-time updates and exclusive alpha drops.
                </p>
              </div>
            </>
          ) : (
            <>
              <Crown className="w-16 h-16 text-yellow-500 mx-auto" />
              <h3 className="text-xl font-bold text-white">VIP Access Granted!</h3>
              <p className="text-gray-300">
                Tip sent? DM us your transaction hash for instant access to exclusive features.
              </p>
              <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-4 mt-4">
                <p className="text-sm text-yellow-300">
                  🚀 You'll receive priority access to all new features and exclusive community channels.
                </p>
              </div>
            </>
          )}
        </div>
      </Modal>

      {/* Leaderboard Preview */}
      <section id="leaderboard" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              CTea Hall of Fame
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Top contributors and viral tea spillers. Will you make the cut?
            </p>
            
            {/* Live Activity Ticker */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-3 rounded-full border border-purple-200 mb-8">
              <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
              <span className="text-sm font-bold text-purple-800">
                🔥 14 spills in the last hour
              </span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 shadow-xl">
              <div className="space-y-3">
                {leaderboardData.map((entry, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] border border-purple-100">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-lg ${
                        index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white' :
                        index === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-600 text-white' :
                        index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white' :
                        'bg-gradient-to-br from-purple-400 to-purple-600 text-white'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 flex items-center gap-2">
                          {entry.username}
                          {entry.isRising && <TrendingUp className="w-4 h-4 text-green-500" />}
                        </div>
                        <div className="text-xs text-gray-500 font-medium">{entry.badge}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900">{entry.score.toLocaleString()}</span>
                      <span className="text-xs text-gray-500">points</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Social Proof */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What the Community Says
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real feedback from crypto's most active gossip enthusiasts
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform border border-purple-100">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium leading-relaxed">"{testimonial.text}"</p>
                    <p className="text-sm text-gray-500 mt-3 font-semibold">— {testimonial.author}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Live Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              CTea by the Numbers
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The community is growing faster than a memecoin pump
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
              <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">2,420</div>
              <div className="text-sm text-gray-600 font-medium">Beta Users</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl border border-pink-200">
              <div className="text-3xl sm:text-4xl font-bold text-pink-600 mb-2">15.7K</div>
              <div className="text-sm text-gray-600 font-medium">Hot Takes</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl border border-cyan-200">
              <div className="text-3xl sm:text-4xl font-bold text-cyan-600 mb-2">420K</div>
              <div className="text-sm text-gray-600 font-medium">$TEA Points</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200">
              <div className="text-3xl sm:text-4xl font-bold text-yellow-600 mb-2">69</div>
              <div className="text-sm text-gray-600 font-medium">Viral Memes</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              About CTea Newsroom
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">🎯 Our Mission</h3>
                <p className="text-gray-700 leading-relaxed">
                  We're building the ultimate anonymous gossip platform for crypto Twitter—where alpha leaks, 
                  market takes, and spicy rumors get the attention they deserve.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">🛡️ Privacy First</h3>
                <p className="text-gray-700 leading-relaxed">
                  All submissions are anonymous by default. We use advanced encryption to protect your identity 
                  while ensuring quality content rises to the top.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing; 