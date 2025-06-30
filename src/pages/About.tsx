
import React from 'react';
import Layout from '@/components/Layout';

const About: React.FC = () => {
  return (
    <Layout 
      pageTitle="About"
      pageDescription="Learn about CTea News"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-anton text-brand-text mb-8">About CTea News</h1>
          
          <div className="space-y-6 text-brand-text-secondary">
            <p>
              CTea News is the ultimate platform for anonymous crypto gossip and community-driven news.
            </p>
            <p>
              Our mission is to create a safe space where crypto enthusiasts can share insights, 
              rumors, and breaking news while maintaining their anonymity.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
