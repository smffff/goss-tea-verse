
import React from 'react';
import { Button } from '@/components/ui/button';
import { Twitter, Github, MessageCircle, Heart, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

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

  const footerLinks = [
    {
      title: 'Platform',
      links: [
        { name: 'About', href: '/about' },
        { name: 'Features', href: '/features' },
        { name: 'Tokenomics', href: '/token' },
        { name: 'Governance', href: '/governance' }
      ]
    },
    {
      title: 'Community',
      links: [
        { name: 'Discord', href: 'https://discord.gg/ctea', external: true },
        { name: 'Twitter', href: 'https://twitter.com/cteaplatform', external: true },
        { name: 'Blog', href: '/blog', external: false },
        { name: 'Newsletter', href: '/newsletter', external: false }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '/docs', external: false },
        { name: 'API', href: '/api', external: false },
        { name: 'Help Center', href: '/help', external: false },
        { name: 'Status', href: 'https://status.ctea.io', external: true }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' },
        { name: 'Contact', href: '/contact' }
      ]
    }
  ];

  return (
    <footer className="bg-ctea-darker border-t border-ctea-teal/20">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-ctea-teal to-ctea-purple rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-xl font-bold text-white">CTea</span>
            </div>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
              The ultimate platform for crypto gossip, verified rumors, and community-driven truth. 
              Spill the tea, earn rewards, and stay ahead of the crypto narrative.
            </p>
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
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-3 text-sm">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
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
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-ctea-teal text-sm transition-colors duration-200"
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="border-t border-ctea-teal/20 pt-8 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-ctea-teal">1.2M+</div>
              <div className="text-sm text-gray-400">Tea Spilled</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-ctea-purple">420K+</div>
              <div className="text-sm text-gray-400">Active Sippers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-ctea-yellow">$2.1M</div>
              <div className="text-sm text-gray-400">Rewards Distributed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-ctea-pink">99.9%</div>
              <div className="text-sm text-gray-400">Uptime</div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-ctea-teal/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-400">
              © {currentYear} CTea Platform. All rights reserved.
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-400">
              Made with <Heart className="w-4 h-4 text-red-400" /> for the crypto community
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
