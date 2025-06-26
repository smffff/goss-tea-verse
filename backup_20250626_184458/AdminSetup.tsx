
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Shield, User, Settings } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

const AdminSetup = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user, isAdmin, isModerator } = useAuth();

  const handleSetAdmin = async () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter an email address",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // This would typically be handled by a secure backend function
      // For now, this shows what needs to be done manually in Supabase
      
      toast({
        title: "Admin Setup Instructions",
        description: `To set ${email} as admin, run this SQL in Supabase SQL Editor:

INSERT INTO public.user_roles (user_email, role, is_active) 
VALUES ('${email}', 'admin', true) 
ON CONFLICT (user_email, role) 
DO UPDATE SET is_active = true;`,
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to set admin role",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-ctea-dark/50 border-ctea-teal/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-ctea-teal" />
            Admin Setup & Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current User Status */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Your Current Status</h3>
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300">{user?.email}</span>
              <div className="flex gap-2">
                {isAdmin && (
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                    <Shield className="w-3 h-3 mr-1" />
                    Admin
                  </Badge>
                )}
                {isModerator && !isAdmin && (
                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                    <Shield className="w-3 h-3 mr-1" />
                    Moderator
                  </Badge>
                )}
                {!isAdmin && !isModerator && (
                  <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">
                    User
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Admin Setup */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Set Admin Role</h3>
            <p className="text-gray-400 text-sm">
              Enter an email to generate the SQL command for setting admin privileges.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-ctea-darker border-ctea-teal/30"
              />
              <Button
                onClick={handleSetAdmin}
                disabled={isLoading}
                className="bg-ctea-teal hover:bg-ctea-teal/80"
              >
                Generate SQL
              </Button>
            </div>
          </div>

          {/* Setup Instructions */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Setup Instructions</h3>
            <div className="bg-ctea-darker/50 p-4 rounded-lg space-y-2">
              <p className="text-sm text-gray-300">
                <strong>1. Set Admin Role:</strong> Run the generated SQL in Supabase SQL Editor
              </p>
              <p className="text-sm text-gray-300">
                <strong>2. Configure OpenAI:</strong> Add OPENAI_API_KEY to Edge Function secrets
              </p>
              <p className="text-sm text-gray-300">
                <strong>3. Test Moderation:</strong> Submit content to verify AI moderation works
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://supabase.com/dashboard/project/luubdvuuxvtkheyhzepm/sql/new"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm bg-ctea-teal/20 text-ctea-teal px-3 py-1 rounded hover:bg-ctea-teal/30"
              >
                SQL Editor
              </a>
              <a
                href="https://supabase.com/dashboard/project/luubdvuuxvtkheyhzepm/settings/functions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm bg-ctea-purple/20 text-ctea-purple px-3 py-1 rounded hover:bg-ctea-purple/30"
              >
                Edge Function Secrets
              </a>
              <a
                href="https://supabase.com/dashboard/project/luubdvuuxvtkheyhzepm/auth/users"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm bg-ctea-yellow/20 text-ctea-yellow px-3 py-1 rounded hover:bg-ctea-yellow/30"
              >
                Users
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSetup;
