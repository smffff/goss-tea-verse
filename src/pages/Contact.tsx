import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Coffee, Mail, MessageCircle, Twitter, Users, Send, Sparkles } from 'lucide-react';

const Contact = () => {
  // Set document title for SEO
  React.useEffect(() => {
    document.title = 'Contact CTea Newsroom - Get in Touch';
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Contact form submitted:', formData);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const contactMethods = [
    {
      title: "Email",
      description: "For business inquiries and partnerships",
      value: "hello@cteanews.com",
      icon: <Mail className="w-6 h-6" />,
      action: "mailto:hello@cteanews.com"
    },
    {
      title: "Twitter",
      description: "Follow us for updates and memes",
      value: "@ctea_newsroom",
      icon: <Twitter className="w-6 h-6" />,
      action: "https://twitter.com/ctea_newsroom"
    },
    {
      title: "Discord",
      description: "Join our community server",
      value: "CTea Community",
      icon: <Users className="w-6 h-6" />,
      action: "#"
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Coffee className="w-16 h-16 text-ctea-teal animate-float" />
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-5 h-5 text-ctea-pink animate-pulse" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have some hot tea to spill? Want to partner up? Just want to say hi? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-ctea-dark/30 border border-ctea-teal/20 p-8">
            <div className="flex items-center gap-3 mb-6">
              <MessageCircle className="w-6 h-6 text-ctea-teal" />
              <h2 className="text-2xl font-bold text-white">Send us a Message</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-gray-300">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="bg-ctea-dark/50 border-ctea-teal/30 text-white placeholder-gray-400"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-300">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="bg-ctea-dark/50 border-ctea-teal/30 text-white placeholder-gray-400"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="subject" className="text-gray-300">Subject</Label>
                <Input
                  id="subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="bg-ctea-dark/50 border-ctea-teal/30 text-white placeholder-gray-400"
                  placeholder="What's this about?"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="message" className="text-gray-300">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="bg-ctea-dark/50 border-ctea-teal/30 text-white placeholder-gray-400 min-h-[120px]"
                  placeholder="Tell us what's on your mind..."
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-ctea text-white font-bold hover:opacity-90 transition-all duration-300"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Send Message
                  </div>
                )}
              </Button>
            </form>
          </Card>

          {/* Contact Methods */}
          <div className="space-y-6">
            <Card className="bg-ctea-dark/30 border border-ctea-teal/20 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Other Ways to Reach Us</h2>
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-ctea-dark/20 rounded-lg hover:bg-ctea-dark/30 transition-all duration-300">
                    <div className="w-12 h-12 bg-ctea-teal/20 rounded-full flex items-center justify-center text-ctea-teal">
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white">{method.title}</h3>
                      <p className="text-sm text-gray-400">{method.description}</p>
                      <p className="text-ctea-teal font-medium">{method.value}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10"
                      onClick={() => window.open(method.action, '_blank')}
                    >
                      Contact
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* FAQ Preview */}
            <Card className="bg-ctea-dark/30 border border-ctea-teal/20 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div className="border-b border-ctea-teal/20 pb-4">
                  <h3 className="font-bold text-white mb-2">How do I submit tea?</h3>
                  <p className="text-gray-300 text-sm">Use our anonymous submission form on the Submit page. No registration required!</p>
                </div>
                <div className="border-b border-ctea-teal/20 pb-4">
                  <h3 className="font-bold text-white mb-2">Is my identity protected?</h3>
                  <p className="text-gray-300 text-sm">Absolutely. We use advanced encryption and never store personal information.</p>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2">How do I earn $TEA points?</h3>
                  <p className="text-gray-300 text-sm">Submit hot takes, get upvoted, and participate in community activities.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Response Time Notice */}
        <Card className="bg-ctea-dark/30 border border-ctea-teal/20 p-6 mt-12">
          <div className="text-center">
            <Badge className="bg-ctea-yellow/20 text-ctea-yellow border border-ctea-yellow/30 mb-3">
              Response Time
            </Badge>
            <p className="text-gray-300">
              We typically respond within 24-48 hours. For urgent matters, reach out on Twitter for faster response.
            </p>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Contact; 