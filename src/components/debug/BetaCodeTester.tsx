import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { betaCodeService } from '@/services/betaCodeService';
import { supabase } from '@/integrations/supabase/client';
import AdminGuard from '@/components/access/AdminGuard';

interface TestResult {
  success: boolean;
  message: string;
  data?: unknown;
}

interface TestConfig {
  code: string;
  expectedResult: boolean;
}

const BetaCodeTester: React.FC = () => {
  const [testCode, setTestCode] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [connectionTest, setConnectionTest] = useState<any>(null);

  const testBetaCode = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      console.log('Testing beta code:', testCode);
      const validation = await betaCodeService.validateCode(testCode);
      console.log('Validation result:', validation);
      setResult(validation);
    } catch (error) {
      console.error('Beta code test error:', error);
      setResult({ error: error.message, stack: error.stack });
    } finally {
      setLoading(false);
    }
  };

  const testSupabaseConnection = async () => {
    setLoading(true);
    setConnectionTest(null);
    
    try {
      console.log('Testing Supabase connection...');
      
      // Test basic connection
      const { data, error } = await supabase
        .from('beta_codes')
        .select('count')
        .limit(1);
      
      console.log('Supabase test result:', { data, error });
      setConnectionTest({ data, error });
      
    } catch (error) {
      console.error('Supabase connection test error:', error);
      setConnectionTest({ error: error.message, stack: error.stack });
    } finally {
      setLoading(false);
    }
  };

  const testTestCodes = () => {
    const codes = betaCodeService.getTestCodes();
    console.log('Available test codes:', codes);
    setResult({ testCodes: codes });
  };

  const runTest = async (config: TestConfig): Promise<TestResult> => {
    try {
      const result = await testBetaCode(config.code);
      return {
        success: result === config.expectedResult,
        message: result ? 'Test passed' : 'Test failed',
        data: result
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Test failed',
        data: error
      };
    }
  };

  return (
    <AdminGuard requireSuperAdmin={true}>
      <div className="p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>🔧 Beta Code Debug Tester (Admin Only)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input
                placeholder="Enter beta code to test..."
                value={testCode}
                onChange={(e) => setTestCode(e.target.value)}
              />
              <Button onClick={testBetaCode} disabled={loading}>
                {loading ? 'Testing...' : 'Test Beta Code'}
              </Button>
            </div>

            <div className="space-y-2">
              <Button onClick={testSupabaseConnection} disabled={loading} variant="outline">
                Test Supabase Connection
              </Button>
              <Button onClick={testTestCodes} disabled={loading} variant="outline">
                Show Test Codes
              </Button>
            </div>

            {result && (
              <div className="mt-4 p-4 bg-gray-100 rounded">
                <h3 className="font-bold mb-2">Result:</h3>
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}

            {connectionTest && (
              <div className="mt-4 p-4 bg-blue-100 rounded">
                <h3 className="font-bold mb-2">Connection Test:</h3>
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(connectionTest, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminGuard>
  );
};

export default BetaCodeTester;
