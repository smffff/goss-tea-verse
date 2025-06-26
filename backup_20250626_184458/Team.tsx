
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Twitter, 
  Linkedin, 
  Github, 
  ExternalLink,
  Coffee,
  Users,
  Zap,
  Code
} from 'lucide-react';
import { BrandHeader } from '@/components/brand/BrandElements';

const Team = () => {
  const coreTeam = [
    {
      name: 'LadyInvsible',
      role: 'Founder & Lead Developer',
      bio: 'Visionary builder combining emotional intelligence with memecoin degeneracy. Former Web2 product lead turned crypto native.',
      avatar: '👩‍💻',
      skills: ['Product Strategy', 'Full-Stack Development', 'Community Building', 'Tokenomics'],
      social: {
        twitter: 'https://x.com/ladyinvsible',
        arena: 'https://arena.social/?ref=LadyInvsible',
        linktree: 'https://linktr.ee/ladyinvsible'
      },
      achievements: [
        '5+ years in crypto/DeFi',
        'Built multiple successful dApps',
        'Expert in community-driven platforms',
        'AI/ML integration specialist'
      ]
    }
  ];

  const advisors = [
    {
      name: 'CTeaBot',
      role: 'AI Commentary Specialist',
      bio: 'Our resident AI gossip expert. Trained on the spiciest crypto drama and blessed with unlimited sass.',
      avatar: '🤖',
      skills: ['Content Analysis', 'Wit Generation', 'Trend Prediction', 'Community Engagement'],
      achievements: [
        'Processes 1000+ submissions daily',
        '95% accuracy in trend prediction',
        'Beloved by the community',
        'Master of crypto humor'
      ]
    },
    {
      name: 'The Community',
      role: 'Collective Intelligence',
      bio: 'The real MVPs. Thousands of anonymous tea spillers, voters, and community members who make CTea the ultimate gossip destination.',
      avatar: '👥',
      skills: ['Intel Gathering', 'Quality Curation', 'Trend Discovery', 'Community Moderation'],
      achievements: [
        '10,000+ active community members',
        '50,000+ tea submissions',
        '1M+ community votes',
        'Global 24/7 coverage'
      ]
    }
  ];

  const values = [
    {
      icon: Coffee,
      title: 'Anonymous First',
      description: 'We protect our community\'s privacy above all else. Your identity is sacred.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Every major decision goes through community governance. You have a voice.'
    },
    {
      icon: Zap,
      title: 'Quality Over Speed',
      description: 'We build features right the first time, prioritizing user experience over rush releases.'
    },
    {
      icon: Code,
      title: 'Open & Transparent',
      description: 'Our development process is transparent. Community feedback shapes our roadmap.'
    }
  ];

  return (
    <Layout pageTitle="Team" pageDescription="Meet the team behind CTea Newsroom - The builders creating Web3's premier gossip platform">
      <div className="min-h-screen bg-gradient-to-br from-newsprint via-pale-pink to-vintage-red-50">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <BrandHeader showLogo={true} showTagline={false} logoSize="lg" />
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-vintage-red uppercase tracking-wider mb-4">
              Meet the Team
            </h1>
            <p className="text-lg md:text-xl text-tabloid-black/70 mt-6 max-w-3xl mx-auto leading-relaxed">
              The builders, dreamers, and degenerates creating the future of crypto gossip. 
              From anonymous founders to AI companions — we're all about that tea life.
            </p>
          </div>
        </section>

        {/* Core Team */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-headline text-vintage-red text-center mb-12">
              Core Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {coreTeam.map((member, index) => (
                <Card key={index} className="border-vintage-red/20 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className="text-6xl mb-4 animate-float">{member.avatar}</div>
                    <CardTitle className="text-xl font-headline text-tabloid-black">
                      {member.name}
                    </CardTitle>
                    <Badge variant="outline" className="border-vintage-red text-vintage-red mx-auto">
                      {member.role}
                    </Badge>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-tabloid-black/70 mb-4 leading-relaxed">
                      {member.bio}
                    </p>
                    
                    {/* Skills */}
                    <div className="mb-4">
                      <h4 className="font-bold text-tabloid-black mb-2">Expertise</h4>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {member.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="mb-4">
                      <h4 className="font-bold text-tabloid-black mb-2">Achievements</h4>
                      <ul className="text-sm text-tabloid-black/70 space-y-1">
                        {member.achievements.map((achievement, achIndex) => (
                          <li key={achIndex}>• {achievement}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Social Links */}
                    {member.social && (
                      <div className="flex justify-center gap-2">
                        {member.social.twitter && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-vintage-red text-vintage-red hover:bg-vintage-red hover:text-white"
                            onClick={() => window.open(member.social.twitter, '_blank')}
                          >
                            <Twitter className="w-4 h-4" />
                          </Button>
                        )}
                        {member.social.arena && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-white"
                            onClick={() => window.open(member.social.arena, '_blank')}
                          >
                            <Users className="w-4 h-4" />
                          </Button>
                        )}
                        {member.social.linktree && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-white"
                            onClick={() => window.open(member.social.linktree, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Special Team Members */}
        <section className="py-16 bg-gradient-to-r from-vintage-red/5 to-neon-pink/5">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-headline text-vintage-red text-center mb-12">
              Our Extended Family
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {advisors.map((member, index) => (
                <Card key={index} className="border-vintage-red/20 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <div className="text-6xl mb-4 animate-bounce-subtle">{member.avatar}</div>
                    <CardTitle className="text-xl font-headline text-tabloid-black">
                      {member.name}
                    </CardTitle>
                    <Badge variant="outline" className="border-neon-pink text-neon-pink mx-auto">
                      {member.role}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-tabloid-black/70 mb-4 leading-relaxed text-center">
                      {member.bio}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-bold text-tabloid-black mb-2">Skills</h4>
                        <div className="space-y-1">
                          {member.skills.map((skill, skillIndex) => (
                            <Badge key={skillIndex} variant="secondary" className="text-xs mr-1 mb-1">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-bold text-tabloid-black mb-2">Stats</h4>
                        <ul className="text-sm text-tabloid-black/70 space-y-1">
                          {member.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} className="text-xs">• {achievement}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Values */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-headline text-vintage-red text-center mb-12">
              How We Work
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="border-vintage-red/20 bg-white/80 backdrop-blur-sm text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <value.icon className="w-8 h-8 text-vintage-red mx-auto mb-4" />
                    <CardTitle className="text-lg font-headline text-tabloid-black">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-tabloid-black/70 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Join Us Section */}
        <section className="py-20 bg-gradient-to-r from-teal-400/5 to-purple-400/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-headline text-vintage-red mb-6">
              Want to Join the Team?
            </h2>
            <p className="text-lg text-tabloid-black/70 mb-8 max-w-2xl mx-auto">
              We're always looking for talented builders, community managers, and crypto natives 
              who share our vision of creating the ultimate gossip platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-vintage-red hover:bg-vintage-red-600 text-white font-bold px-8 py-3"
                onClick={() => window.open('mailto:hello@cteanews.com?subject=Joining CTea Team', '_blank')}
              >
                <Users className="w-5 h-5 mr-2" />
                Get In Touch
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-vintage-red text-vintage-red hover:bg-vintage-red hover:text-white font-bold px-8 py-3"
                onClick={() => window.open('https://discord.gg/cteanewsroom', '_blank')}
              >
                Join Discord
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Team;
