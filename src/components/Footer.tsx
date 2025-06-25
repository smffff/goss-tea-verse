import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Coffee, ExternalLink, Twitter, MessageCircle, Users, ArrowRight, Sparkles } from 'lucide-react';

const Footer = () => {
  const footerLinks = [
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
    { path: '/privacy', label: 'Privacy' }
  ];

  const socialLinks = [
    { href: 'https://twitter.com/ctea_newsroom', label: 'Twitter', icon: <Twitter className="w-4 h-4" /> },
    { href: '#', label: 'Arena', icon: <MessageCircle className="w-4 h-4" /> },
    { href: '#', label: 'Discord', icon: <Users className="w-4 h-4" /> }
  ];

  return (
    <footer className="py-16 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Coffee className="w-12 h-12 text-purple-400 animate-float" />
                <div className="absolute -top-1 -right-1">
                  <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
                </div>
              </div>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              Now accepting early users, contributors, and meme whisperers. 
              Because Web3 doesn't need another whitepaper—it needs a gossip column.
            </p>
            <p className="text-sm text-gray-400 italic">
              Spill responsibly, but spill often. 🫖
            </p>
          </div>
          
          {/* Get Started Button */}
          <div className="mb-8">
            <Link to="/app">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold uppercase tracking-wide px-8 py-4 text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                <ArrowRight className="w-5 h-5 mr-2" />
                Get Started - Enter the Newsroom
              </Button>
            </Link>
          </div>
          
          {/* Footer Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <a href="https://cteanews.com" className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-all duration-300 hover:scale-110 group">
              <ExternalLink className="w-4 h-4 group-hover:animate-pulse" />
              <span className="font-medium">cteanews.com</span>
            </a>
            
            {/* Social Links */}
            {socialLinks.map((link, index) => (
              <a 
                key={index}
                href={link.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-all duration-300 hover:scale-110 group"
              >
                {link.icon}
                <span className="font-medium">{link.label}</span>
              </a>
            ))}
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {footerLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="text-purple-400 hover:text-purple-300 transition-all duration-300 hover:scale-110 font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <div className="text-sm text-gray-500 border-t border-gray-700 pt-6">
            © 2024 CTea Newsroom. Spill responsibly. 🫖
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 