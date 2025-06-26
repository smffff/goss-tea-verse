
/**
 * Enhanced security utilities with token encryption and rotation
 */

// Simple encryption/decryption using Web Crypto API
class TokenCrypto {
  private static async getKey(): Promise<CryptoKey> {
    const keyMaterial = await window.crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode('ctea-security-key-v1'), // In production, use env variable
      'PBKDF2',
      false,
      ['deriveKey']
    );
    
    return window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: new TextEncoder().encode('ctea-salt-v1'),
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  }
  
  static async encrypt(text: string): Promise<string> {
    try {
      const key = await this.getKey();
      const iv = window.crypto.getRandomValues(new Uint8Array(12));
      const encodedText = new TextEncoder().encode(text);
      
      const encrypted = await window.crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        encodedText
      );
      
      const encryptedArray = Array.from(new Uint8Array(encrypted));
      const ivArray = Array.from(iv);
      const combined = ivArray.concat(encryptedArray);
      
      return btoa(String.fromCharCode(...combined));
    } catch (error) {
      console.error('Encryption error:', error);
      return text; // Fallback to unencrypted
    }
  }
  
  static async decrypt(encryptedText: string): Promise<string> {
    try {
      const key = await this.getKey();
      const combined = new Uint8Array(atob(encryptedText).split('').map(char => char.charCodeAt(0)));
      const iv = combined.slice(0, 12);
      const encrypted = combined.slice(12);
      
      const decrypted = await window.crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        key,
        encrypted
      );
      
      return new TextDecoder().decode(decrypted);
    } catch (error) {
      console.error('Decryption error:', error);
      return encryptedText; // Fallback to return as-is
    }
  }
}

// Enhanced token management with encryption and rotation
export class SecureTokenManager {
  private static readonly TOKEN_KEY = 'ctea_secure_token';
  private static readonly EXPIRY_KEY = 'ctea_token_expiry';
  private static readonly CREATED_KEY = 'ctea_token_created';
  private static readonly ROTATION_INTERVAL = 6 * 60 * 60 * 1000; // 6 hours
  
  static async getOrCreateToken(): Promise<string> {
    try {
      const existingToken = await this.getStoredToken();
      const expiry = localStorage.getItem(this.EXPIRY_KEY);
      
      if (existingToken && expiry && new Date().getTime() < parseInt(expiry)) {
        // Check if token needs rotation (every 6 hours)
        const created = localStorage.getItem(this.CREATED_KEY);
        if (created && (new Date().getTime() - parseInt(created)) > this.ROTATION_INTERVAL) {
          return await this.rotateToken(existingToken);
        }
        return existingToken;
      }
      
      return await this.generateNewToken();
    } catch (error) {
      console.error('Token management error:', error);
      return await this.generateNewToken();
    }
  }
  
  private static async getStoredToken(): Promise<string | null> {
    const encryptedToken = localStorage.getItem(this.TOKEN_KEY);
    if (!encryptedToken) return null;
    
    return await TokenCrypto.decrypt(encryptedToken);
  }
  
  private static async storeToken(token: string): Promise<void> {
    const encryptedToken = await TokenCrypto.encrypt(token);
    const now = new Date().getTime();
    const expiry = now + (24 * 60 * 60 * 1000); // 24 hours
    
    localStorage.setItem(this.TOKEN_KEY, encryptedToken);
    localStorage.setItem(this.EXPIRY_KEY, expiry.toString());
    localStorage.setItem(this.CREATED_KEY, now.toString());
  }
  
  private static async generateNewToken(): Promise<string> {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    const token = btoa(String.fromCharCode(...array))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
    
    await this.storeToken(token);
    return token;
  }
  
  private static async rotateToken(oldToken: string): Promise<string> {
    try {
      // In a real implementation, you'd call the server to rotate the token
      const newToken = await this.generateNewToken();
      
      // Log rotation for security monitoring
      console.log('[Security] Token rotated for security');
      
      return newToken;
    } catch (error) {
      console.error('Token rotation error:', error);
      return oldToken; // Fallback to old token
    }
  }
  
  static clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.EXPIRY_KEY);
    localStorage.removeItem(this.CREATED_KEY);
  }
  
  static async validateTokenFormat(token: string): Promise<boolean> {
    if (!token || token.length < 32) return false;
    if (!/^[A-Za-z0-9_-]+$/.test(token)) return false;
    return true;
  }
}

// Enhanced content sanitization
export class ContentSanitizer {
  private static readonly DANGEROUS_PATTERNS = [
    /<script[^>]*>.*?<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /data:text\/html/gi,
    /vbscript:/gi,
    /<iframe[^>]*>/gi,
    /<object[^>]*>/gi,
    /<embed[^>]*>/gi
  ];
  
  private static readonly SQL_PATTERNS = [
    /union\s+(all\s+)?select/gi,
    /insert\s+into/gi,
    /delete\s+from/gi,
    /update\s+\w+\s+set/gi,
    /drop\s+(table|database)/gi,
    /--\s*$/gm,
    /\/\*.*?\*\//gs
  ];
  
  static sanitizeContent(content: string): {
    sanitized: string;
    threats: string[];
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
  } {
    const threats: string[] = [];
    let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';
    
    if (!content || content.trim().length === 0) {
      return { sanitized: '', threats: ['Empty content'], riskLevel: 'low' };
    }
    
    // Check for XSS patterns
    for (const pattern of this.DANGEROUS_PATTERNS) {
      if (pattern.test(content)) {
        threats.push('XSS attack pattern detected');
        riskLevel = 'critical';
        break;
      }
    }
    
    // Check for SQL injection patterns
    for (const pattern of this.SQL_PATTERNS) {
      if (pattern.test(content)) {
        threats.push('SQL injection pattern detected');
        if (riskLevel !== 'critical') {
          riskLevel = 'high';
        }
        break;
      }
    }
    
    // Sanitize content
    let sanitized = content;
    sanitized = sanitized.replace(/<[^>]*>/g, ''); // Remove HTML tags
    sanitized = sanitized.replace(/&/g, '&amp;');
    sanitized = sanitized.replace(/</g, '&lt;');
    sanitized = sanitized.replace(/>/g, '&gt;');
    sanitized = sanitized.replace(/"/g, '&quot;');
    sanitized = sanitized.replace(/'/g, '&#x27;');
    sanitized = sanitized.replace(/`/g, '&#x60;');
    sanitized = sanitized.replace(/=/g, '&#x3D;');
    sanitized = sanitized.replace(/\//g, '&#x2F;');
    
    // Remove dangerous protocols
    sanitized = sanitized.replace(/(javascript|data|vbscript):/gi, '');
    
    return { sanitized: sanitized.trim(), threats, riskLevel };
  }
  
  static validateUrls(urls: string[]): string[] {
    return urls
      .map(url => url.trim())
      .filter(url => {
        if (!url) return false;
        
        try {
          const urlObj = new URL(url);
          // Only allow http and https
          if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
            return false;
          }
          
          // Block dangerous domains
          const hostname = urlObj.hostname.toLowerCase();
          const dangerousDomains = ['localhost', '127.0.0.1', '0.0.0.0'];
          if (dangerousDomains.includes(hostname)) {
            return false;
          }
          
          // Block private IP ranges
          const privateRanges = [
            /^10\./,
            /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
            /^192\.168\./,
            /^169\.254\./
          ];
          
          for (const range of privateRanges) {
            if (range.test(hostname)) {
              return false;
            }
          }
          
          return true;
        } catch {
          return false;
        }
      })
      .slice(0, 5); // Limit to 5 URLs
  }
}

// Enhanced client-side rate limiting with memory optimization
export class ClientRateLimit {
  private static readonly MAX_ENTRIES = 1000;
  private static rateLimitStore = new Map<string, { count: number; resetTime: number }>();
  
  static checkRateLimit(
    action: string,
    maxAttempts: number = 3,
    windowMinutes: number = 60
  ): boolean {
    const now = Date.now();
    const windowMs = windowMinutes * 60 * 1000;
    const key = `${action}_${Math.floor(now / windowMs)}`;
    
    // Clean up old entries to prevent memory leaks
    if (this.rateLimitStore.size > this.MAX_ENTRIES) {
      const cutoff = now - (24 * 60 * 60 * 1000); // 24 hours ago
      for (const [k, v] of this.rateLimitStore.entries()) {
        if (v.resetTime < cutoff) {
          this.rateLimitStore.delete(k);
        }
      }
    }
    
    const current = this.rateLimitStore.get(key) || { 
      count: 0, 
      resetTime: now + windowMs 
    };
    
    if (now > current.resetTime) {
      current.count = 0;
      current.resetTime = now + windowMs;
    }
    
    if (current.count >= maxAttempts) {
      return false;
    }
    
    current.count++;
    this.rateLimitStore.set(key, current);
    return true;
  }
}

// Export main utilities for backward compatibility
export const getOrCreateSecureToken = SecureTokenManager.getOrCreateToken;
export const sanitizeContent = ContentSanitizer.sanitizeContent;
export const validateUrls = ContentSanitizer.validateUrls;
export const checkClientRateLimit = ClientRateLimit.checkRateLimit;
