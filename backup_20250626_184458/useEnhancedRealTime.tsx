import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { TeaSubmission } from '@/types/teaFeed';
import { transformSubmission } from '@/utils/submissionUtils';
import type { RealtimeChannel } from '@supabase/supabase-js';

interface UseEnhancedRealTimeProps {
  setSubmissions: React.Dispatch<React.SetStateAction<TeaSubmission[]>>;
}

export const useEnhancedRealTime = ({ setSubmissions }: UseEnhancedRealTimeProps) => {
  const { toast } = useToast();
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    console.log('useEnhancedRealTime - Setting up subscription');
    
    // Clean up existing channel
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
    }
    
    const channel = supabase
      .channel(`tea_submissions_${Date.now()}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'tea_submissions'
        },
        (payload) => {
          console.log('useEnhancedRealTime - New submission:', payload);
          const newSubmission = payload.new as TeaSubmission;
          
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
          console.log('useEnhancedRealTime - Submission updated:', payload);
          const updatedSubmission = payload.new as TeaSubmission;
          
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
          }
        }
      )
      .subscribe();

    channelRef.current = channel;

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [setSubmissions, toast]);
};
