
import { secureLog } from '@/utils/secureLogging';

export interface SecurityValidationResult {
  valid: boolean;
  sanitized: string;
  threats: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  securityScore: number;
  detectedPatterns: string[];
}

export class ContentValidationService {
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
    /<base[^>]*>/gi,
    /eval\s*\(/gi,
    /setTimeout\s*\(/gi,
    /setInterval\s*\(/gi
  ];

  private static readonly SQL_INJECTION_PATTERNS = [
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
    /sp_executesql/gi,
    /information_schema/gi,
    /sys\./gi,
    /pg_/gi,
    /dbms_/gi
  ];

  private static readonly COMMAND_INJECTION_PATTERNS = [
    /(\||&|;|`|\$\(|\$\{|<\(|>\()/g,
    /\\x[0-9a-f]{2}/gi,
    /%0a|%0d/gi,
    /\n|\r/g
  ];

  private static readonly PATH_TRAVERSAL_PATTERNS = [
    /(\.\.|%2e%2e|%252e|%c0%ae|%c1%9c)/gi
  ];

  public static async validateContent(content: string, maxLength: number = 2000): Promise<SecurityValidationResult> {
    try {
      secureLog.info('🔍 Starting content validation', { length: content.length, maxLength });

      const threats: string[] = [];
      const detectedPatterns: string[] = [];
      let securityScore = 100;
      let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';

      // Basic validation
      if (!content || content.trim().length === 0) {
        return {
          valid: false,
          sanitized: '',
          threats: ['Content cannot be empty'],
          riskLevel: 'low',
          securityScore: 0,
          detectedPatterns: []
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
          detectedPatterns.push('xss_attack');
          riskLevel = 'critical';
          securityScore = 0;
          break;
        }
      }

      // SQL Injection Detection
      if (riskLevel !== 'critical') {
        for (const pattern of this.SQL_INJECTION_PATTERNS) {
          if (pattern.test(content)) {
            threats.push('SQL injection pattern detected');
            detectedPatterns.push('sql_injection');
            riskLevel = 'high';
            securityScore -= 50;
            break;
          }
        }
      }

      // Command Injection Detection
      if (riskLevel === 'low') {
        for (const pattern of this.COMMAND_INJECTION_PATTERNS) {
          if (pattern.test(content)) {
            threats.push('Command injection pattern detected');
            detectedPatterns.push('command_injection');
            riskLevel = 'medium';
            securityScore -= 25;
            break;
          }
        }
      }

      // Path Traversal Detection
      if (riskLevel === 'low') {
        for (const pattern of this.PATH_TRAVERSAL_PATTERNS) {
          if (pattern.test(content)) {
            threats.push('Path traversal pattern detected');
            detectedPatterns.push('path_traversal');
            riskLevel = 'medium';
            securityScore -= 20;
            break;
          }
        }
      }

      // Suspicious protocol detection
      if (/^(file|ftp|gopher|ldap|dict|sftp|telnet|ssh):/i.test(content)) {
        threats.push('Suspicious protocol detected');
        detectedPatterns.push('suspicious_protocol');
        if (riskLevel === 'low') {
          riskLevel = 'medium';
          securityScore -= 15;
        }
      }

      // Content sanitization
      const sanitized = this.sanitizeContent(content);

      const result = {
        valid: threats.length === 0 && securityScore >= 50,
        sanitized,
        threats,
        riskLevel,
        securityScore: Math.max(0, securityScore),
        detectedPatterns
      };

      secureLog.info('✅ Content validation completed', { 
        valid: result.valid, 
        securityScore: result.securityScore,
        riskLevel: result.riskLevel,
        threatsCount: threats.length 
      });

      return result;
    } catch (error) {
      secureLog.error('❌ Content validation failed', error);
      return {
        valid: false,
        sanitized: this.sanitizeContent(content),
        threats: ['Content validation system error'],
        riskLevel: 'critical',
        securityScore: 0,
        detectedPatterns: ['validation_error']
      };
    }
  }

  public static sanitizeContent(content: string): string {
    if (!content) return '';

    let sanitized = content;

    // Remove script tags and dangerous elements
    sanitized = sanitized.replace(/<script[^>]*>.*?<\/script>/gi, '');
    sanitized = sanitized.replace(/<iframe[^>]*>.*?<\/iframe>/gi, '');
    sanitized = sanitized.replace(/<object[^>]*>.*?<\/object>/gi, '');
    sanitized = sanitized.replace(/<embed[^>]*>/gi, '');
    sanitized = sanitized.replace(/<link[^>]*>/gi, '');
    sanitized = sanitized.replace(/<style[^>]*>.*?<\/style>/gi, '');
    sanitized = sanitized.replace(/<meta[^>]*>/gi, '');
    sanitized = sanitized.replace(/<base[^>]*>/gi, '');

    // Remove dangerous attributes
    sanitized = sanitized.replace(/on\w+\s*=\s*[^>\s]*/gi, '');

    // HTML entity encoding
    sanitized = sanitized.replace(/&/g, '&amp;');
    sanitized = sanitized.replace(/</g, '&lt;');
    sanitized = sanitized.replace(/>/g, '&gt;');
    sanitized = sanitized.replace(/"/g, '&quot;');
    sanitized = sanitized.replace(/'/g, '&#x27;');
    sanitized = sanitized.replace(/\//g, '&#x2F;');
    sanitized = sanitized.replace(/`/g, '&#x60;');
    sanitized = sanitized.replace(/=/g, '&#x3D;');

    // Remove dangerous protocols
    sanitized = sanitized.replace(/(javascript|data|vbscript):/gi, '');

    return sanitized.trim();
  }
}
