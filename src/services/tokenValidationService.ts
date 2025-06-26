
export interface TokenValidationResult {
  valid: boolean
  securityScore: number
  warnings: string[]
  suspicious: boolean
}

export class TokenValidationService {
  static validateTokenSecurity(token: string): TokenValidationResult {
    const warnings: string[] = []
    let securityScore = 100

    // Basic validation
    if (!token || token.length < 32) {
      return {
        valid: false,
        securityScore: 0,
        warnings: ['Token too short or null'],
        suspicious: true
      }
    }

    // Character validation
    if (!/^[A-Za-z0-9_-]+$/.test(token)) {
      securityScore -= 30
      warnings.push('Invalid characters detected')
    }

    // Length validation
    if (token.length > 128) {
      securityScore -= 20
      warnings.push('Token unusually long')
    }

    // Pattern analysis for suspicious tokens
    if (/test|debug|admin|root|system/i.test(token)) {
      securityScore -= 50
      warnings.push('Suspicious token pattern detected')
    }

    return {
      valid: securityScore >= 50,
      securityScore,
      warnings,
      suspicious: securityScore < 70
    }
  }

  static validateCSRFToken(token: string, sessionToken: string): boolean {
    // Basic CSRF token validation
    return token && sessionToken && token.length > 16 && token !== sessionToken
  }
}
