
/**
 * Secure token generation and validation utilities
 */

// Generate a cryptographically secure anonymous token
export const generateSecureAnonymousToken = (): string => {
  // Use crypto.getRandomValues with a larger entropy pool
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  
  // Convert to base64url for better entropy and URL safety
  const base64 = btoa(String.fromCharCode(...array));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
};

// Validate token format and strength
export const validateAnonymousToken = (token: string): boolean => {
  if (!token || token.length < 32) return false;
  
  // Check for base64url format
  const base64urlPattern = /^[A-Za-z0-9_-]+$/;
  return base64urlPattern.test(token);
};

// Enhanced token creation with expiry tracking
export const getOrCreateSecureToken = (): string => {
  const tokenKey = 'ctea_anonymous_token';
  const expiryKey = 'ctea_token_expiry';
  const createdKey = 'ctea_token_created';
  
  // Check if token exists and is not expired
  const existingToken = localStorage.getItem(tokenKey);
  const expiry = localStorage.getItem(expiryKey);
  
  if (existingToken && expiry && new Date().getTime() < parseInt(expiry)) {
    if (validateAnonymousToken(existingToken)) {
      return existingToken;
    }
  }
  
  // Generate new token with 24-hour expiry
  const newToken = generateSecureAnonymousToken();
  const now = new Date().getTime();
  const newExpiry = now + (24 * 60 * 60 * 1000); // 24 hours
  
  localStorage.setItem(tokenKey, newToken);
  localStorage.setItem(expiryKey, newExpiry.toString());
  localStorage.setItem(createdKey, now.toString());
  
  return newToken;
};

// Enhanced content sanitization utilities
export const sanitizeContent = (content: string): string => {
  if (!content) return '';
  
  // Remove HTML tags
  let sanitized = content.replace(/<[^>]*>/g, '');
  
  // Escape special characters
  sanitized = sanitized
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/`/g, '&#x60;')
    .replace(/=/g, '&#x3D;')
    .replace(/\//g, '&#x2F;');
  
  // Remove potentially dangerous protocols
  sanitized = sanitized.replace(/(javascript|data|vbscript):/gi, '');
  
  return sanitized.trim();
};

// Enhanced URL validation utility
export const validateUrl = (url: string): boolean => {
  if (!url) return false;
  
  try {
    const urlObj = new URL(url);
    // Only allow http and https protocols
    if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
      return false;
    }
    
    // Block localhost and private IP ranges in production
    if (process.env.NODE_ENV === 'production') {
      const hostname = urlObj.hostname.toLowerCase();
      
      // Block localhost
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return false;
      }
      
      // Block private IP ranges
      const privateRanges = [
        /^10\./,
        /^172\.(1[6-9]|2[0-9]|3[01])\./,
        /^192\.168\./,
        /^169\.254\./ // Link-local
      ];
      
      for (const range of privateRanges) {
        if (range.test(hostname)) {
          return false;
        }
      }
    }
    
    return true;
  } catch {
    return false;
  }
};

// Sanitize and validate evidence URLs with enhanced security
export const sanitizeUrls = (urls: string[]): string[] => {
  return urls
    .map(url => url.trim())
    .filter(url => url && validateUrl(url))
    .slice(0, 5); // Limit to 5 URLs maximum
};

// IP address utilities
export const getClientIP = async (): Promise<string | null> => {
  try {
    // Use a public IP service (consider implementing your own for privacy)
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch {
    return null;
  }
};

// Enhanced fingerprinting for security
export const generateBrowserFingerprint = (): string => {
  const components = [
    navigator.userAgent,
    navigator.language,
    screen.width,
    screen.height,
    screen.colorDepth,
    new Date().getTimezoneOffset(),
    navigator.hardwareConcurrency || 0,
    navigator.deviceMemory || 0
  ];
  
  const fingerprint = components.join('|');
  
  // Create a hash of the fingerprint
  return btoa(fingerprint).replace(/[^a-zA-Z0-9]/g, '').substring(0, 16);
};
