
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Coffee, Key, Users, Plus, Copy, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
  const [newCode, setNewCode] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
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
      console.error('Error fetching beta codes:', error);
      toast({
        title: "Error",
        description: "Failed to fetch beta codes",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createBetaCode = async () => {
    if (!newCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a code",
        variant: "destructive"
      });
      return;
    }

    setIsCreating(true);
    try {
      const { error } = await supabase
        .from('beta_codes')
        .insert({
          code: newCode.toUpperCase().trim(),
          granted_by: 'admin'
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Beta code created successfully",
      });

      setNewCode('');
      fetchBetaCodes();
    } catch (error: any) {
      console.error('Error creating beta code:', error);
      toast({
        title: "Error",
        description: error.message.includes('duplicate') ? 'Code already exists' : 'Failed to create beta code',
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied!",
      description: `Code ${code} copied to clipboard`,
    });
  };

  const generateRandomCode = () => {
    const prefix = 'CTEA-';
    const suffix = Math.random().toString(36).substring(2, 8).toUpperCase();
    setNewCode(prefix + suffix);
  };

  const stats = {
    total: betaCodes.length,
    used: betaCodes.filter(code => code.used).length,
    unused: betaCodes.filter(code => !code.used).length,
    spillGenerated: betaCodes.filter(code => code.granted_by === 'spill').length
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
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Coffee className="w-8 h-8 text-ctea-teal" />
        <h1 className="text-3xl font-bold text-white">Beta Code Dashboard</h1>
      </div>

      {/* Stats Cards */}
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

      {/* Create New Code */}
      <Card className="bg-ctea-dark border-ctea-teal/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create New Beta Code
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              value={newCode}
              onChange={(e) => setNewCode(e.target.value.toUpperCase())}
              placeholder="Enter beta code..."
              className="bg-ctea-darker border-ctea-teal/30 text-white font-mono"
              maxLength={20}
            />
            <Button 
              onClick={generateRandomCode}
              variant="outline"
              className="border-ctea-teal text-ctea-teal hover:bg-ctea-teal hover:text-white"
            >
              Generate
            </Button>
            <Button 
              onClick={createBetaCode}
              disabled={isCreating || !newCode.trim()}
              className="bg-ctea-teal hover:bg-ctea-teal/80"
            >
              {isCreating ? 'Creating...' : 'Create'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Beta Codes Table */}
      <Card className="bg-ctea-dark border-ctea-teal/30">
        <CardHeader>
          <CardTitle className="text-white">Beta Codes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-ctea-teal/20">
                <TableHead className="text-gray-300">Code</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
                <TableHead className="text-gray-300">Source</TableHead>
                <TableHead className="text-gray-300">Created</TableHead>
                <TableHead className="text-gray-300">Used</TableHead>
                <TableHead className="text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {betaCodes.map((code) => (
                <TableRow key={code.id} className="border-ctea-teal/20">
                  <TableCell className="font-mono text-white">{code.code}</TableCell>
                  <TableCell>
                    <Badge variant={code.used ? "destructive" : "default"}>
                      {code.used ? "Used" : "Available"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {code.granted_by}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {new Date(code.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {code.used_at ? new Date(code.used_at).toLocaleDateString() : '-'}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(code.code)}
                      className="text-ctea-teal hover:bg-ctea-teal/10"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBetaDashboard;
