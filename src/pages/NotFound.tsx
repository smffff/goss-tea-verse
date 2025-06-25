import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Home, ArrowLeft, Coffee, Search, TrendingUp, Plus, Trophy } from 'lucide-react';
import Footer from '@/components/Footer';

const NotFound = () => {
  const navigate = useNavigate();

  const popularPages = [
    { path: '/feed', label: 'Hot Takes Feed', icon: <TrendingUp className="w-4 h-4" />, description: 'Latest crypto gossip and drama' },
    { path: '/submit', label: 'Spill Tea', icon: <Plus className="w-4 h-4" />, description: 'Share your hottest takes' },
    { path: '/leaderboard', label: 'Leaderboard', icon: <Trophy className="w-4 h-4" />, description: 'Top contributors and rankings' },
    { path: '/about', label: 'About CTea', icon: <Coffee className="w-4 h-4" />, description: 'Learn about our platform' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50">
      {/* Header */}
      <header className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src="/ctea-logo-icon.svg" 
                alt="CTEA Logo" 
                className="w-8 h-8 group-hover:scale-110 transition-transform duration-200" 
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900 group-hover:text-[#00d1c1] transition-colors duration-200">
                  CTea Newsroom
                </h1>
                <p className="text-xs text-[#00d1c1]">Beta • Managed Chaos, Served Hot</p>
              </div>
            </Link>
            
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="border-[#00d1c1] text-[#00d1c1] hover:bg-[#00d1c1]/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* 404 Illustration */}
            <div className="mb-8">
              <div className="relative inline-block">
                <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-[#00d1c1] to-[#ff61a6] rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <Coffee className="w-16 h-16 sm:w-20 sm:h-20 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
                  404
                </div>
              </div>
            </div>

            {/* Error Message */}
            <div className="mb-8">
              <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-4">
                Oops! Tea Spilled ☕
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 mb-6">
                Looks like this page got lost in the crypto chaos
              </p>
              <p className="text-gray-500 max-w-2xl mx-auto">
                The page you're looking for doesn't exist or has been moved. 
                Don't worry, there's plenty of hot tea to spill elsewhere!
              </p>
            </div>

            {/* Quick Actions */}
            <div className="mb-12">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-gradient-to-r from-[#00d1c1] to-[#ff61a6] text-white font-bold py-3 px-8 hover:scale-105 transition-transform duration-200"
                  onClick={() => navigate('/')}
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Button>
                <Button 
                  variant="outline"
                  className="border-[#00d1c1] text-[#00d1c1] hover:bg-[#00d1c1]/10 py-3 px-8 hover:scale-105 transition-transform duration-200"
                  onClick={() => navigate('/feed')}
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Browse Feed
                </Button>
              </div>
            </div>

            {/* Popular Pages */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Popular Pages
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {popularPages.map((page) => (
                  <Link
                    key={page.path}
                    to={page.path}
                    className="group"
                  >
                    <Card className="p-6 bg-white/80 backdrop-blur-sm border border-[#00d1c1]/20 hover:border-[#00d1c1]/40 hover:shadow-lg transition-all duration-200 group-hover:scale-105">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-gradient-to-r from-[#00d1c1] to-[#ff61a6] rounded-lg group-hover:scale-110 transition-transform duration-200">
                          {React.cloneElement(page.icon, { className: "w-4 h-4 text-white" })}
                        </div>
                        <h3 className="font-bold text-gray-900 group-hover:text-[#00d1c1] transition-colors duration-200">
                          {page.label}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600">
                        {page.description}
                      </p>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* Search Suggestion */}
            <div className="mb-12">
              <Card className="p-8 bg-gradient-to-br from-[#ff61a6]/10 to-[#9b59b6]/10 border border-[#ff61a6]/30">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Search className="w-6 h-6 text-[#ff61a6]" />
                  <h3 className="text-xl font-bold text-gray-900">
                    Can't find what you're looking for?
                  </h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Try searching for specific topics or check out our trending content
                </p>
                <Button 
                  className="bg-gradient-to-r from-[#00d1c1] to-[#ff61a6] text-white font-bold py-3 px-6 hover:scale-105 transition-transform duration-200"
                  onClick={() => navigate('/feed')}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Explore Feed
                </Button>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="mb-8">
              <Card className="p-6 bg-white/60 backdrop-blur-sm border border-[#00d1c1]/20">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Need Help?
                </h3>
                <p className="text-gray-600 mb-4">
                  If you think this is a mistake or need assistance, reach out to us:
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="mailto:hello@ctea.news"
                    className="text-[#00d1c1] hover:text-[#ff61a6] font-medium transition-colors duration-200"
                  >
                    hello@ctea.news
                  </a>
                  <a 
                    href="https://twitter.com/ctea_newsroom"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00d1c1] hover:text-[#ff61a6] font-medium transition-colors duration-200"
                  >
                    @ctea_newsroom
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
