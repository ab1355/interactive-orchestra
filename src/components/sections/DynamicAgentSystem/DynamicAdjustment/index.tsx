
import React from 'react';
import PerformanceMonitoring from './PerformanceMonitoring';
import AdaptationProcess from './AdaptationProcess';

const DynamicAdjustment: React.FC = () => {
  return (
    <div className="mt-16">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">Dynamic Adjustment Mechanisms</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Performance Monitoring Card */}
        <PerformanceMonitoring />
        
        {/* Adaptation Process Card */}
        <AdaptationProcess />
      </div>
    </div>
  );
};

export default DynamicAdjustment;
