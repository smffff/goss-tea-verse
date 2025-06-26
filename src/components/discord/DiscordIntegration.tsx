import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, Users, Activity, Crown, Zap, ExternalLink, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
  status: 'online' | 'idle' | 'dnd' | 'offline';
  roles: string[];
  joinedAt: string;
}

interface DiscordChannel {
  id: string;
  name: string;
  type: 'text' | 'voice' | 'announcement';
  memberCount: number;
  isActive: boolean;
}

interface DiscordActivity {
  id: string;
  type: 'message' | 'join' | 'reaction' | 'voice';
  user: string;
  content: string;
  timestamp: string;
  channel: string;
}

const DiscordIntegration = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [currentUser, setCurrentUser] = useState<DiscordUser | null>(null);
  const [onlineMembers, setOnlineMembers] = useState<DiscordUser[]>([]);
  const [channels, setChannels] = useState<DiscordChannel[]>([]);
  const [recentActivity, setRecentActivity] = useState<DiscordActivity[]>([]);
  const [memberCount, setMemberCount] = useState(1247);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for demonstration
  const mockChannels: DiscordChannel[] = [
    { id: '1', name: 'general', type: 'text', memberCount: 892, isActive: true },
    { id: '2', name: 'tea-spills', type: 'text', memberCount: 634, isActive: true },
    { id: '3', name: 'trading-alpha', type: 'text', memberCount: 445, isActive: true },
    { id: '4', name: 'meme-central', type: 'text', memberCount: 789, isActive: true },
    { id: '5', name: 'announcements', type: 'announcement', memberCount: 1200, isActive: false },
    { id: '6', name: 'voice-chat', type: 'voice', memberCount: 23, isActive: true },
  ];

  const mockActivity: DiscordActivity[] = [
    {
      id: '1',
      type: 'message',
      user: 'CryptoWhale',
      content: 'Just spotted major whale movements on SOL 👀',
      timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      channel: 'trading-alpha'
    },
    {
      id: '2',
      type: 'reaction',
      user: 'MemeQueen',
      content: 'reacted with 🔥 to "New meme template dropped"',
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      channel: 'meme-central'
    },
    {
      id: '3',
      type: 'join',
      user: 'NewTeaSipper',
      content: 'joined the server',
      timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
      channel: 'general'
    },
    {
      id: '4',
      type: 'message',
      user: 'AlphaHunter',
      content: 'Breaking: Major partnership announcement incoming 🚀',
      timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
      channel: 'tea-spills'
    }
  ];

  useEffect(() => {
    // Simulate fetching Discord data
    setChannels(mockChannels);
    setRecentActivity(mockActivity);
    
    // Simulate member count updates
    const interval = setInterval(() => {
      setMemberCount(prev => prev + Math.floor(Math.random() * 3 - 1));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const connectToDiscord = async () => {
    setIsLoading(true);
    try {
      // Simulate Discord OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockUser: DiscordUser = {
        id: '12345',
        username: 'TeaEnthusiast',
        discriminator: '1337',
        avatar: 'https://cdn.discordapp.com/avatars/123/avatar.png',
        status: 'online',
        roles: ['Member', 'Tea Sipper'],
        joinedAt: new Date().toISOString()
      };
      
      setCurrentUser(mockUser);
      setIsConnected(true);
      
      toast.success('Successfully connected to Discord!', {
        description: 'You can now access exclusive channels and features.'
      });
      
    } catch (error) {
      toast.error('Failed to connect to Discord', {
        description: 'Please try again or contact support if the issue persists.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectFromDiscord = () => {
    setCurrentUser(null);
    setIsConnected(false);
    setOnlineMembers([]);
    toast.success('Disconnected from Discord');
  };

  const joinDiscordServer = () => {
    window.open('https://discord.gg/ctea', '_blank');
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'message': return <MessageCircle className="w-4 h-4" />;
      case 'join': return <Users className="w-4 h-4" />;
      case 'reaction': return <Zap className="w-4 h-4" />;
      case 'voice': return <Activity className="w-4 h-4" />;
      default: return <MessageCircle className="w-4 h-4" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return `${Math.floor(diffMins / 1440)}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Card className="p-6 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/20 rounded-full">
              <MessageCircle className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">
                Discord Community
              </h3>
              <p className="text-gray-400">
                {isConnected ? `Connected as ${currentUser?.username}` : 'Connect to access exclusive features'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
              <Users className="w-3 h-3 mr-1" />
              {memberCount.toLocaleString()} members
            </Badge>
            {isConnected ? (
              <Button 
                variant="outline" 
                onClick={disconnectFromDiscord}
                className="border-red-500/50 text-red-400 hover:bg-red-500/10"
              >
                Disconnect
              </Button>
            ) : (
              <Button 
                onClick={connectToDiscord}
                disabled={isLoading}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <MessageCircle className="w-4 h-4 mr-2" />
                )}
                Connect Discord
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Discord Features */}
      <Tabs defaultValue="channels" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-ctea-darker/50">
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="activity">Live Activity</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
        </TabsList>

        {/* Channels Tab */}
        <TabsContent value="channels" className="space-y-4">
          <div className="grid gap-4">
            {channels.map((channel) => (
              <Card key={channel.id} className="p-4 bg-ctea-darker/30 border-ctea-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      channel.isActive ? 'bg-green-400' : 'bg-gray-600'
                    }`} />
                    <span className="text-white font-medium">
                      #{channel.name}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {channel.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 text-sm">
                      {channel.memberCount} members
                    </span>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={joinDiscordServer}
                      className="text-purple-400 hover:text-purple-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-4">
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <Card key={activity.id} className="p-4 bg-ctea-darker/30 border-ctea-border/50">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-full">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-medium">{activity.user}</span>
                      <span className="text-gray-400 text-sm">in #{activity.channel}</span>
                      <span className="text-gray-500 text-xs">
                        {formatTimestamp(activity.timestamp)}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm">{activity.content}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Community Tab */}
        <TabsContent value="community" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6 bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Crown className="w-6 h-6 text-yellow-400" />
                <h3 className="text-lg font-bold text-white">Top Contributors</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white">CryptoWhale</span>
                  <Badge className="bg-yellow-500/20 text-yellow-400">Level 15</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white">AlphaHunter</span>
                  <Badge className="bg-purple-500/20 text-purple-400">Level 12</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white">MemeQueen</span>
                  <Badge className="bg-pink-500/20 text-pink-400">Level 10</Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-blue-900/20 to-teal-900/20 border-blue-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Activity className="w-6 h-6 text-blue-400" />
                <h3 className="text-lg font-bold text-white">Server Stats</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Messages Today</span>
                  <span className="text-white font-bold">1,247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Active Now</span>
                  <span className="text-white font-bold">89</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">New Members</span>
                  <span className="text-white font-bold">+23</span>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6 bg-ctea-darker/30 border-ctea-border/50">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-2">
                Join the CTea Community
              </h3>
              <p className="text-gray-400 mb-4">
                Connect with fellow tea spillers, get exclusive alpha, and be part of the conversation.
              </p>
              <Button 
                onClick={joinDiscordServer}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Join Discord Server
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DiscordIntegration;