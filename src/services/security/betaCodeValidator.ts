import { supabase } from '@/integrations/supabase/client';
import type { AuthValidationResult, BetaCodeValidationResponse } from './types';

// Type guard to check if response is valid beta code response
function isBetaCodeValidationResponse(data: any): data is BetaCodeValidationResponse {
  return data && typeof data === 'object' && typeof data.valid === 'boolean';
}

// Safe type conversion helper
function safeConvertToBetaCodeResponse(data: unknown): BetaCodeValidationResponse | null {
  if (isBetaCodeValidationResponse(data)) {
    return data;
  }
  return null;
}

export class BetaCodeValidator {
  public static async validateBetaCode(code: string): Promise<AuthValidationResult> {
    const threats: string[] = [];
    const recommendations: string[] = [];
    let securityScore = 100;
    let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';

    try {
      if (process.env.NODE_ENV === "development") {
        console.info('🔍 Starting beta code validation:', code.substring(0, 4) + '...');
      }
      
      // Basic format validation
      if (!code || code.length < 3) {
        threats.push('Beta code too short');
        securityScore -= 30;
        riskLevel = 'medium';
      }

      // Check for suspicious patterns
      if (/[<>'"&]/.test(code)) {
        threats.push('Beta code contains suspicious characters');
        securityScore -= 50;
        riskLevel = 'high';
      }

      // Rate limiting check (client-side preliminary)
      const lastAttempt = localStorage.getItem('ctea_last_beta_attempt');
      if (lastAttempt) {
        const timeSince = Date.now() - parseInt(lastAttempt);
        if (timeSince < 5000) { // 5 seconds
          threats.push('Beta code attempts too frequent');
          securityScore -= 20;
          riskLevel = 'medium';
        }
      }

      localStorage.setItem('ctea_last_beta_attempt', Date.now().toString());

      // Enhanced server-side validation with better error handling
      try {
        if (process.env.NODE_ENV === "development") {
          console.info('🌐 Calling Supabase RPC for beta code validation...');
        }
        const { data: result, error } = await supabase.rpc('validate_beta_code', {
          p_code: code.trim().toUpperCase()
        });

        if (error) {
          if (process.env.NODE_ENV === "development") {
            console.error('🚨 Supabase RPC error:', error);
          }
          threats.push('Server validation failed');
          securityScore -= 40;
          riskLevel = 'high';
          recommendations.push('Try the tea spill method instead');
        } else {
          if (process.env.NODE_ENV === "development") {
            console.info('📦 Server response:', result);
          }
          
          // Handle the response properly - check if it's the expected format
          if (!result) {
            console.warn('⚠️ Empty response from server');
            threats.push('Invalid server response');
            securityScore -= 30;
            riskLevel = 'medium';
            recommendations.push('Try other access methods');
          } else if (typeof result === 'object' && result !== null && 'valid' in result) {
            // New format response - safely convert the type
            const validationResult = safeConvertToBetaCodeResponse(result as unknown);
            if (validationResult && !validationResult.valid) {
              if (process.env.NODE_ENV === "development") {
                console.info('❌ Beta code marked as invalid by server');
              }
              threats.push('Invalid beta code');
              securityScore -= 30;
              riskLevel = 'medium';
              recommendations.push('Request a new beta code or try tea spilling');
            } else if (validationResult) {
              if (process.env.NODE_ENV === "development") {
                console.info('✅ Beta code validated successfully');
              }
            } else {
              console.warn('⚠️ Could not parse server response');
              threats.push('Server response format error');
              securityScore -= 20;
              riskLevel = 'medium';
            }
          } else if (typeof result === 'boolean') {
            // Simple boolean response
            if (!result) {
              if (process.env.NODE_ENV === "development") {
                console.info('❌ Beta code validation returned false');
              }
              threats.push('Invalid beta code');
              securityScore -= 30;
              riskLevel = 'medium';
              recommendations.push('Try other access methods');
            } else {
              if (process.env.NODE_ENV === "development") {
                console.info('✅ Beta code validated successfully (boolean)');
              }
            }
          } else {
            console.warn('⚠️ Unexpected response format:', typeof result, result);
            threats.push('Unexpected server response format');
            securityScore -= 20;
            riskLevel = 'medium';
          }
        }
      } catch (rpcError: any) {
        if (process.env.NODE_ENV === "development") {
          console.error('🚨 RPC call failed:', rpcError);
        }
        threats.push('Network validation failed');
        securityScore -= 30;
        riskLevel = 'high';
        recommendations.push('Check connection and try again');
      }

      const isValid = threats.length === 0 && securityScore >= 70;
      
      if (process.env.NODE_ENV === "development") {
        console.info('📊 Beta code validation result:', {
          isValid,
          securityScore,
          threats,
          riskLevel
        });
      }

      return {
        isValid,
        securityScore,
        threats,
        recommendations,
        riskLevel
      };
    } catch (error: any) {
      if (process.env.NODE_ENV === "development") {
        console.error('💥 Beta code validation error:', error);
      }
      return {
        isValid: false,
        securityScore: 0,
        threats: ['Validation system error: ' + error.message],
        recommendations: ['Try again later or use tea spill access'],
        riskLevel: 'critical'
      };
    }
  }
}
