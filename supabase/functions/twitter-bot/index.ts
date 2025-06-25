
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface TweetableSubmission {
  id: string
  content: string
  category: string
  ai_reaction: string
  evidence_urls: string[] | null
  created_at: string
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

    // Get tweetable submissions
    const { data: submissions, error: fetchError } = await supabase.rpc('get_tweetable_submissions', {
      p_limit: 5
    })

    if (fetchError) {
      console.error('Failed to fetch tweetable submissions:', fetchError)
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to fetch submissions' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    if (!submissions || submissions.length === 0) {
      return new Response(
        JSON.stringify({ success: true, message: 'No submissions to tweet', tweeted: 0 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const results = []

    for (const submission of submissions as TweetableSubmission[]) {
      try {
        // Format tweet content
        const tweetText = formatTweetContent(submission)
        
        // Post to Twitter (mock for now - replace with actual Twitter API)
        const tweetId = await postToTwitter(tweetText, submission.evidence_urls)
        
        if (tweetId) {
          // Mark as tweeted
          const { error: markError } = await supabase.rpc('mark_submission_tweeted', {
            p_submission_id: submission.id,
            p_tweet_id: tweetId
          })

          if (markError) {
            console.error('Failed to mark submission as tweeted:', markError)
          }

          results.push({
            submissionId: submission.id,
            tweetId,
            success: true
          })
        }
      } catch (error) {
        console.error(`Failed to tweet submission ${submission.id}:`, error)
        results.push({
          submissionId: submission.id,
          success: false,
          error: error.message
        })
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        tweeted: results.filter(r => r.success).length,
        failed: results.filter(r => !r.success).length,
        results 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in twitter-bot:', error)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})

function formatTweetContent(submission: TweetableSubmission): string {
  const categoryEmojis = {
    'general': '☕',
    'tech': '⚡',
    'crypto': '₿',
    'defi': '🏦',
    'nft': '🖼️',
    'web3': '🌐',
    'entertainment': '🎭',
    'politics': '🗳️',
    'business': '💼'
  }

  const emoji = categoryEmojis[submission.category] || '🫖'
  const category = submission.category.charAt(0).toUpperCase() + submission.category.slice(1)
  
  // Truncate content to fit Twitter limits
  const maxContentLength = 150
  const truncatedContent = submission.content.length > maxContentLength 
    ? submission.content.substring(0, maxContentLength) + '...'
    : submission.content

  const tweetText = `${emoji} Tea spilled: **${category}**

"${submission.ai_reaction}"

${truncatedContent}

Read more 👇 cteanews.com/feed/${submission.id}

🌶️ #CryptoTea #Web3Drama`

  return tweetText
}

async function postToTwitter(tweetText: string, mediaUrls: string[] | null): Promise<string | null> {
  // Mock Twitter API call - replace with actual Twitter API v2
  console.log('Would tweet:', tweetText)
  if (mediaUrls && mediaUrls.length > 0) {
    console.log('With media:', mediaUrls)
  }
  
  // Return mock tweet ID
  return `tweet_${Date.now()}_${Math.random().toString(36).substring(7)}`
}
