
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle, Activity } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useSecureAuth } from '@/hooks/useSecureAuth';

interface SecurityEvent {
  id: string;
  event_type: string;
  severity: string;
  created_at: string;
  details: any;
}

const SecurityMonitor: React.FC = () => {
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { requireAdmin } = useSecureAuth();

  useEffect(() => {
    if (!requireAdmin()) return;

    const fetchSecurityEvents = async () => {
      try {
        const { data, error } = await supabase
          .from('security_audit_trail')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(50);

        if (error) throw error;
        setEvents(data || []);
      } catch (error) {
        console.error('Failed to fetch security events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSecurityEvents();

    // Set up real-time monitoring
    const channel = supabase
      .channel('security_monitor')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'security_audit_trail'
        },
        (payload) => {
          setEvents(prev => [payload.new as SecurityEvent, ...prev.slice(0, 49)]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [requireAdmin]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'warning':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'info':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="w-4 h-4" />;
      case 'warning':
        return <Shield className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6 bg-ctea-dark/30 border border-ctea-teal/20">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-ctea-teal/20 rounded"></div>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-ctea-teal/10 rounded"></div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-ctea-dark/30 border border-ctea-teal/20">
      <div className="flex items-center gap-2 mb-6">
        <Shield className="w-5 h-5 text-ctea-teal" />
        <h3 className="text-lg font-bold text-white">Security Monitor</h3>
        <Badge className="bg-ctea-teal/20 text-ctea-teal ml-auto">
          {events.length} events
        </Badge>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {events.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No security events recorded
          </div>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="p-3 bg-ctea-darker/50 rounded-lg border border-ctea-teal/10"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getSeverityIcon(event.severity)}
                  <span className="text-white font-medium">
                    {event.event_type.replace(/_/g, ' ')}
                  </span>
                </div>
                <Badge className={getSeverityColor(event.severity)}>
                  {event.severity}
                </Badge>
              </div>
              
              <div className="text-sm text-gray-300 mb-2">
                {new Date(event.created_at).toLocaleString()}
              </div>
              
              {event.details && Object.keys(event.details).length > 0 && (
                <div className="text-xs text-gray-400 bg-ctea-darker/30 p-2 rounded">
                  <pre className="whitespace-pre-wrap">
                    {JSON.stringify(event.details, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default SecurityMonitor;
