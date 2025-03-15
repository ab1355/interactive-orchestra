
import React from 'react';

interface AgentProps {
  agent: {
    name: string;
    role: string;
    status: string;
    color: string;
    specialty: string;
    tasks: string;
  };
}

const AgentCard: React.FC<AgentProps> = ({ agent }) => {
  return (
    <div className="bg-dark-accent rounded-lg border border-white/10 overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full bg-${agent.color} flex items-center justify-center`}>
              <span className="text-white font-bold">{agent.name.charAt(0)}</span>
            </div>
            <div className="ml-3">
              <h3 className="text-white font-medium">{agent.name}</h3>
              <p className="text-gray-400 text-sm">{agent.role}</p>
            </div>
          </div>
          <div className={`text-xs px-2 py-1 rounded ${agent.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
            {agent.status}
          </div>
        </div>
        <div className="mt-4">
          <div className="text-sm text-gray-300">
            <p className="mb-2">Specialty: {agent.specialty}</p>
            <p>Tasks: {agent.tasks}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 p-3 flex justify-between">
        <button className="text-sm text-purple hover:text-purple-light">Configure</button>
        <button className="text-sm text-purple hover:text-purple-light">Assign Task</button>
      </div>
    </div>
  );
};

export default AgentCard;
