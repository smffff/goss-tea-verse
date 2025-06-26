
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Copy } from 'lucide-react';
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

interface BetaCodesTableProps {
  betaCodes: BetaCode[];
}

const BetaCodesTable: React.FC<BetaCodesTableProps> = ({ betaCodes }) => {
  const { toast } = useToast();

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied!",
      description: `Code ${code} copied to clipboard`,
    });
  };

  return (
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
  );
};

export default BetaCodesTable;
