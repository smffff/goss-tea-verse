import React from 'react';
import { Button } from '@/components/ui/button';
import { Code, Heart, Users, Twitter, LinkIcon, ArenaIcon } from 'lucide-react';
import TipButton from '@/components/TipButton';

const DeveloperAttribution = () => {
  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const developerSocialLinks = [
    {
      name: 'Arena Social',
      icon: ArenaIcon,
      url: 'https://arena.social/?ref=CTeaNews',
      color: 'hover:text-blue-400'
    },
    {
      name: 'X/Twitter',
      icon: Twitter,
      url: 'https://x.com/ladyinvsible',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Linktree',
      icon: LinkIcon,
      url: 'https://linktr.ee/ladyinvsible',
      color: 'hover:text-green-400'
    }
  ];

  return (
    <div className="border-t border-ctea-teal/20 pt-8 mb-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-ctea-purple" />
            <span className="text-gray-300">Built with</span>
            <Heart className="w-4 h-4 text-red-400" />
            <span className="text-gray-300">by</span>
            <span className="text-ctea-teal font-semibold">ladyinvsible</span>
          </div>
          <div className="flex items-center gap-3">
            {developerSocialLinks.map((social) => (
              <Button
                key={social.name}
                variant="ghost"
                size="sm"
                onClick={() => openLink(social.url)}
                className={`text-gray-400 ${social.color} transition-colors duration-200`}
                aria-label={social.name}
              >
                <social.icon className="w-4 h-4" />
              </Button>
            ))}
          </div>
        </div>
        <TipButton variant="default" />
      </div>
    </div>
  );
};

export default DeveloperAttribution;
