import { useState, useCallback } from 'react'
import { supabase } from '../integrations/supabase/client'
import { useToast } from './use-toast'

interface ModerationResult {
  mod_status: "clean" | "flagged" | "escalated"
  score: number
  reason: string
  flagged_categories?: string[]
  category_scores?: Record<string, number>
}

interface UseAIModerationReturn {
  moderateContent: (content: string, spillId: string, userId?: string, walletAddress?: string) => Promise<ModerationResult | null>
  isModerating: boolean
  moderationHistory: ModerationResult[]
  clearHistory: () => void
}

export function useAIModeration(): UseAIModerationReturn {
  const [isModerating, setIsModerating] = useState(false)
  const [moderationHistory, setModerationHistory] = useState<ModerationResult[]>([])
  const { toast } = useToast()

  const moderateContent = useCallback(async (
    content: string, 
    spillId: string, 
    userId?: string, 
    walletAddress?: string
  ): Promise<ModerationResult | null> => {
    setIsModerating(true)
    
    try {
      // Call the AI moderation edge function
      const { data, error } = await supabase.functions.invoke('ai_moderate_spill', {
        body: {
          content,
          spill_id: spillId,
          user_id: userId,
          wallet_address: walletAddress
        }
      })

      if (error) {
        console.error('AI moderation error:', error)
        toast({
          title: "Moderation Error",
          description: "Failed to moderate content. Please try again.",
          variant: "destructive"
        })
        return null
      }

      if (!data.success) {
        console.error('AI moderation failed:', data.error)
        toast({
          title: "Moderation Failed",
          description: data.error || "Content moderation failed",
          variant: "destructive"
        })
        return null
      }

      const result: ModerationResult = {
        mod_status: data.mod_status,
        score: data.score,
        reason: data.reason,
        flagged_categories: data.flagged_categories,
        category_scores: data.category_scores
      }

      // Add to history
      setModerationHistory(prev => [result, ...prev.slice(0, 9)]) // Keep last 10

      // Show appropriate toast based on result
      if (result.mod_status === 'clean') {
        toast({
          title: "Content Approved",
          description: "Your content passed moderation checks!",
          variant: "default"
        })
      } else if (result.mod_status === 'flagged') {
        toast({
          title: "Content Flagged",
          description: "Your content has been flagged for review.",
          variant: "destructive"
        })
      } else {
        toast({
          title: "Content Escalated",
          description: "Your content has been escalated for immediate review.",
          variant: "destructive"
        })
      }

      return result

    } catch (error) {
      console.error('Moderation error:', error)
      toast({
        title: "Moderation Error",
        description: "An unexpected error occurred during moderation.",
        variant: "destructive"
      })
      return null
    } finally {
      setIsModerating(false)
    }
  }, [toast])

  const clearHistory = useCallback(() => {
    setModerationHistory([])
  }, [])

  return {
    moderateContent,
    isModerating,
    moderationHistory,
    clearHistory
  }
} 