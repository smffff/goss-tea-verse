import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Coffee, Sparkles } from 'lucide-react';

const FeedSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Loading Header */}
      <div className="text-center py-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Coffee className="w-8 h-8 text-ctea-teal animate-pulse" />
          <Sparkles className="w-6 h-6 text-ctea-purple animate-ping" />
          <Coffee className="w-8 h-8 text-ctea-teal animate-pulse" />
        </div>
        <Skeleton className="h-6 w-48 mx-auto bg-gradient-to-r from-ctea-teal/20 to-ctea-purple/20" />
        <Skeleton className="h-4 w-32 mx-auto mt-2 bg-gray-700" />
      </div>

      {/* Enhanced Skeleton Cards */}
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index} className="bg-ctea-dark/50 border-ctea-teal/30 animate-pulse">
          <CardHeader className="space-y-3">
            <div className="flex items-center space-x-3">
              <Skeleton className="h-10 w-10 rounded-full bg-gradient-to-r from-ctea-teal/20 to-ctea-purple/20" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-24 bg-gradient-to-r from-ctea-teal/20 to-ctea-purple/20" />
                <Skeleton className="h-3 w-32 bg-gray-700" />
              </div>
              <Skeleton className="h-6 w-16 rounded-full bg-ctea-yellow/20" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-full bg-gradient-to-r from-ctea-teal/20 to-ctea-purple/20" />
              <Skeleton className="h-4 w-3/4 bg-gradient-to-r from-ctea-teal/20 to-ctea-purple/20" />
              <Skeleton className="h-4 w-1/2 bg-gray-700" />
            </div>
            
            {/* AI Commentary Skeleton */}
            <div className="bg-ctea-purple/10 border border-ctea-purple/20 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Skeleton className="h-4 w-4 rounded-full bg-ctea-purple/30" />
                <Skeleton className="h-3 w-20 bg-ctea-purple/30" />
              </div>
              <Skeleton className="h-3 w-full bg-ctea-purple/20" />
              <Skeleton className="h-3 w-2/3 bg-ctea-purple/20 mt-1" />
            </div>
            
            <div className="flex space-x-4 pt-4">
              <Skeleton className="h-8 w-16 rounded-full bg-gradient-to-r from-ctea-teal/20 to-ctea-purple/20" />
              <Skeleton className="h-8 w-16 rounded-full bg-gradient-to-r from-ctea-teal/20 to-ctea-purple/20" />
              <Skeleton className="h-8 w-16 rounded-full bg-gradient-to-r from-ctea-teal/20 to-ctea-purple/20" />
            </div>
          </CardContent>
        </Card>
      ))}
      
      {/* Loading More Indicator */}
      <div className="text-center py-4">
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-ctea-teal rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-ctea-purple rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-ctea-teal rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        <Skeleton className="h-3 w-24 mx-auto mt-2 bg-gray-700" />
      </div>
    </div>
  );
};

export default FeedSkeleton;
