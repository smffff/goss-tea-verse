
// Enhanced Security Utilities - Client-side security validation
// This replaces the old security.ts with better validation and sanitization

export class SecureTokenManager {
  private static readonly TOKEN_LENGTH = 43; // Base64URL encoded 32 bytes
  private static readonly TOKEN_PATTERN = /^[A-Za-z0-9_-]+$/;

  static generateSecureToken(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return btoa(String.fromCharCode(...array))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  static validateToken(token: string): boolean {
    if (!token || token.length !== this.TOKEN_LENGTH) {
      return false;
    }
    return this.TOKEN_PATTERN.test(token);
  }

  static getOrCreateToken(): string {
    let token = sessionStorage.getItem('anonymous_token');
    if (!token || !this.validateToken(token)) {
      token = this.generateSecureToken();
      sessionStorage.setItem('anonymous_token', token);
    }
    return token;
  }
}

export class ContentSanitizer {
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

  static sanitizeContent(content: string): {
    sanitized: string;
    threats: string[];
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
  } {
    const threats: string[] = [];
    let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';

    // Check for XSS patterns
    for (const pattern of this.XSS_PATTERNS) {
      if (pattern.test(content)) {
        threats.push('XSS attempt detected');
        riskLevel = 'critical';
        break;
      }
    }

    // Check for SQL injection patterns
    for (const pattern of this.SQL_PATTERNS) {
      if (pattern.test(content)) {
        threats.push('SQL injection attempt detected');
        if (riskLevel !== 'critical') {
          riskLevel = 'high';
        }
        break;
      }
    }

    // Command injection check
    if (/(\||&|;|`|\$\(|\$\{|<\(|>\()/g.test(content)) {
      threats.push('Command injection attempt detected');
      if (riskLevel === 'low') {
        riskLevel = 'medium';
      }
    }

    // Path traversal check
    if (/(\.\.|%2e%2e|%252e)/gi.test(content)) {
      threats.push('Path traversal attempt detected');
      if (riskLevel === 'low') {
        riskLevel = 'medium';
      }
    }

    // Sanitize content
    let sanitized = content
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
      .replace(/`/g, '&#x60;')
      .replace(/=/g, '&#x3D;');

    // Remove dangerous protocols
    sanitized = sanitized.replace(/(javascript|data|vbscript):/gi, '');

    return { sanitized, threats, riskLevel };
  }
}

export class ClientRateLimit {
  private static readonly STORAGE_KEY = 'rate_limits';

  static checkRateLimit(action: string, maxAttempts: number, windowMinutes: number): boolean {
    const now = Date.now();
    const windowMs = windowMinutes * 60 * 1000;
    const key = `${action}_${Math.floor(now / windowMs)}`;

    const stored = localStorage.getItem(`${this.STORAGE_KEY}_${action}`);
    let attempts = 0;

    if (stored) {
      const data = JSON.parse(stored);
      if (data.window === key) {
        attempts = data.attempts;
      }
    }

    if (attempts >= maxAttempts) {
      return false;
    }

    localStorage.setItem(`${this.STORAGE_KEY}_${action}`, JSON.stringify({
      window: key,
      attempts: attempts + 1
    }));

    return true;
  }
}

// Convenience functions
export const getOrCreateSecureToken = SecureTokenManager.getOrCreateToken;
export const sanitizeContent = ContentSanitizer.sanitizeContent;
export const validateUrls = (urls: string[]): string[] => {
  return urls.filter(url => {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  });
};
export const checkClientRateLimit = ClientRateLimit.checkRateLimit;
