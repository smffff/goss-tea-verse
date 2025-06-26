
export interface IPActivityResult {
  trusted: boolean
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  blockedReason?: string
}

export class IPActivityService {
  private static blockedIPs: Set<string> = new Set()
  private static suspiciousIPs: Map<string, number> = new Map()

  static checkIPActivity(ipAddress: string): IPActivityResult {
    // Check if IP is blocked
    if (this.blockedIPs.has(ipAddress)) {
      return {
        trusted: false,
        riskLevel: 'critical',
        blockedReason: 'IP address is blocked'
      }
    }

    // Check suspicious activity count
    const suspiciousCount = this.suspiciousIPs.get(ipAddress) || 0
    
    if (suspiciousCount > 10) {
      return {
        trusted: false,
        riskLevel: 'high',
        blockedReason: 'Too many suspicious activities'
      }
    }

    if (suspiciousCount > 5) {
      return {
        trusted: false,
        riskLevel: 'medium'
      }
    }

    return {
      trusted: true,
      riskLevel: 'low'
    }
  }

  static reportSuspiciousActivity(ipAddress: string): void {
    const current = this.suspiciousIPs.get(ipAddress) || 0
    this.suspiciousIPs.set(ipAddress, current + 1)
    
    // Auto-block after threshold
    if (current + 1 > 20) {
      this.blockedIPs.add(ipAddress)
    }
  }
}
