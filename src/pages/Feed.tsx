
import React from 'react';
import Layout from '@/components/Layout';

const Feed = () => {
  return (
    <Layout 
      pageTitle="Tea Feed"
      pageDescription="Latest crypto gossip and tea from the community"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">Tea Feed 🫖</h1>
          
          <div className="space-y-6">
            <div className="bg-ctea-dark/50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Latest Tea</h2>
              <p className="text-gray-300">
                Tea feed content will be displayed here. This is where users can see all the latest gossip and submissions.
              </p>
            </div>

            <div className="bg-ctea-dark/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Hot Topic #1</h3>
              <p className="text-gray-300 mb-2">Someone spilled some interesting tea about...</p>
              <div className="text-sm text-gray-400">2 hours ago • 🔥 15 reactions</div>
            </div>

            <div className="bg-ctea-dark/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Hot Topic #2</h3>
              <p className="text-gray-300 mb-2">Another interesting development in the crypto space...</p>
              <div className="text-sm text-gray-400">4 hours ago • 🫖 8 reactions</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Feed;
