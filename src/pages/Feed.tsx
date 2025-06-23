
import React from 'react';
import TeaFeed from '@/components/TeaFeed';

const Feed = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-white mb-6 animate-glow text-center">
        Hot Takes & Drama ☕
      </h1>
      <p className="text-lg text-gray-300 mb-8 text-center">
        The freshest tea from the crypto world. Upvote the spiciest takes and join the conversation.
      </p>
      <TeaFeed />
    </div>
  );
};

export default Feed;
