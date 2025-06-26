import React from 'react';

interface SubmissionContentProps {
  content: string;
}

const SubmissionContent = ({ content }: SubmissionContentProps) => {
  return (
    <div className="mb-4">
      <p className="text-white leading-relaxed">{content}</p>
    </div>
  );
};

export default SubmissionContent;
