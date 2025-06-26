
export interface TokenValidationResult {
  valid: boolean;
  token: string;
}

export class TokenValidationService {
  public static getOrCreateSecureToken(): TokenValidationResult {
    let token = sessionStorage.getItem('anonymous_token');
    
    if (!token || !this.validateToken(token)) {
      token = this.generateSecureToken();
      sessionStorage.setItem('anonymous_token', token);
    }
    
    return { valid: true, token };
  }

  private static generateSecureToken(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return btoa(String.fromCharCode(...array))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  private static validateToken(token: string): boolean {
    if (!token || token.length < 32 || token.length > 128) return false;
    return /^[A-Za-z0-9_-]+$/.test(token);
  }
}
