
import React from 'react';
import TeaFeed from './TeaFeed';

interface TeaFeedContainerProps {
  filter?: string;
}

const TeaFeedContainer: React.FC<TeaFeedContainerProps> = ({ filter }) => {
  return (
    <div className="space-y-6">
      <TeaFeed filter={filter} />
    </div>
  );
};

export default TeaFeedContainer;
