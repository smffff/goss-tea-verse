
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Database, Users, Settings, Download } from 'lucide-react';
import Layout from '@/components/Layout';
import SecurityHealthDashboard from '@/components/security/SecurityHealthDashboard';
import { ErrorReportingService } from '@/utils/errorReporting';

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
              
              <Card className="bg-ctea-dark/60 border-ctea-teal/30">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-white">
                    <span>Error Reports ({reports.length})</span>
                    <Button
                      onClick={downloadAllReports}
                      size="sm"
                      variant="outline"
                      className="border-ctea-teal/50 text-ctea-teal hover:bg-ctea-teal/10"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export All
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {reports.length === 0 ? (
                    <p className="text-gray-400 text-center py-8">
                      No error reports available. System is running cleanly! 🫖
                    </p>
                  ) : (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {reports.slice(-10).reverse().map((report) => (
                        <div
                          key={report.id}
                          className="bg-black/20 border border-gray-600/30 rounded p-3"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-white">
                              {report.type}
                            </span>
                            <span className="text-xs text-gray-400">
                              {new Date(report.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-xs text-gray-300 mb-1">
                            Component: {report.component || 'Unknown'}
                          </p>
                          <p className="text-xs text-red-400 font-mono bg-red-900/10 p-2 rounded">
                            {report.error}
                          </p>
                          {report.context && (
                            <details className="mt-2">
                              <summary className="text-xs text-gray-400 cursor-pointer">
                                Context Details
                              </summary>
                              <pre className="text-xs text-gray-500 mt-1 bg-black/20 p-2 rounded overflow-x-auto">
                                {JSON.stringify(report.context, null, 2)}
                              </pre>
                            </details>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="database">
              <Card className="bg-ctea-dark/60 border-ctea-teal/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Database className="w-5 h-5" />
                    Database Health
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">Database monitoring coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users">
              <Card className="bg-ctea-dark/60 border-ctea-teal/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Users className="w-5 h-5" />
                    User Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">User management coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card className="bg-ctea-dark/60 border-ctea-teal/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Settings className="w-5 h-5" />
                    System Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">System settings coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
