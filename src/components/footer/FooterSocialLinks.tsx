
import React from 'react';
import { Button } from '@/components/ui/button';
import { Twitter, Github, MessageCircle } from 'lucide-react';

const FooterSocialLinks = () => {
  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const socialLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: 'https://twitter.com/cteaplatform',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Discord',
      icon: MessageCircle,
      url: 'https://discord.gg/ctea',
      color: 'hover:text-purple-400'
    },
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/ctea-platform',
      color: 'hover:text-gray-300'
    }
  ];

  return (
    <div className="flex items-center gap-3">
      {socialLinks.map((social) => (
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
  );
};

export default FooterSocialLinks;
