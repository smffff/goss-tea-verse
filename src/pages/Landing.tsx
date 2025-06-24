import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
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
  ArrowRight
} from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  const [showSpillForm, setShowSpillForm] = useState(false);
  const [showVipModal, setShowVipModal] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    tea: '',
    email: '',
    wallet: ''
  });

  // Mock data
  const leaderboardData = [
    { rank: 1, username: "SpillMaster3000", score: 15420, badge: "OG", isRising: true },
    { rank: 2, username: "MemeLordSupreme", score: 12350, badge: "Meme Lord", isRising: true },
    { rank: 3, username: "DramaQueenCT", score: 11200, badge: "Viral Queen" },
    { rank: 4, username: "ChaosAgent", score: 9800, badge: "Chaos Agent" },
    { rank: 5, username: "TeaSpiller", score: 8500, badge: "Drama King" }
  ];

  const testimonials = [
    "I got the alpha first on CTea! 🚀", 
    "This is where the real crypto gossip happens 💯",
    "CTea is the only place I trust for hot takes 🔥",
    "Finally, a platform that gets crypto culture 👏"
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

  const handleSpillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement submission logic
    console.log('Tea spilled:', formData);
    setShowSpillForm(false);
    setFormData({ tea: '', email: '', wallet: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-ctea-pastel opacity-90"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Coffee className="w-16 h-16 sm:w-20 sm:h-20 text-purple-600 animate-float" />
                <div className="absolute -top-2 -right-2">
                  <Zap className="w-6 h-6 text-yellow-500 animate-pulse" />
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
            
            {/* Subheadline */}
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-8 font-medium">
              Beta access now open. Managed chaos, served hot.
            </p>
            
            {/* Value Proposition */}
            <div className="max-w-2xl mx-auto mb-12">
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                CTea Newsroom is the anonymous dropbox for crypto gossip, alpha leaks, and meme-fueled market takes. 
                Submit, track, and score the hottest stories across the spaces—served algorithmically spicy.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Dialog open={showSpillForm} onOpenChange={setShowSpillForm}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8 py-4 text-lg w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300">
                    <Coffee className="w-5 h-5 mr-2" />
                    Spill Tea for Beta Access
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-center">Spill Your Tea ☕</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSpillSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="tea">Your Tea (Anonymous)</Label>
                      <Textarea
                        id="tea"
                        placeholder="Share the hottest crypto gossip, alpha, or meme-fueled take..."
                        value={formData.tea}
                        onChange={(e) => setFormData({...formData, tea: e.target.value})}
                        className="min-h-[100px]"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email (for beta access)</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="wallet">Wallet Address (optional)</Label>
                      <Input
                        id="wallet"
                        placeholder="0x..."
                        value={formData.wallet}
                        onChange={(e) => setFormData({...formData, wallet: e.target.value})}
                      />
                    </div>
                    <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                      Submit & Get Beta Access
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>

              <Dialog open={showVipModal} onOpenChange={setShowVipModal}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline"
                    className="border-2 border-cyan-500 text-cyan-600 hover:bg-cyan-50 px-8 py-4 text-lg w-full sm:w-auto font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Crown className="w-5 h-5 mr-2" />
                    Tip the Gatekeepers for VIP
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-center">VIP Access - Skip the Line 👑</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600 text-center">
                      Support the newsroom and get instant VIP access with early features & recognition.
                    </p>
                    <div className="space-y-3">
                      {Object.entries(walletAddresses).map(([chain, address]) => (
                        <div key={chain} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium text-sm">{chain}</div>
                            <div className="text-xs text-gray-500 font-mono">{address}</div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(address, chain)}
                            className="ml-2"
                          >
                            {copiedAddress === chain ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="text-center">
                      <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800">
                        <Gift className="w-3 h-3 mr-1" />
                        VIP Benefits: Early Access, Recognition, Premium Features
                      </Badge>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Urgency Badge */}
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium">
              <Zap className="w-4 h-4" />
              Beta slots are limited! Get in early.
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboard Preview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              CTea Hall of Fame
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Top contributors and viral tea spillers. Will you make the cut?
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
              <div className="space-y-3">
                {leaderboardData.map((entry, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0 ? 'bg-yellow-100 text-yellow-800' :
                        index === 1 ? 'bg-gray-100 text-gray-800' :
                        index === 2 ? 'bg-orange-100 text-orange-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{entry.username}</div>
                        <div className="text-xs text-gray-500">{entry.badge}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">{entry.score.toLocaleString()}</span>
                      {entry.isRising && <TrendingUp className="w-4 h-4 text-green-500" />}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What the Community Says
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium">"{testimonial}"</p>
                    <p className="text-sm text-gray-500 mt-2">— @anonuser</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Live Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">2,420</div>
              <div className="text-sm text-gray-600">Beta Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-pink-600 mb-2">15.7K</div>
              <div className="text-sm text-gray-600">Hot Takes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-cyan-600 mb-2">420K</div>
              <div className="text-sm text-gray-600">$TEA Points</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-yellow-600 mb-2">69</div>
              <div className="text-sm text-gray-600">Viral Memes</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <Coffee className="w-12 h-12 mx-auto mb-4 text-purple-400" />
              <p className="text-lg text-gray-300 leading-relaxed">
                Now accepting early users, contributors, and meme whisperers. 
                Because Web3 doesn't need another whitepaper—it needs a gossip column.
              </p>
            </div>
            
            {/* Get Started Button */}
            <div className="mb-8">
              <Button 
                onClick={() => navigate('/app')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Get Started - Enter the Newsroom
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <a href="#" className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
                <ExternalLink className="w-4 h-4" />
                cteanews.com
              </a>
              <a href="#" className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
                <Twitter className="w-4 h-4" />
                Twitter
              </a>
              <a href="#" className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
                <MessageCircle className="w-4 h-4" />
                Arena
              </a>
              <a href="#" className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
                <Users className="w-4 h-4" />
                Discord
              </a>
            </div>
            
            <div className="text-sm text-gray-500">
              © 2024 CTea Newsroom. Spill responsibly. 🫖
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing; 