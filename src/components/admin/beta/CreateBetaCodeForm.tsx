
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { secureLog } from '@/utils/secureLogging';

interface CreateBetaCodeFormProps {
  onCodeCreated: () => void;
}

const CreateBetaCodeForm: React.FC<CreateBetaCodeFormProps> = ({ onCodeCreated }) => {
  const [newCode, setNewCode] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

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
      onCodeCreated();
    } catch (error: any) {
      secureLog.error('Error creating beta code:', error);
      toast({
        title: "Error",
        description: error.message.includes('duplicate') ? 'Code already exists' : 'Failed to create beta code',
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  const generateRandomCode = () => {
    const prefix = 'CTEA-';
    const suffix = Math.random().toString(36).substring(2, 8).toUpperCase();
    setNewCode(prefix + suffix);
  };

  return (
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
  );
};

export default CreateBetaCodeForm;
