
import React from 'react';
import { Crown, Laptop, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import CommandLayer from './CommandLayer';
import TeamFormationFramework from './TeamFormationFramework';
import PodFormationPatterns from './PodFormationPatterns';
import TeamAssembly from './TeamAssembly';
import CommunicationStructure from './CommunicationStructure';
import DecisionFlow from './DecisionFlow';

interface DynamicAgentSystemProps {
  className?: string;
}

const DynamicAgentSystem: React.FC<DynamicAgentSystemProps> = ({ className }) => {
  const executiveLayerItems = [
    {
      title: 'Strategic team formation decisions',
      description: 'High-level decisions on team structures and capabilities'
    },
    {
      title: 'Resource allocation approval',
      description: 'Final authority on resource distribution across teams'
    },
    {
      title: 'Priority setting',
      description: 'Determination of critical objectives and timelines'
    },
    {
      title: 'Final authority on team composition',
      description: 'Ultimate decision-making on agent assignments'
    }
  ];

  const tacticalLayerItems = [
    {
      title: 'Team recommendation generation',
      description: 'Analysis-based suggestions for optimal team structures'
    },
    {
      title: 'Resource requirement analysis',
      description: 'Detailed evaluation of necessary resources for success'
    },
    {
      title: 'Performance monitoring',
      description: 'Continuous tracking of team effectiveness and output'
    },
    {
      title: 'Dynamic adjustment proposals',
      description: 'Suggested modifications based on changing conditions'
    }
  ];

  const operationalLayerItems = [
    {
      title: 'Task execution',
      description: 'Direct implementation of assigned responsibilities'
    },
    {
      title: 'Real-time adaptation',
      description: 'Immediate adjustments to changing conditions'
    },
    {
      title: 'Resource utilization',
      description: 'Efficient use of allocated resources'
    },
    {
      title: 'Performance reporting',
      description: 'Detailed metrics and progress updates'
    }
  ];

  return (
    <div className={cn("py-16 bg-gradient-to-b from-dark/80 to-dark/95", className)}>
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-3">Dynamic Agent & Team Management System</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">Adaptive system for optimal agent collaboration and team formation based on changing requirements</p>
        </div>
        
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Command Structure</h3>
          
          <div className="grid grid-cols-1 gap-8">
            {/* Executive Layer */}
            <CommandLayer
              title="Executive Layer (Me + Manager Agent)"
              icon={<Crown className="w-5 h-5 text-blue-400" />}
              color="blue"
              items={executiveLayerItems}
            />

            {/* Tactical Layer */}
            <CommandLayer
              title="Tactical Layer (Primary Agents)"
              icon={<Laptop className="w-5 h-5 text-green-400" />}
              color="green"
              items={tacticalLayerItems}
            />

            {/* Operational Layer */}
            <CommandLayer
              title="Operational Layer (Support & Specialized Agents)"
              icon={<Smartphone className="w-5 h-5 text-purple" />}
              color="purple"
              items={operationalLayerItems}
            />
          </div>
        </div>

        {/* Decision Flow - New component */}
        <DecisionFlow />

        {/* Team Assembly */}
        <TeamAssembly />
        
        {/* Communication Structure */}
        <CommunicationStructure />

        {/* Team Formation Framework */}
        <TeamFormationFramework />
        
        {/* Pod Formation Patterns */}
        <PodFormationPatterns />
      </div>
    </div>
  );
};

export default DynamicAgentSystem;
