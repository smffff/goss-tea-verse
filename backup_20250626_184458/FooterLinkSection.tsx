
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface FooterLink {
  name: string;
  href: string;
  external?: boolean;
}

interface FooterLinkSectionProps {
  title: string;
  links: FooterLink[];
}

const FooterLinkSection: React.FC<FooterLinkSectionProps> = ({ title, links }) => {
  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div>
      <h3 className="text-white font-semibold mb-3 text-sm">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.name}>
            {link.external ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => openLink(link.href)}
                className="text-gray-400 hover:text-ctea-teal text-sm justify-start p-0 h-auto font-normal"
              >
                {link.name}
                <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            ) : (
              <Link
                to={link.href}
                className="text-gray-400 hover:text-ctea-teal text-sm transition-colors duration-200 block"
              >
                {link.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinkSection;
