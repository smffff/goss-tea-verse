interface SecurityEvent {
  eventType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  details: Record<string, any>;
  timestamp: Date;
  userAgent?: string;
  ipAddress?: string;
}

export class SecurityMonitoringService {
  private static events: SecurityEvent[] = [];
  private static readonly MAX_EVENTS = 1000;

  public static logSecurityEvent(
    eventType: string,
    details: Record<string, any>,
    severity: 'low' | 'medium' | 'high' | 'critical' = 'low'
  ): void {
    const event: SecurityEvent = {
      eventType,
      severity,
      details,
      timestamp: new Date(),
      userAgent: navigator.userAgent,
      ipAddress: 'client-side' // IP would be determined server-side
    };

    this.events.unshift(event);
    
    // Keep only the most recent events
    if (this.events.length > this.MAX_EVENTS) {
      this.events = this.events.slice(0, this.MAX_EVENTS);
    }

    // Store in localStorage for persistence
    try {
      localStorage.setItem('security_events', JSON.stringify(this.events.slice(0, 100)));
    } catch (error) {
      console.warn('Failed to store security events:', error);
    }

    // Log critical events to console
    if (severity === 'critical' || severity === 'high') {
      console.warn(`🚨 Security Event [${severity.toUpperCase()}]:`, eventType, details);
    }
  }

  public static getRecentEvents(limit: number = 50): SecurityEvent[] {
    return this.events.slice(0, limit);
  }

  public static getEventsByType(eventType: string): SecurityEvent[] {
    return this.events.filter(event => event.eventType === eventType);
  }

  public static getEventsBySeverity(severity: 'low' | 'medium' | 'high' | 'critical'): SecurityEvent[] {
    return this.events.filter(event => event.severity === severity);
  }

  public static clearEvents(): void {
    this.events = [];
    localStorage.removeItem('security_events');
  }

  // Initialize from localStorage
  public static init(): void {
    try {
      const stored = localStorage.getItem('security_events');
      if (stored) {
        const parsedEvents = JSON.parse(stored);
        this.events = parsedEvents.map((event: any) => ({
          ...event,
          timestamp: new Date(event.timestamp)
        }));
      }
    } catch (error) {
      console.warn('Failed to load security events from storage:', error);
    }
  }
}

// Initialize the service
SecurityMonitoringService.init();
