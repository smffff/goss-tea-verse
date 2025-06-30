
import React from 'react';
import Layout from '@/components/Layout';

const TokenPage: React.FC = () => {
  return (
    <Layout pageTitle="Token" pageDescription="TEA token information">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-anton text-brand-text mb-8">TEA Token</h1>
        <p className="text-brand-text-secondary">Token information coming soon.</p>
      </div>
    </Layout>
  );
};

export default TokenPage;
