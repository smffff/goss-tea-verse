
import DOMPurify from 'dompurify';

export interface EnhancedValidationResult {
  valid: boolean;
  sanitized: string;
  threats: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  securityScore: number;
  blocked: boolean;
}

export class EnhancedContentValidationService {
  private static readonly XSS_PATTERNS = [
    /<script[^>]*>.*?<\/script>/gi,
    /javascript:/gi,
    /data:text\/html/gi,
    /vbscript:/gi,
    /on\w+\s*=/gi,
    /<iframe[^>]*>/gi,
    /<object[^>]*>/gi,
    /<embed[^>]*>/gi,
    /<link[^>]*>/gi,
    /<style[^>]*>/gi,
    /<meta[^>]*>/gi,
    /expression\s*\(/gi,
    /@import/gi,
    /<base[^>]*>/gi
  ];

  private static readonly SQL_PATTERNS = [
    /union\s+(all\s+)?select/gi,
    /drop\s+table/gi,
    /insert\s+into/gi,
    /delete\s+from/gi,
    /update\s+.*set/gi,
    /alter\s+table/gi,
    /create\s+table/gi,
    /--\s*$/gm,
    /\/\*.*?\*\//gs,
    /\b(exec|execute)\s*\(/gi,
    /xp_cmdshell/gi,
    /sp_executesql/gi
  ];

  public static validateContent(content: string): EnhancedValidationResult {
    try {
      if (!content || typeof content !== 'string') {
        return {
          valid: false,
          sanitized: '',
          threats: ['Empty or invalid content'],
          riskLevel: 'low',
          securityScore: 0,
          blocked: true
        };
      }

      const threats: string[] = [];
      let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';
      let securityScore = 100;

      // Check for XSS patterns
      for (const pattern of this.XSS_PATTERNS) {
        if (pattern.test(content)) {
          threats.push('XSS attempt detected');
          riskLevel = 'critical';
          securityScore = 0;
          break;
        }
      }

      // Check for SQL injection patterns
      if (riskLevel !== 'critical') {
        for (const pattern of this.SQL_PATTERNS) {
          if (pattern.test(content)) {
            threats.push('SQL injection attempt detected');
            riskLevel = 'high';
            securityScore = Math.min(securityScore, 20);
            break;
          }
        }
      }

      // Content length check
      if (content.length > 10000) {
        threats.push('Content too long');
        if (riskLevel === 'low') riskLevel = 'medium';
        securityScore -= 20;
      }

      // Sanitize content using DOMPurify
      let sanitized: string;
      try {
        sanitized = DOMPurify.sanitize(content, { 
          ALLOWED_TAGS: [],
          ALLOWED_ATTR: [],
          KEEP_CONTENT: true
        });
      } catch (error) {
        // Fallback sanitization
        sanitized = content
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#x27;')
          .replace(/\//g, '&#x2F;');
      }

      const blocked = riskLevel === 'critical' || securityScore === 0;
      const valid = threats.length === 0 && !blocked;

      return {
        valid,
        sanitized,
        threats,
        riskLevel,
        securityScore,
        blocked
      };
    } catch (error) {
      console.error('Content validation error:', error);
      return {
        valid: false,
        sanitized: '',
        threats: ['Validation system error'],
        riskLevel: 'critical',
        securityScore: 0,
        blocked: true
      };
    }
  }
}
