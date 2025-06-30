
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Admin: React.FC = () => {
  return (
    <Layout 
      pageTitle="Admin Panel"
      pageDescription="CTea News administration dashboard"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-brand-neutral border-brand-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl font-anton text-brand-text text-center">
                Admin Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-brand-text-secondary text-center">
                Admin functionality will be implemented here.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
