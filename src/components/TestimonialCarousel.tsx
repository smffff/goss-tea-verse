import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  rating: number;
  avatar?: string;
  badge?: string;
}

const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: '1',
      quote: "CTea Newsroom is where I get all my alpha. The community is insane and the tea is always piping hot. Made 50x on a tip I found here! 🔥",
      author: "CryptoWhale",
      role: "DeFi Trader",
      rating: 5,
      badge: "VIP"
    },
    {
      id: '2',
      quote: "Finally, a platform that doesn't censor the real crypto drama. The anonymous submissions keep it authentic and the $TEA rewards are legit! ☕",
      author: "AnonTrader",
      role: "Anonymous Contributor",
      rating: 5,
      badge: "OG"
    },
    {
      id: '3',
      quote: "The AI commentary feature is next level. It's like having a crypto expert break down every hot take. This is the future of social trading! 🚀",
      author: "TechMaxi",
      role: "Crypto Analyst",
      rating: 5,
      badge: "Verified"
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="relative">
      <Card className="bg-gradient-to-br from-ctea-dark/50 to-ctea-darker/50 border-ctea-teal/30 p-6 sm:p-8">
        <div className="text-center">
          {/* Quote Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent2 rounded-full flex items-center justify-center">
              <Quote className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Testimonial Content */}
          <div className="mb-6">
            <p className="text-lg sm:text-xl text-white leading-relaxed mb-4 italic">
              "{currentTestimonial.quote}"
            </p>
            
            {/* Rating */}
            <div className="flex justify-center items-center gap-1 mb-4">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-ctea-yellow fill-current" />
              ))}
            </div>

            {/* Author Info */}
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent2 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {currentTestimonial.author.charAt(0)}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">{currentTestimonial.author}</span>
                  {currentTestimonial.badge && (
                    <Badge className="bg-accent2 text-white text-xs">
                      {currentTestimonial.badge}
                    </Badge>
                  )}
                </div>
                <span className="text-sm text-gray-400">{currentTestimonial.role}</span>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-accent w-6' 
                    : 'bg-ctea-teal/30 hover:bg-ctea-teal/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="sm"
          onClick={prevTestimonial}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-ctea-teal hover:bg-ctea-teal/10 hover:text-white"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={nextTestimonial}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-ctea-teal hover:bg-ctea-teal/10 hover:text-white"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </Card>

      {/* Social Proof Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">10K+</div>
          <div className="text-sm text-gray-400">Active Users</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent2">50K+</div>
          <div className="text-sm text-gray-400">Tea Submissions</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-ctea-yellow">4.9★</div>
          <div className="text-sm text-gray-400">Community Rating</div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel; 