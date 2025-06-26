
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Megaphone, ExternalLink } from 'lucide-react';
import { track } from '@/utils/analytics';

interface SponsoredContentProps {
  title: string;
  description: string;
  imageUrl?: string;
  ctaText: string;
  ctaLink: string;
  sponsor: string;
  placement: 'feed' | 'sidebar' | 'header';
  className?: string;
}

const SponsoredContent: React.FC<SponsoredContentProps> = ({
  title,
  description,
  imageUrl,
  ctaText,
  ctaLink,
  sponsor,
  placement,
  className = ''
}) => {
  const handleClick = () => {
    track('sponsored_content_click', {
      sponsor,
      placement,
      title
    });
  };

  return (
    <Card className={`p-4 border-2 border-yellow-400/30 bg-gradient-to-r from-yellow-50 to-orange-50 ${className}`}>
      <div className="flex items-start gap-3">
        <Megaphone className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-yellow-500 text-white">
              Sponsored
            </Badge>
            <span className="text-xs text-gray-600">by {sponsor}</span>
          </div>
          
          {imageUrl && (
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-32 object-cover rounded-lg mb-3"
            />
          )}
          
          <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-sm text-gray-700 mb-3">{description}</p>
          
          <a
            href={ctaLink}
            target="_blank"
            rel="noopener noreferrer sponsored"
            onClick={handleClick}
            className="inline-flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors"
          >
            {ctaText}
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </Card>
  );
};

export default SponsoredContent;
