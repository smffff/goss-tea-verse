
import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const client = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Execute simplified security hardening
    const { error } = await client.rpc("run_simplified_security_hardening");

    if (error) {
      console.error('Security hardening failed:', error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: error.message,
          timestamp: new Date().toISOString()
        }), 
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Log successful hardening
    await client.from('admin_audit_log').insert({
      admin_email: 'system',
      action: 'security_hardening_v2_executed',
      details: {
        version: '2.0',
        timestamp: new Date().toISOString(),
        beta_launch: '1.2'
      },
      ip_address: 'edge-function',
      user_agent: 'security-hardening-v2'
    });

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Beta 1.2 security hardening completed successfully',
        version: '2.0',
        timestamp: new Date().toISOString()
      }), 
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Internal server error',
        timestamp: new Date().toISOString()
      }), 
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
