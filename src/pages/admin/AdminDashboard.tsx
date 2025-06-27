import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Flag, Shield, BarChart3, Settings, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import AdminSetup from '@/components/admin/AdminSetup';
import AdminGuard from '@/components/access/AdminGuard';

const AdminDashboard = () => {
  const { user } = useAuth();

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
    <AdminGuard requireSuperAdmin={true}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Shield className="w-8 h-8 text-ctea-teal" />
              Admin Dashboard
            </h1>
            <p className="text-gray-400">Monitor and manage the CTea Newsroom platform</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-ctea-dark/50 border-ctea-teal/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">{stat.title}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      <p className={`text-sm ${stat.urgent ? 'text-red-400' : 'text-green-400'}`}>
                        {stat.change}
                      </p>
                    </div>
                    <stat.icon className="w-8 h-8 text-ctea-teal" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Alerts */}
          <Card className="bg-ctea-dark/50 border-ctea-teal/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-ctea-teal" />
                Recent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentAlerts.map((alert, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge 
                        variant={alert.type === 'critical' ? 'destructive' : alert.type === 'warning' ? 'secondary' : 'outline'}
                        className={alert.type === 'warning' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                      >
                        {alert.type}
                      </Badge>
                      <span className="text-gray-300">{alert.message}</span>
                    </div>
                    <span className="text-sm text-gray-500">{alert.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Admin Setup */}
          <AdminSetup />
        </div>
      </div>
    </AdminGuard>
  );
};

export default AdminDashboard;
