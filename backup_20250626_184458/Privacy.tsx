
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Privacy = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-gray-400">Last updated: December 2024</p>
        </div>

        <div className="space-y-8">
          <Card className="bg-ctea-dark/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                CTea Newsroom is designed with privacy-first principles. We collect minimal information necessary to operate the platform:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Anonymous submission content (tea/gossip shared)</li>
                <li>Optional wallet addresses for tipping functionality</li>
                <li>IP addresses for security and spam prevention</li>
                <li>Basic analytics data for platform improvement</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-ctea-dark/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <ul className="list-disc list-inside space-y-2">
                <li>Display submitted content in the public feed</li>
                <li>Generate AI commentary and ratings</li>
                <li>Prevent spam and abuse</li>
                <li>Improve platform functionality</li>
                <li>Process optional tips and donations</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-ctea-dark/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Anonymous Submissions</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                All submissions are anonymous by default. We use secure tokens to track submissions 
                without linking them to personal identities. We do not store personally identifiable 
                information unless explicitly provided (like email for notifications).
              </p>
            </CardContent>
          </Card>

          <Card className="bg-ctea-dark/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Data Security</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                We implement industry-standard security measures including:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>HTTPS encryption for all data transmission</li>
                <li>Secure database storage with encryption at rest</li>
                <li>Regular security audits and updates</li>
                <li>Limited access controls for administrative functions</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-ctea-dark/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>We use the following third-party services:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Supabase for backend infrastructure</li>
                <li>OpenAI for AI commentary generation</li>
                <li>Analytics services for platform metrics</li>
              </ul>
              <p>These services have their own privacy policies which we encourage you to review.</p>
            </CardContent>
          </Card>

          <Card className="bg-ctea-dark/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>
                If you have any questions about this Privacy Policy, please contact us at{' '}
                <a href="mailto:privacy@cteanews.com" className="text-[#00d1c1] hover:underline">
                  privacy@cteanews.com
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
