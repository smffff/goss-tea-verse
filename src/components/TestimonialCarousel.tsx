import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Quote, Star, Users, Zap, Crown } from 'lucide-react';

interface Testimonial {
  id: string;
  text: string;
  author: string;
  handle: string;
  avatar?: string;
  rating: number;
  category: 'user' | 'influencer' | 'vip';
  verified: boolean;
  date: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
  autoPlay?: boolean;
  interval?: number;
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
  title = "What the Community Says",
  subtitle = "Real feedback from crypto's most active gossip enthusiasts",
  autoPlay = true,
  interval = 5000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, interval);

    return () => clearInterval(timer);
  }, [isAutoPlaying, interval, testimonials.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'vip':
        return <Crown className="w-4 h-4 text-yellow-500" />;
      case 'influencer':
        return <Zap className="w-4 h-4 text-purple-500" />;
      default:
        return <Users className="w-4 h-4 text-blue-500" />;
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'vip':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">VIP</Badge>;
      case 'influencer':
        return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">Influencer</Badge>;
      default:
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">User</Badge>;
    }
  };

  if (!testimonials.length) return null;

  return (
    <section className="py-16 bg-gradient-to-r from-accent/5 to-accent2/5">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <Button
            onClick={prevSlide}
            variant="outline"
            size="sm"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-ctea-dark/90 border-accent/30 text-accent hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-transparent active:scale-95 transition-transform duration-150"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <Button
            onClick={nextSlide}
            variant="outline"
            size="sm"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-ctea-dark/90 border-accent/30 text-accent hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-transparent active:scale-95 transition-transform duration-150"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>

          {/* Testimonials */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <Card className="p-8 bg-white dark:bg-ctea-dark/80 shadow-lg hover:shadow-xl transition-all duration-300 border border-accent/10">
                    <div className="text-center">
                      {/* Quote Icon */}
                      <div className="flex justify-center mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent2 rounded-full flex items-center justify-center">
                          <Quote className="w-6 h-6 text-white" />
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex justify-center mb-4">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < testimonial.rating
                                  ? 'text-yellow-500 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Testimonial Text */}
                      <blockquote className="text-lg text-gray-800 dark:text-gray-200 mb-6 leading-relaxed italic">
                        "{testimonial.text}"
                      </blockquote>

                      {/* Author Info */}
                      <div className="flex items-center justify-center gap-3 mb-4">
                        {testimonial.avatar ? (
                          <img
                            src={testimonial.avatar}
                            alt={`${testimonial.author} avatar`}
                            className="w-10 h-10 rounded-full border-2 border-accent/20"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent2 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {testimonial.author.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <div className="text-left">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {testimonial.author}
                            </span>
                            {testimonial.verified && (
                              <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30 text-xs">
                                ✓ Verified
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <span>{testimonial.handle}</span>
                            {getCategoryIcon(testimonial.category)}
                            {getCategoryBadge(testimonial.category)}
                          </div>
                        </div>
                      </div>

                      {/* Date */}
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(testimonial.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-transparent ${
                  index === currentIndex
                    ? 'bg-accent scale-125'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-accent/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Auto-play Toggle */}
          <div className="flex justify-center mt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-gray-500 hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-transparent"
            >
              {isAutoPlaying ? 'Pause' : 'Play'} Auto-scroll
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel; 