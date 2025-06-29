
import DOMPurify from 'dompurify';
import { secureLog } from '@/utils/secureLogging';

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
    /eval\s*\(/gi,
    /setTimeout\s*\(/gi,
    /setInterval\s*\(/gi
  ];

  private static readonly SQL_PATTERNS = [
    /union\s+(all\s+)?select/gi,
    /drop\s+table/gi,
    /insert\s+into/gi,
    /delete\s+from/gi,
    /update\s+.*set/gi,
    /alter\s+table/gi,
    /--|\/\*|\*\//gi
  ];

  public static validateContent(content: string, maxLength: number = 2000): EnhancedValidationResult {
    const threats: string[] = [];
    let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';
    let securityScore = 100;
    let blocked = false;

    // Basic validation
    if (!content || content.trim().length === 0) {
      return {
        valid: false,
        sanitized: '',
        threats: ['Content cannot be empty'],
        riskLevel: 'low',
        securityScore: 0,
        blocked: false
      };
    }

    if (content.length > maxLength) {
      threats.push(`Content exceeds maximum length of ${maxLength} characters`);
      securityScore -= 20;
      riskLevel = 'medium';
    }

    // XSS Detection
    for (const pattern of this.XSS_PATTERNS) {
      if (pattern.test(content)) {
        threats.push('XSS attack vector detected');
        riskLevel = 'critical';
        securityScore = 0;
        blocked = true;
        secureLog.warn('XSS attempt blocked', { pattern: pattern.source });
        break;
      }
    }

    // SQL Injection Detection
    if (!blocked) {
      for (const pattern of this.SQL_PATTERNS) {
        if (pattern.test(content)) {
          threats.push('SQL injection pattern detected');
          riskLevel = 'high';
          securityScore -= 50;
          blocked = true;
          secureLog.warn('SQL injection attempt blocked', { pattern: pattern.source });
          break;
        }
      }
    }

    // Sanitize content using DOMPurify
    const sanitized = DOMPurify.sanitize(content, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'u', 'br', 'p'],
      ALLOWED_ATTR: [],
      KEEP_CONTENT: true,
      RETURN_DOM_FRAGMENT: false,
      RETURN_DOM: false
    });

    // Additional sanitization for URLs and suspicious patterns
    const finalSanitized = sanitized
      .replace(/javascript:/gi, '')
      .replace(/data:/gi, '')
      .replace(/vbscript:/gi, '')
      .trim();

    return {
      valid: !blocked && threats.length === 0,
      sanitized: finalSanitized,
      threats,
      riskLevel,
      securityScore,
      blocked
    };
  }
}
