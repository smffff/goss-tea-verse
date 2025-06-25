import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@12.0.0'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
  apiVersion: '2023-10-16',
})

const supabaseClient = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

const endpointSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') ?? '';

serve(async (req) => {
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return new Response('No signature', { status: 400 });
  }

  try {
    const body = await req.text();
    const event = stripe.webhooks.constructEvent(body, signature, endpointSecret);

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleSuccessfulPayment(session);
        break;
      }
      
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('Payment succeeded:', paymentIntent.id);
        break;
      }
      
      case 'payment_intent.payment_failed': {
        const failedPayment = event.data.object as Stripe.PaymentIntent;
        console.log('Payment failed:', failedPayment.id);
        break;
      }
      
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (err) {
    console.error('Webhook error:', err);
    return new Response(
      `Webhook Error: ${err.message}`,
      { status: 400 }
    );
  }
});

async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  try {
    const { submissionId, boostAmount, boostTier } = session.metadata || {};
    
    if (!submissionId || !boostAmount) {
      console.error('Missing metadata in session:', session.id);
      return;
    }

    // Update payment intent status
    await supabaseClient
      .from('payment_intents')
      .update({ 
        status: 'completed',
        completed_at: new Date().toISOString(),
        stripe_payment_intent_id: session.payment_intent as string
      })
      .eq('stripe_session_id', session.id);

    // Apply boost to submission
    const { data: submission, error: submissionError } = await supabaseClient
      .from('tea_submissions')
      .select('boost_score')
      .eq('id', submissionId)
      .single();

    if (submissionError) {
      console.error('Error fetching submission:', submissionError);
      return;
    }

    const newBoostScore = (submission.boost_score || 0) + parseInt(boostAmount);

    await supabaseClient
      .from('tea_submissions')
      .update({ 
        boost_score: newBoostScore,
        updated_at: new Date().toISOString()
      })
      .eq('id', submissionId);

    // Create boost transaction record
    await supabaseClient
      .from('boost_transactions')
      .insert({
        submission_id: submissionId,
        stripe_session_id: session.id,
        amount_paid: session.amount_total ? session.amount_total / 100 : 0,
        boost_amount: parseInt(boostAmount),
        boost_tier: boostTier,
        status: 'completed',
        payment_method: 'stripe',
        metadata: {
          customer_email: session.customer_details?.email,
          customer_name: session.customer_details?.name,
          currency: session.currency,
        }
      });

    console.log(`Boost applied successfully: +${boostAmount} to submission ${submissionId}`);

  } catch (error) {
    console.error('Error handling successful payment:', error);
  }
} 