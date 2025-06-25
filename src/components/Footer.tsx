
import React from 'react';
import { Heart } from 'lucide-react';
import FooterBrand from './footer/FooterBrand';
import FooterSocialLinks from './footer/FooterSocialLinks';
import FooterLinkSection from './footer/FooterLinkSection';
import FooterStats from './footer/FooterStats';
import DeveloperAttribution from './footer/DeveloperAttribution';

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
        { name: 'Trends', href: '/trends', external: false },
        { name: 'Campaigns', href: '/campaigns', external: false }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Feed', href: '/feed', external: false },
        { name: 'Submit Tea', href: '/submit', external: false },
        { name: 'Enhanced Feed', href: '/enhanced-feed', external: false },
        { name: 'Contact', href: '/contact', external: false }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'About Us', href: '/about' },
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
            <FooterBrand />
            <FooterSocialLinks />
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <FooterLinkSection
              key={section.title}
              title={section.title}
              links={section.links}
            />
          ))}
        </div>

        {/* Stats Bar */}
        <FooterStats />

        {/* Developer Attribution Section */}
        <DeveloperAttribution />

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
