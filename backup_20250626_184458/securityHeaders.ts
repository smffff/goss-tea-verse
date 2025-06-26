
// Security headers utility for client-side security enforcement

export const applySecurityHeaders = (): void => {
  // Apply basic client-side security measures
  
  // Prevent clickjacking
  if (window.self !== window.top) {
    document.body.style.display = 'none'
    throw new Error('Clickjacking attempt detected')
  }

  // Set security-related meta tags if not present
  const setMetaTag = (name: string, content: string) => {
    if (!document.querySelector(`meta[name="${name}"]`)) {
      const meta = document.createElement('meta')
      meta.name = name
      meta.content = content
      document.head.appendChild(meta)
    }
  }

  setMetaTag('referrer', 'strict-origin-when-cross-origin')
  setMetaTag('robots', 'noindex, nofollow')
}

export const generateCSRFToken = (): string => {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return btoa(String.fromCharCode(...array))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

export const validateCSRFToken = (token: string): boolean => {
  const storedToken = sessionStorage.getItem('csrf_token')
  return storedToken === token && token.length > 16
}
