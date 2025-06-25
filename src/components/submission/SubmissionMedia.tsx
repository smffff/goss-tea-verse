
import React from 'react';

interface SubmissionMediaProps {
  imageUrls: string[];
}

const SubmissionMedia: React.FC<SubmissionMediaProps> = ({ imageUrls }) => {
  if (imageUrls.length === 0) return null;

  return (
    <div className="mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {imageUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Evidence image ${index + 1} for tea submission`}
            className="w-full rounded-lg border border-ctea-teal/20 hover:border-ctea-teal/40 transition-colors"
          />
        ))}
      </div>
    </div>
  );
};

export default SubmissionMedia;
