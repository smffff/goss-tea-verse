
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Key, CheckCircle, Coffee } from 'lucide-react';

interface BetaCode {
  id: string;
  code: string;
  used: boolean;
  created_at: string;
  used_at: string | null;
  granted_by: string;
  user_token: string | null;
}

interface BetaStatsCardsProps {
  betaCodes: BetaCode[];
}

const BetaStatsCards: React.FC<BetaStatsCardsProps> = ({ betaCodes }) => {
  const stats = {
    total: betaCodes.length,
    used: betaCodes.filter(code => code.used).length,
    unused: betaCodes.filter(code => !code.used).length,
    spillGenerated: betaCodes.filter(code => code.granted_by === 'spill').length
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="bg-ctea-dark border-ctea-teal/30">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-300">Total Codes</CardTitle>
          <Key className="h-4 w-4 text-ctea-teal" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{stats.total}</div>
        </CardContent>
      </Card>

      <Card className="bg-ctea-dark border-green-500/30">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-300">Used Codes</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{stats.used}</div>
        </CardContent>
      </Card>

      <Card className="bg-ctea-dark border-yellow-500/30">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-300">Available</CardTitle>
          <Key className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{stats.unused}</div>
        </CardContent>
      </Card>

      <Card className="bg-ctea-dark border-pink-500/30">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-300">Spill Generated</CardTitle>
          <Coffee className="h-4 w-4 text-pink-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{stats.spillGenerated}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BetaStatsCards;
