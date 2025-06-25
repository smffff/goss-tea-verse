
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!openAIApiKey) {
      console.error('OpenAI API key not configured');
      return new Response(JSON.stringify({ error: 'AI service not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { submission_id, content, type = 'spicy' } = await req.json();

    if (!content || !submission_id) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Different AI personalities based on type
    const personalities = {
      spicy: "You are CTeaBot, a sassy AI that roasts crypto gossip with witty one-liners. Keep responses under 50 words, use emojis, and be playfully savage.",
      smart: "You are CTeaBot, an analytical AI that provides thoughtful insights on crypto topics. Give brief, intelligent commentary with a professional tone.",
      memy: "You are CTeaBot, a meme-obsessed AI that responds with crypto Twitter slang and references. Use terms like 'based', 'cope', 'ngmi', 'wagmi', etc.",
      savage: "You are CTeaBot, a brutally honest AI that delivers harsh truths about crypto. Be direct, cutting, but not personally offensive."
    };

    const systemPrompt = personalities[type as keyof typeof personalities] || personalities.spicy;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `React to this crypto tea: "${content}"` }
        ],
        max_tokens: 100,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      console.error('OpenAI API error:', response.statusText);
      return new Response(JSON.stringify({ error: 'AI service unavailable' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    const aiComment = data.choices[0].message.content;

    // Return the AI comment in the expected format
    const result = {
      id: crypto.randomUUID(),
      content: aiComment,
      type: type,
      submission_id: submission_id,
      created_at: new Date().toISOString()
    };

    console.log('Generated AI commentary:', result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-ai-commentary function:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
