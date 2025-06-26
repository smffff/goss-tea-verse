
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Flag, Shield, BarChart3, Settings, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import AdminSetup from '@/components/admin/AdminSetup';

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();

  const stats = [
    { title: 'Total Users', value: '1,234', icon: Users, change: '+12%' },
    { title: 'Flagged Content', value: '23', icon: Flag, change: '-5%', urgent: true },
    { title: 'Active Moderators', value: '8', icon: Shield, change: '+2' },
    { title: 'Daily Submissions', value: '156', icon: BarChart3, change: '+18%' }
  ];

  const recentAlerts = [
    { type: 'critical', message: 'Multiple spam submissions detected', time: '2 min ago' },
    { type: 'warning', message: 'High volume of flags on submission #1234', time: '15 min ago' },
    { type: 'info', message: 'New moderator role assigned', time: '1 hour ago' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-400">Welcome back, {user?.email}</p>
        </div>
        <Badge variant="outline" className="border-ctea-teal text-ctea-teal">
          {isAdmin ? 'Administrator' : 'Moderator'}
        </Badge>
      </div>

      {/* Admin Setup Section - Show if not admin */}
      {!isAdmin && (
        <AdminSetup />
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-ctea-dark/50 border-ctea-teal/20">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-400">
                    {stat.title}
                  </CardTitle>
                  <Icon className="w-4 h-4 text-ctea-teal" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className={`text-xs ${stat.urgent ? 'text-red-400' : 'text-green-400'}`}>
                  {stat.change} from last month
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Alerts */}
      <Card className="bg-ctea-dark/50 border-ctea-teal/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-ctea-yellow" />
            Recent Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAlerts.map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-ctea-darker/50">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    alert.type === 'critical' ? 'bg-red-500' :
                    alert.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`} />
                  <span className="text-white">{alert.message}</span>
                </div>
                <span className="text-gray-400 text-sm">{alert.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-ctea-dark/50 border-ctea-teal/20 hover:border-ctea-teal/40 transition-colors cursor-pointer">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Flag className="w-5 h-5 text-red-400" />
              Moderation Queue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">Review flagged content and submissions</p>
            <Badge className="mt-2 bg-red-500/20 text-red-400">23 pending</Badge>
          </CardContent>
        </Card>

        <Card className="bg-ctea-dark/50 border-ctea-teal/20 hover:border-ctea-teal/40 transition-colors cursor-pointer">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              User Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">Manage user roles and permissions</p>
            <Badge className="mt-2 bg-blue-500/20 text-blue-400">8 admins</Badge>
          </CardContent>
        </Card>

        <Card className="bg-ctea-dark/50 border-ctea-teal/20 hover:border-ctea-teal/40 transition-colors cursor-pointer">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Settings className="w-5 h-5 text-gray-400" />
              System Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">Configure moderation rules and settings</p>
            <Badge className="mt-2 bg-gray-500/20 text-gray-400">Configure</Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
