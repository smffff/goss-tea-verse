
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AnonymousSignUpForm from '@/components/auth/AnonymousSignUpForm';
import { useUnifiedAuth } from '@/hooks/useUnifiedAuth';

const SimpleAuth: React.FC = () => {
  const { user, loading } = useUnifiedAuth();
  const [activeTab, setActiveTab] = useState('anonymous');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-background via-brand-neutral to-brand-darker flex items-center justify-center">
        <img 
          src="/lovable-uploads/788113f9-894c-4f0e-bb24-90b5f436f86f.png" 
          alt="CTea News Logo" 
          className="w-24 h-24 object-contain animate-pulse"
        />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/home" replace />;
  }

  const handleAuthSuccess = () => {
    window.location.href = '/home';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-background via-brand-neutral to-brand-darker flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/788113f9-894c-4f0e-bb24-90b5f436f86f.png" 
            alt="CTea News Logo" 
            className="w-16 h-16 mx-auto mb-4 object-contain"
          />
          <h1 className="text-3xl font-anton text-brand-text mb-2">
            Join CTea News ☕
          </h1>
          <p className="text-brand-text-secondary">
            Start spilling tea in the crypto world
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="anonymous">Anonymous</TabsTrigger>
            <TabsTrigger value="full">Full Account</TabsTrigger>
          </TabsList>
          
          <TabsContent value="anonymous">
            <AnonymousSignUpForm onSuccess={handleAuthSuccess} />
          </TabsContent>
          
          <TabsContent value="full">
            <Card className="bg-brand-neutral border-brand-primary/20">
              <CardHeader className="text-center">
                <CardTitle className="text-brand-text">Coming Soon</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-brand-text-secondary mb-4">
                  Full account features with email authentication are coming soon!
                </p>
                <p className="text-sm text-brand-text-secondary">
                  For now, join anonymously to start spilling tea ☕
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SimpleAuth;
