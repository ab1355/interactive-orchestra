
import React from 'react';
import { cn } from '@/lib/utils';
import CommandStructure from './CommandStructure';
import TeamFormationFramework from './TeamFormationFramework';
import PodFormationPatterns from './PodFormationPatterns';
import TeamAssembly from './TeamAssembly';
import CommunicationStructure from './CommunicationStructure';
import DecisionFlow from './DecisionFlow';
import ResourceManagement from './ResourceManagement';
import TeamFormationProtocols from './TeamFormationProtocols';
import DynamicAdjustment from './DynamicAdjustment';
import { useToast } from '@/hooks/use-toast';

interface DynamicAgentSystemProps {
  className?: string;
}

const DynamicAgentSystem: React.FC<DynamicAgentSystemProps> = ({ className }) => {
  const { toast } = useToast();
  
  const handlePodFormation = () => {
    toast({
      title: "Pod Formation Initiated",
      description: "A new pod is being assembled for the market analysis mission.",
      variant: "default",
    });
  };

  return (
    <div className={cn("py-16 bg-gradient-to-b from-dark/80 to-dark/95", className)}>
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-3">Dynamic Agent & Team Management System</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">Adaptive system for optimal agent collaboration and team formation based on changing requirements</p>
          <button 
            onClick={handlePodFormation}
            className="mt-4 bg-purple hover:bg-purple/80 text-white px-4 py-2 rounded-md text-sm"
          >
            Simulate Pod Formation
          </button>
        </div>
        
        {/* Command Structure */}
        <CommandStructure />

        {/* Decision Flow */}
        <DecisionFlow />

        {/* Team Assembly */}
        <TeamAssembly />
        
        {/* Communication Structure */}
        <CommunicationStructure />

        {/* Resource Management */}
        <ResourceManagement />
        
        {/* Team Formation Protocols */}
        <TeamFormationProtocols />
        
        {/* Dynamic Adjustment Mechanisms */}
        <DynamicAdjustment />
        
        {/* Team Formation Framework */}
        <TeamFormationFramework />
        
        {/* Pod Formation Patterns */}
        <PodFormationPatterns />
      </div>
    </div>
  );
};

export default DynamicAgentSystem;
