
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  handle: string;
  rating: number;
}

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote: "CTea Newsroom is where I get all my alpha. The AI commentary is surprisingly on point and the community reactions are pure gold.",
      author: "CryptoWhale",
      handle: "@DegenTrader2024",
      rating: 5
    },
    {
      id: 2,
      quote: "Finally, a place where I can spill tea anonymously without worry. The moderation is fair and the content quality keeps getting better.",
      author: "AlphaHunter",
      handle: "@AlphaSeeker",
      rating: 5
    },
    {
      id: 3,
      quote: "Love how the AI bot adds spicy takes to every submission. It's like having a sassy crypto expert commenting on everything. Addictive!",
      author: "TokenGossiper",
      handle: "@TeaSpiller99",
      rating: 5
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-advance every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="bg-gradient-to-br from-[#ff61a6]/20 to-[#00d1c1]/20 border-[#00d1c1]/30">
        <CardContent className="p-8">
          <div className="relative">
            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="sm"
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white z-10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white z-10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>

            {/* Testimonial Content */}
            <div className="text-center px-12">
              <div className="flex justify-center mb-4">
                {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#ff61a6] fill-current" />
                ))}
              </div>
              
              <blockquote className="text-lg text-gray-300 mb-6 italic leading-relaxed">
                "{testimonials[currentIndex].quote}"
              </blockquote>
              
              <div className="space-y-1">
                <p className="text-white font-bold">{testimonials[currentIndex].author}</p>
                <p className="text-[#00d1c1] text-sm">{testimonials[currentIndex].handle}</p>
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex 
                      ? 'bg-[#00d1c1]' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestimonialCarousel;
