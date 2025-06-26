
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, Users, TrendingUp, Droplets } from 'lucide-react';
import BrandedTeacupIcon from '@/components/ui/BrandedTeacupIcon';

const OGSipperZoneSection: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [1800, 2800], [100, -100]);
  const opacity = useTransform(scrollY, [1700, 2000, 2600, 2900], [0, 1, 1, 0]);

  const leaderboardData = [
    { rank: 1, name: "TeaMaster420", spills: 69, badge: "👑" },
    { rank: 2, name: "GossipGuru", spills: 42, badge: "🥈" },
    { rank: 3, name: "ChaosSipper", spills: 37, badge: "🥉" },
    { rank: 4, name: "DramaDegen", spills: 28, badge: "🫖" },
    { rank: 5, name: "SpillMaster", spills: 23, badge: "☕" }
  ];

  return (
    <motion.section 
      className="min-h-screen flex items-center justify-center px-4 py-20 relative"
      style={{ y, opacity }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 flex items-center justify-center gap-4"
              style={{ fontFamily: "'Luckiest Guy', cursive" }}>
            <Crown className="w-16 h-16 text-yellow-400" />
            OG Sipper Zone
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            The elite circle of chaos creators. Earn your spot among the legends.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* OG Badge Spotlight */}
          <motion.div
            initial={{ x: -50, opacity: 0, scale: 0.8 }}
            whileInView={{ x: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-2 border-purple-400/50 p-8 relative overflow-hidden">
              <CardContent className="relative z-10">
                {/* Animated Background Particles */}
                <div className="absolute inset-0 overflow-hidden">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-purple-400/30 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0.3, 0.8, 0.3],
                        scale: [1, 1.5, 1]
                      }}
                      transition={{
                        duration: 4 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2
                      }}
                    />
                  ))}
                </div>

                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="mb-6"
                >
                  <div className="w-32 h-32 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20">
                    <div className="text-white text-center">
                      <Crown className="w-12 h-12 mx-auto mb-2" />
                      <div className="text-lg font-bold">OG</div>
                      <div className="text-sm">SIPPER</div>
                    </div>
                  </div>
                </motion.div>

                <h3 className="text-3xl font-bold text-white mb-4">
                  Exclusive OG Badge
                </h3>
                <p className="text-purple-300 mb-6">
                  Reserved for the original chaos creators who shaped the CTea culture. 
                  Unlock special privileges and recognition.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <Badge className="bg-purple-500/20 text-purple-300 justify-center py-2">
                    <BrandedTeacupIcon size="sm" className="mr-2" />
                    Exclusive Access
                  </Badge>
                  <Badge className="bg-pink-500/20 text-pink-300 justify-center py-2">
                    <Droplets className="w-4 h-4 mr-2" />
                    Bonus $TEA
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Leaderboard Preview */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border-2 border-cyan-400/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="w-8 h-8 text-cyan-400" />
                  <h3 className="text-2xl font-bold text-white">Top Sippers</h3>
                  <Badge className="bg-cyan-400/20 text-cyan-300">Live</Badge>
                </div>

                <div className="space-y-3">
                  {leaderboardData.map((user, index) => (
                    <motion.div
                      key={user.rank}
                      initial={{ x: 20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:border-cyan-400/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{user.badge}</span>
                        <div>
                          <div className="text-white font-semibold">{user.name}</div>
                          <div className="text-cyan-400 text-sm">#{user.rank} Sipper</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-bold">{user.spills}</div>
                        <div className="text-gray-400 text-sm">spills</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  viewport={{ once: true }}
                  className="mt-6 text-center"
                >
                  <div className="flex items-center justify-center gap-2 text-cyan-400">
                    <Users className="w-5 h-5" />
                    <span className="text-sm">1,337 Total Sippers</span>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default OGSipperZoneSection;
