
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AuthEmailRequest {
  email: string;
  type: 'signup' | 'login' | 'recovery';
  confirmation_url?: string;
  recovery_url?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, type, confirmation_url, recovery_url }: AuthEmailRequest = await req.json();

    let subject = "";
    let html = "";

    switch (type) {
      case 'signup':
      case 'login':
        subject = "Welcome to CTea News! ☕ Confirm Your Email";
        html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #FF2052, #FFD93D, #A67CFF); padding: 2px; border-radius: 12px;">
            <div style="background: white; padding: 40px; border-radius: 10px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #FF2052; font-size: 28px; margin: 0;">CTea News ☕</h1>
                <p style="color: #666; font-size: 16px; margin: 10px 0;">The Ultimate Crypto Gossip Platform</p>
              </div>
              
              <h2 style="color: #333; font-size: 24px; margin-bottom: 20px;">
                ${type === 'signup' ? 'Welcome to the Newsroom!' : 'Welcome Back, Tea Spiller!'}
              </h2>
              
              <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                ${type === 'signup' 
                  ? 'Thanks for joining CTea News! Click the button below to confirm your email and start spilling the tea on crypto drama.' 
                  : 'Ready to dive back into the latest crypto gossip? Click below to confirm your login.'}
              </p>
              
              <div style="text-align: center; margin: 40px 0;">
                <a href="${confirmation_url}" style="background: linear-gradient(135deg, #FF2052, #FFD93D); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">
                  ${type === 'signup' ? 'Confirm Email & Join' : 'Confirm Login'}
                </a>
              </div>
              
              <p style="color: #999; font-size: 14px; text-align: center; margin-top: 30px;">
                If you didn't request this, you can safely ignore this email.
              </p>
              
              <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #666; font-size: 12px; margin: 0;">
                  CTea News - Where Crypto Drama Gets Served Hot ☕
                </p>
              </div>
            </div>
          </div>
        `;
        break;
        
      case 'recovery':
        subject = "Reset Your CTea News Password ☕";
        html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #FF2052, #FFD93D, #A67CFF); padding: 2px; border-radius: 12px;">
            <div style="background: white; padding: 40px; border-radius: 10px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #FF2052; font-size: 28px; margin: 0;">CTea News ☕</h1>
                <p style="color: #666; font-size: 16px; margin: 10px 0;">Password Reset</p>
              </div>
              
              <h2 style="color: #333; font-size: 24px; margin-bottom: 20px;">Reset Your Password</h2>
              
              <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                Someone requested a password reset for your CTea News account. Click the button below to set a new password.
              </p>
              
              <div style="text-align: center; margin: 40px 0;">
                <a href="${recovery_url}" style="background: linear-gradient(135deg, #FF2052, #A67CFF); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">
                  Reset Password
                </a>
              </div>
              
              <p style="color: #999; font-size: 14px; text-align: center; margin-top: 30px;">
                If you didn't request this password reset, you can safely ignore this email.
              </p>
            </div>
          </div>
        `;
        break;
    }

    const emailResponse = await resend.emails.send({
      from: "CTea News <noreply@cteanews.com>",
      to: [email],
      subject: subject,
      html: html,
    });

    return new Response(JSON.stringify({ success: true, id: emailResponse.data?.id }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error: any) {
    console.error("Error sending auth email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
