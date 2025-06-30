
import React from 'react';
import Layout from '@/components/Layout';

const Trends: React.FC = () => {
  return (
    <Layout pageTitle="Trends" pageDescription="Trending topics">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-anton text-brand-text mb-8">Trends</h1>
        <p className="text-brand-text-secondary">Trending content coming soon.</p>
      </div>
    </Layout>
  );
};

export default Trends;
