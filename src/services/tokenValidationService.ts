
export interface TokenValidationResult {
  valid: boolean
  issues: string[]
}

export class TokenValidationService {
  static validateTokenSecurity(token: string): TokenValidationResult {
    const issues: string[] = []

    if (!token || token.length < 32) {
      issues.push('Token too short')
    }

    if (!/^[A-Za-z0-9_-]+$/.test(token)) {
      issues.push('Invalid token format')
    }

    // Check for common weak patterns
    if (/^(.)\1+$/.test(token)) {
      issues.push('Token contains repeating pattern')
    }

    if (/^(123|abc|test)/i.test(token)) {
      issues.push('Token contains predictable pattern')
    }

    return {
      valid: issues.length === 0,
      issues
    }
  }

  static validateCSRFToken(token: string, sessionToken: string): boolean {
    if (!token || !sessionToken || token.length !== sessionToken.length) {
      return false
    }
    
    // Constant-time comparison
    let result = 0
    for (let i = 0; i < token.length; i++) {
      result |= token.charCodeAt(i) ^ sessionToken.charCodeAt(i)
    }
    
    return result === 0
  }
}
