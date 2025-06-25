
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface AICommentaryRequest {
  content: string
  category: string
  submissionId: string
  commentaryType?: 'spicy' | 'smart' | 'memy' | 'savage'
}

interface AIRatingResponse {
  reaction: string
  spiciness: number
  chaos: number
  relevance: number
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { content, category, submissionId, commentaryType = 'spicy' }: AICommentaryRequest = await req.json()

    // Enhanced AI prompt for CTeaBot with rating system
    const aiPrompt = `You are CTeaBot, a sharp, emotionally intelligent AI gossip analyst for crypto tea.

You'll be given anonymous crypto gossip. React with:
1. A short, witty one-liner reaction (max 140 characters)
2. Three ratings from 1–10:
   🔥 Spiciness (how controversial/dramatic)
   😵‍💫 Chaos (how messy/confusing)  
   🎯 Relevance (how important to crypto community)

Format your response as valid JSON only:
{
  "reaction": "Your witty one-liner here",
  "spiciness": 7,
  "chaos": 5,
  "relevance": 8
}

Tea: """${content}"""

Category: ${category}`

    // Call OpenAI API (mock for now - replace with actual OpenAI call)
    const aiResponse = await generateAIRating(content, category, commentaryType)

    if (!aiResponse || !aiResponse.reaction || aiResponse.reaction.trim().length === 0) {
      // Handle AI verification failure
      const { error: failureError } = await supabase.rpc('handle_ai_verification_failure', {
        p_submission_id: submissionId,
        p_error_details: { error: 'Empty AI response generated' }
      })

      if (failureError) {
        console.error('Failed to handle AI verification failure:', failureError)
      }

      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'AI verification failed',
          addedToModeration: true 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500
        }
      )
    }

    // Handle successful AI verification with ratings
    const { error: successError } = await supabase.rpc('handle_ai_verification_workflow', {
      p_submission_id: submissionId,
      p_ai_reaction: aiResponse.reaction,
      p_spiciness: aiResponse.spiciness,
      p_chaos: aiResponse.chaos,
      p_relevance: aiResponse.relevance
    })

    if (successError) {
      console.error('Failed to handle AI verification success:', successError)
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to update submission' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500
        }
      )
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        commentary: aiResponse.reaction,
        ratings: {
          spiciness: aiResponse.spiciness,
          chaos: aiResponse.chaos,
          relevance: aiResponse.relevance
        },
        submissionId,
        visibilityUpdated: true
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in generate-ai-commentary-enhanced:', error)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})

async function generateAIRating(content: string, category: string, type: string): Promise<AIRatingResponse> {
  // Mock AI response with realistic ratings based on content analysis
  const reactions = [
    "🔥 This tea is SCALDING! Someone's about to get burned.",
    "☕ Piping hot take incoming! This is spicier than my morning brew.",
    "🌶️ SPICY! This drama is better than reality TV.",
    "🔥 Well well well... the plot thickens like oat milk.",
    "☕ This tea is so hot, it could power a mining rig!",
    "💀 Brutal but necessary. Someone had to say it.",
    "🎯 Straight facts, no printer. Respect the honesty.",
    "⚡ Raw truth served ice cold. Can't argue with that.",
    "💎🙌 THIS IS THE WAY! Diamond hands only!",
    "🚀 TO THE MOON! This is straight fire fam!"
  ]

  // Generate ratings based on content analysis
  const contentLength = content.length
  const hasControversialWords = /drama|scandal|dump|pump|scam|hack|exploit/i.test(content)
  const hasTechnicalTerms = /defi|nft|dao|blockchain|protocol|smart contract/i.test(content)
  
  let spiciness = Math.floor(Math.random() * 4) + 4 // 4-7 base
  let chaos = Math.floor(Math.random() * 4) + 3 // 3-6 base  
  let relevance = Math.floor(Math.random() * 4) + 5 // 5-8 base

  // Adjust based on content
  if (hasControversialWords) {
    spiciness += 2
    chaos += 2
  }
  if (hasTechnicalTerms) {
    relevance += 2
  }
  if (contentLength > 200) {
    chaos += 1
  }

  // Cap at 10
  spiciness = Math.min(10, spiciness)
  chaos = Math.min(10, chaos)
  relevance = Math.min(10, relevance)

  return {
    reaction: reactions[Math.floor(Math.random() * reactions.length)],
    spiciness,
    chaos,
    relevance
  }
}
