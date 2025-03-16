
import React from 'react';
import BehaviorTestingEnvironment from './BehaviorTestingEnvironment';
import VersionControl from './VersionControl';
import BehaviorComparisonTool from './BehaviorComparisonTool';

const TestingAndVersionPanel: React.FC = () => {
  return (
    <div className="lg:col-span-2 space-y-6">
      <BehaviorTestingEnvironment />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <VersionControl />
        <BehaviorComparisonTool />
      </div>
    </div>
  );
};

export default TestingAndVersionPanel;
