
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { UserX, User } from 'lucide-react';

interface AnonymousToggleProps {
  isAnonymous: boolean;
  onChange: (anonymous: boolean) => void;
}

const AnonymousToggle: React.FC<AnonymousToggleProps> = ({ isAnonymous, onChange }) => {
  return (
    <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-amber-50 to-red-50 border border-red-200 rounded-lg">
      <div className="flex items-center space-x-2">
        {isAnonymous ? (
          <UserX className="w-5 h-5 text-gray-600" />
        ) : (
          <User className="w-5 h-5 text-red-600" />
        )}
        <Label htmlFor="anonymous-toggle" className="text-gray-900 font-medium cursor-pointer">
          {isAnonymous ? '🔒 Spill this anonymously' : '🔓 Spill with identity (earn rewards)'}
        </Label>
      </div>
      <Switch
        id="anonymous-toggle"
        checked={!isAnonymous}
        onCheckedChange={(checked) => onChange(!checked)}
        className="data-[state=checked]:bg-red-500"
      />
    </div>
  );
};

export default AnonymousToggle;
