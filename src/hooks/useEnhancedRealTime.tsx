
import { useEffect } from 'react';
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

  useEffect(() => {
    console.log('useEnhancedRealTime - Setting up real-time subscription');
    
    const channel = supabase
      .channel('tea_submissions_changes')
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
          
          if (newSubmission.status === 'approved' && newSubmission.visible === true) {
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
          
          if (updatedSubmission.status === 'approved' && updatedSubmission.visible === true && updatedSubmission.ai_rated === true) {
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
              title: "AI Analysis Complete! 🤖",
              description: "Tea has been rated and is now live!",
            });
          }
        }
      )
      .subscribe();

    return () => {
      console.log('useEnhancedRealTime - Cleaning up real-time subscription');
      supabase.removeChannel(channel);
    };
  }, [setSubmissions, activeFilter, sortBy, toast]);
};
