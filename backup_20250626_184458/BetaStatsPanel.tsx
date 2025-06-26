
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Zap, Eye, Coffee } from 'lucide-react';
import { BRAND_CONFIG } from '@/lib/config/brandConfig';

const BetaStatsPanel: React.FC = () => {
  const [stats, setStats] = useState({
    totalSubmissions: 0,
    liveViewers: 0,
    teaBurned: 0,
    approvedSpills: 0,
    activeCodes: 0
  });

  useEffect(() => {
    // Animate stats on load
    const animateStats = () => {
      const targets = {
        totalSubmissions: 2847,
        liveViewers: 127,
        teaBurned: 15420,
        approvedSpills: 1293,
        activeCodes: 42
      };

      const duration = 2500;
      const steps = 50;
      const stepTime = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = Math.min(step / steps, 1);
        
        setStats({
          totalSubmissions: Math.floor(targets.totalSubmissions * progress),
          liveViewers: Math.floor(targets.liveViewers * progress),
          teaBurned: Math.floor(targets.teaBurned * progress),
          approvedSpills: Math.floor(targets.approvedSpills * progress),
          activeCodes: Math.floor(targets.activeCodes * progress)
        });

        if (step >= steps) clearInterval(timer);
      }, stepTime);

      return () => clearInterval(timer);
    };

    const cleanup = animateStats();
    
    // Simulate live updates
    const liveTimer = setInterval(() => {
      setStats(prev => ({
        ...prev,
        liveViewers: Math.max(50, prev.liveViewers + Math.floor(Math.random() * 10 - 3))
      }));
    }, 3000);

    return () => {
      cleanup?.();
      clearInterval(liveTimer);
    };
  }, []);

  const statCards = [
    {
      icon: Coffee,
      label: 'Total Spills',
      value: stats.totalSubmissions,
      color: BRAND_CONFIG.colors.primary,
      suffix: ''
    },
    {
      icon: Eye,
      label: 'Live Viewers',
      value: stats.liveViewers,
      color: BRAND_CONFIG.colors.accent,
      suffix: '',
      animate: true
    },
    {
      icon: Zap,
      label: '$TEA Burned',
      value: stats.teaBurned,
      color: BRAND_CONFIG.colors.orange,
      suffix: ''
    },
    {
      icon: TrendingUp,
      label: 'Approved',
      value: stats.approvedSpills,
      color: '#10B981',
      suffix: ''
    },
    {
      icon: Users,
      label: 'Active Codes',
      value: stats.activeCodes,
      color: '#8B5CF6',
      suffix: ' live'
    }
  ];

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Retro background */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 216, 164, 0.1) 2px, transparent 2px),
              linear-gradient(90deg, rgba(255, 79, 179, 0.1) 2px, transparent 2px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-headline font-bold mb-6">
            <span 
              className="bg-gradient-to-r from-[#00D8A4] to-[#FF4FB3] bg-clip-text text-transparent"
              style={{ fontFamily: 'Luckiest Guy, cursive' }}
            >
              Live Beta Stats
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Real-time gossip metrics from the frontlines of Web3 culture
          </p>
          <div className="mt-4 text-sm text-[#FF9C39] font-mono">
            🌽 Iowa State Fair activation coming soon 🌽
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-black/40 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:border-white/40 transition-all duration-300"
            >
              <div className="flex items-center justify-center mb-4">
                <stat.icon 
                  className="w-8 h-8"
                  style={{ color: stat.color }}
                />
              </div>
              
              <div className="text-center">
                <motion.div
                  className="text-3xl font-bold mb-2"
                  style={{ color: stat.color }}
                  animate={stat.animate ? {
                    scale: [1, 1.1, 1],
                  } : {}}
                  transition={stat.animate ? {
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  } : {}}
                >
                  {stat.value.toLocaleString()}{stat.suffix}
                </motion.div>
                <p className="text-white/70 text-sm font-medium">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Meme Taglines */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center mt-16 space-y-4"
        >
          <p className="text-2xl font-bold text-[#FF4FB3]">
            "Finally, utility for your meme portfolio."
          </p>
          <p className="text-lg text-white/60 font-mono">
            Built for degens. And you. 💎
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default BetaStatsPanel;
