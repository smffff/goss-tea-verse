import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, ExternalLink, Twitter, Link as LinkIcon, Coffee, Sparkles, Users, TrendingUp, Zap } from 'lucide-react';
import { toast } from 'sonner';
import PixelIcon from '@/components/ui/PixelIcon';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [showTipModal, setShowTipModal] = useState(false);

  const walletAddresses = {
    AVAX: '0x32ae402ce8a388a3f27a8668ad33bcf4cab4fadb',
    SOL: 'AyRgn5jMLuzaAbf77whUb28hAB2bRaowDkh52j2nqXXA',
    ETH: '0xCB9f62E10e47812Fd1531E2AA13C3D03886b77c9',
    BTC: 'bc1qejnvy5lpskpukxnr0jkezj2p9pmluv5ltgazdc'
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} address copied to clipboard`);
    } catch (err) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const scrollToEarlyAccess = () => {
    const element = document.getElementById('early-access');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0B17] via-[#1A1A2E] to-[#0B0B17] text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-pattern opacity-20"></div>
        
        {/* Teacup Bubble Background */}
        <div className="absolute top-10 right-10 w-32 h-32 opacity-30">
          <img 
            src="/assets/logo-teacup-drip.svg" 
            alt="Teacup" 
            className="w-full h-full object-contain logo-spill"
          />
        </div>

        {/* Pixel Icon Corner */}
        <div className="absolute top-20 left-10 opacity-60">
          <PixelIcon size={48} />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Logo */}
            <div className="mb-8">
              <img 
                src="/assets/ctea-logo-full.png" 
                alt="CTea Newsroom" 
                className="h-24 mx-auto mb-6 logo"
              />
            </div>

            {/* Hero Title */}
            <h1 className="font-anton text-6xl md:text-8xl mb-6 text-glow">
              <span className="text-brand-primary">CTea</span>{' '}
              <span className="text-brand-accent-yellow">Newsroom</span>
            </h1>

            {/* Tagline */}
            <p className="font-manrope text-xl md:text-2xl mb-8 text-brand-text-secondary">
              Spill Tea. Stack Clout. Stay Shady.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                onClick={() => setShowTipModal(true)}
                className="comic-button bg-brand-primary text-white px-8 py-4 text-lg font-bold"
              >
                <Coffee className="w-5 h-5 mr-2" />
                Spill Tea
              </Button>
              
              <Button 
                onClick={scrollToEarlyAccess}
                className="comic-button bg-brand-accent-yellow text-[#0B0B17] px-8 py-4 text-lg font-bold"
              >
                <Zap className="w-5 h-5 mr-2" />
                Tip for Access
              </Button>
              
              <Button 
                onClick={() => navigate('/feed')}
                className="comic-button bg-brand-accent-lavender text-white px-8 py-4 text-lg font-bold"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                Enter the Feed
              </Button>
              
              <Button 
                onClick={() => navigate('/vip')}
                className="comic-button bg-transparent border-2 border-brand-primary text-brand-primary px-8 py-4 text-lg font-bold hover:bg-brand-primary hover:text-white"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Go VIP
              </Button>
            </div>

            {/* Comic-style banner */}
            <div className="comic-border bg-brand-neutral/80 p-4 mt-8">
              <p className="font-manrope text-brand-accent-yellow text-lg">
                🫖 Hot gossip incoming... Stay tuned for the juiciest crypto tea! 🫖
              </p>
            </div>

            {/* Comic speech bubbles */}
            <div className="absolute top-40 right-20 opacity-80 hidden md:block">
              <div className="comic-border bg-brand-accent-yellow p-3 max-w-xs">
                <p className="font-manrope text-[#0B0B17] text-sm">
                  "The tea is always piping hot here! 🔥"
                </p>
                <div className="w-0 h-0 border-l-8 border-l-brand-accent-yellow border-t-8 border-t-transparent border-b-8 border-b-transparent absolute -left-2 top-1/2 transform -translate-y-1/2"></div>
              </div>
            </div>

            <div className="absolute bottom-20 left-20 opacity-80 hidden lg:block">
              <div className="comic-border bg-brand-accent-lavender p-3 max-w-xs">
                <p className="font-manrope text-white text-sm">
                  "Anonymous gossip is our specialty! 🤫"
                </p>
                <div className="w-0 h-0 border-r-8 border-r-brand-accent-lavender border-t-8 border-t-transparent border-b-8 border-b-transparent absolute -right-2 top-1/2 transform -translate-y-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-brand-neutral/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="comic-border bg-brand-neutral/80 card-hover">
              <CardHeader>
                <CardTitle className="font-anton text-2xl text-brand-primary flex items-center gap-2">
                  <Coffee className="w-6 h-6" />
                  Spill Tea
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-manrope text-brand-text-secondary">
                  Share your crypto insights and industry gossip anonymously. Your secrets are safe with us.
                </p>
              </CardContent>
            </Card>

            <Card className="comic-border bg-brand-neutral/80 card-hover">
              <CardHeader>
                <CardTitle className="font-anton text-2xl text-brand-accent-yellow flex items-center gap-2">
                  <TrendingUp className="w-6 h-6" />
                  Stack Clout
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-manrope text-brand-text-secondary">
                  Earn $TEA tokens for quality submissions. Build your reputation in the crypto gossip game.
                </p>
              </CardContent>
            </Card>

            <Card className="comic-border bg-brand-neutral/80 card-hover">
              <CardHeader>
                <CardTitle className="font-anton text-2xl text-brand-accent-lavender flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  Stay Shady
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-manrope text-brand-text-secondary">
                  Join a vibrant community of crypto enthusiasts and insiders. We keep it real.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Early Access Section */}
      <section id="early-access" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-anton text-4xl md:text-5xl mb-4 text-glow">
              <span className="text-brand-primary">Early</span>{' '}
              <span className="text-brand-accent-yellow">Access</span>
            </h2>
            <p className="font-manrope text-xl text-brand-text-secondary">
              Support the project and get exclusive access to premium features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {Object.entries(walletAddresses).map(([chain, address]) => (
              <Card key={chain} className="comic-border bg-brand-neutral/80">
                <CardHeader>
                  <CardTitle className="font-anton text-xl text-brand-primary">
                    {chain}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <code className="font-mono text-sm text-brand-text-secondary flex-1 break-all">
                      {address}
                    </code>
                    <Button
                      onClick={() => copyToClipboard(address, chain)}
                      size="sm"
                      variant="ghost"
                      className="text-brand-accent-yellow hover:text-brand-accent-yellow/80"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="comic-border bg-brand-neutral/80">
              <CardHeader>
                <CardTitle className="font-anton text-xl text-brand-accent-lavender">
                  Arena Tip
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a 
                  href="https://arena.social/?ref=CTeaNews" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-brand-accent-lavender hover:text-brand-accent-lavender/80 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="font-manrope">arena.social/?ref=CTeaNews</span>
                </a>
              </CardContent>
            </Card>

            <Card className="comic-border bg-brand-neutral/80">
              <CardHeader>
                <CardTitle className="font-anton text-xl text-brand-accent-yellow">
                  Cash App
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <span className="font-manrope text-brand-text-secondary">$ladyinvsible</span>
                  <Button
                    onClick={() => copyToClipboard('$ladyinvsible', 'Cash App')}
                    size="sm"
                    variant="ghost"
                    className="text-brand-accent-yellow hover:text-brand-accent-yellow/80"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-brand-neutral border-t border-brand-primary/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <h3 className="font-anton text-2xl text-brand-primary mb-4">CTea Newsroom</h3>
              <p className="font-manrope text-brand-text-secondary">
                The ultimate destination for crypto gossip and insider tea.
              </p>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-anton text-lg text-brand-accent-yellow mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a 
                  href="https://twitter.com/CTeaNews" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-brand-text-secondary hover:text-brand-primary transition-colors"
                >
                  <Twitter className="w-6 h-6" />
                </a>
                <a 
                  href="https://linktr.ee/CTeaNews" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-brand-text-secondary hover:text-brand-primary transition-colors"
                >
                  <LinkIcon className="w-6 h-6" />
                </a>
                <a 
                  href="https://arena.social/?ref=CTeaNews" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-brand-text-secondary hover:text-brand-primary transition-colors"
                >
                  <ExternalLink className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Token Info */}
            <div>
              <h4 className="font-anton text-lg text-brand-accent-lavender mb-4">$TEA Token</h4>
              <a 
                href="https://dexscreener.com/avalanche/0x116594bd6eb7c16570413e1ccc36f1fed38c0dff" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-brand-text-secondary hover:text-brand-accent-lavender transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="font-manrope">View on DexScreener</span>
              </a>
            </div>
          </div>

          <div className="border-t border-brand-primary/20 mt-8 pt-8 text-center">
            <p className="font-manrope text-brand-text-secondary">
              © 2024 CTea Newsroom. All rights reserved. Stay shady. 🫖
            </p>
          </div>
        </div>
      </footer>

      {/* Tip Modal Placeholder */}
      {showTipModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="comic-border bg-brand-neutral max-w-md mx-4">
            <CardHeader>
              <CardTitle className="font-anton text-2xl text-brand-primary">
                Spill Some Tea
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-manrope text-brand-text-secondary mb-4">
                This feature is coming soon! For now, use the early access options above.
              </p>
              <Button 
                onClick={() => setShowTipModal(false)}
                className="w-full bg-brand-primary"
              >
                Got it!
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Home; 