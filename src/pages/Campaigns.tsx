
import React from 'react';
import Layout from '@/components/Layout';

const Campaigns: React.FC = () => {
  return (
    <Layout pageTitle="Campaigns" pageDescription="Marketing campaigns">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-anton text-brand-text mb-8">Campaigns</h1>
        <p className="text-brand-text-secondary">Campaigns coming soon.</p>
      </div>
    </Layout>
  );
};

export default Campaigns;
