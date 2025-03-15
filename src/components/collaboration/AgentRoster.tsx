import React, { useState } from 'react';
import { Users, Plus, Router } from 'lucide-react';
import AgentCard from './AgentCard';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

// Custom AutomationIcon since it doesn't exist in lucide-react
const AutomationIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M7 7h.01" />
    <path d="M17 7h.01" />
    <path d="M7 17h.01" />
    <path d="M17 17h.01" />
    <path d="M3 12h18" />
    <path d="M12 3v18" />
  </svg>
);

const agents = [
  { 
    name: 'Research Agent', 
    role: 'Information Gathering', 
    status: 'Active', 
    color: 'blue-500',
    specialty: 'Web search, data extraction',
    tasks: '8 completed, 2 in progress'
  },
  { 
    name: 'Analysis Agent', 
    role: 'Data Processing', 
    status: 'Active', 
    color: 'purple',
    specialty: 'Pattern recognition, statistics',
    tasks: '6 completed, 1 in progress'
  },
  { 
    name: 'Writer Agent', 
    role: 'Content Creation', 
    status: 'Active', 
    color: 'green-500',
    specialty: 'Text generation, summarization',
    tasks: '5 completed, 1 in progress'
  },
  { 
    name: 'QA Agent', 
    role: 'Quality Assurance', 
    status: 'Idle', 
    color: 'yellow-500',
    specialty: 'Fact checking, proofreading',
    tasks: '5 completed, 0 in progress'
  },
];

const AgentRoster: React.FC = () => {
  const [autoCreateEnabled, setAutoCreateEnabled] = useState(false);
  const { toast } = useToast();
  
  const handleAutoCreateToggle = (checked: boolean) => {
    setAutoCreateEnabled(checked);
    toast({
      title: checked ? "Autonomous Agent Creation Enabled" : "Autonomous Agent Creation Disabled",
      description: checked 
        ? "System will automatically create new agents based on workload and task requirements" 
        : "New agents will only be created manually",
      variant: "default",
    });
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <Users className="w-5 h-5 mr-2" />
          Agent Roster
        </h2>
        <div className="flex gap-2">
          <div className="bg-purple/10 text-purple py-1 px-3 rounded text-sm flex items-center">
            <Router className="w-4 h-4 mr-1" />
            Dynamic Routing Active
          </div>
          <div className="bg-green-500/10 text-green-500 py-1 px-3 rounded text-sm flex items-center">
            <AutomationIcon className="w-4 h-4 mr-1" />
            Auto-Creation {autoCreateEnabled ? 'On' : 'Off'}
          </div>
          <button className="bg-purple hover:bg-purple/80 text-white py-1 px-3 rounded text-sm flex items-center">
            <Plus className="w-4 h-4 mr-1" />
            Add Agent
          </button>
        </div>
      </div>
      
      <div className="mb-4 p-3 bg-dark-accent rounded-lg border border-white/10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
              <AutomationIcon className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <h4 className="text-white font-medium">Autonomous Agent Creation</h4>
              <p className="text-xs text-gray-400">Automatically create new agents based on workload and task requirements</p>
            </div>
          </div>
          <Switch 
            checked={autoCreateEnabled} 
            onCheckedChange={handleAutoCreateToggle}
            className="data-[state=checked]:bg-green-500"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {agents.map((agent, index) => (
          <AgentCard key={index} agent={agent} />
        ))}
      </div>
    </div>
  );
};

export default AgentRoster;
