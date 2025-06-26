import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Settings = () => {
  return (
    <Layout>
      <Card className="max-w-2xl mx-auto mt-16 bg-ctea-dark/80 border-ctea-teal/30">
        <CardHeader>
          <CardTitle className="text-white text-2xl">Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-gray-300">
            <p className="mb-4">User settings and preferences will appear here.</p>
            <p className="text-sm text-gray-500">(Scaffolded page. Add forms and controls as needed.)</p>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Settings; 