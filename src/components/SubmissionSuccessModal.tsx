
import React from 'react';
import { CheckCircle, Crown } from 'lucide-react';

interface SubmissionSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  successType: 'spill' | 'vip';
  onViewFeed: () => void;
}

const SubmissionSuccessModal: React.FC<SubmissionSuccessModalProps> = ({
  isOpen,
  onClose,
  successType,
  onViewFeed
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-ctea-dark/95 backdrop-blur-md border border-ctea-teal/30 rounded-lg p-8 max-w-md w-full">
        <div className="text-center space-y-4">
          {successType === 'spill' ? (
            <>
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              <h3 className="text-xl font-bold text-white">Tea Spilled! ☕</h3>
              <p className="text-gray-300">
                Your submission is now live in the feed! Click below to see the community reactions.
              </p>
              <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-4 mt-4">
                <p className="text-sm text-green-300">
                  💡 Pro tip: Follow us on Twitter for real-time updates and exclusive alpha drops.
                </p>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={onViewFeed}
                  className="flex-1 bg-gradient-to-r from-ctea-teal to-ctea-purple text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
                >
                  View in Feed
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
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
              <button
                onClick={onClose}
                className="mt-6 bg-gradient-to-r from-ctea-yellow to-orange-500 text-white font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity"
              >
                Got It!
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmissionSuccessModal;
