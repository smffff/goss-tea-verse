
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="bg-white/95 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] backdrop-blur-lg">
            <CardContent className="p-8 text-center space-y-6">
              {/* Meme-inspired header */}
              <div className="space-y-4">
                <div className="bg-yellow-200 border-4 border-black p-4 rounded-lg transform -rotate-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <p className="text-black font-bold text-lg">
                    REMEMBER, NFA...
                  </p>
                </div>
                
                <motion.img 
                  src="/lovable-uploads/58c00175-9395-4c1a-b741-60b32e37b93e.png" 
                  alt="CTea News Logo" 
                  className="w-20 h-20 mx-auto mb-4 object-contain"
                  animate={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                <h1 className="text-6xl font-anton text-yellow-500 stroke-black" 
                    style={{ 
                      textShadow: '3px 3px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black'
                    }}>
                  404 ERROR
                </h1>

                <div className="bg-gradient-to-r from-yellow-400 to-orange-400 border-4 border-black p-4 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <h2 className="text-2xl font-anton text-black">
                    $TEA UNDER CONSTRUCTION
                  </h2>
                </div>

                <div className="bg-cyan-400 border-4 border-black p-3 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <p className="text-black font-bold text-xl">
                    CTEANEWS.COM
                  </p>
                </div>
              </div>

              <div className="bg-white border-4 border-black p-6 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center justify-center mb-4">
                  <img 
                    src="/lovable-uploads/58c00175-9395-4c1a-b741-60b32e37b93e.png" 
                    alt="CTea News Logo" 
                    className="w-6 h-6 mr-2 object-contain"
                  />
                  <span className="text-black font-bold">Arena</span>
                </div>
                <p className="text-2xl font-anton text-black mb-4">
                  I'm NOT A DEVELOPER.
                </p>
                <p className="text-gray-700">
                  This page spilled its tea all over the internet. 
                  <br />
                  But hey, at least the memes are fresh! 🫖
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-black font-anton text-lg border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                    <Home className="w-5 h-5 mr-2" />
                    Back to Tea House
                  </Button>
                </Link>
                <Link to="/home">
                  <Button variant="outline" className="bg-cyan-400 hover:bg-cyan-500 text-black font-anton text-lg border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                    <img 
                      src="/lovable-uploads/58c00175-9395-4c1a-b741-60b32e37b93e.png" 
                      alt="CTea News Logo" 
                      className="w-5 h-5 mr-2 object-contain"
                    />
                    Dashboard
                  </Button>
                </Link>
              </div>

              <div className="pt-4">
                <button 
                  onClick={() => window.history.back()}
                  className="text-white hover:text-yellow-300 transition-colors flex items-center mx-auto font-bold"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go Back (No Financial Advice)
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
