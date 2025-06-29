
import React from 'react';
import { Card } from '@/components/ui/card';
import { Coffee } from 'lucide-react';

const DeveloperAttribution: React.FC = () => {
  return (
    <Card className="bg-ctea-dark/30 border-ctea-teal/20 p-4 text-center">
      <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
        <Coffee className="w-4 h-4 text-ctea-teal" />
        <span>Built with passion by the CTea team</span>
        <Coffee className="w-4 h-4 text-ctea-teal" />
      </div>
    </Card>
  );
};

export default DeveloperAttribution;
