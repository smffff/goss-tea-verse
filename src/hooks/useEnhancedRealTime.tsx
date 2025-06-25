
import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { TeaSubmission } from '@/types/teaFeed';
import { transformSubmission } from '@/utils/submissionUtils';

interface UseEnhancedRealTimeProps {
  setSubmissions: React.Dispatch<React.SetStateAction<TeaSubmission[]>>;
  activeFilter: string;
  sortBy: string;
}

export const useEnhancedRealTime = ({ setSubmissions, activeFilter, sortBy }: UseEnhancedRealTimeProps) => {
  const { toast } = useToast();
  const channelRef = useRef<any>(null);

  useEffect(() => {
    console.log('useEnhancedRealTime - Setting up real-time subscription');
    
    // Clean up any existing channel first
    if (channelRef.current) {
      console.log('useEnhancedRealTime - Cleaning up existing channel');
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
    }
    
    const channel = supabase
      .channel(`tea_submissions_changes_${Date.now()}`) // Unique channel name
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'tea_submissions'
        },
        (payload) => {
          console.log('useEnhancedRealTime - New submission received:', payload);
          const newSubmission = payload.new as any;
          
          if (newSubmission.status === 'approved') {
            const transformedSubmission = transformSubmission(newSubmission);
            setSubmissions(prev => [transformedSubmission, ...prev]);
            
            toast({
              title: "New Tea Alert! ☕",
              description: "Fresh gossip just dropped in the feed!",
            });
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'tea_submissions'
        },
        (payload) => {
          console.log('useEnhancedRealTime - Submission updated:', payload);
          const updatedSubmission = payload.new as any;
          
          if (updatedSubmission.status === 'approved') {
            const transformedSubmission = transformSubmission(updatedSubmission);
            
            setSubmissions(prev => {
              const existingIndex = prev.findIndex(sub => sub.id === updatedSubmission.id);
              if (existingIndex >= 0) {
                const newSubmissions = [...prev];
                newSubmissions[existingIndex] = transformedSubmission;
                return newSubmissions;
              } else {
                return [transformedSubmission, ...prev];
              }
            });
            
            toast({
              title: "Tea Updated! ☕",
              description: "Tea has been updated and is now live!",
            });
          }
        }
      )
      .subscribe((status) => {
        console.log('useEnhancedRealTime - Subscription status:', status);
      });

    channelRef.current = channel;

    return () => {
      console.log('useEnhancedRealTime - Cleaning up real-time subscription');
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [setSubmissions, toast]); // Removed activeFilter and sortBy to prevent unnecessary re-subscriptions
};
