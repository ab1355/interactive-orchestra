
import React, { useState } from 'react';
import { Users, Plus, Router } from 'lucide-react';
import AgentCard from './AgentCard';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
  const [agentList, setAgentList] = useState(agents);
  const [showAddAgent, setShowAddAgent] = useState(false);
  const [newAgent, setNewAgent] = useState({
    name: '',
    role: '',
    specialty: '',
    color: 'blue-500'
  });
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

  const handleAddAgent = () => {
    if (!newAgent.name || !newAgent.role) {
      toast({
        title: "Missing Information",
        description: "Please provide a name and role for the agent",
        variant: "destructive",
      });
      return;
    }

    const agent = {
      name: newAgent.name,
      role: newAgent.role,
      status: 'Idle',
      color: newAgent.color || 'blue-500',
      specialty: newAgent.specialty || 'General purpose',
      tasks: '0 completed, 0 in progress'
    };

    setAgentList([...agentList, agent]);
    setNewAgent({
      name: '',
      role: '',
      specialty: '',
      color: 'blue-500'
    });
    setShowAddAgent(false);

    toast({
      title: "Agent Added",
      description: `${agent.name} has been added to the roster`,
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
          <button 
            className="bg-purple hover:bg-purple/80 text-white py-1 px-3 rounded text-sm flex items-center"
            onClick={() => setShowAddAgent(true)}
          >
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
        {agentList.map((agent, index) => (
          <AgentCard key={index} agent={agent} />
        ))}
      </div>

      {/* Add Agent Dialog */}
      <Dialog open={showAddAgent} onOpenChange={setShowAddAgent}>
        <DialogContent className="sm:max-w-[425px] bg-dark-accent border-white/10">
          <DialogHeader>
            <DialogTitle>Add New Agent</DialogTitle>
            <DialogDescription>
              Configure a new agent to add to your collaborative system
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Name
              </label>
              <Input
                id="name"
                value={newAgent.name}
                onChange={(e) => setNewAgent({...newAgent, name: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="role" className="text-right">
                Role
              </label>
              <Input
                id="role"
                value={newAgent.role}
                onChange={(e) => setNewAgent({...newAgent, role: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="specialty" className="text-right">
                Specialty
              </label>
              <Input
                id="specialty"
                value={newAgent.specialty}
                onChange={(e) => setNewAgent({...newAgent, specialty: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="color" className="text-right">
                Color
              </label>
              <Select
                value={newAgent.color}
                onValueChange={(value) => setNewAgent({...newAgent, color: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blue-500">Blue</SelectItem>
                  <SelectItem value="green-500">Green</SelectItem>
                  <SelectItem value="purple">Purple</SelectItem>
                  <SelectItem value="red-500">Red</SelectItem>
                  <SelectItem value="yellow-500">Yellow</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddAgent(false)}>Cancel</Button>
            <Button onClick={handleAddAgent}>Add Agent</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AgentRoster;
