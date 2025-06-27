import type { AuthValidationResult } from './types';

export class SessionValidator {
  public static validateAuthSession(): AuthValidationResult {
    const threats: string[] = [];
    const recommendations: string[] = [];
    let securityScore = 100;
    let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';

    try {
      // Check for session tampering indicators
      const sessionKeys = Object.keys(localStorage).filter(key => 
        key.includes('supabase') || key.includes('ctea')
      );

      if (sessionKeys.length > 10) {
        threats.push('Excessive session data detected');
        securityScore -= 20;
        riskLevel = 'medium';
      }

      // Check for suspicious timing patterns
      const accessTimes = JSON.parse(localStorage.getItem('ctea_access_times') || '[]');
      if (accessTimes.length > 0) {
        const rapidAccess = accessTimes.filter((time: number) => 
          Date.now() - time < 1000
        ).length;

        if (rapidAccess > 5) {
          threats.push('Rapid access pattern detected');
          securityScore -= 30;
          riskLevel = 'high';
        }
      }

      // Update access tracking
      const newAccessTimes = [...accessTimes, Date.now()].slice(-10);
      localStorage.setItem('ctea_access_times', JSON.stringify(newAccessTimes));

      return {
        isValid: securityScore >= 50,
        securityScore,
        threats,
        recommendations,
        riskLevel
      };
    } catch (error: any) {
      if (process.env.NODE_ENV === "development") {
        console.error('Session validation error:', error);
      }
      return {
        isValid: false,
        securityScore: 0,
        threats: ['Session validation failed'],
        recommendations: ['Clear browser data and try again'],
        riskLevel: 'critical'
      };
    }
  }
}
