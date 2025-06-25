import React from 'react';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Coffee, Shield, Eye, Lock, Database, Sparkles } from 'lucide-react';

const Privacy = () => {
  // Set document title for SEO
  React.useEffect(() => {
    document.title = 'Privacy Policy - CTea Newsroom';
  }, []);

  const privacySections = [
    {
      title: "Information We Collect",
      icon: <Database className="w-6 h-6" />,
      content: [
        "Anonymous submissions: We collect tea submissions but do not store any personal identifiers",
        "Usage data: Basic analytics to improve our service (no personal information)",
        "Technical data: Browser type, device info for compatibility purposes"
      ]
    },
    {
      title: "How We Use Your Information",
      icon: <Eye className="w-6 h-6" />,
      content: [
        "To display and moderate tea submissions",
        "To improve our platform and user experience",
        "To prevent abuse and maintain community standards",
        "To provide customer support when requested"
      ]
    },
    {
      title: "Data Protection",
      icon: <Lock className="w-6 h-6" />,
      content: [
        "End-to-end encryption for all submissions",
        "No personal data stored in our databases",
        "Regular security audits and updates",
        "Compliance with industry best practices"
      ]
    },
    {
      title: "Your Rights",
      icon: <Shield className="w-6 h-6" />,
      content: [
        "Right to anonymity: We never require personal information",
        "Right to deletion: Contact us to remove any data",
        "Right to transparency: We're open about our practices",
        "Right to control: You decide what to share"
      ]
    }
  ];

  const dataPractices = [
    {
      practice: "Anonymous by Design",
      description: "We built CTea to be anonymous from the ground up. No registration, no personal data required.",
      status: "Active"
    },
    {
      practice: "Zero Personal Data Storage",
      description: "We don't store names, emails, or any personal identifiers with submissions.",
      status: "Active"
    },
    {
      practice: "Encrypted Communications",
      description: "All data transmission is encrypted using industry-standard protocols.",
      status: "Active"
    },
    {
      practice: "No Third-Party Tracking",
      description: "We don't use cookies or tracking scripts that identify individual users.",
      status: "Active"
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Shield className="w-16 h-16 text-ctea-teal animate-float" />
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-5 h-5 text-ctea-pink animate-pulse" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Your privacy is our priority. We believe in anonymous, secure, and transparent data practices.
          </p>
          <Badge className="bg-ctea-teal/20 text-ctea-teal border border-ctea-teal/30 mt-4">
            Last updated: December 2024
          </Badge>
        </div>

        {/* Privacy Commitment */}
        <Card className="bg-ctea-dark/30 border border-ctea-teal/20 p-8 mb-12">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Our Privacy Commitment
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto">
              At CTea Newsroom, we believe that privacy is a fundamental human right. Our platform is built on the principle 
              that you should be able to share information without fear of being identified or tracked. We've designed our 
              service to be anonymous by default, secure by design, and transparent in our practices.
            </p>
          </div>
        </Card>

        {/* Data Practices */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Our Data Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dataPractices.map((practice, index) => (
              <Card key={index} className="bg-ctea-dark/30 border border-ctea-teal/20 p-6 hover:border-ctea-teal/40 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-ctea-teal/20 rounded-full flex items-center justify-center text-ctea-teal flex-shrink-0">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{practice.practice}</h3>
                      <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">
                        {practice.status}
                      </Badge>
                    </div>
                    <p className="text-gray-300">{practice.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Privacy Sections */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Privacy Details</h2>
          <div className="space-y-6">
            {privacySections.map((section, index) => (
              <Card key={index} className="bg-ctea-dark/30 border border-ctea-teal/20 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-ctea-teal/20 rounded-full flex items-center justify-center text-ctea-teal">
                    {section.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{section.title}</h3>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-ctea-teal rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <Card className="bg-ctea-dark/30 border border-ctea-teal/20 p-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Questions About Privacy?
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              If you have any questions about our privacy practices or would like to exercise your rights, 
              please don't hesitate to contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Badge className="bg-ctea-teal/20 text-ctea-teal border border-ctea-teal/30 px-4 py-2">
                Email: privacy@cteanews.com
              </Badge>
              <Badge className="bg-ctea-pink/20 text-ctea-pink border border-ctea-pink/30 px-4 py-2">
                Twitter: @ctea_newsroom
              </Badge>
            </div>
          </div>
        </Card>

        {/* Legal Notice */}
        <Card className="bg-ctea-dark/30 border border-ctea-teal/20 p-6 mt-8">
          <div className="text-center">
            <p className="text-sm text-gray-400">
              This privacy policy is effective as of December 2024. We may update this policy from time to time. 
              Any changes will be posted on this page with an updated effective date.
            </p>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Privacy; 