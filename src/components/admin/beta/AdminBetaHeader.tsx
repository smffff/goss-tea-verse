
import React from 'react';
import { Coffee } from 'lucide-react';

const AdminBetaHeader: React.FC = () => {
  return (
    <div className="flex items-center gap-3 mb-8">
      <Coffee className="w-8 h-8 text-ctea-teal" />
      <h1 className="text-3xl font-bold text-white">Beta Code Dashboard</h1>
    </div>
  );
};

export default AdminBetaHeader;
