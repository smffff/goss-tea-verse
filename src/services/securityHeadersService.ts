
export interface SecurityHeadersResult {
  secure: boolean
  missingHeaders: string[]
  warnings: string[]
}

export class SecurityHeadersService {
  static validateSecurityHeaders(headers: Headers): SecurityHeadersResult {
    const missingHeaders: string[] = []
    const warnings: string[] = []

    // Check for essential security headers
    const requiredHeaders = [
      'X-Content-Type-Options',
      'X-Frame-Options',
      'X-XSS-Protection',
      'Referrer-Policy'
    ]

    for (const header of requiredHeaders) {
      if (!headers.has(header)) {
        missingHeaders.push(header)
      }
    }

    // Check CSP
    if (!headers.has('Content-Security-Policy')) {
      missingHeaders.push('Content-Security-Policy')
    }

    // Check HSTS
    if (!headers.has('Strict-Transport-Security')) {
      warnings.push('HSTS header missing - consider adding for HTTPS enforcement')
    }

    return {
      secure: missingHeaders.length === 0,
      missingHeaders,
      warnings
    }
  }
}
