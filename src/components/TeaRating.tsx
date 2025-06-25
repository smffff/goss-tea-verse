
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { track } from '@/utils/analytics';

interface TeaRatingProps {
  submissionId: string;
  initialRating?: 'hot' | 'cold' | null;
}

const TeaRating: React.FC<TeaRatingProps> = ({ submissionId, initialRating = null }) => {
  const [rating, setRating] = useState<'hot' | 'cold' | null>(initialRating);

  const handleRating = (newRating: 'hot' | 'cold') => {
    const finalRating = rating === newRating ? null : newRating;
    setRating(finalRating);
    
    track('tea_rated', {
      submission_id: submissionId,
      rating: finalRating,
      changed_from: rating
    });
  };

  return (
    <div className="tea-rating-block">
      <h4 className="font-bold text-tabloid-black mb-2 flex items-center gap-2">
        ☕ Rate This Tea
      </h4>
      <p className="text-sm text-tabloid-black/70 mb-3">
        How's this gossip hitting? Vote to help the community filter the best intel.
      </p>
      
      <div className="flex gap-3 justify-center">
        <Button
          onClick={() => handleRating('hot')}
          size="sm"
          className={`btn-pill flex-1 transition-all ${
            rating === 'hot' 
              ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg' 
              : 'bg-white border border-orange-300 text-orange-600 hover:bg-orange-50'
          }`}
        >
          🔥 Hot Tea
        </Button>
        
        <Button
          onClick={() => handleRating('cold')}
          size="sm"
          className={`btn-pill flex-1 transition-all ${
            rating === 'cold' 
              ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg' 
              : 'bg-white border border-blue-300 text-blue-600 hover:bg-blue-50'
          }`}
        >
          🧊 Cold Tea
        </Button>
      </div>
      
      {rating && (
        <p className="text-xs text-tabloid-black/60 mt-2 text-center">
          Thanks for rating! Your feedback helps surface the best content.
        </p>
      )}
    </div>
  );
};

export default TeaRating;
