
import { UnifiedSecurityService } from '@/services/unifiedSecurityService';

export const generateSecureToken = (): string => {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

export const hashString = async (str: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

export const validateSecureInput = (input: string): boolean => {
  const dangerousPatterns = [
    /<script/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /data:text\/html/gi
  ];
  
  return !dangerousPatterns.some(pattern => pattern.test(input));
};

// Additional utility functions
export const performSubmissionSecurityCheck = async (content: string, urls: string[]) => {
  return await UnifiedSecurityService.validateSubmissionSecurity(content, urls);
};

export const sanitizeContent = (content: string): string => {
  return content
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
};

export const getOrCreateSecureToken = (): string => {
  const stored = localStorage.getItem('ctea_secure_token');
  if (stored) return stored;
  
  const token = generateSecureToken();
  localStorage.setItem('ctea_secure_token', token);
  return token;
};

export const validateUrls = (urls: string[]) => {
  const valid: string[] = [];
  const invalid: string[] = [];
  
  urls.forEach(url => {
    try {
      new URL(url);
      valid.push(url);
    } catch {
      invalid.push(url);
    }
  });
  
  return { valid, invalid };
};

export const checkClientRateLimit = (action: string, limit: number = 10) => {
  const key = `rate_limit_${action}`;
  const stored = localStorage.getItem(key);
  const now = Date.now();
  
  if (!stored) {
    localStorage.setItem(key, JSON.stringify({ count: 1, lastReset: now }));
    return { allowed: true, remaining: limit - 1 };
  }
  
  const data = JSON.parse(stored);
  if (now - data.lastReset > 60000) { // Reset every minute
    localStorage.setItem(key, JSON.stringify({ count: 1, lastReset: now }));
    return { allowed: true, remaining: limit - 1 };
  }
  
  if (data.count >= limit) {
    return { allowed: false, remaining: 0 };
  }
  
  data.count++;
  localStorage.setItem(key, JSON.stringify(data));
  return { allowed: true, remaining: limit - data.count };
};

export const validateContentSecurity = (content: string) => {
  return {
    valid: validateSecureInput(content),
    sanitized: sanitizeContent(content)
  };
};
