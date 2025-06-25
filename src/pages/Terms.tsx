import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Coffee, ArrowLeft, Shield, Users, Eye, AlertTriangle } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-200/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <img 
                src="/ctea-logo-icon.svg" 
                alt="CTea Newsroom Logo" 
                className="w-8 h-8"
              />
              <span className="font-bold text-gray-900">CTea Newsroom</span>
            </div>
            <Link to="/">
              <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Coffee className="w-16 h-16 text-purple-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-lg text-gray-600">Last updated: December 2024</p>
          </div>

          <Card className="p-8 bg-white shadow-lg">
            <div className="space-y-8">
              {/* Introduction */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-purple-600" />
                  Welcome to CTea Newsroom
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  By accessing and using CTea Newsroom ("the Platform"), you agree to be bound by these Terms of Service. 
                  The Platform is an anonymous gossip and alpha sharing community for the crypto space.
                </p>
              </section>

              {/* User Conduct */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="w-6 h-6 text-purple-600" />
                  User Conduct & Responsibilities
                </h2>
                <div className="space-y-4">
                  <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
                    <h3 className="font-bold text-purple-900 mb-2">✅ What You Can Do:</h3>
                    <ul className="text-purple-800 space-y-1">
                      <li>• Share anonymous crypto gossip, alpha, and market insights</li>
                      <li>• Engage with community content through reactions and comments</li>
                      <li>• Earn $TEA points for quality contributions</li>
                      <li>• Participate in community discussions and campaigns</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 border-l-4 border-red-400 p-4">
                    <h3 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      ❌ What You Cannot Do:
                    </h3>
                    <ul className="text-red-800 space-y-1">
                      <li>• Share illegal content, scams, or malicious links</li>
                      <li>• Harass, threaten, or bully other users</li>
                      <li>• Spam or post irrelevant content repeatedly</li>
                      <li>• Attempt to deanonymize other users</li>
                      <li>• Share personal information without consent</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Privacy & Anonymity */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Eye className="w-6 h-6 text-purple-600" />
                  Privacy & Anonymity
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  CTea Newsroom is built on the principle of anonymous sharing. We use advanced encryption and privacy 
                  measures to protect your identity. However, you are responsible for:
                </p>
                <ul className="text-gray-700 space-y-2 ml-6">
                  <li>• Not revealing your own identity in submissions</li>
                  <li>• Using secure connections when accessing the platform</li>
                  <li>• Understanding that no anonymity system is 100% foolproof</li>
                  <li>• Not attempting to break our privacy measures</li>
                </ul>
              </section>

              {/* Content Moderation */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Content Moderation</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We reserve the right to moderate content that violates our community guidelines. This includes:
                </p>
                <ul className="text-gray-700 space-y-2 ml-6">
                  <li>• Removing content that violates our terms</li>
                  <li>• Temporarily or permanently suspending accounts</li>
                  <li>• Adjusting $TEA point balances for rule violations</li>
                  <li>• Reporting illegal activity to authorities when required</li>
                </ul>
              </section>

              {/* Disclaimers */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimers</h2>
                <div className="space-y-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h3 className="font-bold text-yellow-900 mb-2">⚠️ Financial Disclaimer</h3>
                    <p className="text-yellow-800">
                      Content shared on CTea Newsroom is for informational purposes only. This is not financial advice. 
                      Always do your own research and never invest more than you can afford to lose.
                    </p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-bold text-blue-900 mb-2">ℹ️ Information Accuracy</h3>
                    <p className="text-blue-800">
                      We do not verify the accuracy of user-submitted content. Users are responsible for the information 
                      they share and consume.
                    </p>
                  </div>
                </div>
              </section>

              {/* Limitation of Liability */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
                <p className="text-gray-700 leading-relaxed">
                  CTea Newsroom is provided "as is" without warranties. We are not liable for any damages arising from 
                  your use of the platform, including but not limited to financial losses, data breaches, or content disputes.
                </p>
              </section>

              {/* Changes to Terms */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
                <p className="text-gray-700 leading-relaxed">
                  We may update these terms from time to time. Continued use of the platform after changes constitutes 
                  acceptance of the new terms. We will notify users of significant changes via email or platform announcements.
                </p>
              </section>

              {/* Contact */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                <p className="text-gray-700 leading-relaxed">
                  If you have questions about these terms, please contact us at{' '}
                  <a href="mailto:legal@cteanews.com" className="text-purple-600 hover:text-purple-700 font-medium">
                    legal@cteanews.com
                  </a>
                </p>
              </section>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Terms; 