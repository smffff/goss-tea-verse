import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ModerationRequest {
  content: string
  spill_id: string
  user_id?: string
  wallet_address?: string
}

interface ModerationResult {
  mod_status: "clean" | "flagged" | "escalated"
  score: number
  reason: string
  flagged_categories?: string[]
  category_scores?: Record<string, number>
}

interface OpenAIModerationResponse {
  id: string
  model: string
  results: Array<{
    flagged: boolean
    categories: Record<string, boolean>
    category_scores: Record<string, number>
  }>
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

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openAIApiKey) {
      console.error('OpenAI API key not configured')
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'AI moderation not configured',
          mod_status: 'escalated',
          score: 1.0,
          reason: 'AI moderation system unavailable'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    const { content, spill_id, user_id, wallet_address }: ModerationRequest = await req.json()

    if (!content || !spill_id) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Missing required fields: content and spill_id',
          mod_status: 'escalated',
          score: 1.0,
          reason: 'Invalid request parameters'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    console.log(`Processing AI moderation for spill ${spill_id}`)

    // Step 1: Check content with OpenAI Moderation API
    const moderationResponse = await fetch('https://api.openai.com/v1/moderations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: content
      }),
    })

    if (!moderationResponse.ok) {
      throw new Error(`Moderation API failed: ${moderationResponse.statusText}`)
    }

    const moderationData: OpenAIModerationResponse = await moderationResponse.json()
    const moderation = moderationData.results[0]

    console.log(`Moderation result for ${spill_id}:`, {
      flagged: moderation.flagged,
      categories: Object.entries(moderation.categories).filter(([_, flagged]) => flagged)
    })

    // Step 2: Determine moderation status and score
    let mod_status: "clean" | "flagged" | "escalated" = "clean"
    let reason = "Content passed moderation checks"
    let score = 0.0

    if (moderation.flagged) {
      const flaggedCategories = Object.entries(moderation.categories)
        .filter(([_, flagged]) => flagged)
        .map(([category, _]) => category)

      // Calculate overall risk score
      const categoryScores = Object.values(moderation.category_scores)
      score = Math.max(...categoryScores)

      // Determine severity
      if (score >= 0.8 || flaggedCategories.some(cat => 
        ['hate/threatening', 'harassment/threatening', 'self-harm/intent', 'sexual/minors', 'violence/graphic'].includes(cat)
      )) {
        mod_status = "escalated"
        reason = `Content flagged for severe violations: ${flaggedCategories.join(', ')}`
      } else {
        mod_status = "flagged"
        reason = `Content flagged for review: ${flaggedCategories.join(', ')}`
      }
    }

    // Step 3: Log moderation result
    const { error: logError } = await supabase
      .from('moderation_log')
      .insert({
        spill_id,
        user_id,
        wallet_address,
        status: mod_status,
        score,
        reason,
        flagged_categories: moderation.flagged ? Object.keys(moderation.categories).filter(k => moderation.categories[k]) : null,
        category_scores: moderation.category_scores,
        ai_model: moderationData.model,
        created_at: new Date().toISOString()
      })

    if (logError) {
      console.error('Failed to log moderation result:', logError)
    }

    // Step 4: Update spill status if flagged/escalated
    if (mod_status !== "clean") {
      const { error: updateError } = await supabase
        .from('tea_submissions')
        .update({ 
          status: mod_status === "escalated" ? "escalated" : "flagged",
          moderation_score: score,
          moderation_reason: reason,
          updated_at: new Date().toISOString()
        })
        .eq('id', spill_id)

      if (updateError) {
        console.error('Failed to update spill status:', updateError)
      }
    }

    console.log(`Successfully processed moderation for spill ${spill_id}: ${mod_status}`)

    return new Response(
      JSON.stringify({ 
        success: true, 
        mod_status,
        score,
        reason,
        flagged_categories: moderation.flagged ? Object.keys(moderation.categories).filter(k => moderation.categories[k]) : [],
        category_scores: moderation.category_scores,
        spill_id
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in ai_moderate_spill:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        mod_status: 'escalated',
        score: 1.0,
        reason: 'Moderation system error'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
}) 