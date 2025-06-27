
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import AdminBetaHeader from '@/components/admin/beta/AdminBetaHeader';
import BetaStatsCards from '@/components/admin/beta/BetaStatsCards';
import CreateBetaCodeForm from '@/components/admin/beta/CreateBetaCodeForm';
import BetaCodesTable from '@/components/admin/beta/BetaCodesTable';
import { secureLog } from '@/utils/secureLogging';

interface BetaCode {
  id: string;
  code: string;
  used: boolean;
  created_at: string;
  used_at: string | null;
  granted_by: string;
  user_token: string | null;
}

const AdminBetaDashboard: React.FC = () => {
  const [betaCodes, setBetaCodes] = useState<BetaCode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchBetaCodes();
  }, []);

  const fetchBetaCodes = async () => {
    try {
      const { data, error } = await supabase
        .from('beta_codes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBetaCodes(data || []);
    } catch (error) {
      secureLog.error('Error fetching beta codes:', error);
      toast({
        title: "Error",
        description: "Failed to fetch beta codes",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ctea-teal"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <AdminBetaHeader />
      <BetaStatsCards betaCodes={betaCodes} />
      <CreateBetaCodeForm onCodeCreated={fetchBetaCodes} />
      <BetaCodesTable betaCodes={betaCodes} />
    </div>
  );
};

export default AdminBetaDashboard;
