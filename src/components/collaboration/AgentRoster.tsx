
import React from 'react';
import { Users, Plus } from 'lucide-react';
import AgentCard from './AgentCard';

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
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <Users className="w-5 h-5 mr-2" />
          Agent Roster
        </h2>
        <button className="bg-purple hover:bg-purple/80 text-white py-1 px-3 rounded text-sm flex items-center">
          <Plus className="w-4 h-4 mr-1" />
          Add Agent
        </button>
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
