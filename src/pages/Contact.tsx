import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Twitter, MessageCircle, Github } from 'lucide-react';

const Contact = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      description: 'General inquiries and support',
      action: 'hello@cteanews.com',
      href: 'mailto:hello@cteanews.com?subject=CTea Newsroom Inquiry'
    },
    {
      icon: Twitter,
      title: 'Twitter',
      description: 'Follow us for updates and announcements',
      action: '@cteaplatform',
      href: 'https://twitter.com/cteaplatform'
    },
    {
      icon: MessageCircle,
      title: 'Discord',
      description: 'Join our community for real-time chat',
      action: 'Join Discord',
      href: 'https://discord.gg/ctea'
    },
    {
      icon: Github,
      title: 'GitHub',
      description: 'Contribute to our open-source development',
      action: 'View Repository',
      href: 'https://github.com/ctea-platform'
    }
  ];

  const handleContactClick = (href: string, isExternal: boolean) => {
    if (isExternal) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = href;
    }
  };

  return (
    <Layout>
      <div className="py-16 px-4 sm:px-8">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have questions, feedback, or want to get involved? We'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            const isExternal = method.href.startsWith('http');
            
            return (
              <Card key={index} className="bg-ctea-dark/50 border-white/10 card-hover">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-3">
                    <Icon className="w-6 h-6 text-[#00d1c1]" />
                    {method.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">{method.description}</p>
                  <Button
                    onClick={() => handleContactClick(method.href, isExternal)}
                    className="bg-gradient-ctea hover:opacity-90 text-white font-medium w-full"
                  >
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* FAQ Section */}
        <Card className="bg-gradient-to-br from-[#ff61a6]/20 to-[#00d1c1]/20 border-[#00d1c1]/30 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-white text-center text-2xl">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">How do I submit anonymous content?</h3>
              <p className="text-gray-300">
                Simply visit the "Submit" page or click any "Spill Tea" button. No registration required - 
                all submissions are anonymous by default.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-white mb-2">How does the AI moderation work?</h3>
              <p className="text-gray-300">
                Our AI bot CTeaBot analyzes all submissions for quality, relevance, and potential issues. 
                It provides ratings and commentary while filtering out harmful content.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Can I tip content creators?</h3>
              <p className="text-gray-300">
                Yes! You can tip the platform gatekeepers who maintain the community. 
                Individual user tipping is planned for future releases.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">Is my data secure?</h3>
              <p className="text-gray-300">
                Absolutely. We use industry-standard encryption and store minimal data. 
                Read our Privacy Policy for full details on data protection.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Contact;
