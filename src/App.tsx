import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './index.css';

// Navigation Component
const Navigation = () => {
  const location = useLocation();
  
  return (
    <nav className="bg-slate-900 border-b border-slate-700 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl">
            <span className="text-2xl">🫖</span>
            CTea News
          </Link>
          
          <div className="flex items-center gap-4">
            <span className="text-red-400 text-sm font-medium">Coming Soon</span>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium">
              Get Early Access
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Layout wrapper
const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
    <Navigation />
    {children}
  </div>
);

// Access Method Card Component
const AccessMethodCard = ({ 
  title, 
  subtitle, 
  description, 
  icon, 
  color, 
  badge, 
  features, 
  onSelect 
}: {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  badge: string;
  features: string[];
  onSelect: () => void;
}) => (
  <div className={`bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-red-500 transition-all cursor-pointer group`}>
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className={`text-3xl ${color}`}>{icon}</div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">{badge}</span>
          </div>
          <p className="text-red-400 text-sm font-medium">{subtitle}</p>
        </div>
      </div>
    </div>
    
    <p className="text-gray-300 mb-4">{description}</p>
    
    <ul className="space-y-2 mb-6">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center gap-2 text-sm text-gray-400">
          <span className="text-green-500">✓</span>
          {feature}
        </li>
      ))}
    </ul>
    
    <button 
      onClick={onSelect}
      className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold transition-colors group-hover:scale-105"
    >
      Get Started
    </button>
  </div>
);

// Modal Component
const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Coming Soon</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              ✕
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

// Enhanced Landing Page
const Landing = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [showDemo, setShowDemo] = useState(false);

  // Parallax effect for teacup
  const [parallaxY, setParallaxY] = useState(0);
  React.useEffect(() => {
    const handleScroll = () => {
      setParallaxY(window.scrollY * 0.2);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const accessMethods = [
    {
      id: 'spill-tea',
      title: 'Spill Tea for Access',
      subtitle: 'Share alpha, gossip, or breaking news',
      description: 'Get verified by our AI for quality content and earn your way into the newsroom',
      icon: '☕',
      color: 'text-red-500',
      badge: 'FREE',
      features: [
        'Submit crypto gossip & alpha',
        'AI verification for quality',
        'Earn access through contributions',
        'Anonymous submissions welcome'
      ]
    },
    {
      id: 'bribe-devs',
      title: 'Bribe the Devs',
      subtitle: 'Too impatient to wait? We understand 😉',
      description: 'Tip the developers for instant VIP access and support development',
      icon: '💰',
      color: 'text-yellow-500',
      badge: 'INSTANT',
      features: [
        'Skip the line completely',
        'Instant VIP access',
        'Support app development',
        'Priority customer support'
      ]
    },
    {
      id: 'whale-status',
      title: 'Whale Status',
      subtitle: 'Hold 1M+ $TEA tokens on AVAX',
      description: 'Automatic VIP status for life with no subscription fees, ever',
      icon: '🐋',
      color: 'text-purple-500',
      badge: 'VIP FOR LIFE',
      features: [
        '1M+ $TEA tokens required',
        'Lifetime VIP access',
        'No subscription fees ever',
        'Exclusive whale features'
      ]
    }
  ];

  const handleAccessMethod = (methodId: string) => {
    setActiveModal(methodId);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative bg-vaporwave overflow-hidden pb-8">
        <div className="container mx-auto px-4 pt-16 pb-24 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo and Tagline */}
          <div className="flex-1 flex flex-col items-center md:items-start z-10">
            <img
              src="/assets/ctea-logo-full.png"
              alt="CTEA News Logo"
              className="w-72 md:w-96 mb-6 comic-border retro-glow"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            />
            <div className="speech-bubble mb-6 max-w-lg">
              Where Crypto Gossip Meets AI Receipts
            </div>
            <div className="flex flex-wrap gap-4 mb-4">
              <button className="ctea-btn" onClick={() => handleAccessMethod('spill-tea')}>Spill Tea</button>
              <button className="ctea-btn" onClick={() => document.getElementById('early-access')?.scrollIntoView({ behavior: 'smooth' })}>Tip for Access</button>
              <Link to="/feed" className="ctea-btn">Enter the Feed</Link>
              <Link to="/vip" className="ctea-btn">Go VIP</Link>
            </div>
          </div>
          {/* Parallax Teacup */}
          <div className="flex-1 flex items-center justify-center relative z-0">
            <img
              src="/assets/logo-teacup-drip.svg"
              alt="Floating Teacup"
              className="w-64 md:w-80 absolute left-1/2 md:left-auto md:right-0 top-0 md:top-12 animate-float"
              style={{
                transform: `translate(-50%, ${parallaxY}px) scale(1.1)`,
                filter: 'drop-shadow(0 0 32px #A67CFF) drop-shadow(0 0 8px #FF2052)'
              }}
            />
          </div>
          {/* Vaporwave shapes (decorative) */}
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-gradient-to-br from-[#FFD93D] via-[#A67CFF] to-[#FF2052] opacity-30 blur-3xl z-0" />
          <div className="absolute -bottom-32 right-0 w-96 h-96 rounded-full bg-gradient-to-tr from-[#A67CFF] via-[#FF2052] to-[#FFD93D] opacity-20 blur-2xl z-0" />
        </div>
      </div>

      {/* Access Method Modals */}
      <Modal isOpen={activeModal === 'spill-tea'} onClose={() => setActiveModal(null)}>
        <div className="text-center">
          <div className="text-4xl mb-4">☕</div>
          <h3 className="text-xl font-bold text-white mb-4">Spill Your Tea</h3>
          <p className="text-gray-300 mb-6">
            Share your hottest crypto gossip, alpha, or breaking news to earn access.
            Our AI will verify the quality of your submission.
          </p>
          <div className="space-y-4">
            <textarea 
              placeholder="What's the hot gossip? Share the details..."
              className="w-full bg-slate-700 text-white p-3 rounded-lg border border-slate-600 focus:border-red-500 focus:outline-none"
              rows={4}
            />
            <input 
              type="email" 
              placeholder="your@email.com (for access code)"
              className="w-full bg-slate-700 text-white p-3 rounded-lg border border-slate-600 focus:border-red-500 focus:outline-none"
            />
            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold">
              Submit Tea
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'bribe-devs'} onClose={() => setActiveModal(null)}>
        <div className="text-center">
          <div className="text-4xl mb-4">💰</div>
          <h3 className="text-xl font-bold text-white mb-4">Bribe the Devs 😉</h3>
          <p className="text-gray-300 mb-6">
            Support development and get instant VIP access. We won't judge!
          </p>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[25, 50, 100, 250].map((amount) => (
                <button key={amount} className="bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-lg border border-slate-600">
                  ${amount}
                </button>
              ))}
            </div>
            <input 
              type="email" 
              placeholder="your@email.com (for access code)"
              className="w-full bg-slate-700 text-white p-3 rounded-lg border border-slate-600 focus:border-red-500 focus:outline-none"
            />
            <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-lg font-bold">
              Get Payment Instructions
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'whale-status'} onClose={() => setActiveModal(null)}>
        <div className="text-center">
          <div className="text-4xl mb-4">🐋</div>
          <h3 className="text-xl font-bold text-white mb-4">Whale Verification</h3>
          <p className="text-gray-300 mb-6">
            Connect your wallet to verify you hold 1M+ $TEA tokens on AVAX for lifetime VIP access.
          </p>
          <div className="space-y-4">
            <div className="bg-slate-700 p-4 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Whale Benefits:</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>✓ Lifetime VIP access (no expiration)</li>
                <li>✓ Zero subscription fees forever</li>
                <li>✓ Exclusive whale-only features</li>
                <li>✓ Priority customer support</li>
              </ul>
            </div>
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-bold">
              Connect Wallet & Verify
            </button>
          </div>
        </div>
      </Modal>

      {/* App Demo Modal */}
      <Modal isOpen={showDemo} onClose={() => setShowDemo(false)}>
        <div className="text-center">
          <h3 className="text-xl font-bold text-white mb-4">CTea News App Preview</h3>
          <div className="bg-slate-700 p-4 rounded-lg mb-4">
            <div className="text-sm text-gray-300 space-y-2">
              <div className="flex items-center justify-between">
                <span>🫖 CTea Newsroom</span>
                <span className="text-red-400">1,337 $TEA</span>
              </div>
              <div className="bg-slate-800 p-3 rounded border border-slate-600">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-red-600 text-white px-2 py-1 rounded text-xs">DeFi Drama</span>
                  <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">AI Verified</span>
                </div>
                <h4 className="text-white font-semibold text-sm mb-1">
                  Major DeFi Protocol Emergency Exit 🚨
                </h4>
                <p className="text-gray-400 text-xs mb-2">
                  Insider source reports unusual activity in multisig wallet...
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Anonymous Whale • 2m ago</span>
                  <span>❤️ 45 💬 12</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-gray-300 text-sm">
            See how anonymous posting, AI verification, and token rewards work together!
          </p>
        </div>
      </Modal>
    </Layout>
  );
};

// Simple pages for other routes
const Feed = () => (
  <Layout>
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Tea Feed 🫖</h1>
        <div className="bg-slate-800 p-6 rounded-lg text-center">
          <p className="text-gray-300">Coming Soon! Get early access through the landing page.</p>
          <Link to="/" className="mt-4 inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg">
            Back to Landing
          </Link>
        </div>
      </div>
    </div>
  </Layout>
);

const SpillTea = () => (
  <Layout>
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Spill the Tea ☕</h1>
        <div className="bg-slate-800 p-6 rounded-lg text-center">
          <p className="text-gray-300">Coming Soon! Get early access through the landing page.</p>
          <Link to="/" className="mt-4 inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg">
            Back to Landing
          </Link>
        </div>
      </div>
    </div>
  </Layout>
);

const NotFound = () => (
  <Layout>
    <div className="flex items-center justify-center min-h-[80vh] bg-vaporwave">
      <div className="text-center">
        <div className="flex flex-col items-center justify-center">
          <img 
            src="/assets/ctea-meme-lady.png" 
            alt="CTEA Meme Lady" 
            className="w-full max-w-md mb-6 comic-border retro-glow"
            style={{ boxShadow: '0 0 32px 8px #A67CFF, 0 0 0 8px #0B0B17' }}
          />
          <div className="speech-bubble mb-6">
            This page is steeping... come back later.
          </div>
        </div>
        <h1 className="text-5xl font-bold ctea-heading mb-2" style={{ color: 'var(--ctea-primary)' }}>404</h1>
        <p className="text-xl mb-8" style={{ color: 'var(--ctea-lavender)' }}>
          Not Found / Under Construction
        </p>
        <Link 
          to="/"
          className="ctea-btn"
        >
          Go Home
        </Link>
      </div>
    </div>
  </Layout>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/spill" element={<SpillTea />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
