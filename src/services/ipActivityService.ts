
export interface IPActivityResult {
  request_count: number
  is_suspicious: boolean
  last_request: string
}

export class IPActivityService {
  static async checkIPActivity(ipAddress: string): Promise<IPActivityResult> {
    try {
      // For now, return a mock result since the RPC function doesn't exist
      // In production, this would check actual IP activity patterns
      return {
        request_count: 0,
        is_suspicious: false,
        last_request: new Date().toISOString()
      }
    } catch (error) {
      console.error('IP activity check error:', error)
      return {
        request_count: 0,
        is_suspicious: false,
        last_request: new Date().toISOString()
      }
    }
  }
}
