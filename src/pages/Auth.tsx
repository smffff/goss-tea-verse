
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Auth: React.FC = () => {
  return (
    <Layout 
      pageTitle="Authentication"
      pageDescription="Sign in or create your account"
      showNavigation={false}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card className="bg-brand-neutral border-brand-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl font-anton text-brand-text text-center">
                Welcome Back
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-brand-text-secondary text-center">
                Authentication functionality will be implemented here.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;
