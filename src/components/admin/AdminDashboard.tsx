
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Users, Coffee, BarChart3, Settings, LogOut, Eye, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import BrandedTeacupIcon from '@/components/ui/BrandedTeacupIcon';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [stats, setStats] = useState({
    totalSubmissions: 0,
    pendingSubmissions: 0,
    activeUsers: 0,
    flaggedContent: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    fetchAdminStats();
  }, []);

  const fetchAdminStats = async () => {
    try {
      setIsLoading(true);
      
      const [submissionsRes, pendingRes, usersRes, flaggedRes] = await Promise.all([
        supabase.from('tea_submissions').select('*', { count: 'exact', head: true }),
        supabase.from('tea_submissions').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('user_profiles').select('*', { count: 'exact', head: true }),
        supabase.from('tea_submissions').select('*', { count: 'exact', head: true }).eq('status', 'flagged')
      ]);

      setStats({
        totalSubmissions: submissionsRes.count || 0,
        pendingSubmissions: pendingRes.count || 0,
        activeUsers: usersRes.count || 0,
        flaggedContent: flaggedRes.count || 0
      });
    } catch (error) {
      if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.error('Error fetching admin stats:', error);
      toast({
        title: "Error Loading Stats",
        description: "Could not load admin dashboard data",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefreshStats = () => {
    fetchAdminStats();
    toast({
      title: "Stats Refreshed",
      description: "Dashboard data has been updated",
    });
  };

  const handleViewSubmissions = () => {
    toast({
      title: "Submissions Panel",
      description: "Submission management coming soon!",
    });
  };

  const handleUserManagement = () => {
    toast({
      title: "User Management",
      description: "User management panel coming soon!",
    });
  };

  const handleSettings = () => {
    toast({
      title: "Admin Settings",
      description: "Settings panel coming soon!",
    });
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black flex items-center justify-center">
        <Card className="bg-ctea-dark/60 border-red-500/30">
          <CardContent className="p-8 text-center">
            <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Access Denied</h3>
            <p className="text-gray-400 mb-4">You don't have admin privileges</p>
            <Button onClick={onLogout} variant="outline" className="border-gray-600 text-gray-400">
              Back to App
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black">
      {/* Admin Header */}
      <div className="bg-red-500/20 backdrop-blur-sm border-b border-red-500/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white flex items-center gap-2">
                  CTea Admin Dashboard
                  <BrandedTeacupIcon size="sm" />
                </h1>
                <p className="text-xs text-gray-400">
                  Admin Mode • {user?.email || 'System Admin'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleRefreshStats}
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-400 hover:bg-gray-600"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
              <Button
                onClick={onLogout}
                variant="outline"
                size="sm"
                className="border-red-500/50 text-red-400 hover:bg-red-500/10"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Admin Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-ctea-dark/60 border-ctea-teal/30">
            <CardContent className="p-4 text-center">
              <Coffee className="w-8 h-8 text-ctea-teal mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stats.totalSubmissions}</div>
              <div className="text-sm text-gray-400">Total Submissions</div>
            </CardContent>
          </Card>
          
          <Card className="bg-ctea-dark/60 border-orange-500/30">
            <CardContent className="p-4 text-center">
              <Eye className="w-8 h-8 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stats.pendingSubmissions}</div>
              <div className="text-sm text-gray-400">Pending Review</div>
              {stats.pendingSubmissions > 0 && (
                <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 mt-2">
                  Needs Attention
                </Badge>
              )}
            </CardContent>
          </Card>
          
          <Card className="bg-ctea-dark/60 border-pink-400/30">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-pink-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stats.activeUsers}</div>
              <div className="text-sm text-gray-400">Active Users</div>
            </CardContent>
          </Card>
          
          <Card className="bg-ctea-dark/60 border-red-500/30">
            <CardContent className="p-4 text-center">
              <Shield className="w-8 h-8 text-red-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stats.flaggedContent}</div>
              <div className="text-sm text-gray-400">Flagged Content</div>
              {stats.flaggedContent > 0 && (
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30 mt-2">
                  Urgent
                </Badge>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Admin Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-ctea-darker">
            <TabsTrigger value="overview" className="text-white data-[state=active]:bg-ctea-teal">
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="submissions" className="text-white data-[state=active]:bg-orange-500">
              <Coffee className="w-4 h-4 mr-2" />
              Submissions
            </TabsTrigger>
            <TabsTrigger value="users" className="text-white data-[state=active]:bg-pink-400">
              <Users className="w-4 h-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-white data-[state=active]:bg-red-500">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="bg-ctea-dark/60 border-ctea-teal/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Platform Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-ctea-darker/50 rounded">
                    <span className="text-gray-300">System Status</span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      ✓ Operational
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-ctea-darker/50 rounded">
                    <span className="text-gray-300">Database Connection</span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      ✓ Connected
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-ctea-darker/50 rounded">
                    <span className="text-gray-300">Auth Service</span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      ✓ Active
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="submissions" className="space-y-6">
            <Card className="bg-ctea-dark/60 border-orange-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Coffee className="w-5 h-5" />
                  Submission Management
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center py-8">
                <Coffee className="w-16 h-16 text-orange-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Submission Panel</h3>
                <p className="text-gray-400 mb-4">
                  Manage, review, and moderate tea submissions
                </p>
                <Button
                  onClick={handleViewSubmissions}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Submissions
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="bg-ctea-dark/60 border-pink-400/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  User Management
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center py-8">
                <Users className="w-16 h-16 text-pink-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">User Management</h3>
                <p className="text-gray-400 mb-4">
                  Manage user accounts, roles, and permissions
                </p>
                <Button
                  onClick={handleUserManagement}
                  className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Manage Users
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-ctea-dark/60 border-red-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Admin Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center py-8">
                <Settings className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">System Settings</h3>
                <p className="text-gray-400 mb-4">
                  Configure platform settings and security options
                </p>
                <Button
                  onClick={handleSettings}
                  className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Open Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
