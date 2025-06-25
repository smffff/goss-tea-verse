
import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Twitter, MessageCircle, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const UnifiedFooter = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    main: [
      { href: '/', label: 'Home' },
      { href: '/feed', label: 'Tea Feed' },
      { href: '/leaderboard', label: 'Leaderboard' },
      { href: '/about', label: 'About' },
    ],
    legal: [
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
      { href: '/contact', label: 'Contact' },
    ],
    social: [
      { 
        href: 'https://twitter.com/cteaplatform', 
        label: 'Twitter',
        icon: Twitter,
        external: true 
      },
      { 
        href: 'https://discord.gg/ctea', 
        label: 'Discord',
        icon: MessageCircle,
        external: true 
      },
      { 
        href: 'mailto:hello@cteanews.com?subject=CTea Newsroom Feedback', 
        label: 'Feedback',
        icon: Mail,
        external: true 
      },
    ]
  };

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-black border-t border-gray-800 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/ctea-logo-icon.svg" 
                alt="CTea Newsroom Logo" 
                className="w-6 h-6"
              />
              <span className="text-xl font-bold text-white">CTea Newsroom</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Where memes, gossip, and crypto collide. Spill tea, get paid, and watch the community decide what's hot or cold.
            </p>
            <div className="flex gap-3">
              {footerLinks.social.map((social) => {
                const Icon = social.icon;
                return (
                  <Button
                    key={social.label}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleExternalLink(social.href)}
                    className="text-gray-400 hover:text-white transition-colors p-2"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.main.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-bold mb-4">Legal & Support</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} CTea Newsroom. Built with ☕ by Lady Invisible.
          </div>
          <div className="text-gray-400 text-sm text-center md:text-right">
            Emotional intelligence meets memecoin culture
          </div>
        </div>
      </div>
    </footer>
  );
};

export default UnifiedFooter;
