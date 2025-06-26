
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, Users, TrendingUp, Droplets, Coins } from 'lucide-react';
import BrandedTeacupIcon from '@/components/ui/BrandedTeacupIcon';

const OGSippersSection: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [1800, 2800], [100, -100]);
  const opacity = useTransform(scrollY, [1700, 2000, 2600, 2900], [0, 1, 1, 0]);

  const leaderboardData = [
    { rank: 1, name: "TeaMaster420", spills: 69, badge: "👑", teaAmount: "420 $TEA" },
    { rank: 2, name: "GossipGuru", spills: 42, badge: "🥈", teaAmount: "337 $TEA" },
    { rank: 3, name: "ChaosSipper", spills: 37, badge: "🥉", teaAmount: "256 $TEA" },
    { rank: 4, name: "DramaDegen", spills: 28, badge: "🫖", teaAmount: "189 $TEA" },
    { rank: 5, name: "SpillMaster", spills: 23, badge: "☕", teaAmount: "142 $TEA" }
  ];

  return (
    <motion.section 
      className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden"
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
              style={{ 
                fontFamily: "'Anton', 'Impact', sans-serif",
                textShadow: '0 0 20px rgba(255, 193, 7, 0.5)'
              }}>
            <Crown className="w-16 h-16 text-yellow-400" />
            OG Sipper Zone
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            The elite circle of chaos creators. Earn your spot among the legends.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Enhanced OG Badge Spotlight */}
          <motion.div
            initial={{ x: -50, opacity: 0, scale: 0.8 }}
            whileInView={{ x: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center relative"
          >
            {/* Floating $TEA tokens around the badge */}
            <motion.div
              className="absolute -top-8 -left-8 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-black font-bold text-xs border-2 border-yellow-400/80"
              animate={{ 
                rotateY: [0, 360],
                y: [0, -15, 0],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                rotateY: { duration: 4, repeat: Infinity, ease: 'linear' },
                y: { duration: 3, repeat: Infinity },
                rotate: { duration: 8, repeat: Infinity, ease: 'linear' }
              }}
              style={{ filter: 'drop-shadow(0 0 15px rgba(255, 193, 7, 0.8))' }}
            >
              $TEA
            </motion.div>

            <motion.div
              className="absolute -top-4 -right-12 w-10 h-10 bg-gradient-to-r from-green-400 to-cyan-500 rounded-full flex items-center justify-center text-black font-bold text-xs border-2 border-green-400/80"
              animate={{ 
                rotateY: [360, 0],
                x: [0, 10, 0],
                rotate: [0, -180, -360]
              }}
              transition={{ 
                rotateY: { duration: 6, repeat: Infinity, ease: 'linear' },
                x: { duration: 4, repeat: Infinity, delay: 1 },
                rotate: { duration: 6, repeat: Infinity, ease: 'linear' }
              }}
              style={{ filter: 'drop-shadow(0 0 12px rgba(76, 175, 80, 0.8))' }}
            >
              TEA
            </motion.div>

            <motion.div
              className="absolute -bottom-6 -left-4 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xs border-2 border-purple-400/80"
              animate={{ 
                rotateY: [0, 360],
                y: [0, 10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                rotateY: { duration: 5, repeat: Infinity, ease: 'linear' },
                y: { duration: 3.5, repeat: Infinity, delay: 2 },
                scale: { duration: 2, repeat: Infinity, delay: 1 }
              }}
              style={{ filter: 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.8))' }}
            >
              69
            </motion.div>

            <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-4 border-purple-400/60 p-8 relative overflow-hidden"
                  style={{ 
                    borderRadius: '25px',
                    filter: 'drop-shadow(0 20px 40px rgba(168, 85, 247, 0.3))'
                  }}>
              <CardContent className="relative z-10">
                {/* Enhanced Animated Background Particles */}
                <div className="absolute inset-0 overflow-hidden">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 bg-purple-400/40 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -30, 0],
                        opacity: [0.2, 0.8, 0.2],
                        scale: [1, 1.5, 1],
                        rotate: [0, 180, 360]
                      }}
                      transition={{
                        duration: 4 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 2
                      }}
                    />
                  ))}
                </div>

                {/* Enhanced OG Badge */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, 2, -2, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="mb-6"
                >
                  <div className="w-40 h-40 mx-auto bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 rounded-full flex items-center justify-center shadow-2xl border-8 border-white/30 relative overflow-hidden"
                       style={{ filter: 'drop-shadow(0 0 30px rgba(168, 85, 247, 0.6))' }}>
                    
                    {/* Rotating gradient overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    />
                    
                    <div className="text-white text-center relative z-10">
                      <Crown className="w-16 h-16 mx-auto mb-2" />
                      <div className="text-2xl font-bold" style={{ fontFamily: "'Anton', 'Impact', sans-serif" }}>OG</div>
                      <div className="text-lg font-bold" style={{ fontFamily: "'Anton', 'Impact', sans-serif" }}>SIPPER</div>
                    </div>
                  </div>
                </motion.div>

                <motion.h3 
                  className="text-4xl font-bold text-white mb-4"
                  style={{ 
                    fontFamily: "'Anton', 'Impact', sans-serif",
                    textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)'
                  }}
                  whileInView={{ scale: [0.9, 1.1, 1] }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  Exclusive OG Badge
                </motion.h3>

                <motion.p 
                  className="text-purple-200 mb-6 text-lg leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <span className="text-yellow-400 font-bold text-2xl">Holding 69+ $TEA? You're Early AF.</span>
                  <br />
                  <br />
                  Reserved for the original chaos creators who shaped the CTea culture. 
                  Unlock special privileges and recognition.
                </motion.p>
                
                <div className="grid grid-cols-2 gap-4">
                  <Badge className="bg-purple-500/30 text-purple-200 justify-center py-3 border-2 border-purple-400/50 text-sm">
                    <BrandedTeacupIcon size="sm" className="mr-2" />
                    Exclusive Access
                  </Badge>
                  <Badge className="bg-pink-500/30 text-pink-200 justify-center py-3 border-2 border-pink-400/50 text-sm">
                    <Droplets className="w-4 h-4 mr-2" />
                    Bonus $TEA
                  </Badge>
                  <Badge className="bg-yellow-500/30 text-yellow-200 justify-center py-3 border-2 border-yellow-400/50 text-sm col-span-2">
                    <Coins className="w-4 h-4 mr-2" />
                    2x Meme Rewards
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Enhanced Leaderboard Preview */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-cyan-900/50 to-blue-900/50 border-4 border-cyan-400/60"
                  style={{ 
                    borderRadius: '20px',
                    filter: 'drop-shadow(0 15px 35px rgba(6, 182, 212, 0.3))'
                  }}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="w-10 h-10 text-cyan-400" 
                              style={{ filter: 'drop-shadow(0 0 15px rgba(6, 182, 212, 0.6))' }} />
                  <h3 className="text-3xl font-bold text-white" 
                      style={{ fontFamily: "'Anton', 'Impact', sans-serif" }}>
                    Top Sippers
                  </h3>
                  <Badge className="bg-cyan-400/20 text-cyan-300 border-cyan-400/50 px-3 py-1">
                    🔴 Live
                  </Badge>
                </div>

                <div className="space-y-3">
                  {leaderboardData.map((user, index) => (
                    <motion.div
                      key={user.rank}
                      initial={{ x: 20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-center justify-between p-4 bg-white/10 rounded-xl border-2 border-white/20 hover:border-cyan-400/50 transition-all duration-300 relative overflow-hidden"
                      style={{ filter: 'drop-shadow(0 5px 15px rgba(0, 0, 0, 0.2))' }}
                    >
                      {/* Ranking glow effect */}
                      {index < 3 && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-50" />
                      )}
                      
                      <div className="flex items-center gap-4 relative z-10">
                        <motion.span 
                          className="text-3xl"
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          transition={{ duration: 0.3 }}
                        >
                          {user.badge}
                        </motion.span>
                        <div>
                          <div className="text-white font-bold text-lg" 
                               style={{ fontFamily: "'Anton', 'Impact', sans-serif" }}>
                            {user.name}
                          </div>
                          <div className="text-cyan-400 text-sm">#{user.rank} Sipper</div>
                        </div>
                      </div>
                      <div className="text-right relative z-10">
                        <div className="text-white font-bold text-lg">{user.spills}</div>
                        <div className="text-gray-400 text-sm">spills</div>
                        <div className="text-yellow-400 text-xs font-bold">{user.teaAmount}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  viewport={{ once: true }}
                  className="mt-6 text-center p-4 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-xl border border-cyan-400/30"
                >
                  <div className="flex items-center justify-center gap-3 text-cyan-400 mb-2">
                    <Users className="w-6 h-6" />
                    <span className="text-lg font-bold" style={{ fontFamily: "'Anton', 'Impact', sans-serif" }}>
                      1,337 Total Sippers
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Join the elite. Start spilling to climb the ranks! 🫖
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default OGSippersSection;
