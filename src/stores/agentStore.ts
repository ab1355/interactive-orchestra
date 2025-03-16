
import { create } from 'zustand';

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'idle' | 'active' | 'busy';
}

interface AgentStore {
  agents: Agent[];
  mainAgent: Agent | null;
  initializeMainAgent: () => Promise<Agent>;
  addAgent: (agent: Omit<Agent, 'id'>) => Agent;
}

export const useAgentStore = create<AgentStore>((set, get) => ({
  agents: [],
  mainAgent: null,
  
  initializeMainAgent: async () => {
    const mainAgent = {
      id: `agent-${Date.now()}`,
      name: 'CEO Assistant',
      role: 'main',
      status: 'idle' as const
    };
    
    set(state => ({
      agents: [...state.agents, mainAgent],
      mainAgent
    }));
    
    return mainAgent;
  },
  
  addAgent: (agentData) => {
    const newAgent = {
      id: `agent-${Date.now()}`,
      ...agentData
    };
    
    set(state => ({
      agents: [...state.agents, newAgent]
    }));
    
    return newAgent;
  }
}));
