import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Coffee, 
  Users, 
  Zap, 
  Shield, 
  Bot, 
  Wallet, 
  TrendingUp,
  FileText,
  CheckCircle,
  AlertTriangle,
  Clock,
  ExternalLink
} from 'lucide-react';

const About = () => {
  const [auditLog, setAuditLog] = useState<string>('');
  const [isLoadingAudit, setIsLoadingAudit] = useState(false);

  useEffect(() => {
    loadAuditLog();
  }, []);

  const loadAuditLog = async () => {
    setIsLoadingAudit(true);
    try {
      const response = await fetch('/public_audit_log.md');
      if (response.ok) {
        const content = await response.text();
        setAuditLog(content);
      }
    } catch (error) {
      console.error('Failed to load audit log:', error);
    } finally {
      setIsLoadingAudit(false);
    }
  };

  const features = [
    {
      icon: Coffee,
      title: 'Spill Anonymous Tea',
      description: 'Share crypto gossip, rumors, and alpha without revealing your identity.'
    },
    {
      icon: Bot,
      title: 'AI-Powered Moderation',
      description: 'Advanced AI moderation ensures content quality while maintaining privacy.'
    },
    {
      icon: Wallet,
      title: '$TEA Token Rewards',
      description: 'Earn $TEA tokens for quality submissions and community engagement.'
    },
    {
      icon: Zap,
      title: 'AI-Powered Reactions',
      description: 'Our AI bot CTeaBot adds spicy commentary and rates content for credibility.'
    },
    {
      icon: Users,
      title: 'Community Voting',
      description: 'Users vote content as hot, cold, or spicy to surface the best submissions.'
    },
    {
      icon: Shield,
      title: 'Earn Credibility',
      description: 'Build reputation through quality submissions and community engagement.'
    }
  ];

  const parseAuditLog = (content: string) => {
    const lines = content.split('\n');
    const entries: Array<{
      date: string;
      title: string;
      author: string;
      pr?: string;
      changes: string[];
    }> = [];

    let currentEntry: any = null;
    
    for (const line of lines) {
      if (line.startsWith('### ')) {
        if (currentEntry) {
          entries.push(currentEntry);
        }
        const match = line.match(/### ([\d-]+) - (.+)/);
        if (match) {
          currentEntry = {
            date: match[1],
            title: match[2],
            author: '',
            changes: []
          };
        }
      } else if (line.includes('**Deployed by**:') && currentEntry) {
        const authorMatch = line.match(/\*\*Deployed by\*\*: @(.+)/);
        if (authorMatch) {
          currentEntry.author = authorMatch[1];
        }
      } else if (line.includes('**PR**:') && currentEntry) {
        const prMatch = line.match(/\*\*PR\*\*: #(.+)/);
        if (prMatch) {
          currentEntry.pr = prMatch[1];
        }
      } else if (line.includes('✅') && currentEntry) {
        const change = line.replace('- ✅ ', '').trim();
        if (change) {
          currentEntry.changes.push(change);
        }
      }
    }
    
    if (currentEntry) {
      entries.push(currentEntry);
    }
    
    return entries;
  };

  const auditEntries = parseAuditLog(auditLog);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <img 
            src="/ctea-logo-full.png" 
            alt="CTea Newsroom Full Logo" 
            className="w-64 mx-auto mb-8"
          />
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-glow">
            About CTea Newsroom
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            The ultimate platform where crypto gossip meets AI-powered insights. 
            We're building the future of anonymous information sharing in the digital asset space.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="bg-gradient-to-br from-ctea-dark/50 to-ctea-darker/50 border-white/10 mb-16">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto">
              To democratize information flow in the crypto space by providing a secure, 
              anonymous platform where community members can share insights, rumors, and alpha 
              while maintaining accountability through AI moderation and community governance.
            </p>
          </CardContent>
        </Card>

        {/* Arena Stream & Tip Jar */}
        <Card className="bg-gradient-to-br from-ctea-teal/10 to-ctea-pink/10 border-ctea-teal/20 mb-16">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Live Arena Stream</h2>
            <div className="w-full max-w-3xl mx-auto mb-6">
              <iframe
                src="https://arena.app/ladyinvisible/live"
                width="100%"
                height="500"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                title="Arena Live Stream"
                className="rounded-lg shadow-lg border border-ctea-teal/30"
              ></iframe>
            </div>
            <a
              href="https://arena.app/ladyinvisible/support"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2 rounded-lg bg-ctea-pink text-white font-semibold shadow btn-hover-glow hover:bg-ctea-teal transition-colors"
            >
              Tip the Source
            </a>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="bg-ctea-dark/50 border-white/10 card-hover">
                <CardContent className="p-6">
                  <Icon className="w-12 h-12 text-[#00d1c1] mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* How It Works */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Submit Tea', desc: 'Share anonymous crypto gossip or insights' },
              { step: '2', title: 'AI Moderation', desc: 'Content is automatically moderated for quality' },
              { step: '3', title: 'Earn $TEA', desc: 'Get rewarded with tokens for approved content' },
              { step: '4', title: 'Community Votes', desc: 'Users vote on credibility and relevance' }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-gradient-ctea rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-white font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Public Audit Trail */}
        <Card className="bg-gradient-to-br from-ctea-dark/50 to-ctea-darker/50 border-white/10 mb-16">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
              <FileText className="w-6 h-6 text-[#00d1c1]" />
              Public Audit Trail
              <Badge variant="outline" className="ml-auto">
                Transparency
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="recent" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="recent">Recent Deployments</TabsTrigger>
                <TabsTrigger value="full">Full Log</TabsTrigger>
              </TabsList>
              
              <TabsContent value="recent" className="space-y-4">
                <ScrollArea className="h-96">
                  {isLoadingAudit ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00d1c1] mx-auto"></div>
                      <p className="text-gray-400 mt-2">Loading audit log...</p>
                    </div>
                  ) : auditEntries.length > 0 ? (
                    <div className="space-y-4">
                      {auditEntries.slice(0, 5).map((entry, index) => (
                        <div key={index} className="bg-ctea-dark/30 rounded-lg p-4 border border-white/10">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-white">{entry.title}</h4>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs">
                                {entry.date}
                              </Badge>
                              {entry.pr && (
                                <Badge variant="outline" className="text-xs">
                                  PR #{entry.pr}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-gray-400 mb-2">
                            Deployed by @{entry.author}
                          </p>
                          <div className="space-y-1">
                            {entry.changes.slice(0, 3).map((change, changeIndex) => (
                              <div key={changeIndex} className="flex items-center gap-2 text-sm text-gray-300">
                                <CheckCircle className="w-3 h-3 text-green-500" />
                                {change}
                              </div>
                            ))}
                            {entry.changes.length > 3 && (
                              <p className="text-xs text-gray-500">
                                +{entry.changes.length - 3} more changes
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>No audit entries found</p>
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="full" className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">
                    Complete transparency in our development process
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={loadAuditLog}
                    disabled={isLoadingAudit}
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${isLoadingAudit ? 'animate-spin' : ''}`} />
                    Refresh
                  </Button>
                </div>
                <ScrollArea className="h-96">
                  <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
                    {auditLog || 'Loading full audit log...'}
                  </pre>
                </ScrollArea>
                <div className="text-center">
                  <a
                    href="/public_audit_log.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-[#00d1c1] hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Raw Audit Log
                  </a>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Values */}
        <Card className="bg-gradient-to-br from-[#ff61a6]/20 to-[#00d1c1]/20 border-[#00d1c1]/30">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Transparency</h3>
                <p className="text-gray-300">Open-source development and clear community guidelines</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Privacy</h3>
                <p className="text-gray-300">Anonymous submissions with secure identity protection</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Community</h3>
                <p className="text-gray-300">Powered by and for the crypto community</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default About;
