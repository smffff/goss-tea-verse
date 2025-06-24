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
  commentaryType?: 'spicy' | 'smart' | 'memy' | 'savage';
  isComment?: boolean;
  chatRoomId?: string; 
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content, category, submissionId, commentaryType = 'spicy', isComment = false, chatRoomId } = await req.json() as AICommentaryRequest;

    if (!content || !submissionId) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let commentary = '';
    const aiToken = 'ai-commentary-bot';

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
      // Generate AI commentary for a new submission with specific type
      commentary = generateAICommentary(content, category, commentaryType);
    }

    return new Response(JSON.stringify({ 
      commentary, 
      type: commentaryType,
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

// Function to generate AI commentary for submissions with specific types
function generateAICommentary(content: string, category: string, type: 'spicy' | 'smart' | 'memy' | 'savage'): string {
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
        `🌶️ OKAY this is absolutely UNHINGED behavior and honestly? We're here for it. The audacity, the drama, the sheer chaos energy... *chef's kiss* 💀 This is why we can't have nice things in crypto, and that's exactly what makes it spicy!`,
        `🔥 I'm sorry but this is SENDING ME. The messiness here is exactly what CT needed today. The absolute shamelessness is giving pure entertainment value. This right here? This is premium content.`,
        `☕ Not me watching this drama unfold while eating popcorn 🍿 The crypto space truly never sleeps and neither does the chaos. This tea is SCALDING and I am absolutely living for every second of it.`,
        `💀 The way ${names || 'they'} just casually dropped this bomb like it's nothing... CT is never boring and this proves it. Screenshotting this for the history books! The audacity is unmatched.`
      ][Math.floor(Math.random() * 4)];
      break;

    case 'smart':
      commentary = [
        `🧠 If we analyze this objectively, what we're witnessing is a fascinating intersection of game theory and social capital dynamics that perfectly encapsulates the volatile nature of ${topics.length ? topics[0] : 'crypto'} communities. The behavioral patterns here are textbook.`,
        `📊 This actually exposes a fundamental misalignment of incentives in the ${topics.length ? topics[0] : 'web3'} ecosystem. When you follow the money and map the stakeholder relationships, the systemic implications become quite concerning for long-term sustainability.`,
        `⚡ From a macro perspective, this is actually quite predictable given the current market conditions and regulatory uncertainty. What's interesting is how these patterns consistently emerge when liquidity shifts suddenly - it's almost algorithmic.`,
        `🎯 This is big brain stuff if you think about it. The meta implications here speak volumes about governance structures in decentralized systems. The second and third-order effects of this will ripple through the ecosystem for months.`
      ][Math.floor(Math.random() * 4)];
      break;

    case 'memy':
      commentary = [
        `😂 *whispers* "and then they rug pulled anyway" 💀 Nobody: Absolutely nobody: CT: "Let's create ANOTHER pointless drama that somehow makes perfect sense in this timeline"`,
        `🍿 POV: You just woke up and this is the first thing you see on CT. Me: *frantically makes popcorn while questioning all life choices* This is why we can't have nice things but also why we absolutely NEED these things.`,
        `🎮 The simulation devs are getting lazy with these storylines tbh. Next patch needs better character development but the plot twists are *chef's kiss* and the memes write themselves. 10/10 would chaos again.`,
        `🤝 Web3 🤝 Drama. Name a more iconic duo, I'll wait. (Spoiler: you can't because this is the most entertaining dumpster fire and we're all here for it) 😂 Peak internet right here folks.`
      ][Math.floor(Math.random() * 4)];
      break;

    case 'savage':
      commentary = [
        `💀 Respectfully... this is the most clown behavior I've seen all week, and that's saying something given the usual circus on CT. The secondhand embarrassment is real and I'm concerned for humanity. ☠️`,
        `🗿 Not the hero we deserved, but definitely the chaos we needed 💀 Peak CT energy right here. This is exactly why normies think we're all insane and honestly? They're not wrong. The confidence is unmatched though.`,
        `🔥 Someone check if Mercury is in retrograde because this level of unhinged behavior needs an astrological explanation. The bar was on the floor and they brought a shovel. The disrespect to common sense is astronomical.`,
        `⚰️ This is what happens when exit liquidity thinks they're the main character. The confidence is admirable but misplaced. Babe, wake up, new CT villain just dropped and they chose violence against logic itself.`
      ][Math.floor(Math.random() * 4)];
      break;

    default:
      commentary = "🫖 Hot take: this is exactly the kind of drama that makes crypto Twitter worth enduring. Spicy, messy, and completely on brand. 💯";
  }

  // Add category-specific flavoring
  if (category === 'gossip') {
    commentary += " The gossip game is strong with this one! 🗣️";
  } else if (category === 'drama') {
    commentary += " The drama is giving Oscar-worthy performance. Standing ovation! 👏";
  } else if (category === 'exposed') {
    commentary += " The receipts don't lie. Screenshots are forever on the blockchain of life. 📸";
  } else if (category === 'memes') {
    commentary += " This meme energy is exactly what the timeline needed today! 🔥";
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
