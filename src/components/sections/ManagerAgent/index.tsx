
import React from 'react';
import { cn } from '@/lib/utils';
import FeatureGrid from './FeatureGrid';
import AgentDashboard from './AgentDashboard';
import CommunicationPatterns from './CommunicationPatterns';
import DecisionMaking from './DecisionMaking';

interface ManagerAgentProps {
  className?: string;
}

const ManagerAgent: React.FC<ManagerAgentProps> = ({ className }) => {
  return (
    <div className={cn("py-16 bg-gradient-to-b from-dark to-dark/80", className)}>
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-3">Manager Agent <span className="text-purple">(Universal Orchestrator)</span></h2>
          <p className="text-gray-300 max-w-2xl mx-auto">CEO-level agent that orchestrates other agents, manages communications, and ensures optimal resource allocation</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <FeatureGrid />
          <AgentDashboard />
        </div>

        {/* Interaction Patterns Section */}
        <div className="mt-12">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-white mb-3">Interaction Patterns</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">Structured communication and decision-making frameworks for multi-agent systems</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CommunicationPatterns />
            <DecisionMaking />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerAgent;
