
import { useState, useEffect } from 'react';
import { TipVerificationService, type TipTransaction } from '@/services/tipVerificationService';
import { useToast } from '@/hooks/use-toast';

export const useTipVerification = () => {
  const [pendingTips, setPendingTips] = useState<TipTransaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState<string | null>(null);
  const { toast } = useToast();

  const loadPendingTips = async () => {
    setLoading(true);
    try {
      const tips = await TipVerificationService.getPendingTips();
      setPendingTips(tips);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load pending tips",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyTip = async (
    tipId: string, 
    status: 'verified' | 'rejected', 
    rejectionReason?: string
  ) => {
    setVerifying(tipId);
    try {
      const result = await TipVerificationService.verifyTip(
        tipId,
        'admin', // TODO: Get actual admin email from auth
        status,
        rejectionReason
      );

      if (result.success) {
        toast({
          title: "Success",
          description: `Tip ${status === 'verified' ? 'verified' : 'rejected'} successfully`,
        });
        
        // Remove from pending list
        setPendingTips(prev => prev.filter(tip => tip.id !== tipId));
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to verify tip",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify tip",
        variant: "destructive"
      });
    } finally {
      setVerifying(null);
    }
  };

  const submitTipProof = async (tipData: {
    userEmail: string;
    network: string;
    walletAddress: string;
    amount?: number;
    transactionHash?: string;
    proofImageUrl?: string;
  }) => {
    setLoading(true);
    try {
      const result = await TipVerificationService.submitTipProof(tipData);
      
      if (result.success) {
        toast({
          title: "Tip Proof Submitted! 🎉",
          description: "Your tip proof has been submitted for verification. You'll receive VIP access once verified!",
        });
        return { success: true, tipId: result.tipId };
      } else {
        toast({
          title: "Submission Failed",
          description: result.error || "Failed to submit tip proof",
          variant: "destructive"
        });
        return { success: false, error: result.error };
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit tip proof",
        variant: "destructive"
      });
      return { success: false, error: "Failed to submit tip proof" };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPendingTips();
  }, []);

  return {
    pendingTips,
    loading,
    verifying,
    verifyTip,
    submitTipProof,
    loadPendingTips
  };
};
