import { supabase } from '@/integrations/supabase/client';
import { secureLog, sanitizeForLogging } from '@/utils/securityUtils';

export interface ContentValidationResult {
  valid: boolean;
  sanitized: string;
  threats: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  securityScore: number;
}

export class ContentValidationService {
  public static async validateContent(content: string, maxLength: number = 1000): Promise<ContentValidationResult> {
    try {
      // Basic validation
      if (!content || content.trim().length === 0) {
        return {
          valid: false,
          sanitized: '',
          threats: ['Empty content'],
          riskLevel: 'low',
          securityScore: 0
        };
      }

      if (content.length > maxLength) {
        return {
          valid: false,
          sanitized: content.substring(0, maxLength),
          threats: [`Content exceeds maximum length of ${maxLength} characters`],
          riskLevel: 'medium',
          securityScore: 30
        };
      }

      // Sanitize content
      const sanitized = this.sanitizeContent(content);
      
      // Check for threats
      const threats = this.detectThreats(sanitized);
      const riskLevel = this.calculateRiskLevel(threats);
      const securityScore = this.calculateSecurityScore(threats, sanitized.length);

      // AI moderation if available
      try {
        const { data: moderationResult, error: contentError } = await supabase.functions.invoke('ai_moderate_spill', {
          body: { content: sanitized }
        });

        if (contentError) {
          secureLog.error('Content validation error:', contentError);
          // Continue with basic validation if AI moderation fails
        } else if (moderationResult && moderationResult.approved === false) {
          threats.push('AI moderation flagged content as inappropriate');
          return {
            valid: false,
            sanitized,
            threats,
            riskLevel: 'high',
            securityScore: Math.max(0, securityScore - 40)
          };
        }
      } catch (error) {
        secureLog.error('Content validation service error:', error);
        // Continue with basic validation if AI moderation fails
      }

      return {
        valid: threats.length === 0,
        sanitized,
        threats,
        riskLevel,
        securityScore
      };
    } catch (error) {
      secureLog.error('Content validation error:', error);
      
      // Fallback validation
      return {
        valid: content.trim().length > 0 && content.length <= maxLength,
        sanitized: this.sanitizeContent(content),
        threats: ['Validation service unavailable'],
        riskLevel: 'medium',
        securityScore: 50
      };
    }
  }

  private static sanitizeContent(content: string): string {
    return content
      .trim()
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .replace(/data:text\/html/gi, '')
      .replace(/vbscript:/gi, '')
      .replace(/expression\s*\(/gi, '')
      .replace(/eval\s*\(/gi, '')
      .replace(/document\./gi, '')
      .replace(/window\./gi, '')
      .replace(/location\./gi, '')
      .replace(/history\./gi, '')
      .replace(/navigator\./gi, '')
      .replace(/screen\./gi, '')
      .replace(/alert\s*\(/gi, '')
      .replace(/confirm\s*\(/gi, '')
      .replace(/prompt\s*\(/gi, '')
      .replace(/console\./gi, '')
      .replace(/debugger/gi, '')
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/\s+/g, ' ')
      .substring(0, 1000);
  }

  private static detectThreats(content: string): string[] {
    const threats: string[] = [];
    
    // XSS patterns
    const xssPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /data:text\/html/i,
      /vbscript:/i,
      /expression\s*\(/i,
      /eval\s*\(/i
    ];

    xssPatterns.forEach(pattern => {
      if (pattern.test(content)) {
        threats.push('Potential XSS attack detected');
      }
    });

    // SQL injection patterns
    const sqlPatterns = [
      /union\s+select/i,
      /drop\s+table/i,
      /delete\s+from/i,
      /insert\s+into/i,
      /update\s+set/i,
      /alter\s+table/i,
      /exec\s*\(/i,
      /execute\s*\(/i
    ];

    sqlPatterns.forEach(pattern => {
      if (pattern.test(content)) {
        threats.push('Potential SQL injection detected');
      }
    });

    // Suspicious URLs
    const suspiciousUrls = [
      /https?:\/\/[^\s]*\.(exe|bat|cmd|com|pif|scr|vbs|js)/i,
      /file:\/\//i,
      /ftp:\/\//i,
      /gopher:\/\//i
    ];

    suspiciousUrls.forEach(pattern => {
      if (pattern.test(content)) {
        threats.push('Suspicious URL detected');
      }
    });

    // Excessive repetition (spam detection)
    const words = content.toLowerCase().split(/\s+/);
    const wordCounts: { [key: string]: number } = {};
    
    words.forEach(word => {
      if (word.length > 3) {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      }
    });

    const maxRepetition = Math.max(...Object.values(wordCounts));
    if (maxRepetition > 10) {
      threats.push('Excessive word repetition detected');
    }

    return threats;
  }

  private static calculateRiskLevel(threats: string[]): 'low' | 'medium' | 'high' | 'critical' {
    const criticalThreats = threats.filter(t => 
      t.includes('XSS') || t.includes('SQL injection') || t.includes('attack')
    ).length;
    
    const highThreats = threats.filter(t => 
      t.includes('suspicious') || t.includes('inappropriate')
    ).length;

    if (criticalThreats > 0) return 'critical';
    if (highThreats > 0) return 'high';
    if (threats.length > 0) return 'medium';
    return 'low';
  }

  private static calculateSecurityScore(threats: string[], contentLength: number): number {
    let score = 100;
    
    // Deduct points for threats
    threats.forEach(threat => {
      if (threat.includes('XSS') || threat.includes('SQL injection')) {
        score -= 50;
      } else if (threat.includes('suspicious')) {
        score -= 30;
      } else {
        score -= 10;
      }
    });

    // Deduct points for very long content
    if (contentLength > 500) {
      score -= Math.floor((contentLength - 500) / 100) * 5;
    }

    return Math.max(0, score);
  }

  // Store error reports for deployment fixes (development only)
  private static storeErrorReport(error: any, context: string) {
    if (process.env.NODE_ENV === 'development') {
      try {
        const errorReport = {
          timestamp: new Date().toISOString(),
          context,
          error: sanitizeForLogging(error),
          url: window.location.href
        };

        const existingReports = JSON.parse(localStorage.getItem('ctea_error_reports') || '[]');
        existingReports.push(errorReport);
        localStorage.setItem('ctea_error_reports', JSON.stringify(existingReports.slice(-20)));

        secureLog.info('🫖 CTea Error Report stored for deployment fix:', errorReport);
      } catch (reportError) {
        secureLog.error('Failed to store error report:', reportError);
      }
    }
  }
}
