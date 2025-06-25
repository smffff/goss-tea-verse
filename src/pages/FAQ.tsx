import React from 'react';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, Coffee, Zap, Shield, Trophy, MessageCircle, Bot } from 'lucide-react';

const FAQ = () => {
  const faqs = [
    {
      category: 'Getting Started',
      icon: Coffee,
      questions: [
        {
          question: 'What is CTea Newsroom?',
          answer: 'CTea Newsroom is where crypto gossip meets AI-powered reactions. Share anonymous tea, get roasted by our AI bot CTeaBot, and earn street cred through our leaderboard system. Think Wendy Williams meets GitHub Copilot.'
        },
        {
          question: 'Do I need to create an account?',
          answer: 'Nope! Everything is anonymous. We use secure tokens to track your submissions and reactions without requiring personal information. Just start spilling tea immediately.'
        },
        {
          question: 'How do I submit tea?',
          answer: 'Click "Spill Tea" in the navigation, choose a topic category, write your gossip (with optional media links), and hit submit. Your tea appears in the feed instantly!'
        }
      ]
    },
    {
      category: 'Scoring & Leaderboard',
      icon: Trophy,
      questions: [
        {
          question: 'How does the scoring system work?',
          answer: 'You earn points for activity: 5 points per tea submitted, 2 points per emoji reaction you give, plus bonus points for high engagement on your posts. The more the community reacts to your tea, the more bonus points you get!'
        },
        {
          question: 'What are the different leaderboard periods?',
          answer: 'We track rankings for Weekly (last 7 days), Monthly (last 30 days), and All-Time. This lets both new and veteran tea spillers compete fairly.'
        },
        {
          question: 'How are usernames generated?',
          answer: 'We automatically generate fun usernames like "SpicyTeaSpiller42" based on your anonymous token. Your avatar is also randomly generated using DiceBear.'
        }
      ]
    },
    {
      category: 'AI & Reactions',
      icon: Bot,
      questions: [
        {
          question: 'What is CTeaBot?',
          answer: 'CTeaBot is our emotionally intelligent AI that roasts, analyzes, and reacts to your tea with sass, insight, and dark humor. Think of it as your brutally honest crypto-savvy friend who always has the perfect comeback.'
        },
        {
          question: 'What are the emoji reactions?',
          answer: 'You can react with: 🔥 Hot (spicy tea), 🥶 Cold (boring/fake), and 🌶️ Spicy (extra dramatic). Your reactions help score posts and contribute to your own leaderboard points.'
        },
        {
          question: 'Can I request different AI commentary styles?',
          answer: 'Yes! CTeaBot has different personalities: Spicy (sassy roasts), Smart (analytical takes), Memy (crypto Twitter slang), and Savage (brutal honesty).'
        }
      ]
    },
    {
      category: 'Privacy & Safety',
      icon: Shield,
      questions: [
        {
          question: 'How anonymous am I really?',
          answer: 'Very anonymous. We use secure cryptographic tokens instead of personal data. No emails, names, or tracking cookies. Your identity is protected while still allowing us to track your contributions for the leaderboard.'
        },
        {
          question: 'What if someone posts harmful content?',
          answer: 'We have moderation tools and community reporting. Harmful content gets flagged and removed. We want spicy tea, not harmful harassment. The goal is fun drama, not real harm.'
        },
        {
          question: 'Can I delete my submissions?',
          answer: 'Since everything is anonymous, there\'s no traditional "account deletion." However, you can report your own posts if needed, and moderators can help remove content.'
        }
      ]
    },
    {
      category: 'Technical',
      icon: Zap,
      questions: [
        {
          question: 'Is this really Web3?',
          answer: 'We\'re Web3-adjacent! While we focus on crypto gossip and have tokenization in our roadmap, the core app works without needing a wallet. Think of it as the gateway drug to full Web3 participation.'
        },
        {
          question: 'Will there be tokens or NFTs?',
          answer: 'That\'s in our roadmap! We\'re exploring $TEA tokens for governance and rewards, plus NFT badges for top contributors. For now, we\'re perfecting the core gossip experience.'
        },
        {
          question: 'Can I integrate this with other apps?',
          answer: 'We\'re building API access for developers who want to integrate CTea feeds into their own apps. Stay tuned for announcements!'
        }
      ]
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 animate-glow flex items-center justify-center gap-3">
            <HelpCircle className="w-10 h-10 text-ctea-teal" />
            Frequently Asked Questions
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8">
            Everything you need to know about spilling tea and earning clout
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqs.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <Card key={categoryIndex} className="bg-ctea-dark/30 border-ctea-teal/20">
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <IconComponent className="w-6 h-6 text-ctea-teal" />
                    {category.category}
                  </h2>
                  
                  <Accordion type="single" collapsible className="space-y-2">
                    {category.questions.map((faq, faqIndex) => (
                      <AccordionItem 
                        key={faqIndex} 
                        value={`${categoryIndex}-${faqIndex}`}
                        className="border-ctea-teal/20"
                      >
                        <AccordionTrigger className="text-white hover:text-ctea-teal text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-300 pt-2">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Contact Section */}
        <Card className="bg-gradient-to-r from-ctea-purple/20 to-ctea-pink/20 border-ctea-purple/30 mt-8">
          <div className="p-6 text-center">
            <MessageCircle className="w-8 h-8 text-ctea-purple mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Still Have Questions?</h3>
            <p className="text-gray-300 mb-4">
              Can't find what you're looking for? We're here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="bg-ctea-purple hover:bg-ctea-purple/80 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Contact Us
              </a>
              <a 
                href="https://discord.gg/cteanewsroom" 
                target="_blank" 
                rel="noopener noreferrer"
                className="border border-ctea-purple text-ctea-purple hover:bg-ctea-purple/10 px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Join Discord
              </a>
            </div>
          </div>
        </Card>

        {/* Built by Attribution */}
        <div className="text-center mt-8 p-4">
          <p className="text-gray-500 text-sm">
            Built with ☕ by{' '}
            <a 
              href="https://ladyinvisible.co" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-ctea-teal hover:text-ctea-purple transition-colors"
            >
              Lady Invisible
            </a>
            {' '}— Founder of emotionally intelligent apps for humans, not bots.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
