
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SpillTea: React.FC = () => {
  return (
    <Layout 
      pageTitle="Spill Tea"
      pageDescription="Share anonymous crypto gossip and tips"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-brand-neutral border-brand-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl font-anton text-brand-text text-center">
                Spill the Tea ☕
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-brand-text-secondary text-center">
                Tea spilling functionality will be implemented here.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SpillTea;
