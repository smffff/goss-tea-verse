
import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND_CONFIG } from '@/lib/config/brandConfig';

const UnifiedFooter: React.FC = () => {
  return (
    <footer className="bg-brand-neutral border-t border-brand-primary/20 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🫖</span>
              <span className="font-anton text-xl text-brand-text">CTea News</span>
            </div>
            <p className="text-brand-text-secondary text-sm">
              The ultimate platform for anonymous crypto gossip and community-driven news.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-brand-text mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/feed" className="block text-brand-text-secondary hover:text-brand-primary text-sm">
                Tea Feed
              </Link>
              <Link to="/spill" className="block text-brand-text-secondary hover:text-brand-primary text-sm">
                Spill Tea
              </Link>
              <Link to="/leaderboard" className="block text-brand-text-secondary hover:text-brand-primary text-sm">
                Leaderboard
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-brand-text mb-4">Company</h3>
            <div className="space-y-2">
              <Link to="/about" className="block text-brand-text-secondary hover:text-brand-primary text-sm">
                About
              </Link>
              <Link to="/team" className="block text-brand-text-secondary hover:text-brand-primary text-sm">
                Team
              </Link>
              <Link to="/contact" className="block text-brand-text-secondary hover:text-brand-primary text-sm">
                Contact
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-brand-text mb-4">Legal</h3>
            <div className="space-y-2">
              <Link to="/privacy" className="block text-brand-text-secondary hover:text-brand-primary text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="block text-brand-text-secondary hover:text-brand-primary text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-brand-primary/20 mt-8 pt-8 text-center">
          <p className="text-brand-text-secondary text-sm">
            © 2024 CTea News. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default UnifiedFooter;
