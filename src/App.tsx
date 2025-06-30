import React from 'react';
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
            <Link 
              to="/feed" 
              className={`px-4 py-2 rounded-lg transition-colors ${
                location.pathname === '/feed' 
                  ? 'bg-red-600 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Tea Feed
            </Link>
            <Link 
              to="/spill" 
              className={`px-4 py-2 rounded-lg transition-colors ${
                location.pathname === '/spill' 
                  ? 'bg-red-600 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Spill Tea
            </Link>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium">
              Connect Wallet
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

// Simple pages
const Landing = () => (
  <Layout>
    <div className="container mx-auto px-4 py-16">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold text-white mb-6">🫖 CTea News</h1>
        <p className="text-2xl text-gray-300 mb-8">
          Crypto Gossip. Anonymous Tips. AI Receipts.
        </p>
        <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
          The ultimate platform for anonymous crypto gossip and community-driven news. 
          Share insights, earn rewards, and stay updated with the latest tea.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <Link 
            to="/feed"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
          >
            View Tea Feed
          </Link>
          <Link 
            to="/spill"
            className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
          >
            Spill Tea
          </Link>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-slate-800 p-6 rounded-lg">
            <div className="text-3xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold text-white mb-2">Anonymous</h3>
            <p className="text-gray-400">Share crypto gossip without revealing your identity</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg">
            <div className="text-3xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold text-white mb-2">AI Verified</h3>
            <p className="text-gray-400">Our AI moderates content and verifies credible sources</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg">
            <div className="text-3xl mb-4">💰</div>
            <h3 className="text-xl font-semibold text-white mb-2">Earn Rewards</h3>
            <p className="text-gray-400">Get rewarded for quality submissions and engagement</p>
          </div>
        </div>
      </div>
    </div>
  </Layout>
);

const Feed = () => (
  <Layout>
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Tea Feed 🫖</h1>
        
        {/* Search and Filter */}
        <div className="bg-slate-800 p-4 rounded-lg mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              placeholder="Search tea..." 
              className="flex-1 bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-red-500 focus:outline-none"
            />
            <select className="bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-red-500 focus:outline-none">
              <option>All Categories</option>
              <option>DeFi Drama</option>
              <option>NFT Gossip</option>
              <option>Exchange News</option>
            </select>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Major DeFi Protocol Planning Token Launch</h3>
              <span className="bg-red-600 text-white px-2 py-1 rounded text-sm">Hot</span>
            </div>
            <p className="text-gray-300 mb-4">
              Heard from reliable sources that a well-known DeFi protocol is planning a major token launch in Q1 2025. 
              The team has been quietly building and the tokenomics look promising.
            </p>
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>Anonymous • 2 hours ago</span>
              <div className="flex items-center gap-4">
                <span>❤️ 45</span>
                <span>💬 12</span>
                <span>📤 Share</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Celebrity NFT Collection Facing Backlash</h3>
              <span className="bg-yellow-600 text-white px-2 py-1 rounded text-sm">New</span>
            </div>
            <p className="text-gray-300 mb-4">
              A popular celebrity's NFT collection is getting major backlash from the community. 
              The art quality is questionable and the mint price seems inflated.
            </p>
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>CryptoWhale • 4 hours ago</span>
              <div className="flex items-center gap-4">
                <span>❤️ 23</span>
                <span>💬 8</span>
                <span>📤 Share</span>
              </div>
            </div>
          </div>
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
        
        <div className="bg-slate-800 p-8 rounded-lg border border-slate-700">
          <form className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-2">Tea Title *</label>
              <input 
                type="text" 
                placeholder="What's the hot gossip?"
                className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-red-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Category *</label>
              <select className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-red-500 focus:outline-none">
                <option value="">Select a category</option>
                <option value="defi">DeFi Drama</option>
                <option value="nft">NFT Gossip</option>
                <option value="exchange">Exchange News</option>
                <option value="protocol">Protocol Updates</option>
                <option value="celebrity">Celebrity Crypto</option>
                <option value="regulatory">Regulatory Tea</option>
                <option value="vc">VC Moves</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Spill the Details *</label>
              <textarea 
                placeholder="Share the juicy details... (be respectful and factual)"
                rows={6}
                className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-red-500 focus:outline-none resize-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="anonymous" className="rounded" />
              <label htmlFor="anonymous" className="text-white">
                Post anonymously (recommended for sensitive tea)
              </label>
            </div>

            <div className="bg-slate-700 p-4 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Rewards</h4>
              <p className="text-gray-300 text-sm">
                Quality tea submissions earn $TEA tokens. Verified sources get bonus rewards!
              </p>
            </div>

            <button 
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold text-lg transition-colors"
            >
              Spill the Tea
            </button>
          </form>
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
