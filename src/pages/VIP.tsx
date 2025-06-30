
import React from 'react';
import Layout from '@/components/Layout';

const VIP: React.FC = () => {
  return (
    <Layout pageTitle="VIP" pageDescription="VIP membership">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-anton text-brand-text mb-8">VIP</h1>
        <p className="text-brand-text-secondary">VIP membership coming soon.</p>
      </div>
    </Layout>
  );
};

export default VIP;
