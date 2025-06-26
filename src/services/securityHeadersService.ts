
export interface SecurityHeadersResult {
  valid: boolean
  missing: string[]
}

export class SecurityHeadersService {
  static validateSecurityHeaders(headers: Headers): SecurityHeadersResult {
    const requiredHeaders = [
      'x-content-type-options',
      'x-frame-options',
      'x-xss-protection',
      'referrer-policy'
    ]

    const missing = requiredHeaders.filter(header => !headers.get(header))

    return {
      valid: missing.length === 0,
      missing
    }
  }
}
