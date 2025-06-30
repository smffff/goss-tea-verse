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
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-6xl mx-auto">
          {/* Animated Logo */}
          <div className="mb-8">
            <div className="text-8xl mb-4 animate-bounce">🫖</div>
            <h1 className="text-6xl font-bold text-white mb-6">CTea News</h1>
            <p className="text-2xl text-gray-300 mb-4">
              Where Crypto Gossip Meets AI Receipts
            </p>
            <p className="text-lg text-gray-400 mb-8">
              The Web3 anonymous newsroom is brewing... Get early access now!
            </p>
          </div>

          {/* Demo Button */}
          <div className="mb-16">
            <button 
              onClick={() => setShowDemo(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors mb-4"
            >
              See How It Works
            </button>
            <div className="text-sm text-gray-400">
              Coming Soon - Alpha Access Available
            </div>
          </div>

          {/* Access Methods Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Choose Your Access Method
            </h2>
            <p className="text-gray-300 mb-8">
              Three ways to get early access to the hottest crypto gossip platform
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {accessMethods.map((method) => (
                <AccessMethodCard
                  key={method.id}
                  {...method}
                  onSelect={() => handleAccessMethod(method.id)}
                />
              ))}
            </div>
          </div>

          {/* Features Preview */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              What Makes CTea Special
            </h2>
            <p className="text-gray-300 mb-8">
              The future of anonymous crypto journalism
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: '🔒', title: 'Anonymous Posting', description: 'Post gossip without revealing your identity' },
                { icon: '🤖', title: 'AI Verification', description: 'Advanced AI moderates and verifies content quality' },
                { icon: '💰', title: 'Token Rewards', description: 'Earn $TEA tokens for quality submissions' },
                { icon: '👥', title: 'Community Driven', description: 'Community validation and gossip verification' }
              ].map((feature, index) => (
                <div key={index} className="bg-slate-800 p-6 rounded-lg text-center">
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Waitlist Section */}
          <div className="bg-slate-800 p-8 rounded-lg border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">
              Join the Waitlist
            </h2>
            <p className="text-gray-300 mb-6">
              Be the first to know when CTea News launches
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="your@email.com"
                className="flex-1 bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-red-500 focus:outline-none"
              />
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold">
                Join Waitlist
              </button>
            </div>
          </div>
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
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-xl text-gray-300 mb-8">Page not found</p>
        <Link 
          to="/"
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold"
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
