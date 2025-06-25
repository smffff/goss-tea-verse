
import React from 'react';
import TestimonialCarousel from '@/components/TestimonialCarousel';

interface SocialProofSectionProps {
  // No props needed as testimonials are handled internally
}

const SocialProofSection: React.FC<SocialProofSectionProps> = () => {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-ctea-darker to-ctea-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            What Tea Sippers Are Saying
          </h2>
          <p className="text-lg text-gray-300">
            Join thousands of crypto enthusiasts sharing the hottest takes
          </p>
        </div>
        
        <TestimonialCarousel />
      </div>
    </section>
  );
};

export default SocialProofSection;
