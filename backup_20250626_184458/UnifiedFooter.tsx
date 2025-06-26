
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ExternalLink, Heart, Code } from 'lucide-react';
import { BrandLogo } from '@/components/brand/BrandElements';
import { footerNavigationItems } from '@/components/navigation/NavigationItems';
import { BRAND_CONFIG } from '@/lib/config/brandConfig';
import TipButton from '@/components/TipButton';

const UnifiedFooter = () => {
  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Navigation',
      links: footerNavigationItems
    },
    {
      title: 'Community',
      links: [
        { name: 'Twitter', href: BRAND_CONFIG.social.twitter, external: true },
        { name: 'Arena Social', href: BRAND_CONFIG.social.arena, external: true },
        { name: 'Discord', href: BRAND_CONFIG.social.discord, external: true },
        { name: 'GitHub', href: BRAND_CONFIG.social.github, external: true }
      ]
    },
    {
      title: 'Contact',
      links: [
        { name: 'Press Inquiries', href: `mailto:${BRAND_CONFIG.contact.press}`, external: true },
        { name: 'Submit Tips', href: `mailto:${BRAND_CONFIG.contact.tips}`, external: true },
        { name: 'General Contact', href: `mailto:${BRAND_CONFIG.contact.general}`, external: true }
      ]
    }
  ];

  return (
    <footer className="bg-tabloid-black-900 border-t border-vintage-red/20">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <BrandLogo size="lg" showText />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {BRAND_CONFIG.description}
            </p>
            <div className="flex items-center gap-2 text-sm text-vintage-red">
              <span>☕</span>
              <span>{BRAND_CONFIG.tagline}</span>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-3 text-sm font-headline uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.external ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openLink(link.href)}
                        className="text-gray-400 hover:text-vintage-red text-sm justify-start p-0 h-auto font-normal"
                      >
                        {link.name}
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </Button>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-gray-400 hover:text-vintage-red text-sm transition-colors duration-200 block"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Developer Attribution */}
        <div className="border-t border-vintage-red/20 pt-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-vintage-red" />
                <span className="text-gray-300">Built with</span>
                <Heart className="w-4 h-4 text-red-400" />
                <span className="text-gray-300">by</span>
                <span className="text-vintage-red font-semibold">ladyinvsible</span>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openLink('https://arena.social/?ref=LadyInvsible')}
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                  aria-label="Arena Social"
                >
                  Arena
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openLink('https://x.com/ladyinvsible')}
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                  aria-label="Twitter"
                >
                  Twitter
                </Button>
              </div>
            </div>
            <TipButton variant="default" />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-vintage-red/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">
            © {currentYear} {BRAND_CONFIG.name}. All rights reserved.
          </div>
          <div className="text-gray-400 text-sm italic">
            Emotional intelligence meets memecoin culture ☕
          </div>
        </div>
      </div>
    </footer>
  );
};

export default UnifiedFooter;
