
export interface SecurityValidationResult {
  valid: boolean;
  sanitized: string;
  threats: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  securityScore: number;
}

export class ContentValidationService {
  static sanitizeContent(content: string): string {
    return content
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
      .replace(/`/g, '&#x60;')
      .replace(/=/g, '&#x3D;');
  }

  static async validateContent(content: string, maxLength: number = 1000): Promise<SecurityValidationResult> {
    const threats: string[] = [];
    let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';
    let securityScore = 100;

    // Length validation
    if (content.length > maxLength) {
      threats.push('Content exceeds maximum length');
      riskLevel = 'medium';
      securityScore -= 20;
    }

    // Basic XSS detection
    const xssPatterns = [/<script/i, /javascript:/i, /on\w+=/i];
    for (const pattern of xssPatterns) {
      if (pattern.test(content)) {
        threats.push('Potential XSS detected');
        riskLevel = 'high';
        securityScore -= 30;
        break;
      }
    }

    // SQL injection detection
    const sqlPatterns = [/union.*select/i, /drop.*table/i, /delete.*from/i];
    for (const pattern of sqlPatterns) {
      if (pattern.test(content)) {
        threats.push('Potential SQL injection detected');
        riskLevel = 'critical';
        securityScore -= 50;
        break;
      }
    }

    return {
      valid: threats.length === 0,
      sanitized: this.sanitizeContent(content),
      threats,
      riskLevel,
      securityScore
    };
  }
}
