
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { track } from '@/utils/analytics';

interface AffiliateLinkProps {
  href: string;
  children: React.ReactNode;
  platform: string;
  placement: 'inline' | 'banner' | 'button';
  className?: string;
}

const AffiliateLink: React.FC<AffiliateLinkProps> = ({
  href,
  children,
  platform,
  placement,
  className = ''
}) => {
  const handleClick = () => {
    track('affiliate_click', {
      platform,
      placement,
      url: href
    });
  };

  return (
    <div className={`relative ${className}`}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        onClick={handleClick}
        className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        {children}
        <ExternalLink className="w-3 h-3" />
      </a>
      {placement === 'banner' && (
        <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs">
          Partner
        </Badge>
      )}
    </div>
  );
};

export default AffiliateLink;
