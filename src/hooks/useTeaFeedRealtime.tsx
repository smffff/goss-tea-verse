
import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { TeaSubmission } from '@/types/teaFeed';
import { transformSubmission } from '@/utils/submissionUtils';

interface UseTeaFeedRealtimeProps {
  setSubmissions: React.Dispatch<React.SetStateAction<TeaSubmission[]>>;
}

export const useTeaFeedRealtime = ({ setSubmissions }: UseTeaFeedRealtimeProps) => {
  const { toast } = useToast();
  const channelRef = useRef<any>(null);

  useEffect(() => {
    // Clean up any existing channel first
    if (channelRef.current) {
      console.log('useTeaFeedRealtime - Cleaning up existing channel');
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
    }

    // Set up real-time subscription for new submissions
    const channel = supabase
      .channel(`tea_feed_changes_${Date.now()}`) // Unique channel name
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'tea_submissions'
        },
        (payload) => {
          console.log('useTeaFeedRealtime - New submission received via real-time:', payload);
          const newSubmission = payload.new as any;
          
          // Only add if status is approved
          if (newSubmission.status === 'approved') {
            const transformedSubmission = transformSubmission(newSubmission);
            setSubmissions(prev => [transformedSubmission, ...prev]);
            
            toast({
              title: "New Tea Alert! ☕",
              description: "Fresh gossip just dropped!",
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
          console.log('useTeaFeedRealtime - Submission updated via real-time:', payload);
          const updatedSubmission = payload.new as any;
          
          // Handle status updates
          if (updatedSubmission.status === 'approved') {
            const transformedSubmission = transformSubmission(updatedSubmission);
            
            setSubmissions(prev => {
              const existingIndex = prev.findIndex(sub => sub.id === updatedSubmission.id);
              if (existingIndex >= 0) {
                // Update existing submission
                const newSubmissions = [...prev];
                newSubmissions[existingIndex] = transformedSubmission;
                return newSubmissions;
              } else {
                // Add new approved submission
                return [transformedSubmission, ...prev];
              }
            });
            
            toast({
              title: "Tea Updated! ☕",
              description: "Tea has been updated!",
            });
          }
        }
      )
      .subscribe((status) => {
        console.log('useTeaFeedRealtime - Subscription status:', status);
      });

    channelRef.current = channel;

    return () => {
      console.log('useTeaFeedRealtime - Cleaning up real-time subscription');
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [setSubmissions, toast]);
};
