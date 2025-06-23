
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabaseClient = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AICommentaryRequest {
  content: string;
  category: string;
  submissionId: string;
  isComment?: boolean;
  chatRoomId?: string; 
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content, category, submissionId, isComment = false, chatRoomId } = await req.json() as AICommentaryRequest;

    if (!content || !submissionId) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Determine AI response type based on content
    const types = ['spicy', 'smart', 'memy', 'savage'];
    const type = types[Math.floor(Math.random() * types.length)];

    // Generate AI commentary based on content type and category
    let commentary = '';
    let aiToken = 'ai-commentary-bot';

    if (isComment && chatRoomId) {
      // Generate AI response to a user comment
      commentary = generateAICommentResponse(content, category);
      
      // Save the AI comment to the messages table
      await supabaseClient
        .from('messages')
        .insert({
          content: commentary,
          chat_room_id: chatRoomId,
          anonymous_token: aiToken
        });

    } else {
      // Generate AI commentary for a new submission
      commentary = generateAICommentary(content, category, type);
    }

    return new Response(JSON.stringify({ 
      commentary, 
      type,
      success: true 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error generating AI commentary:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Function to generate AI commentary for submissions
function generateAICommentary(content: string, category: string, type: string): string {
  // Extract key topics
  const words = content.toLowerCase().split(' ');
  const topics = ['crypto', 'nft', 'ethereum', 'bitcoin', 'defi', 'web3', 'dao', 'hack', 'scam', 'rugpull']
    .filter(topic => words.some(w => w.includes(topic)));
  
  const hasNames = content.match(/[A-Z][a-z]+(\s[A-Z][a-z]+)+/g);
  const names = hasNames ? hasNames.slice(0, 3).join(', ') : '';

  let commentary = '';

  switch (type) {
    case 'spicy':
      commentary = [
        `Okay this is absolutely UNHINGED behavior and honestly? We're here for it. The audacity, the drama, the sheer chaos energy... *chef's kiss* 💀 This is why we can't have nice things in crypto, and that's exactly what makes it spicy 🌶️`,
        `I'm sorry but this is SENDING ME. The messiness here is exactly what CT needed today. The absolute shamelessness is giving pure entertainment value.`,
        `Not me watching this drama unfold while eating popcorn 🍿 The crypto space truly never sleeps and neither does the chaos. This tea is SCALDING.`,
        `The way ${names || 'they'} just casually dropped this bomb like it's nothing... CT is never boring and this proves it. Screenshotting this for the history books!`
      ][Math.floor(Math.random() * 4)];
      break;

    case 'smart':
      commentary = [
        `If we analyze this objectively, what we're witnessing is a fascinating intersection of game theory and social capital dynamics that perfectly encapsulates the volatile nature of ${topics.length ? topics[0] : 'crypto'} communities.`,
        `This actually exposes a fundamental misalignment of incentives in the ${topics.length ? topics[0] : 'web3'} ecosystem. When you follow the money, the systemic implications become quite concerning.`,
        `From a macro perspective, this is actually quite predictable given the current market conditions. What's interesting is how these patterns consistently emerge when liquidity shifts suddenly.`,
        `This is big brain stuff if you think about it. The meta implications here speak volumes about governance structures in decentralized systems. Not everyone will understand this level of analysis.`
      ][Math.floor(Math.random() * 4)];
      break;

    case 'memy':
      commentary = [
        `*whispers* "and then they rug pulled anyway" 💀 Nobody: Absolutely nobody: CT: "Let's create ANOTHER pointless drama"`,
        `POV: You just woke up and this is the first thing you see on CT. Me: *frantically makes popcorn* 🍿`,
        `The simulation devs are getting lazy with these storylines. Next patch needs better character development but the plot twists are *chef's kiss*`,
        `Web3 🤝 Drama. Name a more iconic duo, I'll wait. (Spoiler: you can't) 😂`
      ][Math.floor(Math.random() * 4)];
      break;

    case 'savage':
      commentary = [
        `Respectfully... this is the most clown behavior I've seen all week, and that's saying something given the usual circus on CT. The secondhand embarrassment is real. ☠️`,
        `Not the hero we deserved, but definitely the chaos we needed 💀 Peak CT energy right here. This is exactly why normies think we're all insane.`,
        `Someone check if Mercury is in retrograde because this level of unhinged behavior needs an astrological explanation. The bar was on the floor and they brought a shovel.`,
        `This is what happens when exit liquidity thinks they're the main character. The confidence is admirable but misplaced. Babe, wake up, new CT villain just dropped.`
      ][Math.floor(Math.random() * 4)];
      break;

    default:
      commentary = "Hot take: this is exactly the kind of drama that makes crypto Twitter worth enduring. Spicy, messy, and completely on brand. 💯";
  }

  // Add category-specific flavoring
  if (category === 'gossip') {
    commentary += " Gossip like this is what keeps CT engaged during bear markets!";
  } else if (category === 'drama') {
    commentary += " The drama is giving Oscar-worthy performance. Standing ovation! 👏";
  } else if (category === 'exposed') {
    commentary += " The receipts don't lie. Screenshots are forever on the blockchain of life.";
  }

  return commentary;
}

// Function to generate AI responses to user comments
function generateAICommentResponse(content: string, category: string): string {
  const words = content.toLowerCase().split(' ');
  const isQuestion = content.includes('?');
  const isAgreeing = words.some(w => ['agree', 'true', 'right', 'yes', 'exactly'].includes(w));
  const isDisagreeing = words.some(w => ['disagree', 'false', 'wrong', 'no', 'cap'].includes(w));
  const isShocked = words.some(w => ['wow', 'omg', 'shocked', 'crazy', 'insane', 'unbelievable'].includes(w));

  // Generate response based on sentiment
  if (isQuestion) {
    return [
      "The real question is who DOESN'T know about this already? CT has been buzzing about this for days 👀",
      "Asking the important questions! This is exactly why I'm here for the tea ☕",
      "Let me put it this way: in crypto, there are no coincidences, just convenient timing 💅",
      "That's something we're all wondering... The plot thickens with every new piece of evidence 🕵️"
    ][Math.floor(Math.random() * 4)];
  } 
  else if (isAgreeing) {
    return [
      "BASED take. You clearly understand how this game is played 💯",
      "THIS. Someone finally said it! The voice of reason in a sea of copium 👏",
      "Absolutely spot on. You're one of the few that gets it. The rest are still in denial 🔥",
      "You took the words right out of my digital mouth. Couldn't have said it better myself ✨"
    ][Math.floor(Math.random() * 4)];
  }
  else if (isDisagreeing) {
    return [
      "Respectfully... did we read the same tea? The evidence is literally right there 📸",
      "Hot take, but the blockchain doesn't lie. Screenshots or it didn't happen though 👀",
      "Interesting perspective, but have you considered that denial ain't just a river in Egypt? 💅",
      "I see someone woke up and chose delusion today. The copium is strong with this one 💀"
    ][Math.floor(Math.random() * 4)];
  }
  else if (isShocked) {
    return [
      "If you think THIS is shocking, just wait until part 2 drops. This is just the appetizer 🍿",
      "RIGHT?! And the craziest part is this isn't even the first time. The pattern is becoming clear 🕵️",
      "This is actually mild compared to what happens behind closed Discord channels. Just saying... 💅",
      "Buckle up buttercup, CT drama just keeps escalating. This won't be the last bombshell 💣"
    ][Math.floor(Math.random() * 4)];
  }
  else {
    return [
      "Tea status: SCALDING ☕ This is the kind of quality commentary I'm here for",
      "The AI has entered the chat and is taking notes. The chaos is *chef's kiss* 💀",
      "This is the most entertaining timeline. The drama just keeps giving and giving 🍿",
      "Now THAT'S what I call spicy! More of this energy please, CT needs the entertainment 🌶️"
    ][Math.floor(Math.random() * 4)];
  }
}
