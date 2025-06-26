
import React from 'react';
import { motion } from 'framer-motion';
import BetaLaunchStatus from '@/components/beta/BetaLaunchStatus';
import { Shield, Users, BarChart3, Settings } from 'lucide-react';

const Admin: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            CTea Admin Dashboard
          </h1>
          <p className="text-gray-400">Beta 1.2 Launch Control Center</p>
        </motion.div>

        {/* Launch Status */}
        <div className="mb-8">
          <BetaLaunchStatus />
        </div>

        {/* Quick Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-black/50 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-5 h-5 text-cyan-400" />
              <span className="text-gray-400 text-sm">Security</span>
            </div>
            <p className="text-2xl font-bold text-white">Hardened</p>
          </div>

          <div className="bg-black/50 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-green-400" />
              <span className="text-gray-400 text-sm">Beta Users</span>
            </div>
            <p className="text-2xl font-bold text-white">Invite Only</p>
          </div>

          <div className="bg-black/50 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              <span className="text-gray-400 text-sm">Status</span>
            </div>
            <p className="text-2xl font-bold text-white">Live</p>
          </div>

          <div className="bg-black/50 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Settings className="w-5 h-5 text-orange-400" />
              <span className="text-gray-400 text-sm">Version</span>
            </div>
            <p className="text-2xl font-bold text-white">1.2 Beta</p>
          </div>
        </motion.div>

        {/* Admin Controls */}
        <motion.div 
          className="bg-black/50 border border-gray-800 rounded-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl font-bold text-white mb-4">Launch Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-900/50 rounded-lg">
              <h3 className="font-semibold text-cyan-400 mb-2">Access Control</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>✅ Beta gate active</li>
                <li>✅ Admin override enabled</li>
                <li>✅ Demo mode available</li>
                <li>✅ Spill-to-access active</li>
              </ul>
            </div>
            
            <div className="p-4 bg-gray-900/50 rounded-lg">
              <h3 className="font-semibold text-green-400 mb-2">Security Features</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>✅ Role-based access control</li>
                <li>✅ Content validation</li>
                <li>✅ Rate limiting</li>
                <li>✅ Audit logging</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;
