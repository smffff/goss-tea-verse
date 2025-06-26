
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Droplets, ExternalLink } from 'lucide-react';

interface BlurCardProps {
  title?: string;
  preview?: string;
  requiredSoap?: number;
  className?: string;
}

const BlurCard: React.FC<BlurCardProps> = ({
  title = "[REDACTED]",
  preview = "Hidden content requires SOAP credibility...",
  requiredSoap = 1,
  className = ""
}) => {
  const handleArenaLink = () => {
    const arenaUrl = 'arena://stage/[redacted]';
    const fallbackUrl = 'https://arena.ctea.app/stage/redacted';
    
    try {
      window.location.href = arenaUrl;
      setTimeout(() => {
        window.open(fallbackUrl, '_blank');
      }, 500);
    } catch {
      window.open(fallbackUrl, '_blank');
    }
  };

  return (
    <Card className={`relative overflow-hidden bg-gradient-to-br from-cyan-900/20 to-blue-900/30 border-cyan-400/20 ${className}`}>
      <CardContent className="p-4 relative">
        {/* Translucent soap-bubble ribbon */}
        <div className="absolute top-0 right-0 bg-gradient-to-l from-cyan-400/30 to-transparent h-8 w-32 transform rotate-12 translate-x-4 -translate-y-2" />
        
        {/* Floating soap bubbles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-gradient-to-br from-white/30 to-cyan-200/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-white blur-sm select-none">
              {title}
            </h4>
            <Badge className="bg-cyan-400/20 text-cyan-300 border-cyan-400/30">
              <Droplets className="w-3 h-3 mr-1" />
              {requiredSoap} $SOAP
            </Badge>
          </div>
          
          <p className="text-gray-300 text-sm blur-sm select-none">
            {preview}
          </p>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={handleArenaLink}
              variant="outline"
              size="sm"
              className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 w-full"
            >
              <Droplets className="w-4 h-4 mr-2" />
              Earn SOAP with @agentboff
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlurCard;
