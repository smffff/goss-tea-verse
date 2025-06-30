
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserX, Coffee } from 'lucide-react';
import { createAnonymousUser } from '@/services/anonymousAuthService';
import { useToast } from '@/hooks/use-toast';

interface AnonymousSignUpFormProps {
  onSuccess: () => void;
}

const AnonymousSignUpForm: React.FC<AnonymousSignUpFormProps> = ({ onSuccess }) => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      toast({
        title: "Username Required",
        description: "Please enter a username to continue",
        variant: "destructive"
      });
      return;
    }

    if (username.length < 3) {
      toast({
        title: "Username Too Short",
        description: "Username must be at least 3 characters long",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await createAnonymousUser(username);
      
      if (result.success) {
        toast({
          title: "Welcome to CTea News! ☕",
          description: `Welcome ${username}! You can now start spilling tea anonymously.`
        });
        onSuccess();
      } else {
        toast({
          title: "Sign Up Failed",
          description: result.error || "Failed to create anonymous account",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-brand-neutral border-brand-primary/20">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <UserX className="w-8 h-8 text-brand-primary" />
        </div>
        <CardTitle className="text-2xl font-anton text-brand-text">
          Stay Anonymous ☕
        </CardTitle>
        <p className="text-brand-text-secondary">
          Join CTea News with just a username - no email required!
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-brand-text">
              Choose Your Username
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="TeaSpiller123"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-brand-background border-brand-primary/30 text-brand-text"
              disabled={isLoading}
              maxLength={20}
            />
            <p className="text-xs text-brand-text-secondary">
              This will be your anonymous identity in the newsroom
            </p>
          </div>

          <Button
            type="submit"
            disabled={isLoading || !username.trim()}
            className="w-full btn-brand-primary"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Creating Account...
              </>
            ) : (
              <>
                <Coffee className="w-4 h-4 mr-2" />
                Enter Anonymously
              </>
            )}
          </Button>
        </form>

        <div className="mt-4 p-3 bg-brand-background/50 rounded-lg">
          <p className="text-xs text-brand-text-secondary text-center">
            Your posts will be anonymous. You can always upgrade to a full account later!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnonymousSignUpForm;
