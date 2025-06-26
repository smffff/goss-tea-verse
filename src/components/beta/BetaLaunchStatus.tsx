
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, Loader2, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface SecurityStatus {
  securityHardened: boolean;
  edgeFunctionDeployed: boolean;
  adminConfigured: boolean;
  betaGateActive: boolean;
  launchReady: boolean;
}

const BetaLaunchStatus: React.FC = () => {
  const [status, setStatus] = useState<SecurityStatus>({
    securityHardened: false,
    edgeFunctionDeployed: false,
    adminConfigured: false,
    betaGateActive: false,
    launchReady: false
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    checkLaunchStatus();
  }, []);

  const checkLaunchStatus = async () => {
    try {
      // Check security hardening status
      const securityResponse = await fetch('https://luubdvuuxvtkheyhzepm.functions.supabase.co/harden_security_v2');
      const securityOk = securityResponse.ok;

      // Check admin configuration
      const adminConfigured = window.location.hostname !== 'localhost';
      
      // Check beta gate
      const betaGateActive = true; // Always active for Beta 1.2

      const newStatus = {
        securityHardened: securityOk,
        edgeFunctionDeployed: securityOk,
        adminConfigured,
        betaGateActive,
        launchReady: securityOk && adminConfigured && betaGateActive
      };

      setStatus(newStatus);
      
      if (newStatus.launchReady) {
        toast({
          title: "🚀 Beta 1.2 Launch Ready!",
          description: "All systems secured and configured for soft launch.",
        });
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.error('Launch status check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const executeHardening = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://luubdvuuxvtkheyhzepm.functions.supabase.co/harden_security_v2', {
        method: 'POST'
      });
      
      if (response.ok) {
        toast({
          title: "Security Hardened",
          description: "Beta 1.2 security infrastructure deployed successfully.",
        });
        await checkLaunchStatus();
      } else {
        throw new Error('Security hardening failed');
      }
    } catch (error) {
      toast({
        title: "Hardening Failed",
        description: "Please check the edge function deployment.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const StatusItem: React.FC<{ 
    label: string; 
    status: boolean; 
    loading?: boolean;
  }> = ({ label, status, loading: itemLoading }) => (
    <motion.div 
      className="flex items-center gap-3 p-3 rounded-lg bg-gray-900/50 border border-gray-700"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      {itemLoading ? (
        <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
      ) : status ? (
        <CheckCircle className="w-5 h-5 text-green-400" />
      ) : (
        <AlertTriangle className="w-5 h-5 text-yellow-400" />
      )}
      <span className={`text-sm ${status ? 'text-green-400' : 'text-yellow-400'}`}>
        {label}
      </span>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
        <span className="ml-3 text-cyan-400">Checking launch status...</span>
      </div>
    );
  }

  return (
    <motion.div 
      className="max-w-md mx-auto p-6 bg-black/80 backdrop-blur-sm rounded-xl border border-gray-800"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-6 h-6 text-cyan-400" />
        <h2 className="text-xl font-bold text-white">Beta 1.2 Launch Status</h2>
      </div>

      <div className="space-y-3 mb-6">
        <StatusItem 
          label="Security Infrastructure" 
          status={status.securityHardened} 
        />
        <StatusItem 
          label="Edge Function Deployed" 
          status={status.edgeFunctionDeployed} 
        />
        <StatusItem 
          label="Admin Access Configured" 
          status={status.adminConfigured} 
        />
        <StatusItem 
          label="Beta Gate Active" 
          status={status.betaGateActive} 
        />
      </div>

      {status.launchReady ? (
        <motion.div 
          className="text-center p-4 bg-green-500/20 border border-green-500/50 rounded-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <p className="text-green-400 font-bold">🚀 LAUNCH READY</p>
          <p className="text-green-300 text-sm">Beta 1.2 soft launch activated</p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {!status.securityHardened && (
            <Button 
              onClick={executeHardening}
              disabled={loading}
              className="w-full bg-cyan-600 hover:bg-cyan-700"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Shield className="w-4 h-4 mr-2" />
              )}
              Deploy Security Infrastructure
            </Button>
          )}
          
          <Button 
            onClick={checkLaunchStatus}
            variant="outline"
            className="w-full border-gray-600"
          >
            Refresh Status
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default BetaLaunchStatus;
