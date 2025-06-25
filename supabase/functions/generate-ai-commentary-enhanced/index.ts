
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

    // Enhanced AI commentary generation using OpenAI or similar
    const aiPrompts = {
      spicy: `You are CTeaBot, a sassy crypto gossip AI. Roast this crypto tea with witty commentary: "${content}". Be spicy but not mean. Keep it under 200 chars.`,
      smart: `You are CTeaBot, an analytical crypto AI. Provide smart commentary on this crypto news: "${content}". Be insightful and factual. Keep it under 200 chars.`,
      memy: `You are CTeaBot, a crypto meme lord AI. React to this crypto tea with meme energy: "${content}". Use crypto Twitter slang. Keep it under 200 chars.`,
      savage: `You are CTeaBot, a brutally honest crypto AI. Give savage but constructive commentary on: "${content}". Be direct and honest. Keep it under 200 chars.`
    }

    // Simulate AI response for now (replace with actual OpenAI call)
    const aiReaction = generateMockAIResponse(content, commentaryType)

    if (!aiReaction || aiReaction.trim().length === 0) {
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

    // Handle successful AI verification
    const { error: successError } = await supabase.rpc('handle_ai_verification_workflow', {
      p_submission_id: submissionId,
      p_ai_reaction: aiReaction
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
        commentary: aiReaction,
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

function generateMockAIResponse(content: string, type: string): string {
  const responses = {
    spicy: [
      "🔥 This tea is SCALDING! Someone's about to get burned.",
      "☕ Piping hot take incoming! This is spicier than my morning brew.",
      "🌶️ SPICY! This drama is better than reality TV.",
      "🔥 Well well well... the plot thickens like oat milk.",
      "☕ This tea is so hot, it could power a mining rig!"
    ],
    smart: [
      "📊 Interesting market dynamics at play here. Worth monitoring.",
      "🧠 This aligns with current DeFi trends. Smart observation.",
      "📈 Technical analysis suggests this could be significant.",
      "🔍 Data points to potential market implications.",
      "📊 Fundamentally sound observation with merit."
    ],
    memy: [
      "💎🙌 THIS IS THE WAY! Diamond hands only!",
      "🚀 TO THE MOON! This is straight fire fam!",
      "🦍 APE TOGETHER STRONG! This is based and redpilled.",
      "📈 NUMBER GO UP! This is the alpha we needed!",
      "🔥 WAGMI! This tea hits different fr fr."
    ],
    savage: [
      "💀 Brutal but necessary. Someone had to say it.",
      "🎯 Straight facts, no printer. Respect the honesty.",
      "⚡ Raw truth served ice cold. Can't argue with that.",
      "💯 Savage but accurate. This needed to be called out.",
      "🔪 Cutting deep but fair. Truth hurts sometimes."
    ]
  }

  const typeResponses = responses[type] || responses.spicy
  return typeResponses[Math.floor(Math.random() * typeResponses.length)]
}
