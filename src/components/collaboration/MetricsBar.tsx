
import React from 'react';

const MetricsBar: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-dark-accent p-4 rounded-lg border border-white/10">
        <p className="text-gray-400 text-sm">Total Agents</p>
        <p className="text-white text-2xl font-semibold">4</p>
      </div>
      <div className="bg-dark-accent p-4 rounded-lg border border-white/10">
        <p className="text-gray-400 text-sm">Active Tasks</p>
        <p className="text-white text-2xl font-semibold">4</p>
      </div>
      <div className="bg-dark-accent p-4 rounded-lg border border-white/10">
        <p className="text-gray-400 text-sm">Completed Tasks</p>
        <p className="text-white text-2xl font-semibold">24</p>
      </div>
      <div className="bg-dark-accent p-4 rounded-lg border border-white/10">
        <p className="text-gray-400 text-sm">Success Rate</p>
        <p className="text-white text-2xl font-semibold">94%</p>
      </div>
    </div>
  );
};

export default MetricsBar;
