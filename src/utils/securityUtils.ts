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

// Get or create a secure anonymous token with expiration
export const getOrCreateSecureToken = (): string => {
  const tokenKey = 'ctea_anonymous_token';
  const expiryKey = 'ctea_token_expiry';
  
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
  const newExpiry = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 hours
  
  localStorage.setItem(tokenKey, newToken);
  localStorage.setItem(expiryKey, newExpiry.toString());
  
  return newToken;
};

// Content sanitization utilities
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
    .replace(/`/g, '&#x60;');
  
  return sanitized.trim();
};

// URL validation utility
export const validateUrl = (url: string): boolean => {
  if (!url) return false;
  
  try {
    const urlObj = new URL(url);
    // Only allow http and https protocols
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};

// Sanitize and validate evidence URLs
export const sanitizeUrls = (urls: string[]): string[] => {
  return urls
    .map(url => url.trim())
    .filter(url => url && validateUrl(url))
    .slice(0, 5); // Limit to 5 URLs maximum
};
