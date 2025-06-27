
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coffee, Users, Shield, Zap } from 'lucide-react';

const FallbackLanding: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Coffee className="w-12 h-12 text-cyan-400 mr-3" />
            <h1 className="text-5xl font-bold text-white">CTea</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            The hottest gossip platform where tea flows freely and anonymously. 
            Currently brewing something amazing for you! ☕
          </p>
        </div>

        {/* Status Card */}
        <Card className="max-w-2xl mx-auto mb-12 bg-slate-800/50 border-cyan-500/30">
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <Zap className="w-8 h-8 text-yellow-400 mr-2" />
              <h2 className="text-2xl font-bold text-white">Under Construction</h2>
            </div>
            <p className="text-gray-300 mb-6">
              We're implementing enhanced security features and performance improvements. 
              The tea will be extra hot when we're back! 🔥
            </p>
            <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Security Hardening</span>
                <span className="text-green-400">✓ Complete</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Performance Optimization</span>
                <span className="text-yellow-400">⚡ In Progress</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">UI/UX Improvements</span>
                <span className="text-blue-400">🚀 Coming Soon</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-slate-800/30 border-cyan-500/20">
            <CardContent className="p-6 text-center">
              <Shield className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Enhanced Security</h3>
              <p className="text-gray-300">
                Military-grade anonymity protection with advanced content validation
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/30 border-purple-500/20">
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Community Driven</h3>
              <p className="text-gray-300">
                Real-time gossip feed with interactive reactions and discussions
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/30 border-pink-500/20">
            <CardContent className="p-6 text-center">
              <Coffee className="w-12 h-12 text-pink-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Hot Tea Daily</h3>
              <p className="text-gray-300">
                Fresh gossip, verified stories, and spicy takes delivered hot
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-gray-300 mb-6">
            Want to be notified when we're live? Drop us a line!
          </p>
          <Button 
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-3 text-lg"
            onClick={() => window.location.href = 'mailto:hello@cteanews.com?subject=Notify me when CTea is live!'}
          >
            Get Notified 📧
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-400">
          <p>© 2024 CTea. Spilling tea since day one. ☕</p>
          <p className="mt-2">Follow us for updates: @cteanews</p>
        </div>
      </div>
    </div>
  );
};

export default FallbackLanding;
