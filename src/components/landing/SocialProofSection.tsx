
import React from 'react';
import { Card } from '@/components/ui/card';
import { MessageCircle } from 'lucide-react';
import TestimonialCarousel from '@/components/TestimonialCarousel';

const SocialProofSection = () => {
  const testimonials = [
    { text: "Got the alpha first on CTea.", author: "@anonape" },
    { text: "The meme-to-signal ratio is perfect.", author: "@defidegen" },
    { text: "Spilled, got tipped. Iconic.", author: "@cteaqueen" },
    { text: "This queue is boiling 🫖", author: "@teaspiller" }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-accent/5 to-accent2/5">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What the Community Says
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real feedback from crypto's most active gossip enthusiasts
          </p>
        </div>
        
        <TestimonialCarousel
          testimonials={testimonials.map((t, i) => ({
            id: String(i),
            text: t.text,
            author: t.author,
            handle: t.author,
            rating: 5,
            category: 'user',
            verified: true,
            date: new Date().toISOString()
          }))}
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform border border-accent/10">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent2 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-800 font-medium leading-relaxed">"{testimonial.text}"</p>
                  <p className="text-sm text-gray-500 mt-3 font-semibold">— {testimonial.author}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
