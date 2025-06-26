
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, ExternalLink, X } from 'lucide-react';
import { useDemo } from '@/contexts/DemoContext';

interface DemoModeGateProps {
  children: React.ReactNode;
}

const DemoModeGate: React.FC<DemoModeGateProps> = ({ children }) => {
  const { isDemoMode, isPreviewMode, exitDemo, getDemoWatermark } = useDemo();

  if (!isDemoMode && !isPreviewMode) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {/* Demo/Preview Watermark */}
      <div className="fixed top-4 left-4 z-50">
        <Badge 
          variant="outline" 
          className={`${
            isDemoMode 
              ? 'bg-orange-500/20 text-orange-500 border-orange-500/30' 
              : 'bg-blue-500/20 text-blue-500 border-blue-500/30'
          } backdrop-blur-sm`}
        >
          <Eye className="w-3 h-3 mr-1" />
          {getDemoWatermark()}
        </Badge>
      </div>

      {/* Exit Demo Button */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={exitDemo}
          variant="outline"
          size="sm"
          className="bg-ctea-dark/80 border-ctea-teal/30 text-white hover:bg-ctea-teal/20 backdrop-blur-sm"
        >
          <X className="w-4 h-4 mr-1" />
          Exit {isDemoMode ? 'Demo' : 'Preview'}
        </Button>
      </div>

      {/* Demo Notice Banner */}
      {isDemoMode && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
          <Card className="bg-orange-500/20 border-orange-500/30 backdrop-blur-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="text-orange-500">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <p className="text-orange-500 font-medium">Demo Mode Active</p>
                <p className="text-orange-400 text-sm">
                  You're experiencing CTea with sample data
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-orange-500/30 text-orange-500 hover:bg-orange-500/20"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                Get Real Access
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Preview Notice Banner */}
      {isPreviewMode && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
          <Card className="bg-blue-500/20 border-blue-500/30 backdrop-blur-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="text-blue-500">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <p className="text-blue-500 font-medium">Preview Mode</p>
                <p className="text-blue-400 text-sm">
                  Exploring CTea Newsroom features
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-blue-500/30 text-blue-500 hover:bg-blue-500/20"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                Join Beta
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {children}
    </div>
  );
};

export default DemoModeGate;
