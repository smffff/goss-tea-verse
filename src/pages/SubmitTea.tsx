
import React from 'react';
import SubmissionForm from '@/components/SubmissionForm';

const SubmitTea = () => {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-white mb-6 animate-glow text-center">
        Spill the Tea ☕
      </h1>
      <p className="text-lg text-gray-300 mb-8 text-center">
        Share the juiciest crypto gossip, drama, and receipts. No names needed - be as anonymous as you want.
      </p>
      <SubmissionForm />
    </div>
  );
};

export default SubmitTea;
