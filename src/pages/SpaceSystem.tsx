
import React from 'react';
import GoalManagement from '@/components/space/GoalManagement';
import ResourceAllocation from '@/components/space/ResourceAllocation';
import TimelinePlanning from '@/components/space/TimelinePlanning';
import PerformanceMetrics from '@/components/space/PerformanceMetrics';

const SpaceSystem = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">SPACE System</h1>
        <p className="text-muted-foreground">
          Strategic Planning And Capacity Evaluation system for resource management and goal tracking.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GoalManagement />
        <ResourceAllocation />
        <TimelinePlanning />
        <PerformanceMetrics />
      </div>
    </div>
  );
};

export default SpaceSystem;
