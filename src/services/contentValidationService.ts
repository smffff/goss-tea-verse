
export interface ContentValidationResult {
  valid: boolean
  sanitized: string
  threats: string[]
}

export class ContentValidationService {
  static validateContent(content: string): ContentValidationResult {
    const threats: string[] = []
    let sanitized = content

    // XSS patterns
    const xssPatterns = [
      /<script[^>]*>.*?<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /<iframe[^>]*>/gi,
      /<object[^>]*>/gi,
      /<embed[^>]*>/gi
    ]

    for (const pattern of xssPatterns) {
      if (pattern.test(content)) {
        threats.push('Potential XSS attempt')
        sanitized = sanitized.replace(pattern, '')
      }
    }

    // SQL injection patterns
    const sqlPatterns = [
      /union\s+(all\s+)?select/gi,
      /insert\s+into/gi,
      /delete\s+from/gi,
      /update\s+\w+\s+set/gi,
      /drop\s+(table|database)/gi
    ]

    for (const pattern of sqlPatterns) {
      if (pattern.test(content)) {
        threats.push('Potential SQL injection')
      }
    }

    // Path traversal
    if (/\.\.\//.test(content)) {
      threats.push('Path traversal attempt')
    }

    return {
      valid: threats.length === 0,
      sanitized: sanitized.trim(),
      threats
    }
  }
}
