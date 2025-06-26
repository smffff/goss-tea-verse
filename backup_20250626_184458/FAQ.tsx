
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, MessageCircle, Shield, Coins, Users, Zap } from 'lucide-react';
import { BrandHeader } from '@/components/brand/BrandElements';

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const faqCategories = [
    {
      category: 'Getting Started',
      icon: Users,
      color: 'text-vintage-red',
      questions: [
        {
          question: 'What is CTea Newsroom?',
          answer: 'CTea Newsroom is Web3\'s premier anonymous crypto gossip platform. We\'re where crypto\'s most scandalous stories surface first — think Gossip Girl meets crypto Twitter, but with AI commentary and token rewards.'
        },
        {
          question: 'How do I start spilling tea?',
          answer: 'Simply visit our platform, click "Spill Tea," and share your crypto intel anonymously. You can choose to submit completely anonymously or connect your wallet for TEA token rewards. Our AI, CTeaBot, will add witty commentary to make your submission even spicier.'
        },
        {
          question: 'Is it really anonymous?',
          answer: 'Yes! We use advanced cryptographic techniques to ensure submissions cannot be traced back to you. Even we can\'t identify anonymous submitters. Your privacy and safety are our top priorities.'
        },
        {
          question: 'What kind of content can I submit?',
          answer: 'We welcome crypto-related gossip, insider intel, market rumors, project drama, and industry tea. Content must be relevant to crypto/Web3 and follow our community guidelines. No doxxing, harassment, or illegal content.'
        }
      ]
    },
    {
      category: 'TEA Token',
      icon: Coins,
      color: 'text-neon-pink',
      questions: [
        {
          question: 'What is the TEA token?',
          answer: 'TEA is our native utility token that powers the CTea ecosystem. Earn TEA by submitting quality content, voting on submissions, and engaging with the community. Use TEA for governance, premium features, and reputation staking.'
        },
        {
          question: 'How do I earn TEA tokens?',
          answer: 'Multiple ways: Submit quality tea (50-500 TEA), vote accurately on submissions (5-25 TEA), engage daily (10-50 TEA), refer friends (100 TEA), become a top weekly spiller (1,000 TEA), and moderate content (25-100 TEA).'
        },
        {
          question: 'Where can I buy TEA tokens?',
          answer: 'TEA tokens are available on decentralized exchanges on the Base network. You can also earn them by participating in the platform. Check our Tokenomics page for current exchange listings.'
        },
        {
          question: 'What can I do with TEA tokens?',
          answer: 'Stake for higher credibility scores, access premium features, participate in governance votes, tip quality creators, verify your identity for exclusive access, and earn revenue share from platform success.'
        }
      ]
    },
    {
      category: 'Platform Features',
      icon: Zap,
      color: 'text-teal-400',
      questions: [
        {
          question: 'How does the voting system work?',
          answer: 'Community members vote on submissions using 🔥 (hot) or 🧊 (cold) reactions. Hot submissions rise to the top and earn more rewards, while cold submissions get buried. Your voting accuracy affects your credibility score.'
        },
        {
          question: 'What is CTeaBot?',
          answer: 'CTeaBot is our AI commentary engine that adds witty, intelligent responses to every submission. Trained on crypto culture and blessed with unlimited sass, CTeaBot makes even dry intel entertaining and provides additional context.'
        },
        {
          question: 'How does the credibility system work?',
          answer: 'Your credibility score is based on submission quality, voting accuracy, community engagement, and TEA token stakes. Higher credibility users earn more rewards and have more influence in governance decisions.'
        },
        {
          question: 'Can I edit or delete my submissions?',
          answer: 'Anonymous submissions cannot be edited or deleted to maintain integrity. Wallet-connected submissions can be edited within 10 minutes of posting. This policy prevents manipulation while allowing quick fixes.'
        }
      ]
    },
    {
      category: 'Privacy & Security',
      icon: Shield,
      color: 'text-purple-400',
      questions: [
        {
          question: 'How do you protect my identity?',
          answer: 'We use zero-knowledge proofs, encrypted submissions, and decentralized storage. Anonymous submissions are completely untraceable, even by us. We never store IP addresses or identifying information for anonymous users.'
        },
        {
          question: 'What if someone tries to doxx me?',
          answer: 'Doxxing is strictly prohibited and results in immediate bans. We have automated detection systems and a rapid response team. If you feel threatened, contact our moderation team immediately through Discord or email.'
        },
        {
          question: 'How do you prevent fake news?',
          answer: 'Community voting, AI analysis, credibility scoring, and human moderation work together to surface quality content. We don\'t claim to be a news source — we\'re a gossip platform where the community decides what\'s credible.'
        },
        {
          question: 'What data do you collect?',
          answer: 'For anonymous users: none. For wallet-connected users: wallet address, submission history, and engagement metrics. We never sell data and use minimal analytics. See our Privacy Policy for full details.'
        }
      ]
    },
    {
      category: 'Community & Governance',
      icon: Users,
      color: 'text-yellow-400',
      questions: [
        {
          question: 'How is the platform governed?',
          answer: 'TEA token holders participate in governance decisions through our DAO. Major platform changes, feature additions, and policy updates are voted on by the community. Higher stakes = more voting power.'
        },
        {
          question: 'How do I report inappropriate content?',
          answer: 'Every submission has a report button. Our moderation team reviews reports within 24 hours. Repeated violations result in credibility penalties or bans. The community also helps moderate through voting.'
        },
        {
          question: 'Can I become a moderator?',
          answer: 'Yes! Active community members with high credibility scores can apply to become moderators. Moderators earn TEA rewards and help maintain platform quality. Applications open quarterly.'
        },
        {
          question: 'How do I join the community?',
          answer: 'Join our Discord server, follow us on Twitter/X, and start participating on the platform. The more you engage, the more you\'ll be recognized by other community members. We\'re a welcoming bunch of crypto degenerates!'
        }
      ]
    }
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <Layout pageTitle="FAQ" pageDescription="Frequently asked questions about CTea Newsroom - Your guide to the ultimate crypto gossip platform">
      <div className="min-h-screen bg-gradient-to-br from-newsprint via-pale-pink to-vintage-red-50">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <BrandHeader showLogo={true} showTagline={false} logoSize="lg" />
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-vintage-red uppercase tracking-wider mb-4">
              FAQ
            </h1>
            <p className="text-lg md:text-xl text-tabloid-black/70 mt-6 max-w-3xl mx-auto leading-relaxed">
              Got questions about spilling tea, earning tokens, or protecting your anonymity? 
              We've got answers. Everything you need to know about the gossip game.
            </p>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <Card className="border-vintage-red/20 bg-white/80 backdrop-blur-sm max-w-2xl mx-auto">
              <CardContent className="p-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tabloid-black/50 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search frequently asked questions..."
                    className="w-full pl-10 pr-4 py-3 border border-vintage-red/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-vintage-red/20 bg-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {filteredFAQs.length === 0 ? (
              <Card className="border-vintage-red/20 bg-white/80 backdrop-blur-sm text-center">
                <CardContent className="p-8">
                  <div className="text-6xl mb-4">🤔</div>
                  <h3 className="text-xl font-bold text-tabloid-black mb-2">No results found</h3>
                  <p className="text-tabloid-black/70">
                    Try a different search term or browse all categories below.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-8">
                {filteredFAQs.map((category, categoryIndex) => (
                  <Card key={categoryIndex} className="border-vintage-red/20 bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-2xl font-headline text-tabloid-black">
                        <category.icon className={`w-8 h-8 ${category.color}`} />
                        {category.category}
                        <Badge variant="outline" className="ml-auto">
                          {category.questions.length} questions
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {category.questions.map((faq, faqIndex) => (
                          <AccordionItem key={faqIndex} value={`${categoryIndex}-${faqIndex}`}>
                            <AccordionTrigger className="text-left font-semibold text-tabloid-black hover:text-vintage-red">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-tabloid-black/70 leading-relaxed">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="py-20 bg-gradient-to-r from-vintage-red/5 to-neon-pink/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-headline text-vintage-red mb-6">
              Still Have Questions?
            </h2>
            <p className="text-lg text-tabloid-black/70 mb-8 max-w-2xl mx-auto">
              Can't find what you're looking for? Our community and team are here to help. 
              Join our Discord or reach out directly — we don't bite (much).
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-vintage-red hover:bg-vintage-red-600 text-white font-bold px-8 py-3"
                onClick={() => window.open('https://discord.gg/cteanewsroom', '_blank')}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Join Discord
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-vintage-red text-vintage-red hover:bg-vintage-red hover:text-white font-bold px-8 py-3"
                onClick={() => window.open('mailto:hello@cteanews.com?subject=FAQ Question', '_blank')}
              >
                Email Support
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default FAQ;
