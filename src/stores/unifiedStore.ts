
import { create } from 'zustand';
import { ChatMessage, MessageType } from '@/types/chat';

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'idle' | 'active' | 'busy';
  capabilities: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  timestamp: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  isEnabled: boolean;
  icon?: string;
}

interface UnifiedStore {
  // Projects
  projects: Project[];
  currentProject: Project | null;
  createProject: (projectData: Omit<Project, 'id'>) => Promise<Project>;
  setCurrentProject: (project: Project) => void;
  
  // Agents
  agents: Agent[];
  ceoAgent: Agent | null;
  initializeCeoAgent: () => Promise<Agent>;
  createAgent: (agentData: Omit<Agent, 'id'>) => Agent;
  
  // Tools
  availableTools: Tool[];
  registerTool: (tool: Omit<Tool, 'id'>) => Tool;
  toggleTool: (toolId: string) => void;
  
  // Chat
  messages: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
  clearMessages: () => void;
}

export const useUnifiedStore = create<UnifiedStore>((set, get) => ({
  // Projects state and methods
  projects: [],
  currentProject: null,
  
  createProject: async (projectData) => {
    const newProject = {
      id: `project-${Date.now()}`,
      ...projectData
    };
    
    set(state => ({
      projects: [...state.projects, newProject],
      currentProject: newProject
    }));
    
    // Initialize CEO agent when project is created
    get().initializeCeoAgent();
    
    return newProject;
  },
  
  setCurrentProject: (project) => {
    set({ currentProject: project });
  },
  
  // Agents state and methods
  agents: [],
  ceoAgent: null,
  
  initializeCeoAgent: async () => {
    const ceoAgent = {
      id: `agent-${Date.now()}`,
      name: 'CEO Assistant',
      role: 'orchestrator',
      status: 'idle' as const,
      capabilities: ['task-management', 'agent-delegation', 'status-reporting']
    };
    
    set(state => ({
      agents: [...state.agents, ceoAgent],
      ceoAgent
    }));
    
    return ceoAgent;
  },
  
  createAgent: (agentData) => {
    const newAgent = {
      id: `agent-${Date.now()}`,
      ...agentData
    };
    
    set(state => ({
      agents: [...state.agents, newAgent]
    }));
    
    return newAgent;
  },
  
  // Tools state and methods
  availableTools: [],
  
  registerTool: (toolData) => {
    const newTool = {
      id: `tool-${Date.now()}`,
      ...toolData,
      isEnabled: false
    };
    
    set(state => ({
      availableTools: [...state.availableTools, newTool]
    }));
    
    return newTool;
  },
  
  toggleTool: (toolId) => {
    set(state => ({
      availableTools: state.availableTools.map(tool => 
        tool.id === toolId ? { ...tool, isEnabled: !tool.isEnabled } : tool
      )
    }));
  },
  
  // Chat state and methods
  messages: [
    {
      role: 'assistant',
      content: 'Hello! I\'m your CEO assistant. How can I help you today?',
      type: MessageType.TEXT,
    }
  ],
  
  addMessage: (message) => {
    set(state => ({
      messages: [...state.messages, message]
    }));
  },
  
  clearMessages: () => {
    set({
      messages: [
        {
          role: 'assistant',
          content: 'Hello! I\'m your CEO assistant. How can I help you today?',
          type: MessageType.TEXT,
        }
      ]
    });
  }
}));
