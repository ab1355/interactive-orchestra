
import React from 'react';
import { Network, Share, Target, Handshake } from 'lucide-react';
import FeatureCard from '../../ui/FeatureCard';

const FeatureGrid: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FeatureCard 
          title="Inter-agent Communication" 
          description="Enable seamless communication between multiple AI agents to solve complex problems collaboratively."
          icon={<Network className="w-6 h-6" />}
          className="hover:border-purple/30 hover:bg-purple/5"
        />
        <FeatureCard 
          title="Task Distribution" 
          description="Intelligently allocate tasks to specialized agents based on their capabilities and current workload."
          icon={<Share className="w-6 h-6" />}
          className="hover:border-purple/30 hover:bg-purple/5"
        />
        <FeatureCard 
          title="Priority Management" 
          description="Dynamically adjust task priorities based on business impact, deadlines, and dependencies."
          icon={<Target className="w-6 h-6" />}
          className="hover:border-purple/30 hover:bg-purple/5"
        />
        <FeatureCard 
          title="Resource Coordination" 
          description="Optimize resource allocation across multiple agents and tasks to maximize efficiency."
          icon={<Handshake className="w-6 h-6" />}
          className="hover:border-purple/30 hover:bg-purple/5"
        />
      </div>
    </div>
  );
};

export default FeatureGrid;
