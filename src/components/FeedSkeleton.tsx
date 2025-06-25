
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const FeedSkeleton = () => {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index} className="bg-ctea-dark/50 border-[#00d1c1]/30">
          <CardHeader className="space-y-3">
            <div className="flex items-center space-x-3">
              <Skeleton className="h-10 w-10 rounded-full bg-gray-700" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24 bg-gray-700" />
                <Skeleton className="h-3 w-32 bg-gray-700" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-full bg-gray-700" />
              <Skeleton className="h-4 w-3/4 bg-gray-700" />
              <Skeleton className="h-4 w-1/2 bg-gray-700" />
            </div>
            <div className="flex space-x-4 pt-4">
              <Skeleton className="h-8 w-16 bg-gray-700" />
              <Skeleton className="h-8 w-16 bg-gray-700" />
              <Skeleton className="h-8 w-16 bg-gray-700" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeedSkeleton;
