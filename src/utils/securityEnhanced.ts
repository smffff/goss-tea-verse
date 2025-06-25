import DOMPurify from 'dompurify';

/**
 * Enhanced security utilities with comprehensive validation and sanitization
 */

// Enhanced token generation with cryptographic strength
export const generateSecureAnonymousToken = (): string => {
  const array = new Uint8Array(48); // Increased entropy
  crypto.getRandomValues(array);
  
  // Convert to base64url format for better security
  const base64 = btoa(String.fromCharCode(...array));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
};

// Token validation with enhanced security checks
export const validateAnonymousToken = (token: string): boolean => {
  if (!token || token.length < 32 || token.length > 128) return false;
  
  // Check for base64url format
  const base64urlPattern = /^[A-Za-z0-9_-]+$/;
  return base64urlPattern.test(token);
};

// Enhanced token management with rotation and expiry
export const getOrCreateSecureToken = (): string => {
  const tokenKey = 'ctea_anonymous_token';
  const expiryKey = 'ctea_token_expiry';
  
  const existingToken = localStorage.getItem(tokenKey);
  const expiry = localStorage.getItem(expiryKey);
  
  // Check if token exists and is not expired (4-hour max)
  if (existingToken && expiry && new Date().getTime() < parseInt(expiry)) {
    if (validateAnonymousToken(existingToken)) {
      return existingToken;
    }
  }
  
  // Generate new token with 4-hour expiry
  const newToken = generateSecureAnonymousToken();
  const newExpiry = new Date().getTime() + (4 * 60 * 60 * 1000); // 4 hours
  
  localStorage.setItem(tokenKey, newToken);
  localStorage.setItem(expiryKey, newExpiry.toString());
  
  return newToken;
};

// Content sanitization with DOMPurify
export const sanitizeContent = (content: string): string => {
  if (!content) return '';
  
  // Use DOMPurify for comprehensive HTML sanitization
  const sanitized = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [], // No HTML tags allowed
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true
  });
  
  return sanitized.trim();
};

// Enhanced URL validation with whitelist
const ALLOWED_DOMAINS = [
  'twitter.com',
  'x.com',
  'youtube.com',
  'youtu.be',
  'github.com',
  'medium.com',
  'reddit.com',
  'news.ycombinator.com',
  'techcrunch.com',
  'coindesk.com',
  'cointelegraph.com'
];

export const validateUrl = (url: string): boolean => {
  if (!url) return false;
  
  try {
    const urlObj = new URL(url);
    
    // Only allow http and https protocols
    if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
      return false;
    }
    
    // Check against domain whitelist
    const hostname = urlObj.hostname.toLowerCase();
    const isAllowed = ALLOWED_DOMAINS.some(domain => 
      hostname === domain || hostname.endsWith('.' + domain)
    );
    
    return isAllowed;
  } catch {
    return false;
  }
};

// Sanitize and validate evidence URLs
export const sanitizeUrls = (urls: string[]): string[] => {
  return urls
    .map(url => url.trim())
    .filter(url => url && validateUrl(url))
    .slice(0, 3); // Reduced to 3 URLs maximum for security
};

// Content validation with threat detection
export const validateContentSecurity = (content: string): {
  isValid: boolean;
  sanitized: string;
  threats: string[];
} => {
  const threats: string[] = [];
  
  if (!content || content.length < 3) {
    return { isValid: false, sanitized: '', threats: ['Content too short'] };
  }
  
  if (content.length > 2000) {
    threats.push('Content too long');
  }
  
  // Check for XSS patterns
  const xssPatterns = [
    /<script/i,
    /javascript:/i,
    /vbscript:/i,
    /on\w+\s*=/i,
    /<iframe/i,
    /<object/i,
    /<embed/i
  ];
  
  if (xssPatterns.some(pattern => pattern.test(content))) {
    threats.push('XSS attempt detected');
  }
  
  // Check for SQL injection patterns
  const sqlPatterns = [
    /union\s+select/i,
    /drop\s+table/i,
    /insert\s+into/i,
    /delete\s+from/i,
    /update\s+set/i,
    /--/,
    /\/\*.*?\*\//
  ];
  
  if (sqlPatterns.some(pattern => pattern.test(content))) {
    threats.push('SQL injection attempt detected');
  }
  
  const sanitized = sanitizeContent(content);
  const isValid = threats.length === 0 || (threats.length === 1 && threats[0] === 'Content too long');
  
  return { isValid, sanitized, threats };
};

// Rate limiting utilities
export const checkClientRateLimit = (action: string, maxActions: number = 3, windowMinutes: number = 60): boolean => {
  const key = `rate_limit_${action}`;
  const now = Date.now();
  const windowStart = now - (windowMinutes * 60 * 1000);
  
  const actions = JSON.parse(localStorage.getItem(key) || '[]') as number[];
  const recentActions = actions.filter(timestamp => timestamp > windowStart);
  
  if (recentActions.length >= maxActions) {
    return false;
  }
  
  recentActions.push(now);
  localStorage.setItem(key, JSON.stringify(recentActions));
  
  return true;
};

// Honeypot field validation
export const validateHoneypot = (honeypotValue: string): boolean => {
  return !honeypotValue || honeypotValue.trim() === '';
};
