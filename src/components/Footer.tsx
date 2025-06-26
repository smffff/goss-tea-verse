import React from 'react';
import { Coffee, Twitter, Github, MessageCircle } from 'lucide-react';
import { APP_CONFIG } from '@/config/app';
import AboutCTeaBuilder from './footer/AboutCTeaBuilder';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Coffee className="w-6 h-6 text-ctea-pink" />
              <span className="text-xl font-bold text-white">CTea Newsroom</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              {APP_CONFIG.description}
            </p>
            <div className="flex gap-4">
              <a 
                href={APP_CONFIG.social.twitter} 
                className="text-gray-400 hover:text-ctea-pink transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href={APP_CONFIG.social.discord} 
                className="text-gray-400 hover:text-ctea-pink transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a 
                href={APP_CONFIG.social.github} 
                className="text-gray-400 hover:text-ctea-pink transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-ctea-pink transition-colors">Home</a></li>
              <li><a href="/feed" className="text-gray-400 hover:text-ctea-pink transition-colors">Tea Feed</a></li>
              <li><a href="/leaderboard" className="text-gray-400 hover:text-ctea-pink transition-colors">Leaderboard</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-ctea-pink transition-colors">About</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="/terms" className="text-gray-400 hover:text-ctea-pink transition-colors">Terms</a></li>
              <li><a href="/privacy" className="text-gray-400 hover:text-ctea-pink transition-colors">Privacy</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-ctea-pink transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 CTea Newsroom. Built by Lady Invisible.
          </div>
          <div className="text-gray-400 text-sm">
            Emotional intelligence meets memecoin culture ☕
          </div>
        </div>

        <div className="flex items-center justify-end pr-4">
          <AboutCTeaBuilder />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
