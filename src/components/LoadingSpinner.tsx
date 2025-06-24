
import React from 'react';
import { Card } from '@/components/ui/card';

interface LoadingSpinnerProps {
  count?: number;
  message?: string;
}

const LoadingSpinner = ({ count = 3, message = "Loading the freshest tea..." }: LoadingSpinnerProps) => {
  return (
    <div className="space-y-4">
      <div className="text-center py-8">
        <div className="flex items-center justify-center gap-2 text-ctea-teal mb-4">
          <div className="w-3 h-3 bg-ctea-teal rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-ctea-teal rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-3 h-3 bg-ctea-teal rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
        <p className="text-gray-400">{message}</p>
      </div>

      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="p-6 bg-ctea-dark/50 animate-pulse">
          <div className="h-4 bg-ctea-teal/20 rounded mb-3 w-1/4"></div>
          <div className="h-20 bg-ctea-teal/10 rounded mb-4"></div>
          <div className="flex gap-4">
            <div className="h-8 w-16 bg-ctea-pink/20 rounded"></div>
            <div className="h-8 w-16 bg-ctea-purple/20 rounded"></div>
            <div className="h-8 w-16 bg-ctea-yellow/20 rounded"></div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default LoadingSpinner;
