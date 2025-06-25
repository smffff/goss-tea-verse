import React from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const FeedSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Filters Skeleton */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Skeleton className="h-8 w-24 rounded-full" />
        <Skeleton className="h-8 w-28 rounded-full" />
        <Skeleton className="h-8 w-20 rounded-full" />
        <Skeleton className="h-8 w-16 rounded-full" />
      </div>

      {/* Feed Items */}
      {Array.from({ length: 5 }).map((_, index) => (
        <Card key={index} className="p-6 bg-gradient-to-br from-ctea-dark/80 to-ctea-darker/90 border-ctea-teal/30 animate-pulse">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <Skeleton className="w-10 h-10 rounded-full bg-ctea-teal/20" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Skeleton className="h-4 w-32 bg-ctea-teal/20" />
                <Skeleton className="h-5 w-12 rounded-full bg-ctea-pink/20" />
              </div>
              <Skeleton className="h-3 w-24 bg-gray-400/20" />
            </div>
            <Skeleton className="h-6 w-16 bg-ctea-yellow/20" />
          </div>

          {/* Content */}
          <div className="space-y-3 mb-4">
            <Skeleton className="h-4 w-full bg-gray-300/20" />
            <Skeleton className="h-4 w-3/4 bg-gray-300/20" />
            <Skeleton className="h-4 w-1/2 bg-gray-300/20" />
          </div>

          {/* Evidence Links */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Skeleton className="w-4 h-4 bg-ctea-teal/20" />
              <Skeleton className="h-3 w-16 bg-ctea-teal/20" />
            </div>
            <Skeleton className="h-6 w-48 bg-ctea-teal/10 rounded" />
          </div>

          {/* Reaction Buttons */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Skeleton className="w-5 h-5 bg-red-400/20" />
                <Skeleton className="h-6 w-12 bg-red-400/20" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="w-5 h-5 bg-blue-400/20" />
                <Skeleton className="h-6 w-12 bg-blue-400/20" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="w-5 h-5 bg-orange-400/20" />
                <Skeleton className="h-6 w-12 bg-orange-400/20" />
              </div>
            </div>
            <div className="text-sm text-gray-400">
              <Skeleton className="h-3 w-20 bg-gray-400/20" />
            </div>
          </div>

          {/* AI Commentary Section */}
          <div className="border-t border-ctea-teal/20 pt-4">
            <div className="flex items-center justify-between mb-3">
              <Skeleton className="h-4 w-24 bg-ctea-teal/20" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16 bg-ctea-teal/20 rounded" />
                <Skeleton className="h-6 w-16 bg-ctea-teal/20 rounded" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="bg-ctea-dark/20 border border-ctea-teal/10 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Skeleton className="w-4 h-4 bg-ctea-teal/20" />
                  <Skeleton className="h-3 w-20 bg-ctea-teal/20" />
                </div>
                <Skeleton className="h-3 w-full bg-gray-300/20 mb-1" />
                <Skeleton className="h-3 w-3/4 bg-gray-300/20" />
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-ctea-teal/20">
            <div className="flex gap-2">
              <Skeleton className="h-8 w-8 bg-ctea-teal/20 rounded" />
              <Skeleton className="h-8 w-8 bg-ctea-teal/20 rounded" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-8 w-8 bg-ctea-teal/20 rounded" />
              <Skeleton className="h-8 w-8 bg-ctea-teal/20 rounded" />
              <Skeleton className="h-8 w-8 bg-red-400/20 rounded" />
            </div>
          </div>
        </Card>
      ))}

      {/* Loading indicator */}
      <div className="text-center py-8">
        <div className="inline-flex items-center gap-2 text-ctea-teal">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-ctea-teal"></div>
          <span className="text-sm">Loading fresh tea...</span>
        </div>
      </div>
    </div>
  );
};

export default FeedSkeleton; 