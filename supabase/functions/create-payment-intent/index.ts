import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@12.0.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
  apiVersion: '2023-10-16',
})

const supabaseClient = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_ANON_KEY') ?? ''
)

interface PaymentIntentRequest {
  amount: number;
  submissionId: string;
  boostTier: {
    amount: number;
    cost: number;
    label: string;
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { amount, submissionId, boostTier } = await req.json() as PaymentIntentRequest;

    if (!amount || !submissionId || !boostTier) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${boostTier.label} - CTea Boost`,
              description: `Boost your submission with +${boostTier.amount} visibility points`,
              images: ['https://ctea-newsroom.com/ctea-logo-icon.png'],
            },
            unit_amount: Math.round(boostTier.cost * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/feed?boost_success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/feed?boost_cancelled=true`,
      metadata: {
        submissionId: submissionId,
        boostAmount: boostTier.amount.toString(),
        boostTier: boostTier.label,
      },
    });

    // Log the payment intent creation
    await supabaseClient
      .from('payment_intents')
      .insert({
        stripe_session_id: session.id,
        submission_id: submissionId,
        amount: boostTier.cost,
        boost_amount: boostTier.amount,
        status: 'pending',
        metadata: {
          boostTier: boostTier.label,
          user_agent: req.headers.get('user-agent'),
          ip_address: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip'),
        }
      });

    return new Response(JSON.stringify({ 
      sessionId: session.id,
      success: true 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}); 