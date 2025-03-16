
import React from 'react';
import { Code } from 'lucide-react';

interface AgentConfigHeaderProps {
  onSetName: (name: string) => void;
  agentName: string;
}

const AgentConfigHeader: React.FC<AgentConfigHeaderProps> = ({ 
  onSetName,
  agentName = "Customer Support Agent" 
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-white font-medium flex items-center">
        <Code className="w-5 h-5 mr-2" />
        Agent Configuration
      </h2>
      <div className="text-sm text-gray-400">ID: agent-cus-2491</div>
    </div>
  );
};

export default AgentConfigHeader;
