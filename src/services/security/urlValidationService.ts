
import { secureLog } from '@/utils/secureLogging';

export interface UrlValidationResult {
  valid: string[];
  invalid: string[];
  suspicious: string[];
  warnings: string[];
}

export class UrlValidationService {
  private static readonly ALLOWED_PROTOCOLS = ['http:', 'https:'];
  private static readonly SUSPICIOUS_DOMAINS = [
    'localhost', '127.0.0.1', '0.0.0.0', '::1',
    'bit.ly', 'tinyurl.com', 't.co' // URL shorteners can be suspicious
  ];
  private static readonly BLOCKED_DOMAINS = [
    'malware-site.com', 'phishing-site.com' // Example blocked domains
  ];

  public static validateUrls(urls: string[]): UrlValidationResult {
    const result: UrlValidationResult = {
      valid: [],
      invalid: [],
      suspicious: [],
      warnings: []
    };

    if (!urls || urls.length === 0) {
      return result;
    }

    secureLog.info('🔗 Validating URLs', { count: urls.length });

    for (const url of urls) {
      const trimmedUrl = url?.trim();
      if (!trimmedUrl) continue;

      try {
        const urlObj = new URL(trimmedUrl);
        
        // Protocol validation
        if (!this.ALLOWED_PROTOCOLS.includes(urlObj.protocol)) {
          result.invalid.push(url);
          result.warnings.push(`Invalid protocol: ${urlObj.protocol}`);
          continue;
        }

        // Domain validation
        const hostname = urlObj.hostname.toLowerCase();
        
        // Check blocked domains
        if (this.BLOCKED_DOMAINS.some(domain => hostname.includes(domain))) {
          result.invalid.push(url);
          result.warnings.push(`Blocked domain: ${hostname}`);
          continue;
        }

        // Check suspicious domains
        if (this.SUSPICIOUS_DOMAINS.some(domain => hostname.includes(domain))) {
          result.suspicious.push(url);
          result.warnings.push(`Suspicious domain: ${hostname}`);
        }

        // Check for IP addresses (potentially suspicious)
        if (/^\d+\.\d+\.\d+\.\d+$/.test(hostname) || hostname.includes('::')) {
          result.suspicious.push(url);
          result.warnings.push(`IP address detected: ${hostname}`);
        }

        // URL length validation
        if (url.length > 2048) {
          result.invalid.push(url);
          result.warnings.push('URL too long');
          continue;
        }

        // Check for suspicious patterns in URL
        if (this.containsSuspiciousPatterns(url)) {
          result.suspicious.push(url);
          result.warnings.push('Suspicious URL pattern detected');
        }

        result.valid.push(url);
      } catch (error) {
        result.invalid.push(url);
        result.warnings.push(`Invalid URL format: ${url}`);
      }
    }

    secureLog.info('✅ URL validation completed', { 
      valid: result.valid.length,
      invalid: result.invalid.length,
      suspicious: result.suspicious.length 
    });

    return result;
  }

  private static containsSuspiciousPatterns(url: string): boolean {
    const suspiciousPatterns = [
      /javascript:/i,
      /data:/i,
      /vbscript:/i,
      /%00/i, // Null bytes
      /\.\./,  // Directory traversal
      /<script/i,
      /exec\(/i,
      /eval\(/i
    ];

    return suspiciousPatterns.some(pattern => pattern.test(url));
  }

  public static sanitizeUrl(url: string): string {
    if (!url) return '';
    
    try {
      const urlObj = new URL(url.trim());
      
      // Only allow safe protocols
      if (!this.ALLOWED_PROTOCOLS.includes(urlObj.protocol)) {
        return '';
      }

      // Remove dangerous query parameters
      urlObj.searchParams.delete('javascript');
      urlObj.searchParams.delete('data');
      urlObj.searchParams.delete('vbscript');

      return urlObj.toString();
    } catch (error) {
      secureLog.warn('URL sanitization failed', { url, error });
      return '';
    }
  }
}
