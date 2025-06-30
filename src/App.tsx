import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

// Simple pages
const Landing = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">🫖 CTea News</h1>
        <p className="text-xl text-gray-300 mb-8">Crypto Gossip. Anonymous Tips. AI Receipts.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => window.location.href = '/feed'}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold"
          >
            View Tea Feed
          </button>
          <button 
            onClick={() => window.location.href = '/spill'}
            className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-3 rounded-lg font-bold"
          >
            Spill Tea
          </button>
        </div>
      </div>
    </div>
  </div>
);

const Feed = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white mb-8">Tea Feed 🫖</h1>
      <div className="space-y-4">
        <div className="bg-slate-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-2">Sample Tea #1</h3>
          <p className="text-gray-300">This is where tea submissions will appear.</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-2">Sample Tea #2</h3>
          <p className="text-gray-300">More gossip and crypto news here.</p>
        </div>
      </div>
      <button 
        onClick={() => window.location.href = '/'}
        className="mt-8 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
      >
        Back to Home
      </button>
    </div>
  </div>
);

const SpillTea = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white mb-8">Spill the Tea ☕</h1>
      <div className="max-w-2xl mx-auto">
        <div className="bg-slate-800 p-6 rounded-lg">
          <p className="text-gray-300 text-center mb-6">
            Tea spilling form will be implemented here.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  </div>
);

const NotFound = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-white mb-4">404</h1>
      <p className="text-xl text-gray-300 mb-8">Page not found</p>
      <button 
        onClick={() => window.location.href = '/'}
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
      >
        Go Home
      </button>
    </div>
  </div>
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
