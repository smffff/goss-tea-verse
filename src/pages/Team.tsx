import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Coffee, 
  Zap, 
  Shield, 
  Bot, 
  TrendingUp,
  Github,
  Twitter,
  Linkedin,
  Globe,
  Heart,
  Star
} from 'lucide-react';

const Team = () => {
  const teamMembers = [
    {
      name: 'Lady Invisible',
      role: 'Founder & CEO',
      avatar: '/ctea-logo-icon.png',
      bio: 'Building emotionally intelligent apps for humans, not bots. Former AI researcher turned crypto chaos architect. Believes in the power of anonymous truth-telling and community-driven innovation.',
      expertise: ['AI/ML', 'Web3', 'Product Strategy', 'Community Building'],
      social: {
        twitter: 'https://twitter.com/ladyinvisible',
        github: 'https://github.com/ladyinvisible',
        website: 'https://ladyinvisible.co',
        linkedin: 'https://linkedin.com/in/ladyinvisible'
      },
      isFounder: true
    },
    {
      name: 'Coming Soon',
      role: 'CTO & Technical Lead',
      avatar: '/assets/placeholder.svg',
      bio: 'We\'re looking for a brilliant technical mind to join our mission. Someone who can architect scalable systems, lead development teams, and share our passion for building the future of crypto information sharing.',
      expertise: ['System Architecture', 'Blockchain Development', 'Team Leadership', 'DevOps'],
      social: {},
      isHiring: true
    },
    {
      name: 'Coming Soon',
      role: 'Head of Community',
      avatar: '/assets/placeholder.svg',
      bio: 'We need a community champion who can grow and nurture our global tea-spilling community. Someone who understands crypto culture, can moderate with empathy, and build meaningful relationships.',
      expertise: ['Community Management', 'Content Moderation', 'Growth Marketing', 'Crypto Culture'],
      social: {},
      isHiring: true
    },
    {
      name: 'Coming Soon',
      role: 'Head of Marketing',
      avatar: '/assets/placeholder.svg',
      bio: 'Looking for a marketing wizard who can craft compelling narratives, build brand awareness, and drive user acquisition in the crypto space. Must love memes and understand Web3 culture.',
      expertise: ['Brand Strategy', 'Growth Marketing', 'Content Creation', 'Web3 Marketing'],
      social: {},
      isHiring: true
    }
  ];

  const advisors = [
    {
      name: 'Crypto OG',
      role: 'Strategic Advisor',
      avatar: '/assets/placeholder.svg',
      bio: 'Veteran crypto entrepreneur with deep connections in the space. Providing strategic guidance and industry insights.',
      expertise: ['Crypto Strategy', 'Network Building', 'Investment'],
      social: {}
    },
    {
      name: 'AI Expert',
      role: 'AI Advisor',
      avatar: '/assets/placeholder.svg',
      bio: 'Leading AI researcher specializing in natural language processing and content moderation. Advising on our AI systems.',
      expertise: ['AI/ML', 'NLP', 'Content Moderation', 'Ethics'],
      social: {}
    }
  ];

  const values = [
    {
      title: 'Transparency',
      description: 'Open development, clear communication, and public audit trails.',
      icon: Shield
    },
    {
      title: 'Innovation',
      description: 'Pushing boundaries in AI, Web3, and community governance.',
      icon: Zap
    },
    {
      title: 'Community',
      description: 'Building for and with our community, not just for profit.',
      icon: Users
    },
    {
      title: 'Privacy',
      description: 'Anonymous by design, secure by default.',
      icon: Shield
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-ctea-teal/20 to-ctea-purple/20 rounded-full border border-ctea-teal/30">
              <Users className="w-8 h-8 text-ctea-teal" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-glow">
            Meet the Team
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            The brilliant minds behind CTea Newsroom. We're building the future of 
            crypto information sharing, one spicy take at a time.
          </p>
        </div>

        {/* Team Members */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Core Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="bg-gradient-to-br from-ctea-dark/50 to-ctea-darker/50 border-white/10">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <img 
                      src={member.avatar} 
                      alt={member.name}
                      className="w-20 h-20 rounded-full border-2 border-ctea-teal/30"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-xl font-bold text-white">
                          {member.name}
                        </CardTitle>
                        {member.isFounder && (
                          <Badge className="bg-ctea-teal/20 text-ctea-teal border-ctea-teal/30">
                            Founder
                          </Badge>
                        )}
                        {member.isHiring && (
                          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                            Hiring
                          </Badge>
                        )}
                      </div>
                      <p className="text-ctea-teal font-semibold">{member.role}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">{member.bio}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-white font-semibold mb-2">Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="border-ctea-teal/30 text-ctea-teal">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {Object.keys(member.social).length > 0 && (
                    <div className="flex gap-2">
                      {member.social.twitter && (
                        <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm" className="border-ctea-teal/30 text-ctea-teal">
                            <Twitter className="w-4 h-4" />
                          </Button>
                        </a>
                      )}
                      {member.social.github && (
                        <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm" className="border-ctea-teal/30 text-ctea-teal">
                            <Github className="w-4 h-4" />
                          </Button>
                        </a>
                      )}
                      {member.social.website && (
                        <a href={member.social.website} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm" className="border-ctea-teal/30 text-ctea-teal">
                            <Globe className="w-4 h-4" />
                          </Button>
                        </a>
                      )}
                      {member.social.linkedin && (
                        <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm" className="border-ctea-teal/30 text-ctea-teal">
                            <Linkedin className="w-4 h-4" />
                          </Button>
                        </a>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Advisors */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Advisors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {advisors.map((advisor, index) => (
              <Card key={index} className="bg-gradient-to-br from-ctea-dark/30 to-ctea-darker/30 border-ctea-teal/20">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <img 
                      src={advisor.avatar} 
                      alt={advisor.name}
                      className="w-16 h-16 rounded-full border-2 border-ctea-teal/30"
                    />
                    <div>
                      <CardTitle className="text-lg font-bold text-white">{advisor.name}</CardTitle>
                      <p className="text-ctea-teal font-semibold">{advisor.role}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">{advisor.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {advisor.expertise.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="outline" className="border-ctea-teal/30 text-ctea-teal text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="bg-gradient-to-br from-ctea-teal/10 to-ctea-purple/10 border-ctea-teal/30 text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-ctea-teal/20 to-ctea-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-ctea-teal" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                    <p className="text-gray-300 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Join Us Section */}
        <Card className="bg-gradient-to-br from-ctea-dark/50 to-ctea-darker/50 border-ctea-teal/30">
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-gradient-to-br from-ctea-teal/20 to-ctea-purple/20 rounded-full border border-ctea-teal/30">
                <Heart className="w-6 h-6 text-ctea-teal" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Join Our Mission</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              We're looking for passionate individuals who want to build the future of crypto information sharing. 
              If you're excited about AI, Web3, and community building, we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="bg-gradient-ctea text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
              >
                Get in Touch
              </a>
              <a 
                href="https://discord.gg/cteanewsroom" 
                target="_blank" 
                rel="noopener noreferrer"
                className="border border-ctea-teal text-ctea-teal px-6 py-3 rounded-lg font-bold hover:bg-ctea-teal/10 transition-colors"
              >
                Join Discord
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Team; 