
export interface UrlValidationResult {
  valid: string[];
  invalid: string[];
}

export class UrlValidationService {
  public static validateUrls(urls: string[]): UrlValidationResult {
    const valid: string[] = [];
    const invalid: string[] = [];

    for (const url of urls) {
      if (!url?.trim()) continue;
      
      try {
        const urlObj = new URL(url);
        if (urlObj.protocol === 'http:' || urlObj.protocol === 'https:') {
          if (!this.isSuspiciousDomain(urlObj.hostname)) {
            valid.push(url);
          } else {
            invalid.push(url);
          }
        } else {
          invalid.push(url);
        }
      } catch {
        invalid.push(url);
      }
    }

    return { valid, invalid };
  }

  private static isSuspiciousDomain(hostname: string): boolean {
    const suspiciousPatterns = [
      'localhost',
      '127.0.0.1',
      '0.0.0.0',
      '192.168.',
      '10.',
      '172.',
      'bit.ly',
      'tinyurl.com',
      't.co'
    ];

    return suspiciousPatterns.some(pattern => 
      hostname.includes(pattern) || hostname.startsWith(pattern)
    );
  }
}
