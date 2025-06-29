
import React from 'react';
import { Button } from '@/components/ui/button';
import { Twitter, Github, MessageCircle, ExternalLink } from 'lucide-react';
import { SOCIAL_CONFIG } from '@/config/social';

const FooterSocialLinks = () => {
  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const socialLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: SOCIAL_CONFIG.twitter.url,
      color: 'hover:text-blue-400',
      label: SOCIAL_CONFIG.twitter.handle
    },
    {
      name: 'Arena Social',
      icon: ExternalLink,
      url: SOCIAL_CONFIG.arena.url,
      color: 'hover:text-purple-400',
      label: 'Arena'
    },
    {
      name: 'Discord',
      icon: MessageCircle,
      url: 'https://discord.gg/ctea',
      color: 'hover:text-purple-400',
      label: 'Discord'
    },
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/ctea-platform',
      color: 'hover:text-gray-300',
      label: 'GitHub'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Social Links */}
      <div className="flex flex-wrap items-center gap-3">
        {socialLinks.map((social) => (
          <Button
            key={social.name}
            variant="ghost"
            size="sm"
            onClick={() => openLink(social.url)}
            className={`text-gray-400 ${social.color} transition-colors duration-200 flex items-center gap-2`}
            aria-label={social.name}
          >
            <social.icon className="w-4 h-4" />
            <span className="text-sm">{social.label}</span>
          </Button>
        ))}
      </div>
      
      {/* Token Info */}
      <div className="border-t border-gray-700 pt-4">
        <div className="flex items-center gap-2 text-sm text-ctea-teal">
          <span className="font-semibold">{SOCIAL_CONFIG.token.symbol}</span>
          <span className="text-gray-400">on {SOCIAL_CONFIG.token.network}</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          The official CTea token for community governance and rewards
        </p>
      </div>
    </div>
  );
};

export default FooterSocialLinks;
