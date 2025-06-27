
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Clock } from 'lucide-react';

interface AppTimeoutsProps {
  isLoading: boolean;
  onEmergencyTimeout: () => void;
  onForceTimeout: (error: any) => void;
}

const AppTimeouts: React.FC<AppTimeoutsProps> = ({
  isLoading,
  onEmergencyTimeout,
  onForceTimeout
}) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="bg-ctea-dark border-ctea-teal/30 p-6 max-w-md">
        <div className="text-center space-y-4">
          <Clock className="w-12 h-12 mx-auto text-ctea-teal animate-spin" />
          <h3 className="text-xl font-bold text-white">Loading Application</h3>
          <p className="text-white/70">
            Initializing secure connection and loading components...
          </p>
          
          <div className="flex gap-2 mt-6">
            <Button
              onClick={onEmergencyTimeout}
              variant="outline"
              size="sm"
              className="border-yellow-500/30 text-yellow-400"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Emergency Skip
            </Button>
            <Button
              onClick={() => onForceTimeout(new Error('User forced timeout'))}
              variant="outline"
              size="sm"
              className="border-red-500/30 text-red-400"
            >
              Force Continue
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AppTimeouts;
