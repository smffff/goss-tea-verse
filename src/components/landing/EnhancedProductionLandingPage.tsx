
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Coffee, TrendingUp, User, Star } from 'lucide-react';
import EnhancedTeaCup from '@/components/ui/EnhancedTeaCup';
import { useUnifiedAuth } from '@/hooks/useUnifiedAuth';

const EnhancedProductionLandingPage: React.FC = () => {
  const { user } = useUnifiedAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-background via-brand-neutral to-brand-darker">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 relative">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <EnhancedTeaCup size="xl" variant="glowing" animated={true} className="mx-auto mb-8" />
            
            <h1 className="text-6xl md:text-8xl font-anton text-brand-text mb-6">
              CTea News ☕
            </h1>
            
            <p className="text-xl md:text-2xl text-brand-text-secondary mb-8 max-w-2xl mx-auto">
              Where crypto gossip gets served piping hot. Join the most exclusive 
              anonymous newsroom in the crypto world.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {user ? (
                <Link to="/home">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      size="lg"
                      className="btn-brand-primary text-lg px-8 py-4"
                    >
                      <TrendingUp className="mr-2 w-5 h-5" />
                      Enter Dashboard
                    </Button>
                  </motion.div>
                </Link>
              ) : (
                <>
                  <Link to="/auth">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        size="lg"
                        className="btn-brand-primary text-lg px-8 py-4"
                      >
                        <User className="mr-2 w-5 h-5" />
                        Join Anonymously
                      </Button>
                    </motion.div>
                  </Link>
                  
                  <Link to="/home">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        size="lg"
                        variant="outline"
                        className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-brand-background text-lg px-8 py-4"
                      >
                        <Coffee className="mr-2 w-5 h-5" />
                        Explore
                      </Button>
                    </motion.div>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-anton text-brand-text mb-4">
              Why CTea News?
            </h2>
            <p className="text-xl text-brand-text-secondary max-w-2xl mx-auto">
              The ultimate platform for crypto insiders to share and discover the hottest gossip.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Coffee className="w-8 h-8" />,
                title: "Anonymous Spilling",
                description: "Share crypto gossip without revealing your identity. Safe, secure, and completely anonymous."
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Hot Takes Feed",
                description: "Get the latest crypto drama and insider information before it hits mainstream media."
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: "Community Driven",
                description: "Built by crypto enthusiasts for crypto enthusiasts. Real stories, real drama, real tea."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-brand-neutral/50 p-8 rounded-lg border border-brand-primary/20 text-center"
              >
                <div className="text-brand-primary mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-brand-text mb-4">
                  {feature.title}
                </h3>
                <p className="text-brand-text-secondary">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-anton text-brand-text mb-6">
              Ready to Spill Some Tea? ☕
            </h2>
            <p className="text-xl text-brand-text-secondary mb-8">
              Join thousands of crypto insiders sharing the hottest gossip and drama.
            </p>
            
            {!user && (
              <Link to="/auth">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="lg"
                    className="btn-brand-primary text-lg px-12 py-4"
                  >
                    <User className="mr-2 w-5 h-5" />
                    Get Started Now
                  </Button>
                </motion.div>
              </Link>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default EnhancedProductionLandingPage;
