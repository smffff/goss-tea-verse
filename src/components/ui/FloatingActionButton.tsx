
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Coffee, User, Ghost, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import EnhancedProfileModal from '../profile/EnhancedProfileModal';
import { useAuth } from '@/hooks/useAuth';
import { secureLog } from '@/utils/secureLogging';

const FloatingActionButton: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const actions = [
    {
      icon: Coffee,
      label: 'Spill Tea',
      color: 'from-ctea-teal to-ctea-purple',
      action: () => navigate('/spill')
    },
    {
      icon: User,
      label: 'Profile',
      color: 'from-purple-500 to-pink-500',
      action: () => setShowProfile(true)
    },
    {
      icon: Ghost,
      label: 'Ghost Mode',
      color: 'from-gray-500 to-gray-700',
      action: () => {
        secureLog.info('Toggle ghost mode');
      }
    }
  ];

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <AnimatePresence>
          {isExpanded && (
            <>
              {actions.map((action, index) => (
                <motion.div
                  key={action.label}
                  initial={{ scale: 0, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0, opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    onClick={() => {
                      action.action();
                      setIsExpanded(false);
                    }}
                    className={`w-12 h-12 rounded-full bg-gradient-to-r ${action.color} hover:scale-110 transition-transform shadow-lg border-0`}
                    size="sm"
                  >
                    <action.icon className="w-5 h-5" />
                  </Button>
                  <div className="absolute right-14 top-1/2 -translate-y-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded whitespace-nowrap pointer-events-none">
                    {action.label}
                  </div>
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Main FAB */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-ctea-teal to-ctea-purple shadow-xl border-0 hover:shadow-2xl"
            size="lg"
          >
            <motion.div
              animate={{ rotate: isExpanded ? 45 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <Plus className="w-6 h-6" />
            </motion.div>
          </Button>
        </motion.div>

        {/* Pulse indicator for notifications */}
        {user?.token_balance && user.token_balance > 0 && (
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-xs text-white font-bold">!</span>
          </motion.div>
        )}
      </div>

      <EnhancedProfileModal
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
        user={user}
      />
    </>
  );
};

export default FloatingActionButton;
