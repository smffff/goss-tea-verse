import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Database, Users, Settings, Download } from 'lucide-react';
import Layout from '@/components/Layout';
import SecurityHealthDashboard from '@/components/security/SecurityHealthDashboard';
import { ErrorReportingService } from '@/utils/errorReporting';
import AdminGuard from '@/components/access/AdminGuard';

const Admin = () => {
  const [reports, setReports] = useState(ErrorReportingService.getStoredReports());

  const downloadAllReports = () => {
    const exportData = ErrorReportingService.exportReports();
    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ctea-admin-report-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminGuard requireSuperAdmin={true}>
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-2">
                <Shield className="w-8 h-8 text-ctea-teal" />
                🫖 CTea Admin Dashboard
              </h1>
              <p className="text-gray-400">
                Monitor system health and manage the CTea Newsroom platform
              </p>
            </div>

            <Tabs defaultValue="security" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="database">Database</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="security" className="space-y-6">
                <SecurityHealthDashboard />
              </TabsContent>

              <TabsContent value="database" className="space-y-6">
                <Card className="bg-ctea-dark/50 border-ctea-teal/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Database className="w-5 h-5 text-ctea-teal" />
                      Database Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">Database management tools coming soon...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="users" className="space-y-6">
                <Card className="bg-ctea-dark/50 border-ctea-teal/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Users className="w-5 h-5 text-ctea-teal" />
                      User Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">User management tools coming soon...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card className="bg-ctea-dark/50 border-ctea-teal/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Settings className="w-5 h-5 text-ctea-teal" />
                      System Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Error Reports</span>
                        <Button onClick={downloadAllReports} size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Download All ({reports.length})
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </Layout>
    </AdminGuard>
  );
};

export default Admin;
