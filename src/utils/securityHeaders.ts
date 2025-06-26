
/**
 * Security headers and Content Security Policy utilities
 */

export const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
}

export const CSP_DIRECTIVES = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'", // Required for React
    "https://cdn.jsdelivr.net",
    "https://unpkg.com"
  ],
  'connect-src': [
    "'self'",
    "https://*.supabase.co",
    "https://api.web3.storage",
    "wss://*.supabase.co"
  ],
  'img-src': [
    "'self'",
    "data:",
    "https:",
    "blob:"
  ],
  'style-src': [
    "'self'",
    "'unsafe-inline'", // Required for CSS-in-JS
    "https://fonts.googleapis.com"
  ],
  'font-src': [
    "'self'",
    "https://fonts.gstatic.com"
  ],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'frame-ancestors': ["'none'"],
  'upgrade-insecure-requests': []
}

export function generateCSPHeader(): string {
  return Object.entries(CSP_DIRECTIVES)
    .map(([directive, sources]) => {
      if (sources.length === 0) return directive
      return `${directive} ${sources.join(' ')}`
    })
    .join('; ')
}

export function applySecurityHeaders(): void {
  // Apply meta tags for CSP if we can't set headers
  const cspMeta = document.createElement('meta')
  cspMeta.httpEquiv = 'Content-Security-Policy'
  cspMeta.content = generateCSPHeader()
  document.head.appendChild(cspMeta)

  // Log security headers application
  console.log('[SECURITY] Applied Content Security Policy:', generateCSPHeader())
}

// CSRF protection utility
export function generateCSRFToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

export function validateCSRFToken(token: string, stored: string): boolean {
  if (!token || !stored || token.length !== stored.length) {
    return false
  }
  
  // Constant-time comparison to prevent timing attacks
  let result = 0
  for (let i = 0; i < token.length; i++) {
    result |= token.charCodeAt(i) ^ stored.charCodeAt(i)
  }
  
  return result === 0
}
