
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Terms = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-gray-400">Last updated: December 2024</p>
        </div>

        <div className="space-y-8">
          <Card className="bg-ctea-dark/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                By accessing and using CTea Newsroom, you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by the above, please 
                do not use this service.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-ctea-dark/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Use License</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                Permission is granted to temporarily use CTea Newsroom for personal, non-commercial 
                transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>modify or copy the materials</li>
                <li>use the materials for any commercial purpose or for any public display</li>
                <li>attempt to reverse engineer any software contained on the website</li>
                <li>remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-ctea-dark/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Content Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>When submitting content to CTea Newsroom, you agree not to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Submit illegal, harmful, threatening, abusive, defamatory, or offensive content</li>
                <li>Violate any laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Submit spam, promotional content, or unsolicited advertisements</li>
                <li>Attempt to manipulate the voting or rating systems</li>
                <li>Impersonate others or provide false information</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-ctea-dark/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Disclaimer</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                The information on this website is provided on an "as is" basis. To the fullest extent 
                permitted by law, this Company excludes all representations, warranties, conditions, and terms.
              </p>
              <p>
                Content submitted by users represents their own views and not those of CTea Newsroom. 
                We do not verify the accuracy of user-submitted content and encourage users to do their own research.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-ctea-dark/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Limitations</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                In no event shall CTea Newsroom or its suppliers be liable for any damages arising 
                out of the use or inability to use the materials on the website.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-ctea-dark/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>
                If you have any questions about these Terms of Service, please contact us at{' '}
                <a href="mailto:legal@cteanews.com" className="text-[#00d1c1] hover:underline">
                  legal@cteanews.com
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
